"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div className="navbar bg-transparent px-4 py-2 flex justify-between items-center">
      {/* Left side: logo + links */}
      <div className="flex items-center gap-4">
        <Image src="/Impulsa.svg" alt="Impulsa Logo" width={80} height={80} />

        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-black transition-all duration-500"
          onClick={() => router.push("/")}
        >
          Home
        </button>

        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-black transition-all duration-500"
          onClick={() => router.push("/about")}
        >
          About
        </button>

        {isSignedIn && (
          <button
            className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-black transition-all duration-500"
            onClick={() => router.push("/country-selection")}
          >
            Get Started
          </button>
        )}
      </div>

      {/* Right side: sign out */}
      <div>
        {isSignedIn && (
          <SignOutButton>
            <button className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-black transition-all duration-500">
              Sign Out
            </button>
          </SignOutButton>
        )}
      </div>
    </div>
  );
}
