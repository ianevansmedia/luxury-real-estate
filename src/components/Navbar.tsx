"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react"; 
import { useSaved } from "@/context/SavedContext"; 

// --- Helper Component for the Gold Slide Effect ---
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link 
    href={href} 
    className="relative group overflow-hidden px-4 py-2 inline-block"
  >
    <span className="absolute inset-0 w-full h-full bg-[#D4AF37] transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
    <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 group-hover:text-black transition-colors duration-300">
      {label}
    </span>
  </Link>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
  // Get Saved Count
  const { savedIds } = useSaved();
  const [mounted, setMounted] = useState(false); 
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavClasses = () => {
    if (isScrolled) {
      return 'bg-black/90 border-[#D4AF37]/60 py-4 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] backdrop-blur-md';
    }
    if (isHomepage) {
      return 'bg-transparent border-white/5 py-8 backdrop-blur-sm shadow-none';
    }
    return 'bg-black/50 border-[#D4AF37]/60 py-8 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] backdrop-blur-md';
  };

  return (
    <nav 
      className={`
        fixed top-0 w-full z-50 border-b transition-all duration-500
        ${getNavClasses()}
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

        {/* 3. Right: Saved Properties Counter */}
        <div className="flex-shrink-0 z-20 flex justify-end w-[140px]">
           {mounted && (
             <Link href="/saved" className="flex items-center gap-3 group cursor-pointer">
                
                {/* Text: White -> Gold on hover */}
                <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
                    Saved
                </span>
                
                {/* Icon: White -> Gold on hover */}
                <div className="relative">
                    <Heart size={22} className="text-white group-hover:text-[#D4AF37] transition-colors" />
                    {savedIds.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                            {savedIds.length}
                        </span>
                    )}
                </div>
             </Link>
           )}
        </div>
        
      </div>
    </nav>
  );
}