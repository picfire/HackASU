import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    homeCountry: '',
    destinationCountry: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(val => val.trim() !== '')) {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">
            CultureBridge Navigator
          </h1>
          <p className="text-gray-600 text-lg">
            Adaptive Cultural Assessment Platform
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              This assessment will evaluate your cultural knowledge and provide personalized resources to help you succeed in your new environment.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Home Country
            </label>
            <input
              type="text"
              name="homeCountry"
              value={formData.homeCountry}
              onChange={handleChange}
              placeholder="e.g., China, India, Brazil"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination Country
            </label>
            <input
              type="text"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleChange}
              placeholder="e.g., United States, United Kingdom"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              University
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="e.g., Stanford University, MIT"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Degree Level
            </label>
            <select
              name="degreeLevel"
              value={formData.degreeLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              required
            >
              <option value="">Select degree level</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate (Master's)">Graduate (Master's)</option>
              <option value="Graduate (PhD)">Graduate (PhD)</option>
              <option value="Exchange/Visiting">Exchange/Visiting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Field of Study
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g., Computer Science, Business, Engineering"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Start Assessment
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Assessment Duration: ~10-15 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
