"use client";

import { useState, useEffect } from "react";

interface SurveyData {
  destination: string;
  university: string;
  studyField: string;
}

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

export function Survey({ onComplete }: SurveyProps) {
  const [formData, setFormData] = useState<SurveyData>({
    destination: "",
    university: "",
    studyField: "",
  });

  useEffect(() => {
    // Get country and university from localStorage
    const country = localStorage.getItem("selectedCountry") || "";
    const university = localStorage.getItem("selectedUniversity") || "";

    setFormData((prev) => ({
      ...prev,
      destination: country,
      university: university,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination && formData.university && formData.studyField) {
      // Save questions to localStorage while loading
      localStorage.setItem("loadingQuestions", "true");
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#613873] mb-2">Impulsa</h1>
        <p className="text-gray-600 mb-6">
          Let's personalize your learning experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination Country
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What's your field of study?
            </label>
            <input
              type="text"
              name="studyField"
              value={formData.studyField}
              onChange={handleChange}
              placeholder="e.g., Computer Science, Business, Medicine"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#613873] hover:bg-[#7a4a8f] text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}
