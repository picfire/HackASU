import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

interface UserContext {
  destination: string;
  university: string;
  studyField: string;
  lessonId: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: UserContext = await request.json();
    const { destination, university, studyField, lessonId } = body;

    console.log("Received request:", {
      destination,
      university,
      studyField,
      lessonId,
    });

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const prompt = `You are a cultural education expert creating personalized lessons for the "Impulsa" platform - a Duolingo-style app for culture shock preparation.

User Profile:
- Destination Country: ${destination}
- University: ${university}
- Study Field: ${studyField}
- Lesson Number: ${lessonId}

Create a single challenging lesson question tailored to this student's specific situation at their university. The question should help them navigate culture shock and cultural differences they might face while studying at this university in this country.

Consider their field of study when creating the question context.

Return a JSON object with this exact format:
{
  "question": "A specific, relevant question about culture shock or cultural differences at this university",
  "answers": [
    {"text": "First answer option", "correct": true},
    {"text": "Second answer option", "correct": false},
    {"text": "Third answer option", "correct": false},
    {"text": "Fourth answer option", "correct": false}
  ],
  "explanation": "Explanation of why the correct answer is right and context about this cultural difference at this specific university/country"
}

Make the answers varied and plausible. The correct answer should be educational and realistic for someone in their situation.`;

    console.log("Calling Claude API...");
    const message = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("Claude response received");

    // Extract the text content
    const textContent = message.content[0];
    if (textContent.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    console.log("Raw Claude response:", textContent.text);

    // Parse the JSON response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from Claude response");
    }

    const questionData = JSON.parse(jsonMatch[0]);

    // Validate the parsed data
    if (
      !questionData.question ||
      !Array.isArray(questionData.answers) ||
      !questionData.explanation
    ) {
      throw new Error("Invalid question data structure from Claude");
    }

    // Ensure answers have correct and text properties
    const validAnswers = questionData.answers.every(
      (a: any) => typeof a.text === "string" && typeof a.correct === "boolean"
    );

    if (!validAnswers) {
      throw new Error("Invalid answer format from Claude");
    }

    console.log("Returning valid question data");
    return NextResponse.json(questionData);
  } catch (error) {
    console.error("Error generating questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
