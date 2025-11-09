// Components for the Challenges page

export function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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

export function SuperPromo() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-bold inline-block mb-2">
            SUPER
          </div>
          <h3 className="text-xl font-bold mb-2">Try Super for free</h3>
          <p className="text-sm opacity-90">
            No ads, personalized practice, and unlimited Legendary!
          </p>
        </div>
        <div className="text-5xl">🎨</div>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
        TRY 1 WEEK FREE
      </button>
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

export function LessonTimeline({ lessons }: { lessons: LessonNode[] }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-8 py-12">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="relative flex flex-col items-center">
            {/* Lesson Circle */}
            <div className={`lesson-node relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all cursor-pointer
              ${lesson.current 
                ? 'pulse glow bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 scale-110' 
                : lesson.completed 
                  ? 'bg-gradient-to-br from-green-400 to-green-600' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}>
              {lesson.current && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
                  ⚡
                </div>
              )}
              <span>{lesson.icon}</span>
            </div>
            
            {/* Label */}
            {lesson.current && (
              <div className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                START
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-12">
        <p className="text-gray-400 text-lg">Talk about your hometown</p>
        <button className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold">
          JUMP HERE?
        </button>
      </div>
    </div>
  );
}
