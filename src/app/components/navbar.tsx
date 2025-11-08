// src/components/Navbar.tsx
"use client"; // client component needed for hooks

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return null; // wait for Clerk to load

  return (
    <div className="navbar bg-white shadow-sm px-4 py-2 flex justify-between items-center">
      <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
        Home
      </a>

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
              <button className="btn btn-error">Sign Out</button>
            </SignOutButton>
          </>
        )}
      </div>
    </div>
  );
}
