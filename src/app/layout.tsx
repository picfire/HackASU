// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inpulsa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* Navigation Bar */}
        <div className="navbar bg-white shadow-sm">
          <a className="btn btn-ghost text-xl">Inpulsa</a>
        </div>

        {/* Page Layout */}
        <body className="antialiased" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

export function ClerkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Client wrapper here */}
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
