"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, Globe } from "lucide-react";

// --- Helper Component for the Gold Slide Effect ---
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link 
    href={href} 
    className="relative group overflow-hidden px-4 py-2 inline-block"
  >
    {/* 
        Gold Bar Effect
    */}
    <span className="absolute inset-0 w-full h-full bg-[#D4AF37] transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
    
    {/* The Text */}
    {/* UPDATED: Changed from text-xs to text-sm (14px) */}
    <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 group-hover:text-black transition-colors duration-300">
      {label}
    </span>
  </Link>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 w-full z-50 border-b transition-all duration-500
        ${isScrolled 
          ? 'bg-black border-white/10 py-4 shadow-2xl' 
          : 'bg-black/80 border-white/5 py-8 backdrop-blur-sm'
        }
      `}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative flex justify-between items-center">
        
        {/* 1. Left: Logo */}
        <div className="flex-shrink-0 z-20">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-2 group cursor-pointer">
            <div className="w-3 h-3 bg-[#D4AF37] rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
            OBSIDIAN
          </Link>
        </div>
          
        {/* 2. Center: Desktop Links */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8 z-10">
          <NavLink href="/search?mode=buy" label="Buy" />
          <NavLink href="/sell" label="Sell" />
          <NavLink href="/search?mode=rent" label="Rent" />
          <NavLink href="/agents" label="Agents" />
          <NavLink href="/about" label="About Us" />
          <NavLink href="/contact" label="Contact" />
        </div>

        {/* 3. Right: Actions */}
        <div className="flex items-center gap-8 flex-shrink-0 z-20">
          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] cursor-pointer transition-colors text-white">
             <Globe size={14} /> EN
          </div>
          <div className="flex items-center gap-6 text-white">
             <Search size={20} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
             <Menu size={20} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
          </div>
        </div>
        
      </div>
    </nav>
  );
}