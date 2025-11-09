// src/app/layout.tsx
import { Titillium_Web } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/navbar";

const titillium = Titillium_Web({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impulsa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={titillium.className}>
        <body className="antialiased" suppressHydrationWarning>
          <Navbar /> {/* ← Add this line */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
