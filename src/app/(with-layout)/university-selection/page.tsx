"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";

// University data by country
const universitiesByCountry: {
  [key: string]: Array<{ name: string; rank: string; city: string }>;
} = {
  USA: [
    { name: "Harvard University", rank: "#1", city: "Cambridge, MA" },
    { name: "Stanford University", rank: "#2", city: "Stanford, CA" },
    { name: "MIT", rank: "#3", city: "Cambridge, MA" },
    { name: "Yale University", rank: "#4", city: "New Haven, CT" },
    { name: "Princeton University", rank: "#5", city: "Princeton, NJ" },
    { name: "Columbia University", rank: "#6", city: "New York, NY" },
    { name: "University of Chicago", rank: "#7", city: "Chicago, IL" },
    { name: "UC Berkeley", rank: "#8", city: "Berkeley, CA" },
  ],
  UK: [
    { name: "University of Oxford", rank: "#1", city: "Oxford" },
    { name: "University of Cambridge", rank: "#2", city: "Cambridge" },
    { name: "Imperial College London", rank: "#3", city: "London" },
    { name: "UCL", rank: "#4", city: "London" },
    { name: "LSE", rank: "#5", city: "London" },
    { name: "University of Edinburgh", rank: "#6", city: "Edinburgh" },
    { name: "King's College London", rank: "#7", city: "London" },
    { name: "University of Manchester", rank: "#8", city: "Manchester" },
  ],
  Canada: [
    { name: "University of Toronto", rank: "#1", city: "Toronto" },
    { name: "UBC", rank: "#2", city: "Vancouver" },
    { name: "McGill University", rank: "#3", city: "Montreal" },
    { name: "McMaster University", rank: "#4", city: "Hamilton" },
    { name: "University of Alberta", rank: "#5", city: "Edmonton" },
    { name: "University of Waterloo", rank: "#6", city: "Waterloo" },
    { name: "Western University", rank: "#7", city: "London, ON" },
    { name: "Queen's University", rank: "#8", city: "Kingston" },
  ],
  Germany: [
    { name: "TU Munich", rank: "#1", city: "Munich" },
    { name: "LMU Munich", rank: "#2", city: "Munich" },
    { name: "Heidelberg University", rank: "#3", city: "Heidelberg" },
    { name: "Humboldt University", rank: "#4", city: "Berlin" },
    { name: "RWTH Aachen", rank: "#5", city: "Aachen" },
    { name: "University of Freiburg", rank: "#6", city: "Freiburg" },
    { name: "TU Berlin", rank: "#7", city: "Berlin" },
    { name: "University of Bonn", rank: "#8", city: "Bonn" },
  ],
  Australia: [
    { name: "University of Melbourne", rank: "#1", city: "Melbourne" },
    { name: "ANU", rank: "#2", city: "Canberra" },
    { name: "University of Sydney", rank: "#3", city: "Sydney" },
    { name: "UNSW Sydney", rank: "#4", city: "Sydney" },
    { name: "University of Queensland", rank: "#5", city: "Brisbane" },
    { name: "Monash University", rank: "#6", city: "Melbourne" },
    { name: "UWA", rank: "#7", city: "Perth" },
    { name: "University of Adelaide", rank: "#8", city: "Adelaide" },
  ],
  Japan: [
    { name: "University of Tokyo", rank: "#1", city: "Tokyo" },
    { name: "Kyoto University", rank: "#2", city: "Kyoto" },
    { name: "Osaka University", rank: "#3", city: "Osaka" },
    { name: "Tohoku University", rank: "#4", city: "Sendai" },
    { name: "Nagoya University", rank: "#5", city: "Nagoya" },
    { name: "Keio University", rank: "#6", city: "Tokyo" },
    { name: "Waseda University", rank: "#7", city: "Tokyo" },
    { name: "Hokkaido University", rank: "#8", city: "Sapporo" },
  ],
  France: [
    { name: "École Normale Supérieure", rank: "#1", city: "Paris" },
    { name: "École Polytechnique", rank: "#2", city: "Palaiseau" },
    { name: "Sorbonne University", rank: "#3", city: "Paris" },
    { name: "Université PSL", rank: "#4", city: "Paris" },
    { name: "Sciences Po", rank: "#5", city: "Paris" },
    { name: "Université Paris-Saclay", rank: "#6", city: "Paris" },
  ],
  Spain: [
    { name: "University of Barcelona", rank: "#1", city: "Barcelona" },
    { name: "Autonomous University of Madrid", rank: "#2", city: "Madrid" },
    { name: "Complutense University", rank: "#3", city: "Madrid" },
    { name: "University of Valencia", rank: "#4", city: "Valencia" },
    { name: "Pompeu Fabra University", rank: "#5", city: "Barcelona" },
    { name: "IE University", rank: "#6", city: "Madrid" },
  ],
  Italy: [
    { name: "Sapienza University of Rome", rank: "#1", city: "Rome" },
    { name: "University of Bologna", rank: "#2", city: "Bologna" },
    { name: "University of Milan", rank: "#3", city: "Milan" },
    { name: "Politecnico di Milano", rank: "#4", city: "Milan" },
    { name: "University of Padua", rank: "#5", city: "Padua" },
    { name: "University of Florence", rank: "#6", city: "Florence" },
  ],
  "South Korea": [
    { name: "Seoul National University", rank: "#1", city: "Seoul" },
    { name: "KAIST", rank: "#2", city: "Daejeon" },
    { name: "Yonsei University", rank: "#3", city: "Seoul" },
    { name: "Korea University", rank: "#4", city: "Seoul" },
    { name: "Sungkyunkwan University", rank: "#5", city: "Seoul" },
    { name: "POSTECH", rank: "#6", city: "Pohang" },
  ],
  Netherlands: [
    { name: "University of Amsterdam", rank: "#1", city: "Amsterdam" },
    { name: "Delft University of Technology", rank: "#2", city: "Delft" },
    { name: "Utrecht University", rank: "#3", city: "Utrecht" },
    { name: "Leiden University", rank: "#4", city: "Leiden" },
    { name: "Erasmus University", rank: "#5", city: "Rotterdam" },
    { name: "University of Groningen", rank: "#6", city: "Groningen" },
  ],
  // Default for other countries
  Other: [
    { name: "Top University 1", rank: "#1", city: "Capital City" },
    { name: "Top University 2", rank: "#2", city: "Major City" },
    { name: "Top University 3", rank: "#3", city: "University Town" },
    { name: "Top University 4", rank: "#4", city: "Coastal City" },
    { name: "Top University 5", rank: "#5", city: "Business Hub" },
    { name: "Top University 6", rank: "#6", city: "Historic City" },
  ],
};

