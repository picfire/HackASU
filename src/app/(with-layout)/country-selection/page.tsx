"use client";

import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Country data with flag emojis
const countries = [
  { name: "USA", flag: "🇺🇸", info: "Popular destination" },
  { name: "Canada", flag: "🇨🇦", info: "Growing choice" },
  { name: "UK", flag: "🇬🇧", info: "Historic favorite" },
  { name: "Germany", flag: "🇩🇪", info: "Top EU choice" },
  { name: "Australia", flag: "🇦🇺", info: "Rising star" },
  { name: "Japan", flag: "🇯🇵", info: "Cultural hub" },
  { name: "France", flag: "🇫🇷", info: "Classic choice" },
  { name: "Spain", flag: "🇪🇸", info: "Vibrant culture" },
  { name: "Italy", flag: "🇮🇹", info: "Art & history" },
  { name: "South Korea", flag: "🇰🇷", info: "Tech leader" },
  { name: "Netherlands", flag: "🇳🇱", info: "Progressive" },
  { name: "India", flag: "🇮🇳", info: "Best country" },
  { name: "Other", flag: "🌍", info: "Other destination" },
];

export default function CountrySelection() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
  };

  const handleContinue = () => {
    if (!selectedCountry) return;

    localStorage.setItem("selectedCountry", selectedCountry);
    alert(`You selected ${selectedCountry}! Ready to explore.`);
    // TODO: Navigate to dashboard
    // router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome {user?.firstName}!
          </h1>
          <p className="text-xl text-gray-700">
            Select the country you want to study/work in:
          </p>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => handleCountrySelect(country.name)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-200
                flex flex-col items-center justify-center gap-3
                hover:scale-105 hover:shadow-xl
                ${
                  selectedCountry === country.name
                    ? "border-teal-500 bg-teal-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              {/* Selection checkmark */}
              {selectedCountry === country.name && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
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

              {/* Flag */}
              <div className="text-6xl mb-2">{country.flag}</div>

              {/* Country name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {country.name}
              </h3>

              {/* Info */}
              <p className="text-sm text-gray-600">{country.info}</p>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedCountry}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
              transition-all duration-200
              ${
                selectedCountry
                  ? "bg-teal-500 hover:bg-teal-600 cursor-pointer shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Continue
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
