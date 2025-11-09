'use client';

import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Level {
  id: number;
  title: string;
  type: 'info' | 'challenge';
  completed: boolean;
  locked: boolean;
}

export default function DashboardPage() {
  const [levels] = useState<Level[]>([
    { id: 1, title: 'Welcome & Basics', type: 'info', completed: true, locked: false },
    { id: 2, title: 'Cultural Etiquette', type: 'challenge', completed: true, locked: false },
    { id: 3, title: 'Language Essentials', type: 'info', completed: false, locked: false },
    { id: 4, title: 'Campus Life Quiz', type: 'challenge', completed: false, locked: true },
    { id: 5, title: 'Social Norms', type: 'info', completed: false, locked: true },
  ]);

  const completionData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [2, 3],
      backgroundColor: ['#10b981', '#e5e7eb'],
      borderWidth: 0,
    }],
  };

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Challenges Completed',
      data: [2, 5, 8, 12],
      backgroundColor: '#3b82f6',
    }],
  };

  const dailyFact = "Did you know? In Japan, it's customary to bow when greeting someone. The depth of the bow indicates respect level.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white from-0% via-purple-50 via-50% to-purple-100 to-100% p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Learning Journey</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Learning Timeline</h2>
              <div className="space-y-4">
                {levels.map((level) => (
                  <div
                    key={level.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${level.locked
                        ? 'bg-gray-100 border-gray-300 opacity-50'
                        : level.completed
                          ? 'bg-green-50 border-green-500'
                          : 'bg-blue-50 border-blue-500 hover:shadow-md cursor-pointer'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${level.locked ? 'bg-gray-400' : level.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                      <span className="text-white font-bold">{level.id}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{level.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{level.type}</p>
                    </div>
                    {level.locked && <span className="text-gray-500">🔒</span>}
                    {level.completed && <span className="text-green-500">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats and Facts Section */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="mb-6">
                <Doughnut data={completionData} options={{ maintainAspectRatio: true }} />
              </div>
              <div className="mb-4">
                <Bar data={progressData} options={{ maintainAspectRatio: true }} />
              </div>
            </div>

            {/* Daily Fact */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-3">💡 Daily Fact</h2>
              <p className="text-sm leading-relaxed">{dailyFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}