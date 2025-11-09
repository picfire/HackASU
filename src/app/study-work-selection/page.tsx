"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function StudyWorkSelection() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry");
    if (!country) {
      router.push("/country-selection");
      return;
    }
    setSelectedCountry(country);
  }, [router]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    if (selectedOption === "study") {
      localStorage.setItem("purposeType", "study");
      router.push("/university-selection");
    } else {
      alert("Work feature coming soon! 🚀");
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to {selectedCountry}!
          </h1>
          <p className="text-xl text-gray-700">
            Are you planning to study or work in {selectedCountry}?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <button
            onClick={() => handleOptionSelect("study")}
            className={`
              relative p-8 rounded-2xl border-2 transition-all duration-300
              flex flex-col items-center justify-center gap-4
              hover:scale-105 hover:shadow-2xl
              ${
                selectedOption === "study"
                  ? "border-indigo-500 bg-indigo-50 shadow-xl scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            {selectedOption === "study" && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
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
            <div className="text-7xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900">Study</h3>
            <p className="text-gray-600 text-center">
              Explore universities and academic programs
            </p>
          </button>

          <button
            onClick={() => handleOptionSelect("work")}
            className={`
              relative p-8 rounded-2xl border-2 transition-all duration-300
              flex flex-col items-center justify-center gap-4
              hover:scale-105 hover:shadow-2xl
              ${
                selectedOption === "work"
                  ? "border-purple-500 bg-purple-50 shadow-xl scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            {selectedOption === "work" && (
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
            <div className="text-7xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-gray-900">Work</h3>
            <p className="text-gray-600 text-center">
              Find job opportunities and work visas
            </p>
            <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
            transition-all duration-300
            ${
              selectedOption
                ? "bg-indigo-500 hover:bg-indigo-600 cursor-pointer shadow-lg hover:shadow-xl"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
