"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/country-selection"); // redirects to your country selection page
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Inpulsa</h1>

        {isSignedIn ? (
          <div className="flex flex-col gap-4">
            <p className="text-gray-700">
              Signed in as{" "}
              <strong>{user?.emailAddresses[0].emailAddress}</strong>
            </p>
            <SignOutButton>
              <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition">
              Sign in with Google
            </button>
          </SignInButton>
        )}
      </main>
    </div>
  );
}
