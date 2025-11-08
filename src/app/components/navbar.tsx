"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div className="navbar bg-white shadow-sm px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
          Home
        </a>
      </div>

      <div className="flex gap-4 items-center">
        {isSignedIn && (
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
        )}
      </div>
    </div>
  );
}
