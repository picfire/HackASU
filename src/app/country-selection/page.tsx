"use client";

import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function CountrySelection() {
  const { user } = useUser();
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return;

    // Save selection for now
    localStorage.setItem("selectedCountry", country);
    alert(`You selected ${country}!`);
  };

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "Australia",
    "Japan",
    "France",
    "Other",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="bg-white rounded-lg shadow-md p-8 w-96 text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">Welcome {user?.firstName}!</h1>
        <p className="mb-6">Select the country you want to study/work in:</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="p-2 border rounded focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
          >
            Continue
          </button>
        </form>

        {/* Sign Out Button at the bottom */}
        <SignOutButton>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition mt-4">
            Sign Out
          </button>
        </SignOutButton>
      </main>
    </div>
  );
}
