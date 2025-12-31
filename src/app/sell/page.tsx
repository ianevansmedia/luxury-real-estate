"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, TrendingUp, Users, Globe, ShieldCheck } from "lucide-react";

export default function SellPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center px-6 mt-20">
         <div className="absolute inset-0 z-0">
            <Image 
               src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop" 
               alt="Sell Hero" 
               fill 
               className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-[#050505]"></div>
         </div>

         <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Global Advisory</p>
            <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
               Unlock the <br/> <span className="italic text-gray-400">Value.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
               We specialize in the sale of significant architectural and historic properties to a global audience.
            </p>
         </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      {/* 🟢 FIXED: Reduced pt-12 (Mobile) vs pt-24 (Desktop) */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12 pb-12 md:pt-24 md:pb-24">
         
         {/* 🟢 FIXED: Reduced gap-12 (Mobile) vs gap-24 (Desktop) */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* LEFT: Market Data & Pitch */}
            <div>
               <h2 className="text-3xl md:text-5xl font-serif mb-8">Why List with Obsidian?</h2>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="border border-white/10 p-6 bg-white/5">
                     <TrendingUp className="text-[#D4AF37] mb-4" size={24} />
                     <h3 className="text-2xl font-bold mb-1">$4.2B</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Total Sales Volume</p>
                  </div>
                  <div className="border border-white/10 p-6 bg-white/5">
                     <Users className="text-[#D4AF37] mb-4" size={24} />
                     <h3 className="text-2xl font-bold mb-1">85k+</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Active Investors</p>
                  </div>
                  <div className="border border-white/10 p-6 bg-white/5">
                     <Globe className="text-[#D4AF37] mb-4" size={24} />
                     <h3 className="text-2xl font-bold mb-1">42</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Countries Reached</p>
                  </div>
                  <div className="border border-white/10 p-6 bg-white/5">
                     <ShieldCheck className="text-[#D4AF37] mb-4" size={24} />
                     <h3 className="text-2xl font-bold mb-1">100%</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Discretion</p>
                  </div>
               </div>

               <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                  <p>
                     Selling a luxury property requires more than just a listing on the MLS. It requires a narrative, a strategy, and a global network.
                  </p>
                  <p>
                     Our "Private Office" division ensures that your asset is presented to the right people, often before it ever hits the open market.
                  </p>
               </div>
            </div>

            {/* RIGHT: Consultation Form */}
            <div className="bg-[#111] border border-white/10 p-8 md:p-12 h-fit sticky top-32">
               <h3 className="text-2xl font-serif mb-2 text-white">Request Consultation</h3>
               <p className="text-gray-500 text-sm mb-8">Receive a confidential valuation of your property.</p>

               <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">First Name</label>
                        <input className="w-full bg-black border border-white/20 p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Last Name</label>
                        <input className="w-full bg-black border border-white/20 p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Email Address</label>
                     <input type="email" className="w-full bg-black border border-white/20 p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Property Address</label>
                     <input className="w-full bg-black border border-white/20 p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Message (Optional)</label>
                     <textarea rows={4} className="w-full bg-black border border-white/20 p-3 text-sm text-white outline-none focus:border-[#D4AF37] resize-none"></textarea>
                  </div>

                  <button className="w-full bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 mt-4">
                     Submit Inquiry <ArrowRight size={14}/>
                  </button>
               </form>
            </div>

         </div>
      </div>

      <Footer />
    </main>
  );
}