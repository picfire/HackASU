import { Titillium_Web } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/navbar";
import ClaudeChat from "./components/claude-chat";

const titillium = Titillium_Web({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impulsa",
  description: "Impulsa is an innovative platform designed to help students and professionals adapt to studying or working abroad. We understand that moving to a new country brings excitement and challenges especially culture shock. Our mission is to turn that initial confusion into confident cultural understanding.",
  icons: {
    icon: "/favicon.png",
  }
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
          <Navbar />
          <main>{children}</main>
          <ClaudeChat /> {/* Floating chat button on all pages */}
        </body>
      </html>
    </ClerkProvider>
  );
}
