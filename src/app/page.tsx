"use client";

import { SignInButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // Wait until Clerk finishes loading

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      {/* Centered logo */}
      <img src="/Impulsa.svg" alt="Impulsa Logo" className="w-300 h-300" />

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
