export default function Challenges() {
  const lessons = [
    { id: 1, type: 'start', completed: false, current: true, icon: '⭐' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-blue-400 hover:text-blue-300">
              ← Back
            </button>
            <div>
              <p className="text-sm text-gray-400">SECTION 2, UNIT 1</p>
              <h1 className="text-xl font-bold text-white">Ask for directions</h1>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
            📖 GUIDEBOOK
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Timeline Area */}
        <div className="lg:col-span-2">
          <div className="relative">
            {/* Timeline Path */}
            <div className="flex flex-col items-center gap-8 py-12">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="relative flex flex-col items-center">
                  {/* Connecting Line */}
                  {index < lessons.length - 1 && (
                    <div className="absolute top-16 w-1 h-20 bg-slate-700"></div>
                  )}
                  
                  {/* Lesson Circle */}
                  <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all cursor-pointer
                    ${lesson.current 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 scale-110' 
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

            {/* Character/Mascot */}
            <div className="absolute right-10 top-32 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-4xl transform hover:scale-110 transition-transform">
              🦉
            </div>
            
            {/* Fire/Streak Icon */}
            <div className="absolute right-16 top-64 text-5xl animate-bounce">
              🔥
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-12">
              <p className="text-gray-400 text-lg">Talk about your hometown</p>
              <button className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold">
                JUMP HERE?
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Stats Header */}
          <div className="flex gap-4 justify-end">
            <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-bold">10</span>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <span className="text-white font-bold">8</span>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">💎</span>
              <span className="text-white font-bold">52</span>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              <span className="text-white font-bold">5</span>
            </div>
          </div>

          {/* Super Promo Card */}
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

          {/* League Card */}
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">Bronze League</h3>
              <button className="text-blue-400 text-sm font-semibold">VIEW LEAGUE</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-2xl">
                🥉
              </div>
              <div className="flex-1">
                <p className="text-green-400 font-bold">You're ranked #8</p>
                <p className="text-gray-400 text-sm">You've earned 388 XP this week so far</p>
              </div>
            </div>
          </div>

          {/* Daily Quests */}
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">Daily Quests</h3>
              <button className="text-blue-400 text-sm font-semibold">VIEW ALL</button>
            </div>
            
            <div className="space-y-4">
              {/* Quest 1 */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚡</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold mb-1">Earn 30 XP</p>
                  <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{width: '73%'}}></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">22 / 30</p>
                </div>
                <div className="text-xl">🎁</div>
              </div>

              {/* Quest 2 */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">🦉</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold mb-1">Get 5 in a row correct in 2 lessons</p>
                  <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">2</p>
                </div>
                <div className="text-xl">🎁</div>
              </div>

              {/* Quest 3 */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">⏰</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold mb-1">Spend 15 minutes learning</p>
                  <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">15</p>
                </div>
                <div className="text-xl">🎁</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
