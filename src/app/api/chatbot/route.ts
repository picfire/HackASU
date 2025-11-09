import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  selectedCountry?: string;
  selectedUniversity?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, selectedCountry, selectedUniversity } = body;

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemContext = selectedCountry
      ? `You are a culture shock assistant for the "Impulsa" platform. Unless specified otherwise, the user is planning to study at ${selectedUniversity} in ${selectedCountry}. Help them with culture shock, social customs, and adjustment tips specific to this context. Be friendly, concise, and practical.`
      : "You are a culture shock assistant for international students. Help with general culture shock questions and international student concerns. Be friendly, concise, and practical.";

    // Format messages for Claude (exclude system context from history)
    const claudeMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    console.log("Calling Claude API for chat...");
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemContext,
      messages: claudeMessages,
    });

    console.log("Claude chat response received");

    const textContent = message.content[0];
    if (textContent.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    return NextResponse.json({ response: textContent.text });
  } catch (error) {
    console.error("Error in chat:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}