import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inpulsa",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* ClerkProvider requires a client component */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

// Wrap the children in a client component so hooks work
function ClientWrapper({ children }: { children: React.ReactNode }) {
  "use client";
  return <ClerkProvider>{children}</ClerkProvider>;
}
