import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

interface UserContext {
  destination: string;
  university: string;
  studyField: string;
  section?: string;
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

const sectionTopics = {
  culture: "local customs, traditions, etiquette, social norms, and cultural practices",
  language: "essential phrases, communication styles, language barriers, and linguistic nuances",
  navigation: "getting around campus and the city, transportation systems, locations, and directions",
  academics: "university life, academic expectations, classroom culture, and study methods",
  social: "making friends, social interactions, networking, and building relationships"
};

export async function POST(request: NextRequest) {
  try {
    const body: UserContext = await request.json();
    const { destination, university, studyField, section = 'culture' } = body;

    console.log("Received request for all questions:", {
      destination,
      university,
      studyField,
      section,
    });

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const sectionTopic = sectionTopics[section as keyof typeof sectionTopics] || sectionTopics.culture;

    // Generate all 12 questions at once
    const prompt = `You are a cultural education expert creating personalized lessons for the "Impulsa" platform - a Duolingo-style app for culture shock preparation.

User Profile:
- Destination Country: ${destination}
- University: ${university}
- Study Field: ${studyField}
- Current Section: ${section.toUpperCase()}

Create EXACTLY 12 unique challenging lesson questions specifically focused on ${sectionTopic} that this student will encounter at ${university} in ${destination}.

All 12 questions should be directly related to the ${section} section theme. Tailor each question to their specific university and field of study. Make each question progressively more complex.

CRITICAL REQUIREMENTS:
- Return EXACTLY 12 questions, no more, no less
- Each question must have EXACTLY 4 answers
- Each question must have EXACTLY 1 correct answer (correct: true) and 3 incorrect answers (correct: false)
- Return ONLY valid JSON, no extra text before or after

Return a JSON array with this exact format:
[
  {
    "question": "Question text here",
    "answers": [
      {"text": "Correct answer", "correct": true},
      {"text": "Wrong answer 1", "correct": false},
      {"text": "Wrong answer 2", "correct": false},
      {"text": "Wrong answer 3", "correct": false}
    ],
    "explanation": "Educational explanation of why the correct answer is right"
  }
]

Make the answers varied and plausible. Ensure each correct answer is educational and realistic for someone in their situation. Vary the topics across the 12 questions to cover different aspects of the ${section} theme.`;

    console.log("Calling Claude API to generate all questions...");
    
    let questionsData: QuestionData[] = [];
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      attempts++;
      console.log(`Attempt ${attempts} of ${maxAttempts}...`);
      
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
        console.error("Unexpected response type from Claude");
        if (attempts < maxAttempts) continue;
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
        if (attempts < maxAttempts) continue;
        throw new Error("Could not parse JSON array from Claude response");
      }

      try {
        questionsData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        if (attempts < maxAttempts) continue;
        throw parseError;
      }

      // Validate the parsed data
      if (!Array.isArray(questionsData) || questionsData.length !== 12) {
        console.error(`Expected 12 questions, got ${questionsData.length}`);
        if (attempts < maxAttempts) continue;
        throw new Error(`Expected 12 questions, got ${questionsData.length}`);
      }
      
      // If we got here, we have valid data
      break;
    }

    // Validate each question and fix common issues
    let hasValidationErrors = false;
    questionsData.forEach((q, index) => {
      if (!q.question || !Array.isArray(q.answers) || !q.explanation) {
        console.error(`Question ${index + 1} has invalid structure`);
        hasValidationErrors = true;
        return;
      }

      if (q.answers.length !== 4) {
        console.error(`Question ${index + 1} should have exactly 4 answers, got ${q.answers.length}`);
        hasValidationErrors = true;
        return;
      }

      const validAnswers = q.answers.every(
        (a: any) => typeof a.text === "string" && typeof a.correct === "boolean"
      );

      if (!validAnswers) {
        console.error(`Question ${index + 1} has invalid answer format`);
        hasValidationErrors = true;
        return;
      }

      const correctCount = q.answers.filter((a: any) => a.correct).length;
      if (correctCount !== 1) {
        console.error(`Question ${index + 1} should have exactly 1 correct answer, got ${correctCount}`);
        // Try to fix: if multiple correct, keep only the first one
        if (correctCount > 1) {
          let foundFirst = false;
          q.answers.forEach((a: any) => {
            if (a.correct && foundFirst) {
              a.correct = false;
            } else if (a.correct) {
              foundFirst = true;
            }
          });
          console.log(`Fixed question ${index + 1} - kept only first correct answer`);
        }
      }
    });

    if (hasValidationErrors) {
      throw new Error("Validation errors found in questions");
    }

    console.log("All 12 questions validated successfully");
    return NextResponse.json({ questions: questionsData });
  } catch (error) {
    console.error("Error generating questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
