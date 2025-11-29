import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Load luxury fonts
const sans = Inter({ subsets: ["latin"], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Obsidian | Global Luxury Real Estate",
  description: "Exclusive properties for the discerning buyer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${sans.variable} ${serif.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}