export default function UniversitySelection() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    null
  );
  const [universities, setUniversities] = useState<
    Array<{ name: string; rank: string; city: string }>
  >([]);

  useEffect(() => {
    // Get selected country from localStorage
    const country = localStorage.getItem("selectedCountry");
    const purposeType = localStorage.getItem("purposeType");

    if (!country || purposeType !== "study") {
      router.push("/country-selection");
      return;
    }

    setSelectedCountry(country);

    // Get universities for this country
    const countryUniversities =
      universitiesByCountry[country] || universitiesByCountry["Other"];
    setUniversities(countryUniversities);
  }, [router]);

  const handleUniversitySelect = (universityName: string) => {
    setSelectedUniversity(universityName);
  };

  const handleContinue = () => {
    if (!selectedUniversity) return;

    localStorage.setItem("selectedUniversity", selectedUniversity);
    // TODO: Navigate to main dashboard/app
    alert(`Great choice! Welcome to ${selectedUniversity}! 🎓`);
    // router.push("/dashboard");
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your University in {selectedCountry} 🎓
          </h1>
          <p className="text-xl text-gray-700">
            Choose from top-ranked universities
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {universities.map((university) => (
            <button
              key={university.name}
              onClick={() => handleUniversitySelect(university.name)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300
                flex flex-col items-start gap-3
                hover:scale-105 hover:shadow-xl
                ${
                  selectedUniversity === university.name
                    ? "border-purple-500 bg-purple-50 shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              {/* Selection checkmark */}
              {selectedUniversity === university.name && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              {/* Rank Badge */}
              <div className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">
                {university.rank}
              </div>

              {/* University name */}
              <h3 className="text-xl font-bold text-gray-900">
                {university.name}
              </h3>

              {/* Location */}
              <p className="text-gray-600 flex items-center gap-2">
                <span>📍</span>
                {university.city}
              </p>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedUniversity}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
              transition-all duration-300
              ${
                selectedUniversity
                  ? "bg-purple-500 hover:bg-purple-600 cursor-pointer shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Continue to Dashboard
          </button>

          <SignOutButton>
            <button className="w-full py-3 px-6 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
