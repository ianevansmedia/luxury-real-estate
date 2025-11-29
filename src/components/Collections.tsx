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
                <div key={cat.title} className="relative h-[400px] group cursor-pointer overflow-hidden border border-white/10">
                   <Image 
                      src={cat.image} 
                      alt={cat.title} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                   <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                      <h3 className="text-2xl font-serif italic text-white mb-2">{cat.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37] px-3 py-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
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