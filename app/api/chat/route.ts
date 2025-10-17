import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { searchBrave, shouldUseWebSearch } from "@/lib/brave-search";

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
    let usedSearch = false;

    if (shouldUseWebSearch(message)) {
      try {
        searchResults = await searchBrave(message);
        usedSearch = true;
        console.log("🔍 Web search performed for:", message);
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
    
    // Construct the prompt with search results if available
    let prompt = message;
    if (usedSearch && searchResults) {
      prompt = `You are an AI assistant with access to real-time web search. Current date/time: ${currentDateTime} (Server Time)

WEB SEARCH RESULTS:
${searchResults}

User Question: ${message}

IMPORTANT INSTRUCTIONS:
- Use the web search results above to provide accurate, up-to-date information
- For weather queries: Extract temperature, conditions, forecast, and location-specific data from search results
- For time/date queries: Use current date/time (${currentDateTime}) and timezone info from search results
- For location queries: Use the specific location data and real-time information from search results
- For current events: Provide the latest information with specific dates and sources
- Always cite sources by mentioning the website or publication (e.g., "According to [source]...")
- If search results don't contain exact data, acknowledge limitations and provide best available info
- Prefer real-time search data over your training knowledge cutoff
- Be specific with numbers, dates, times, and facts from the search results
- Format your response naturally and conversationally

Provide a comprehensive, accurate answer using the web search results.`;
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

