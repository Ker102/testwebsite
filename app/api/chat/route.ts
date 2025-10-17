import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

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

    // Initialize Google Generative AI with API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model  
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Generate content
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
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

