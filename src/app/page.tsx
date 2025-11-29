"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Collections from "@/components/Collections";
import PrivateOffice from "@/components/PrivateOffice";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedListings />
      <Collections />
      <PrivateOffice />
      <Footer />
    </main>
  );
}