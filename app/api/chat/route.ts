import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { searchBrave, shouldUseWebSearch } from "@/lib/brave-search";
import {
  fetchMultipleWebContents,
  formatFetchedContent,
} from "@/lib/web-fetcher";

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

    // Check if we should perform web search
    let searchResults = "";
    let webContent = "";
    let usedSearch = false;

    if (shouldUseWebSearch(message)) {
      try {
        // Step 1: Get search results from Brave
        const braveResults = await searchBrave(message);
        searchResults = braveResults.formattedResults;
        usedSearch = true;
        console.log("🔍 Web search performed for:", message);

        // Step 2: Fetch actual webpage content from top results
        if (braveResults.urls.length > 0) {
          console.log(
            "🌐 Fetching content from",
            braveResults.urls.length,
            "webpages..."
          );
          const fetchedContents = await fetchMultipleWebContents(
            braveResults.urls,
            3 // Fetch content from top 3 results
          );

          if (fetchedContents.length > 0) {
            webContent = formatFetchedContent(fetchedContents);
            console.log(
              "✅ Successfully fetched content from",
              fetchedContents.length,
              "webpages"
            );
          } else {
            console.log("⚠️ Could not fetch content from any webpage");
          }
        }
      } catch (error) {
        console.warn("Web search failed, continuing without it:", error);
        // Continue without search results if it fails
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
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Construct the prompt with search results and web content if available
    let prompt = message;
    if (usedSearch && (searchResults || webContent)) {
      prompt = `You are an AI assistant with access to real-time web search AND the ability to read full webpage content. Current date/time: ${currentDateTime} (Server Time)

${searchResults ? `WEB SEARCH RESULTS (Snippets):\n${searchResults}\n\n` : ""}${webContent ? `FULL WEBPAGE CONTENT (Extracted from top results):\n${webContent}\n\n` : ""}
User Question: ${message}

IMPORTANT INSTRUCTIONS:
- You have FULL ACCESS to webpage content above, not just snippets - use this detailed information!
- For weather queries: Extract exact temperature, conditions, forecast from the full webpage content
- For time/date queries: Use current date/time (${currentDateTime}) and specific timezone info from pages
- For location queries: Use detailed, specific information from the full webpage content
- For current events: Provide latest information with specific dates, numbers, and facts
- ALWAYS cite sources by mentioning the website (e.g., "According to weather.com..." or "Based on data from...")
- Prefer information from FULL WEBPAGE CONTENT over search snippets (it's more detailed and accurate)
- Be specific with all numbers, dates, times, temperatures, and facts you find
- If you see contradicting information, use the most recent or most authoritative source
- Format your response naturally and conversationally
- If the webpage content doesn't contain what you need, acknowledge it honestly

Provide a comprehensive, accurate answer using the full webpage content above.`;
    } else {
      // Add context even without search
      prompt = `Current date/time: ${currentDateTime} (Server Time)
Note: You may not have access to real-time information for this query. If the user asks about current events, weather, time, or other real-time data, let them know you don't have access to live information.

User Question: ${message}`;
    }

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      usedWebSearch: usedSearch 
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

