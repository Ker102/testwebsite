import { VertexAI } from "@google-cloud/vertexai";
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

    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const location = process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
    const apiKey = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!projectId || !apiKey) {
      return NextResponse.json(
        { error: "Vertex AI configuration not complete" },
        { status: 500 }
      );
    }

    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: projectId,
      location: location,
      apiKey: apiKey,
    });

    // Get the generative model
    const model = vertexAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Generate content
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error calling Vertex AI:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

