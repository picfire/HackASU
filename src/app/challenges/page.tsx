import './page.css';
import { Header, StatsBar, SuperPromo, LeagueCard, DailyQuests, LessonTimeline } from './components';

export default function Challenges() {
  const lessons = [
    { id: 1, type: 'start', completed: false, current: true, icon: '⭐' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎯' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ];

  return (
    <div className="background-challenges">
      <Header />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Timeline Area */}
        <div className="lg:col-span-2">
          <LessonTimeline lessons={lessons} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <StatsBar />
          <SuperPromo />
          <LeagueCard />
          <DailyQuests />
        </div>
      </div>
    </div>
  );
}
