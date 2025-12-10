"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Shield, Camera, TrendingUp, ArrowRight } from "lucide-react";

export default function SellPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
          alt="Sell Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6 animate-in slide-in-from-bottom-4 duration-700">
            List With Authority
          </p>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight animate-in slide-in-from-bottom-8 duration-1000 [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">
            Maximize Your <br /> Asset's Value.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            We don't just list homes; we curate narratives. Leveraging a global network of high-net-worth individuals to find the perfect buyer for your exceptional residence.
          </p>
          <button 
            onClick={() => document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' })}
            // UPDATED: Added cursor-pointer
            className="bg-[#D4AF37] text-black px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            Request Valuation
          </button>
        </div>
      </section>

      {/* --- THE ADVANTAGE GRID --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
                { icon: Globe, title: "Global Reach", text: "Exposure to buyers in over 70 countries through our exclusive international partnerships." },
                { icon: Shield, title: "Private Office", text: "Discreet marketing channels for sellers who value privacy above all else." },
                { icon: Camera, title: "Cinematic Media", text: "Award-winning photography and film production that captures the soul of your property." },
                { icon: TrendingUp, title: "Market Data", text: "Precise valuation models backed by real-time data and decades of local expertise." }
            ].map((item, i) => (
                <div key={i} className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-500 rounded-sm">
                    <item.icon size={32} className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500"/>
                    <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- VALUATION FORM SECTION --- */}
      <section id="valuation-form" className="py-32 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Text */}
            <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-6">Request a Private <br/> <span className="text-[#D4AF37] italic">Consultation</span></h2>
                <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
                    Complete the form to schedule a confidential valuation of your property. Our senior brokers will analyze current market trends to provide a precise estimation.
                </p>
                
                <div className="flex flex-col gap-8 border-t border-white/10 pt-12">
                    <div>
                        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">Direct Line</p>
                        <p className="text-2xl font-serif">+1 (800) 555-0123</p>
                    </div>
                    <div>
                        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">Global Headquarters</p>
                        <p className="text-xl text-gray-300">1200 Pacific Coast Hwy, <br/> Beverly Hills, CA 90210</p>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <form className="bg-[#111] p-10 md:p-14 border border-white/10 shadow-2xl relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">First Name</label>
                            <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Last Name</label>
                            <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Email Address</label>
                        <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Property Address</label>
                        <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="123 Luxury Lane, Beverly Hills" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Details (Optional)</label>
                        <textarea className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors h-24 resize-none" placeholder="Tell us about your property..." />
                    </div>

                    {/* UPDATED: Added cursor-pointer */}
                    <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-5 hover:bg-[#D4AF37] transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer">
                        Submit Inquiry <ArrowRight size={14} />
                    </button>
                </div>
            </form>

        </div>
      </section>

      <Footer />
    </main>
  );
}