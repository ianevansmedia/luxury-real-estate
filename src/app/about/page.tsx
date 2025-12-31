"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Award, Briefcase, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          alt="About Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 animate-in slide-in-from-bottom-4 duration-700">
            Our Legacy
          </p>
          {/* 🟢 UPDATED: Increased mobile text from 4xl to 5xl */}
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight animate-in slide-in-from-bottom-8 duration-1000 [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">
            Redefining <br /> The Exceptional.
          </h1>
        </div>
      </section>

      {/* --- THE PHILOSOPHY --- */}
      <section className="py-12 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 leading-snug">
                    More than a brokerage. <br/>
                    <span className="text-[#D4AF37] italic">A global authority.</span>
                </h2>
                <div className="space-y-4 md:space-y-6 text-gray-400 text-base md:text-lg leading-relaxed font-light">
                    <p>
                        Founded in 2025, Obsidian was born from a singular vision: to create a real estate firm that treats every transaction as a masterwork. We understood that luxury is not a price point—it is an experience, a level of service, and an attention to detail that borders on obsession.
                    </p>
                    <p>
                        Today, we stand as the bridge between the world's most discerning buyers and its most remarkable properties. From the skylines of New York to the coasts of the Mediterranean, Obsidian is the definitive name in luxury real estate.
                    </p>
                </div>
                
                {/* Typographic Signature */}
                <div className="mt-8 md:mt-12 border-l-2 border-[#D4AF37] pl-6">
                    <div className="font-serif italic text-4xl md:text-5xl text-white/80 tracking-tighter leading-none mb-2">
                       Alexander Vane
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Founder & CEO</p>
                </div>
            </div>
            
            <div className="relative h-[400px] md:h-[600px] border border-white/10 p-2">
                <div className="relative w-full h-full overflow-hidden bg-[#111]">
                    <Image 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
                        alt="Meeting" 
                        fill 
                        className="object-cover transition-all duration-1000 opacity-80 hover:opacity-100"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* --- BY THE NUMBERS --- */}
      <section className="py-12 md:py-24 bg-[#0A0A0A]">
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                {[
                    { label: "Sales Volume", value: "$12B+", icon: Briefcase },
                    { label: "Global Cities", value: "45", icon: Globe },
                    { label: "Years of Excellence", value: "25", icon: Award },
                    { label: "Record Sales", value: "#1", icon: ArrowRight }, 
                ].map((stat, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-center mb-4 md:mb-6">
                            <stat.icon size={24} className="text-[#D4AF37] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-2">{stat.value}</h3>
                        <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- GLOBAL PRESENCE --- */}
      <section className="py-12 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
         <div className="relative h-[400px] md:h-[500px] w-full border border-white/10 overflow-hidden group">
            <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
                alt="Global Map"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-1000"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 md:mb-6 text-white">A Borderless Firm</h2>
                <p className="text-gray-300 max-w-lg mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
                    With offices in Beverly Hills, New York, London, Dubai, and Singapore, our reach extends to every corner of the globe where luxury lives.
                </p>
                <Link 
                    href="/contact" 
                    className="bg-[#D4AF37] text-black px-8 md:px-10 py-3 md:py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors cursor-pointer"
                >
                    Find an Office
                </Link>
            </div>
         </div>
      </section>

      {/* --- TEAM TEASER --- */}
      <section className="py-12 md:py-20 text-center border-t border-white/10">
         <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6 text-white">The Advisors</h2>
         <p className="text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto px-6 text-sm md:text-base">
             Our team is comprised of the most accomplished brokers in the industry.
         </p>
         <Link href="/agents" className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs border-b border-[#D4AF37] pb-1 hover:text-white hover:border-white transition-all cursor-pointer">
             Meet the Team
         </Link>
      </section>

      <Footer />
    </main>
  );
}