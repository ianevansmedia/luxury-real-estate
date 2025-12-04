"use client";

import React from "react";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function Collections() {
  return (
    <div className="bg-[#0A0A0A] py-32 border-t border-white/10">
       <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif mb-16 text-center text-white">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {categories.map((cat) => (
                <div key={cat.title} className="relative h-[400px] group cursor-pointer overflow-hidden border border-white/10 rounded-sm">
                   
                   {/* Image: Full Color, Zoom on Hover */}
                   <Image 
                      src={cat.image} 
                      alt={cat.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   
                   {/* Permanent Gradient Overlay (Bottom Up) for text visibility */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
                   
                   {/* Content: Centered at bottom */}
                   <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 z-10">
                      <h3 className="text-3xl font-serif italic text-white mb-4 tracking-wide group-hover:text-[#D4AF37] transition-colors">{cat.title}</h3>
                      
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all">
                         {cat.count} Listings
                      </span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}