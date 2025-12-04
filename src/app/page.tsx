"use client";

import React from "react";
// Import all your custom components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Collections from "@/components/Collections";
import PrivateOffice from "@/components/PrivateOffice";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Search Section */}
      <Hero />

      {/* 3. Listings Grid (With Save Button inside) */}
      <FeaturedListings />

      {/* 4. Collections (Lifestyle Grid) */}
      <Collections />

      {/* 5. Private Office (Membership CTA) */}
      <PrivateOffice />

      {/* 6. Footer */}
      <Footer />

    </main>
  );
}