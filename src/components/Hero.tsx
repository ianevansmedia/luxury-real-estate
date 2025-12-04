"use client";

import React from "react";
import Image from "next/image";
import SearchWidget from "@/components/SearchWidget";

const HERO_IMAGE = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop";

export default function Hero() {
  return (
    // 🟢 Main container: NO overflow-hidden here (lets dropdowns escape)
    <div className="relative w-full min-h-[100vh] flex flex-col justify-center items-center pb-20 pt-32">
      
      {/* 🟢 Background Wrapper: HAS overflow-hidden (crops the image) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={HERO_IMAGE} 
          alt="Hero" 
          fill 
          className="object-cover opacity-90 scale-105 animate-in fade-in duration-[2s]" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505] to-95%"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 mt-8">
        <div className="text-center mb-4">
          <p className="text-[#050505] text-[12px] font-bold uppercase tracking-[0.4em] mb-2 animate-in slide-in-from-bottom-4 duration-700">
            The Authority in Luxury
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight mb-8 animate-in slide-in-from-bottom-8 duration-1000">
            Curators of <br/> the Exceptional.
          </h1>
        </div>

        {/* 🟢 Separated Logic */}
        <SearchWidget />
      </div>
      
      {/* Blend Layer */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none"></div>
    </div>
  );
}