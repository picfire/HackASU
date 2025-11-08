import React, { useState, useEffect } from 'react';
import { generateFirstQuestion, generateNextQuestion, evaluateAnswer } from '../services/claudeService';

const Assessment = ({ userProfile, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [scores, setScores] = useState({
    'Academic Culture': 50,
    'Social Norms': 50,
    'Daily Life': 50,
    'Legal/Administrative': 50,
    'Health & Safety': 50
  });

  const TOTAL_QUESTIONS = 12;

  useEffect(() => {
    loadFirstQuestion();
  }, []);

  const loadFirstQuestion = async () => {
    try {
      setLoading(true);
      const question = await generateFirstQuestion(userProfile);
      setCurrentQuestion(question);
      setLoading(false);
    } catch (error) {
      console.error('Error loading first question:', error);
      setLoading(false);
    }
  };

  const loadNextQuestion = async () => {
    try {
      setLoading(true);
      const question = await generateNextQuestion(conversationHistory, userProfile, scores);
      setCurrentQuestion(question);
      setSelectedAnswer('');
      setShowFeedback(false);
      setQuestionNumber(questionNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error loading next question:', error);
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) return;

    try {
      setLoading(true);
      
      // For demo purposes, we'll determine correctness based on option A being correct
      // In production, Claude would provide the correct answer
      const correctAnswer = currentQuestion.options[0];
      const evaluation = await evaluateAnswer(
        currentQuestion.question,
        selectedAnswer,
        correctAnswer,
        currentQuestion.domain
      );

      setFeedback(evaluation);
      setShowFeedback(true);

      // Update scores
      const newScores = { ...scores };
      newScores[currentQuestion.domain] = Math.max(0, Math.min(100, 
        newScores[currentQuestion.domain] + evaluation.scoreImpact
      ));
      setScores(newScores);

      // Update conversation history
      setConversationHistory([
        ...conversationHistory,
        {
          question: currentQuestion.question,
          userAnswer: selectedAnswer,
          isCorrect: evaluation.isCorrect,
          domain: currentQuestion.domain,
          explanation: evaluation.explanation
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      // Assessment complete
      onComplete({
        scores,
        conversationHistory
      });
    } else {
      loadNextQuestion();
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Generating your personalized assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {questionNumber} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((questionNumber / TOTAL_QUESTIONS) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {currentQuestion && (
            <>
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {currentQuestion.domain}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showFeedback && setSelectedAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition duration-200 ${
                      selectedAnswer === option
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                    } ${showFeedback ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>

              {showFeedback && feedback && (
                <div className={`p-6 rounded-lg mb-6 ${
                  feedback.isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {feedback.isCorrect ? '✓' : '✗'}
                    </span>
                    <div>
                      <h3 className={`font-bold text-lg mb-2 ${
                        feedback.isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback.isCorrect ? 'Correct!' : 'Not quite'}
                      </h3>
                      <p className="text-gray-700">{feedback.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                {!showFeedback ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer || loading}
                    className={`px-8 py-3 rounded-lg font-semibold text-white transition duration-200 ${
                      selectedAnswer && !loading
                        ? 'bg-primary hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {loading ? 'Evaluating...' : 'Submit Answer'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    {questionNumber >= TOTAL_QUESTIONS ? 'View Results' : 'Next Question →'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Current Scores Preview */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scores).map(([domain, score]) => (
              <div key={domain} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{domain}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-10 text-right">
                    {Math.round(score)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
