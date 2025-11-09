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
        <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
          Home
        </a>

        {/* Move Country Selection next to Home */}
        {isSignedIn && (
          <button
            className="btn btn-outline"
            onClick={() => router.push("/country-selection")}
          >
            Country Selection
          </button>
        )}
      </div>

      {/* Right side: sign out */}
      <div>
        {isSignedIn && (
<<<<<<< HEAD
          <SignOutButton>
            <button className="btn btn-error">Sign Out</button>
          </SignOutButton>
=======
          <>
            <button
              className="btn btn-outline"
              onClick={() => router.push("/country-selection")}
            >
              Country Selection
            </button>
            <SignOutButton>
              <button className="btn btn-outline">Sign Out</button>
            </SignOutButton>
          </>
>>>>>>> 7b4ecca2c38470cc4b9f3551e6d4ef42d93cd293
        )}
      </div>
    </div>
  );
}
