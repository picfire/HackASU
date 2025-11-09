'use client';

import { useState, useEffect } from 'react';
import './page.css';
import { StatsBar, LeagueCard, DailyQuests, LessonTimeline, UserProfile } from './components';
import { Survey } from './components/survey';
import { QuestionDisplay } from './components/question';
import { AllQuestionsLoader } from './components/allQuestionsLoader';
import AnimatedContent from '../components/animatedcontent';
import { SectionsDock, sectionLessons } from './components/sections-dock';

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
  const [currentSection, setCurrentSection] = useState<string>('culture');

  const initialLessons = [
    { id: 1, type: 'start', completed: false, current: true, icon: 'key' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: 'star' },
    { id: 3, type: 'chest', completed: false, current: false, icon: 'star' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: 'star' },
    { id: 5, type: 'star', completed: false, current: false, icon: 'star' },
    { id: 6, type: 'lesson', completed: false, current: false, icon: 'star' },
    { id: 7, type: 'chest', completed: false, current: false, icon: 'star' },
    { id: 8, type: 'lesson', completed: false, current: false, icon: 'star' },
    { id: 9, type: 'star', completed: false, current: false, icon: 'star' },
    { id: 10, type: 'lesson', completed: false, current: false, icon: 'star' },
    { id: 11, type: 'chest', completed: false, current: false, icon: 'star' },
    { id: 12, type: 'lesson', completed: false, current: false, icon: 'key' },
  ];

  const [lessons, setLessons] = useState(initialLessons);
  const [sectionProgress, setSectionProgress] = useState<Record<string, any[]>>({});
  const [cachedQuestionsBySection, setCachedQuestionsBySection] = useState<Record<string, QuestionData[]>>({});

  // Load persisted state on mount
  useEffect(() => {
    const savedUserContext = localStorage.getItem('userChallengeContext');
    const savedStage = localStorage.getItem('challengeStage');
    const savedLesson = localStorage.getItem('currentLesson');
    const savedLessons = localStorage.getItem('lessonsProgress');
    const savedSectionProgress = localStorage.getItem('sectionProgress');
    const savedCachedQuestionsBySection = localStorage.getItem('cachedQuestionsBySection');

    if (savedUserContext) {
      setUserContext(JSON.parse(savedUserContext));
    }
    if (savedCachedQuestionsBySection) {
      setCachedQuestionsBySection(JSON.parse(savedCachedQuestionsBySection));
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
    if (savedSectionProgress) {
      setSectionProgress(JSON.parse(savedSectionProgress));
    }

    setIsHydrated(true);
  }, []);

  // Update cached questions when section changes
  useEffect(() => {
    if (cachedQuestionsBySection[currentSection]) {
      setCachedQuestions(cachedQuestionsBySection[currentSection]);
    }
  }, [currentSection, cachedQuestionsBySection]);

  const handleSurveyComplete = (data: UserContext) => {
    setUserContext(data);
    setStage('loading');
    localStorage.setItem('userChallengeContext', JSON.stringify(data));
    localStorage.setItem('challengeStage', 'loading');
  };

  const handleQuestionsLoaded = (questions: QuestionData[]) => {
    setCachedQuestions(questions);
    // Cache questions per section
    const newCache = {
      ...cachedQuestionsBySection,
      [currentSection]: questions
    };
    setCachedQuestionsBySection(newCache);
    localStorage.setItem('cachedQuestionsBySection', JSON.stringify(newCache));
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
    // Mark current lesson as complete and move to next for the current section
    console.log('handleLessonComplete called, currentLesson:', currentLesson, 'currentSection:', currentSection);
    
    // Get current section's lessons
    const currentSectionLessons = sectionProgress[currentSection] || [...sectionLessons[currentSection as keyof typeof sectionLessons]];
    
    const updatedLessons = currentSectionLessons.map(lesson => {
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
    
    // Update section-specific progress
    const newSectionProgress = {
      ...sectionProgress,
      [currentSection]: updatedLessons
    };
    
    console.log('Updated section progress:', newSectionProgress);
    setSectionProgress(newSectionProgress);
    localStorage.setItem('sectionProgress', JSON.stringify(newSectionProgress));
    
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
    
    // Check if we have cached questions for this section
    const questionsForSection = cachedQuestionsBySection[currentSection];
    
    // Go to questions stage to display the questions
    if (questionsForSection && questionsForSection.length > 0) {
      console.log('Setting stage to questions with', questionsForSection.length, 'cached questions for section:', currentSection);
      setCachedQuestions(questionsForSection);
      setStage('questions');
      localStorage.setItem('challengeStage', 'questions');
    } else {
      console.log('No cached questions for section:', currentSection, '- reloading...');
      setStage('loading');
      localStorage.setItem('challengeStage', 'loading');
    }
  };

  const handleSectionNeedsReload = () => {
    // When switching sections, if there are no cached questions for the new section,
    // trigger a reload
    if (!cachedQuestionsBySection[currentSection]) {
      console.log('Section has no cached questions, triggering reload...');
      setStage('loading');
      localStorage.setItem('challengeStage', 'loading');
    }
  };

  const handleQuitChallenge = () => {
    setStage('dashboard');
    localStorage.setItem('challengeStage', 'dashboard');
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      // Clear all challenge data
      localStorage.removeItem('userChallengeContext');
      localStorage.removeItem('challengeStage');
      localStorage.removeItem('currentLesson');
      localStorage.removeItem('lessonsProgress');
      localStorage.removeItem('cachedQuestions');
      localStorage.removeItem('sectionProgress');
      localStorage.removeItem('cachedQuestionsBySection');
      
      // Reset to initial state
      setStage('survey');
      setUserContext(null);
      setCachedQuestions([]);
      setCurrentLesson(1);
      setLessons(initialLessons);
      setSectionProgress({});
      setCachedQuestionsBySection({});
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
        currentSection={currentSection}
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
        onQuit={handleQuitChallenge}
      />
    );
  }

  return (
    <div className="background-challenges">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_400px] gap-6 p-6">
        {/* Left Sidebar - Sections Dock */}
        <AnimatedContent
          distance={100}
          direction="horizontal"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.3}
          delay={0.1}
        >
          <div className="hidden lg:block">
            <SectionsDock 
              currentSection={currentSection} 
              onSectionChange={setCurrentSection}
              onNeedsReload={handleSectionNeedsReload}
            />
          </div>
        </AnimatedContent>

        {/* Main Timeline Area */}
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.3}
          delay={0.15}
        >
          <div>
            <LessonTimeline 
              lessons={sectionProgress[currentSection] || sectionLessons[currentSection as keyof typeof sectionLessons]} 
              onCompleteLesson={completeLesson} 
            />
          </div>
        </AnimatedContent>

        {/* Right Sidebar */}
        <AnimatedContent
          distance={100}
          direction="horizontal"
          reverse={true}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.3}
          delay={0.2}
        >  
          <div className="space-y-6">
            {userContext && (
            <UserProfile
              destination={userContext.destination}
              university={userContext.university}
              studyField={userContext.studyField}
            />
          )}
          <StatsBar />
            <LeagueCard />
            <DailyQuests />
            
            {/* Debug Reset Button */}
            <button
              onClick={resetProgress}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
            >
              Reset Progress (Debug)
            </button>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
