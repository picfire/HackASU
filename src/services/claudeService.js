// Claude API Service
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export const callClaude = async (messages, maxTokens = 2000) => {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
};

// Generate initial assessment question
export const generateFirstQuestion = async (userProfile) => {
  const messages = [
    {
      role: "user",
      content: `You are an adaptive cultural assessment system. A student is about to take a test to evaluate their cultural knowledge gaps.

Student Profile:
- Home Country: ${userProfile.homeCountry}
- Destination Country: ${userProfile.destinationCountry}
- University: ${userProfile.university}
- Degree Level: ${userProfile.degreeLevel}
- Field of Study: ${userProfile.fieldOfStudy}

Assessment Domains:
1. Academic Culture (office hours, class participation, professor communication)
2. Social Norms (friendships, dating, personal space)
3. Daily Life (housing, transportation, shopping, banking)
4. Legal/Administrative (visa, taxes, healthcare, employment)
5. Health & Safety (emergency services, mental health resources)

Generate the FIRST assessment question. Make it scenario-based and relevant to their profile.

CRITICAL: Respond ONLY with valid JSON in this exact format:
{
  "question": "scenario-based question here",
  "options": ["A) option 1", "B) option 2", "C) option 3", "D) option 4"],
  "domain": "one of the 5 domains",
  "difficulty": "easy"
}

DO NOT include any text outside the JSON. DO NOT use markdown code blocks.`
    }
  ];

  const response = await callClaude(messages, 1000);
  return parseClaudeJSON(response);
};

// Generate next adaptive question
export const generateNextQuestion = async (conversationHistory, userProfile, currentScores) => {
  const messages = [
    {
      role: "user",
      content: `You are continuing an adaptive cultural assessment. Based on previous responses, generate the next question.

Student Profile:
- Home Country: ${userProfile.homeCountry}
- Destination Country: ${userProfile.destinationCountry}
- University: ${userProfile.university}

Current Domain Scores (0-100):
${JSON.stringify(currentScores, null, 2)}

Previous Q&A:
${conversationHistory.map((item, idx) => `Q${idx + 1}: ${item.question}\nAnswer: ${item.userAnswer}\nCorrect: ${item.isCorrect ? 'Yes' : 'No'}`).join('\n\n')}

Rules for next question:
1. Focus on domains with lower scores
2. Adjust difficulty based on previous performance (if they got last question right, increase difficulty)
3. Make it scenario-based and realistic
4. Ensure variety across domains

CRITICAL: Respond ONLY with valid JSON in this exact format:
{
  "question": "scenario-based question here",
  "options": ["A) option 1", "B) option 2", "C) option 3", "D) option 4"],
  "domain": "one of the 5 domains",
  "difficulty": "easy/medium/hard"
}

DO NOT include any text outside the JSON. DO NOT use markdown code blocks.`
    }
  ];

  const response = await callClaude(messages, 1000);
  return parseClaudeJSON(response);
};

// Evaluate user's answer
export const evaluateAnswer = async (question, userAnswer, correctAnswer, domain) => {
  const messages = [
    {
      role: "user",
      content: `Evaluate this answer for a cultural assessment question.

Question: ${question}
User's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
Domain: ${domain}

Determine if the answer is correct and provide a brief explanation (2-3 sentences max).

CRITICAL: Respond ONLY with valid JSON in this exact format:
{
  "isCorrect": true or false,
  "explanation": "brief explanation of why answer is correct/incorrect",
  "scoreImpact": number between -20 and 20 representing impact on domain score
}

DO NOT include any text outside the JSON. DO NOT use markdown code blocks.`
    }
  ];

  const response = await callClaude(messages, 500);
  return parseClaudeJSON(response);
};

// Generate final report with resources
export const generateFinalReport = async (userProfile, finalScores, conversationHistory) => {
  const messages = [
    {
      role: "user",
      content: `Generate a personalized learning report for an international student.

Student Profile:
- Home Country: ${userProfile.homeCountry}
- Destination Country: ${userProfile.destinationCountry}
- University: ${userProfile.university}
- Degree Level: ${userProfile.degreeLevel}

Final Domain Scores (0-100):
${JSON.stringify(finalScores, null, 2)}

Based on these scores, provide:
1. Priority areas to focus on (top 3)
2. Specific recommendations for each priority area
3. Timeline (what to learn before arrival, week 1, month 1)

CRITICAL: Respond ONLY with valid JSON in this exact format:
{
  "priorities": [
    {
      "domain": "domain name",
      "score": number,
      "reason": "why this is a priority"
    }
  ],
  "recommendations": [
    {
      "domain": "domain name",
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
    }
  ],
  "timeline": {
    "beforeArrival": ["task 1", "task 2"],
    "week1": ["task 1", "task 2"],
    "month1": ["task 1", "task 2"]
  }
}

DO NOT include any text outside the JSON. DO NOT use markdown code blocks.`
    }
  ];

  const response = await callClaude(messages, 2000);
  return parseClaudeJSON(response);
};

// Helper function to parse JSON from Claude's response
const parseClaudeJSON = (responseText) => {
  try {
    // Remove any markdown code blocks if present
    let cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse Claude response:", responseText);
    throw new Error("Invalid JSON response from Claude");
  }
};
