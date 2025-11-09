"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import AnimatedContent from "./components/animatedcontent";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div className="gap-8 min-h-screen flex flex-col items-center justify-center ">
      {/* Logo */}
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={true}
        duration={1.1}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.3}
      >
        <div className="h-40 w-auto overflow-hidden">
          <Image
            src="/ImpulsaLogo.png"
            alt="Impulsa Logo"
            width={400}
            height={250}
            className="object-cover"
            priority
          />
        </div>
      </AnimatedContent>

      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        duration={1.1}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.6}
      >
        <div className="max-w-xl text-center">
          <p className="text-gray-700">
            Impulsa helps students and professionals explore opportunities to
            study or work abroad. Choose your destination, stay updated, and
            make your global journey easier!
          </p>
        </div>
      </AnimatedContent>

      {/* Simple button with NO animation wrapper */}
      <div>
        {isSignedIn ? (
          <button
            onClick={() => router.push("/country-selection")}
            className="bg-purple-500 text-white px-8 py-4 rounded-lg transition hover:bg-purple-600 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg transition hover:bg-indigo-600">
              Sign in with Google
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
