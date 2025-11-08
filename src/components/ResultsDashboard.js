import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { generateFinalReport } from '../services/claudeService';

const ResultsDashboard = ({ userProfile, assessmentResults }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const generatedReport = await generateFinalReport(
        userProfile,
        assessmentResults.scores,
        assessmentResults.conversationHistory
      );
      setReport(generatedReport);
      setLoading(false);
    } catch (error) {
      console.error('Error generating report:', error);
      setLoading(false);
    }
  };

  const radarData = Object.entries(assessmentResults.scores).map(([domain, score]) => ({
    domain: domain.replace(' & ', ' &\n'),
    score: Math.round(score),
    fullMark: 100
  }));

  const barData = Object.entries(assessmentResults.scores).map(([domain, score]) => ({
    name: domain,
    score: Math.round(score)
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Generating your personalized learning path...</p>
        </div>
      </div>
    );
  }

  const averageScore = Math.round(
    Object.values(assessmentResults.scores).reduce((a, b) => a + b, 0) / 
    Object.values(assessmentResults.scores).length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Assessment Complete!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Here's your personalized cultural knowledge report
            </p>
            <div className="inline-block bg-blue-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Overall Cultural Readiness</p>
              <p className="text-5xl font-bold text-primary">{averageScore}%</p>
            </div>
          </div>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Radar Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Knowledge Profile</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Your Score" dataKey="score" stroke="#2E86AB" fill="#2E86AB" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Domain Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#2E86AB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Areas */}
        {report && report.priorities && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Priority Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {report.priorities.slice(0, 3).map((priority, index) => (
                <div key={index} className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Priority #{index + 1}
                    </span>
                    <span className="text-2xl font-bold text-red-600">{priority.score}%</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{priority.domain}</h3>
                  <p className="text-gray-600 text-sm">{priority.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {report && report.recommendations && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Recommendations</h2>
            <div className="space-y-6">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{rec.domain}</h3>
                  <ul className="space-y-2">
                    {rec.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {report && report.timeline && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Learning Timeline</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-3">
                    Before Arrival
                  </span>
                </h3>
                <ul className="space-y-2">
                  {report.timeline.beforeArrival.map((task, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-yellow-500 mr-2">□</span>
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-3">
                    Week 1
                  </span>
                </h3>
                <ul className="space-y-2">
                  {report.timeline.week1.map((task, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-orange-500 mr-2">□</span>
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">
                    Month 1
                  </span>
                </h3>
                <ul className="space-y-2">
                  {report.timeline.month1.map((task, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">□</span>
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
