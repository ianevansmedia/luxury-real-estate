"use client";

import React from "react";
import Image from "next/image";
import SearchWidget from "@/components/SearchWidget";

// 💎 MIDNIGHT ESTATE HERO IMAGE
const HERO_IMAGE = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop";

export default function Hero() {
  return (
    // 🟢 UPDATED Z-INDEX: Changed 'z-10' to 'z-40'.
    // This forces the Hero (and its dropdowns) to sit physically ON TOP of the 'Recent Acquisitions' section below.
    <div className="relative w-full min-h-[85vh] flex flex-col justify-start md:justify-center items-center pb-8 pt-40 md:pt-32 bg-[#050505] z-40">
      
      {/* Background Wrapper (Constrains the Image) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-screen">
          <Image 
            src={HERO_IMAGE} 
            alt="Midnight Estate" 
            fill 
            className="object-cover opacity-100 scale-105 animate-in fade-in zoom-in-105 duration-[2000ms]" 
            priority 
          />
          
          {/* 20% Black Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Gradient Blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505] to-95%"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:mt-18">
        <div className="text-center mb-4">
          
          {/* Theme Yellow/Gold */}
          <p className="text-white md:text-[#D4AF37] text-[12px] font-bold uppercase tracking-[0.4em] animate-in slide-in-from-bottom-4 duration-700 [text-shadow:0_4px_12px_rgba(0,0,0,0.9)]">
            The Authority in Luxury
          </p>
          
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight mb-8 animate-in slide-in-from-bottom-8 duration-1000 [text-shadow:0_10px_30px_rgba(0,0,0,0.8)]">
            Curators of <br/> the Exceptional.
          </h1>
        </div>

        {/* Search Widget */}
        <SearchWidget />
      </div>
      
      {/* Blend Layer */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}