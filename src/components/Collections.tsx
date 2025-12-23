"use client";

import React from "react";
import Link from "next/link";
// UPDATED: Import custom PropertyImage for smart fallbacks
import PropertyImage from "@/components/PropertyImage";

// 💎 Data: Matching the types used in your SearchWidget
const COLLECTIONS = [
  { 
    title: "Penthouse", 
    count: 12, 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    title: "Estate", 
    count: 8, 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    title: "Modern", 
    count: 15, 
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    // 🟢 UPDATED: Changed 'Alpine' to 'Villa'
    title: "Villa", 
    count: 6, 
    // Updated image to a Coastal Villa
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop" 
  },
];

export default function Collections() {
  return (
    // 🟢 UPDATED: Changed py-32 to py-16 md:py-32 to tighten mobile spacing
    <div className="bg-[#0A0A0A] py-16 md:py-32 border-t border-white/10">
       <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* 🟢 UPDATED: Changed mb-16 to mb-10 md:mb-16 */}
          <h2 className="text-3xl font-serif mb-10 md:mb-16 text-center text-white">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {COLLECTIONS.map((cat) => (
                <Link 
                  key={cat.title} 
                  // 🟢 UPDATED: Navigate to Search Page with Type Filter
                  href={`/search?type=${cat.title}`}
                  className="relative h-[400px] group cursor-pointer overflow-hidden border border-white/10 rounded-sm block"
                >
                   
                   {/* Image: Full Color, Zoom on Hover */}
                   {/* 🟢 UPDATED: Used PropertyImage for safety */}
                   <PropertyImage 
                      src={cat.image} 
                      alt={cat.title} 
                      category={cat.title}
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   
                   {/* Permanent Gradient Overlay (Bottom Up) for text visibility */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
                   
                   {/* Content: Centered at bottom */}
                   <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 z-10">
                      <h3 className="text-3xl font-serif italic text-white mb-4 tracking-wide group-hover:text-[#D4AF37] transition-colors">
                        {cat.title}
                      </h3>
                      
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all">
                         View Listings
                      </span>
                   </div>
                </Link>
             ))}
          </div>
       </div>
    </div>
  );
}