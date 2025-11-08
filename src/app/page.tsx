"use client";

import { SignInButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // Wait until Clerk finishes loading

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 gap-8">
      {/* Logo */}
      <img src="/Impulsa.svg" alt="Impulsa Logo" className="w-200 h-200" />

      {/* Intro Text */}
      <div className="max-w-xl text-center">
        <p className="text-gray-700 text-lg">
          Impulsa helps students and professionals explore opportunities to
          study or work abroad. Choose your destination, stay updated, and make
          your global journey easier!
        </p>
      </div>

      {/* Sign in button */}
      {!isSignedIn && (
        <SignInButton mode="modal">
          <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition">
            Sign in with Google
          </button>
        </SignInButton>
      )}
    </div>
  );
}
