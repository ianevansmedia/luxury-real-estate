import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// 🟢 Import the Provider
import { SavedProvider } from "@/context/SavedContext"; 

// ... fonts and metadata ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="...">
        {/* 🟢 Wrap children in SavedProvider */}
        <SavedProvider>
          {children}
        </SavedProvider>
      </body>
    </html>
  );
}