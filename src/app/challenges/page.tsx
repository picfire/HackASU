'use client';

import { useState } from 'react';
import './page.css';
import { Header, StatsBar, SuperPromo, LeagueCard, DailyQuests, LessonTimeline } from './components';

export default function Challenges() {
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

  const completeLesson = (id: number) => {
    setLessons(prevLessons => {
      const updatedLessons = prevLessons.map(lesson => {
        if (lesson.id === id) {
          return { ...lesson, completed: true, current: false };
        }
        if (lesson.id === id + 1 && !prevLessons.find(l => l.id > id && !l.completed)) {
          return { ...lesson, current: true };
        }
        return lesson;
      });
      return updatedLessons;
    });
  };

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
