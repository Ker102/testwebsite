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

    // Construct the prompt with search results if available
    let prompt = message;
    if (usedSearch && searchResults) {
      prompt = `Based on the following web search results, please answer the user's question.

${searchResults}

User Question: ${message}

Please provide a comprehensive answer using the search results above. Cite sources when relevant.`;
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

