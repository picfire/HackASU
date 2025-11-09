'use client';

import { useState, useEffect } from 'react';

interface Answer {
  text: string;
  correct: boolean;
}

interface QuestionData {
  question: string;
  answers: Answer[];
  explanation: string;
}

interface QuestionComponentProps {
  userContext: {
    destination: string;
    university: string;
    studyField: string;
  };
  lessonId: number;
  cachedQuestions: QuestionData[];
  onNext: () => void;
  onComplete: () => void;
  onQuit?: () => void;
}

export function QuestionDisplay({
  userContext,
  lessonId,
  cachedQuestions,
  onNext,
  onComplete,
  onQuit,
}: QuestionComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get question from cache at current index
    if (cachedQuestions && cachedQuestions.length > currentQuestionIndex) {
      const currentQuestion = cachedQuestions[currentQuestionIndex];
      setQuestion(currentQuestion);
      setSelected(null);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, cachedQuestions]);

  const handleSubmit = () => {
    if (selected === null || !question) return;

    const correct = question.answers[selected].correct;
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleNext = () => {
    // Check if there are more questions
    if (currentQuestionIndex < cachedQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered - complete the lesson
      onComplete();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-purple-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-white text-lg font-semibold">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-purple-500">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <p className="text-lg font-semibold text-red-600 mb-4">
            {error || 'Error loading question. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#613873] hover:bg-[#7a4a8f] text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-500 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Lesson {lessonId} - Question {currentQuestionIndex + 1} of {cachedQuestions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#613873] h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / cachedQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#613873] mb-6">{question.question}</h2>

        <div className="space-y-3 mb-6">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => !submitted && setSelected(index)}
              className={`w-full p-4 text-left border-2 rounded-lg transition ${
                selected === index
                  ? 'border-[#613873] bg-purple-50'
                  : 'border-gray-300 hover:border-[#613873]'
              } ${
                submitted
                  ? answer.correct
                    ? 'border-green-500 bg-green-50'
                    : selected === index
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  : ''
              }`}
              disabled={submitted}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selected === index
                      ? 'border-[#613873] bg-[#613873]'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-800">{answer.text}</span>
              </div>
            </button>
          ))}
        </div>

        {submitted && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <p className="font-bold mb-2">{isCorrect ? '🎉 Correct!' : '❌ Not quite...'}</p>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-4">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="flex-1 bg-[#613873] hover:bg-[#7a4a8f] disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 bg-[#613873] hover:bg-[#7a4a8f] text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {currentQuestionIndex === cachedQuestions.length - 1 ? 'Complete Lesson!' : 'Next Question →'}
            </button>
          )}
        </div>

        {/* Quit Button */}
        {onQuit && (
          <button
            onClick={onQuit}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
          >
            ✕ Quit Challenge
          </button>
        )}
      </div>
    </div>
  );
}
