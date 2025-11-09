// Components for the Challenges page
import './page.css';
import { useEffect, useRef } from 'react';
import buttonSvg from './assets/button.svg';

export function Header() {
  return (
    <header className="tab-header">
      <div className="flex items-center justify-start pl-6">
        <div className="flex items-center gap-4">
          <button className="text-blue-400 hover:text-blue-300">
            ← Back
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Challenges</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export function StatsBar() {
  const stats = [
    { icon: '🔥', value: 10 },
    { icon: '🪙', value: 8 },
    { icon: '💎', value: 52 },
    { icon: '❤️', value: 5 },
  ];

  return (
    <div className="flex gap-4 justify-end">
      {stats.map((stat, index) => (
        <div key={index} className="stat-badge bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-2xl">{stat.icon}</span>
          <span className="text-white font-bold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}



export function LeagueCard() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg">Bronze League</h3>
        <button className="text-blue-400 text-sm font-semibold">VIEW LEAGUE</button>
      </div>
      <div className="flex items-center gap-4">
        <div className="league-badge w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-2xl">
          🥉
        </div>
        <div className="flex-1">
          <p className="text-green-400 font-bold">You're ranked #8</p>
          <p className="text-gray-400 text-sm">You've earned 388 XP this week so far</p>
        </div>
      </div>
    </div>
  );
}

export function DailyQuests() {
  const quests = [
    { icon: '⚡', title: 'Earn 30 XP', progress: 73, current: '22 / 30' },
    { icon: '🦉', title: 'Get 5 in a row correct in 2 lessons', progress: 40, current: '2' },
    { icon: '⏰', title: 'Spend 15 minutes learning', progress: 60, current: '15' },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg">Daily Quests</h3>
        <button className="text-blue-400 text-sm font-semibold">VIEW ALL</button>
      </div>
      
      <div className="space-y-4">
        {quests.map((quest, index) => (
          <div key={index} className="quest-card flex items-center gap-3">
            <div className="text-3xl">{quest.icon}</div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold mb-1">{quest.title}</p>
              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="progress-bar absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" 
                  style={{width: `${quest.progress}%`}}
                ></div>
              </div>
              <p className="text-gray-400 text-xs mt-1">{quest.current}</p>
            </div>
            <div className="text-xl">🎁</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LessonNode {
  id: number;
  type: string;
  completed: boolean;
  current: boolean;
  icon: string;
}

export function LessonTimeline({ lessons, onCompleteLesson }: { lessons: LessonNode[], onCompleteLesson?: (id: number) => void }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-1 py-5">
        {lessons.map((lesson, index) => {
          const currentLesson = lessons.find(l => l.current);
          const isLocked = !lesson.completed && !lesson.current && currentLesson && currentLesson.id < lesson.id - 1;
          
          return (
          <div key={lesson.id} className={`relative flex flex-col items-center ${index % 2 === 0 ? '-ml-96' : '-ml-52'}`}>
            {/* Lesson Button SVG */}
            <button
              onClick={() => {
                console.log('Button clicked for lesson', lesson.id, 'isLocked:', isLocked, 'onCompleteLesson exists:', !!onCompleteLesson);
                if (!isLocked && onCompleteLesson) {
                  console.log('Calling onCompleteLesson with id:', lesson.id);
                  onCompleteLesson(lesson.id);
                }
              }}
              className={`relative z-10 transition-all ${
                isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } ${lesson.current ? 'scale-110 animate-pulse drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]' : ''} ${
                !lesson.current && !lesson.completed && !isLocked ? 'scale-105 hover:scale-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]' : ''
              }`}
              disabled={isLocked}
            >
              <img 
                src={buttonSvg.src} 
                alt="lesson" 
                className={`w-24 h-24 transition-all ${
                  lesson.current 
                    ? 'drop-shadow-lg' 
                    : ''
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-3xl bottom-2">
                {lesson.icon}
              </div>
              {lesson.current && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
                  ⚡
                </div>
              )}
            </button>
            
            {/* Label */}
            {lesson.current && (
              <div className="mt-2 bg-gradient-to-r from-[#613873] to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                START
              </div>
            )}
            {!lesson.current && !lesson.completed && !isLocked && (
              <div className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
                ✨ Ready!
              </div>
            )}
          </div>
          );
        })}
      </div>

      <div className="text-center mt-12"> {/* this the bottom text */}
        <p className="text-gray-400 text-lg">Talk about your hometown</p>
        <button className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold">
          JUMP HERE?
        </button>
      </div>
    </div>
  );
}
