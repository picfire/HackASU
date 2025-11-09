'use client';

import { useState, useEffect } from 'react';
import './page.css';
import { Header, StatsBar, LeagueCard, DailyQuests, LessonTimeline } from './components';
import { Survey } from './components/survey';
import { QuestionDisplay } from './components/question';
import { AllQuestionsLoader } from './components/allQuestionsLoader';

interface UserContext {
  destination: string;
  university: string;
  studyField: string;
}

interface QuestionData {
  question: string;
  answers: Array<{ text: string; correct: boolean }>;
  explanation: string;
}

export default function Challenges() {
  const [stage, setStage] = useState<'survey' | 'loading' | 'questions' | 'dashboard'>('survey');
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [cachedQuestions, setCachedQuestions] = useState<QuestionData[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const initialLessons = [
    { id: 1, type: 'start', completed: false, current: true, icon: '⭐' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
    { id: 6, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 7, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 8, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 9, type: 'star', completed: false, current: false, icon: '⭐' },
    { id: 10, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 11, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 12, type: 'lesson', completed: false, current: false, icon: '🎯' },
  ];

  const [lessons, setLessons] = useState(initialLessons);

  // Load persisted state on mount
  useEffect(() => {
    const savedUserContext = localStorage.getItem('userChallengeContext');
    const savedStage = localStorage.getItem('challengeStage');
    const savedLesson = localStorage.getItem('currentLesson');
    const savedLessons = localStorage.getItem('lessonsProgress');
    const cachedQuestions = localStorage.getItem('cachedQuestions');

    if (savedUserContext) {
      setUserContext(JSON.parse(savedUserContext));
    }
    if (cachedQuestions) {
      setCachedQuestions(JSON.parse(cachedQuestions));
    }
    if (savedStage) {
      setStage(savedStage as 'survey' | 'loading' | 'questions' | 'dashboard');
    }
    if (savedLesson) {
      setCurrentLesson(parseInt(savedLesson));
    }
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons));
    }

    setIsHydrated(true);
  }, []);

  const handleSurveyComplete = (data: UserContext) => {
    setUserContext(data);
    setStage('loading');
    localStorage.setItem('userChallengeContext', JSON.stringify(data));
    localStorage.setItem('challengeStage', 'loading');
  };

  const handleQuestionsLoaded = (questions: QuestionData[]) => {
    setCachedQuestions(questions);
    setStage('questions');
    localStorage.setItem('challengeStage', 'questions');
  };

  const handleLessonNext = () => {
    if (currentLesson < 12) {
      const nextLesson = currentLesson + 1;
      setCurrentLesson(nextLesson);
      localStorage.setItem('currentLesson', nextLesson.toString());
    }
  };

  const handleLessonComplete = () => {
    // Mark current lesson as complete and move to next
    console.log('handleLessonComplete called, currentLesson:', currentLesson);
    console.log('Current lessons before update:', lessons);
    
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === currentLesson) {
        console.log('Marking lesson', lesson.id, 'as completed');
        return { ...lesson, completed: true, current: false };
      }
      if (lesson.id === currentLesson + 1) {
        console.log('Marking lesson', lesson.id, 'as current');
        return { ...lesson, current: true };
      }
      return lesson;
    });
    
    console.log('Updated lessons:', updatedLessons);
    setLessons(updatedLessons);
    localStorage.setItem('lessonsProgress', JSON.stringify(updatedLessons));
    
    const nextLesson = currentLesson + 1;
    setCurrentLesson(nextLesson);
    localStorage.setItem('currentLesson', nextLesson.toString());
    
    // Move to dashboard to show updated progress
    setStage('dashboard');
    localStorage.setItem('challengeStage', 'dashboard');
    console.log('Moving to dashboard, nextLesson:', nextLesson);
  };

  const completeLesson = (id: number) => {
    // User clicked on a lesson to START it
    console.log('completeLesson called with id:', id);
    setCurrentLesson(id);
    localStorage.setItem('currentLesson', id.toString());
    
    // Go to questions stage to display the questions
    if (cachedQuestions.length > 0) {
      console.log('Setting stage to questions with', cachedQuestions.length, 'cached questions');
      setStage('questions');
      localStorage.setItem('challengeStage', 'questions');
    } else {
      console.log('No cached questions!');
    }
  };

  if (!isHydrated) {
    return null; // Prevent hydration mismatch
  }

  if (stage === 'survey') {
    return <Survey onComplete={handleSurveyComplete} />;
  }

  if (stage === 'loading' && userContext) {
    return (
      <AllQuestionsLoader
        userContext={userContext}
        onComplete={handleQuestionsLoaded}
      />
    );
  }

  if (stage === 'questions' && userContext && cachedQuestions.length > 0) {
    return (
      <QuestionDisplay
        userContext={userContext}
        lessonId={currentLesson}
        cachedQuestions={cachedQuestions}
        onNext={handleLessonNext}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <div className="background-challenges">
      <Header />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Timeline Area */}
        <div className="lg:col-span-2">
          <LessonTimeline lessons={lessons} onCompleteLesson={completeLesson} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <StatsBar />
          <LeagueCard />
          <DailyQuests />
        </div>
      </div>
    </div>
  );
}
