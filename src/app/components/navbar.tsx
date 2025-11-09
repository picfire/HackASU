"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div
      className="navbar px-4 py-2 flex justify-between items-center"
      style={{
        background:
          "radial-gradient(circle, #b778e0 50%, #9454BF 75%, #9454BF 100%)",
      }}
    >
      {/* Left side: links */}
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white"
          onClick={() => router.push("/")}
        >
          Home
        </button>

        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white"
          onClick={() => router.push("/about")}
        >
          About
        </button>

        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white"
          onClick={() => router.push("/forum")}
        >
          Forum
        </button>

        {isSignedIn && (
          <button
            className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white"
            onClick={() => router.push("/country-selection")}
          >
            Get Started
          </button>
        )}

        {isSignedIn && (
          <button
            className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white"
            onClick={() => router.push("/challenges")}
          >
            Challenges
          </button>
        )}
      </div>

      {/* Middle: logo with half circle background */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "white",
          borderRadius: "50px 50px 0 0",
          overflow: "hidden",
        }}
      >
        <Image src="/Impulsa.svg" alt="Impulsa Logo" width={80} height={80} />
      </div>

      {/* Right side: sign out */}
      <div>
        {isSignedIn && (
          <SignOutButton>
            <button className="px-4 py-2 text-lg font-semibold rounded-lg border-2 border-transparent hover:border-white hover:border-opacity-75 transition-all duration-500 text-white">
              Sign Out
            </button>
          </SignOutButton>
        )}
      </div>
    </div>
  );
}
