'use client';

import { useEffect, useState } from 'react';

interface QuestionData {
  question: string;
  answers: Array<{ text: string; correct: boolean }>;
  explanation: string;
}

interface AllQuestionsLoaderProps {
  userContext: {
    destination: string;
    university: string;
    studyField: string;
  };
  currentSection: string;
  onComplete: (questions: QuestionData[]) => void;
}

export function AllQuestionsLoader({ userContext, currentSection, onComplete }: AllQuestionsLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/generateAllQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userContext, section: currentSection }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.questions || !Array.isArray(data.questions) || data.questions.length !== 12) {
          throw new Error('Invalid questions data received');
        }

        // Cache questions in localStorage
        localStorage.setItem('cachedQuestions', JSON.stringify(data.questions));
        localStorage.removeItem('loadingQuestions');

        onComplete(data.questions);
      } catch (error) {
        console.error('Error loading all questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load questions');
        localStorage.removeItem('loadingQuestions');
      } finally {
        setLoading(false);
      }
    };

    loadAllQuestions();
  }, [userContext, onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-purple-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-6 mx-auto"></div>
        <p className="text-white text-xl font-semibold mb-2">Preparing your personalized lessons...</p>
        <p className="text-white text-sm opacity-90">This may take a moment as we generate 12 unique questions</p>
        {error && (
          <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-lg max-w-md">
            <p className="font-bold mb-2">Error loading questions</p>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
