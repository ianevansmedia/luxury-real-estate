"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, Globe } from "lucide-react";

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
          ? 'bg-black border-white/10 py-4 shadow-2xl' // Compact & Solid on Scroll
          : 'bg-black/80 border-white/5 py-10 backdrop-blur-sm' // 🟢 Taller (py-10) & Transparent at top
        }
      `}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-12">
          <div className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D4AF37] rotate-45"></div>
            OBSIDIAN
          </div>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 transition-all duration-300">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Buy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Sell</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Agents</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Journal</a>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
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