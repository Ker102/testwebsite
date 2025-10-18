import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { searchBrave, shouldUseWebSearch } from "@/lib/brave-search";
import {
  fetchMultipleWebContents,
  formatFetchedContent,
} from "@/lib/web-fetcher";
import {
  scrapeMultipleWithFirecrawl,
  formatFirecrawlResults,
  shouldUseFirecrawl,
} from "@/lib/firecrawl";
import {
  shouldUseGitMCP,
  extractRepository,
  fetchGitMCPDocumentation,
  formatGitMCPDocumentation,
} from "@/lib/gitmcp";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_AI_API_KEY is required in .env.local" },
        { status: 500 }
      );
    }

    // Track which tools were used
    let usedTools: string[] = [];
    let searchResults = "";
    let webContent = "";
    let gitMCPContent = "";

    // Check if we should fetch GitHub repository information
    if (shouldUseGitMCP(message)) {
      try {
        const repoInfo = extractRepository(message);
        if (repoInfo) {
          console.log(
            `📚 Fetching GitHub documentation for ${repoInfo.owner}/${repoInfo.repo}...`
          );
          const gitResult = await fetchGitMCPDocumentation(
            repoInfo.owner,
            repoInfo.repo
          );

          if (gitResult.success) {
            gitMCPContent = formatGitMCPDocumentation(gitResult);
            usedTools.push("GitMCP");
            console.log(
              `✅ Successfully fetched documentation from ${repoInfo.owner}/${repoInfo.repo}`
            );
          } else {
            console.log(
              `⚠️ Could not fetch GitMCP documentation: ${gitResult.error}`
            );
          }
        } else {
          console.log(
            "ℹ️ GitMCP triggered but no specific repository identified"
          );
        }
      } catch (error) {
        console.warn("GitMCP fetch failed, continuing without it:", error);
      }
    }

    // Check if we should perform web search
    if (shouldUseWebSearch(message)) {
      try {
        // Step 1: Get search results from Brave
        const braveResults = await searchBrave(message);
        searchResults = braveResults.formattedResults;
        usedTools.push("Brave Search");
        console.log("🔍 Web search performed for:", message);

        // Step 2: Fetch actual webpage content from top results
        if (braveResults.urls.length > 0) {
          console.log(
            "🌐 Fetching content from",
            braveResults.urls.length,
            "webpages..."
          );

          // Check if any URLs would benefit from Firecrawl
          const firecrawlUrls = braveResults.urls.filter((url) =>
            shouldUseFirecrawl(url)
          );
          const regularUrls = braveResults.urls.filter(
            (url) => !shouldUseFirecrawl(url)
          );

          // Use Firecrawl for complex sites
          if (
            firecrawlUrls.length > 0 &&
            process.env.FIRECRAWL_API_KEY
          ) {
            console.log(
              `🔥 Using Firecrawl for ${firecrawlUrls.length} complex websites...`
            );
            const firecrawlResults = await scrapeMultipleWithFirecrawl(
              firecrawlUrls,
              2
            );
            if (firecrawlResults.length > 0) {
              webContent += formatFirecrawlResults(firecrawlResults);
              usedTools.push("Firecrawl");
              console.log(
                `✅ Successfully scraped ${firecrawlResults.length} pages with Firecrawl`
              );
            }
          }

          // Use basic fetch for regular sites
          if (regularUrls.length > 0) {
            const fetchedContents = await fetchMultipleWebContents(
              regularUrls,
              3 - firecrawlUrls.length // Adjust count based on Firecrawl usage
            );

            if (fetchedContents.length > 0) {
              webContent += formatFetchedContent(fetchedContents);
              console.log(
                `✅ Successfully fetched content from ${fetchedContents.length} webpages`
              );
            }
          }

          if (!webContent) {
            console.log("⚠️ Could not fetch content from any webpage");
          }
        }
      } catch (error) {
        console.warn("Web search failed, continuing without it:", error);
      }
    }

    // Initialize Google Generative AI with API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Get current date and time for context
    const now = new Date();
    const currentDateTime = now.toUTCString();

    // Construct the prompt with all available context
    let prompt = message;
    const hasExternalData = gitMCPContent || searchResults || webContent;

    if (hasExternalData) {
      const toolsUsed = usedTools.join(", ");
      prompt = `You are an AI assistant with access to multiple powerful tools. Current date/time: ${currentDateTime} (Server Time)
Tools used for this query: ${toolsUsed}

${gitMCPContent ? `GITHUB REPOSITORY DOCUMENTATION:\n${gitMCPContent}\n\n` : ""}${searchResults ? `WEB SEARCH RESULTS (Snippets):\n${searchResults}\n\n` : ""}${webContent ? `FULL WEBPAGE CONTENT (Extracted from top results):\n${webContent}\n\n` : ""}
User Question: ${message}

IMPORTANT INSTRUCTIONS:
- You have access to detailed information above from ${toolsUsed}
- For GitHub/code questions: Use the repository documentation and code examples provided
- For web search: Use FULL WEBPAGE CONTENT (more detailed) over search snippets
- For weather queries: Extract exact temperature, conditions, forecast from webpage content
- For time/date queries: Use current date/time (${currentDateTime}) and timezone info
- For current events: Provide latest information with specific dates, numbers, and facts
- ALWAYS cite sources by mentioning where the information came from (e.g., "According to the Next.js documentation..." or "Based on weather.com...")
- Be specific with all numbers, dates, times, temperatures, and facts
- If you see contradicting information, use the most recent or most authoritative source
- For code examples, show actual implementation details from the documentation
- Format your response naturally and conversationally
- If the provided content doesn't contain what you need, acknowledge it honestly

Provide a comprehensive, accurate answer using the information above.`;
    } else {
      // No external tools used
      prompt = `Current date/time: ${currentDateTime} (Server Time)
Note: You may not have access to real-time information for this query. If the user asks about current events, weather, time, or other real-time data, let them know you don't have access to live information. For GitHub repository questions, suggest they provide a direct repository link.

User Question: ${message}`;
    }

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      usedTools: usedTools,
      usedWebSearch: usedTools.includes("Brave Search"),
      usedGitMCP: usedTools.includes("GitMCP"),
      usedFirecrawl: usedTools.includes("Firecrawl"),
    });
  } catch (error: any) {
    console.error("Error calling Google AI:", error);
    console.error("Error message:", error?.message);
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
