import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

interface UserContext {
  destination: string;
  university: string;
  studyField: string;
}

interface Answer {
  text: string;
  correct: boolean;
}

interface QuestionData {
  question: string;
  answers: Answer[];
  explanation: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: UserContext = await request.json();
    const { destination, university, studyField } = body;

    console.log("Received request for all questions:", {
      destination,
      university,
      studyField,
    });

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Generate all 12 questions at once
    const prompt = `You are a cultural education expert creating personalized lessons for the "Impulsa" platform - a Duolingo-style app for culture shock preparation.

User Profile:
- Destination Country: ${destination}
- University: ${university}
- Study Field: ${studyField}

Create 12 unique challenging lesson questions tailored to this student's specific situation at their university. Each question should help them navigate different aspects of culture shock and cultural differences they might face while studying at this university in this country.

Consider their field of study when creating the question contexts. Make each question progressively more complex.

Return a JSON array with exactly 12 question objects, each with this format:
[
  {
    "question": "Question 1 about culture shock",
    "answers": [
      {"text": "Correct answer", "correct": true},
      {"text": "Wrong answer 1", "correct": false},
      {"text": "Wrong answer 2", "correct": false},
      {"text": "Wrong answer 3", "correct": false}
    ],
    "explanation": "Why this is correct and context"
  },
  ... 11 more questions
]

Make the answers varied and plausible. Ensure each correct answer is educational and realistic for someone in their situation. Vary the topics across the 12 questions to cover different aspects of university life and culture shock.`;

    console.log("Calling Claude API to generate all questions...");
    const message = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
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

    console.log("Raw Claude response length:", textContent.text.length);

    // Parse the JSON response
    const jsonMatch = textContent.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error(
        "Could not find JSON array in response:",
        textContent.text.substring(0, 500)
      );
      throw new Error("Could not parse JSON array from Claude response");
    }

    const questionsData: QuestionData[] = JSON.parse(jsonMatch[0]);

    // Validate the parsed data
    if (!Array.isArray(questionsData) || questionsData.length !== 12) {
      throw new Error(`Expected 12 questions, got ${questionsData.length}`);
    }

    // Validate each question
    questionsData.forEach((q, index) => {
      if (!q.question || !Array.isArray(q.answers) || !q.explanation) {
        throw new Error(`Question ${index + 1} has invalid structure`);
      }

      if (q.answers.length !== 4) {
        throw new Error(`Question ${index + 1} should have exactly 4 answers`);
      }

      const validAnswers = q.answers.every(
        (a: any) => typeof a.text === "string" && typeof a.correct === "boolean"
      );

      if (!validAnswers) {
        throw new Error(`Question ${index + 1} has invalid answer format`);
      }

      const correctCount = q.answers.filter((a: any) => a.correct).length;
      if (correctCount !== 1) {
        throw new Error(
          `Question ${index + 1} should have exactly 1 correct answer`
        );
      }
    });

    console.log("All 12 questions validated successfully");
    return NextResponse.json({ questions: questionsData });
  } catch (error) {
    console.error("Error generating questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
