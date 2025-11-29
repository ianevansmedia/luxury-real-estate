import React from "react";
import Image from "next/image";
import { Key } from "lucide-react";

export default function PrivateOffice() {
  return (
    // W-FULL allows the background to stretch to the screen edges
    <div className="w-full border-t border-white/10">
       <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          
          {/* Left: Text Content (Yellow Background - Full Height) */}
          <div className="bg-[#D4AF37] text-black flex flex-col justify-center relative overflow-hidden">
             
             {/* Alignment Wrapper:
                 This pushes the content to align with the global max-w-1600px grid
                 while keeping the background color full width. 
             */}
             <div className="w-full flex justify-end">
                <div className="w-full max-w-[800px] pl-6 md:pl-12 pr-12 py-24">
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] mb-8 opacity-70">
                         <Key size={16}/> Obsidian Private Office
                      </div>
                      <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">
                         The Private <br/> Collection.
                      </h2>
                      <p className="text-lg font-medium opacity-80 mb-12 max-w-md leading-relaxed">
                         Access a hidden tier of real estate. We specialize in discreet, off-market transactions for assets that never appear on the public exchange.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6">
                         <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-2xl">
                            Request Access
                         </button>
                         <button className="border-2 border-black text-black px-8 py-4 font-bold uppercase tracking-wider text-xs hover:bg-black hover:text-white transition-colors">
                            Contact Broker
                         </button>
                      </div>
                   </div>
                </div>
             </div>

             {/* Texture Overlay */}
             <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          </div>
          
          {/* Right: Image (Full Bleed) */}
          <div className="relative h-full min-h-[500px] border-l border-white/10 bg-[#111] group overflow-hidden">
             <Image 
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop" 
                alt="Private" 
                fill 
                className="object-cover grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-1000 scale-105" 
             />
             <div className="absolute inset-0 bg-black/20"></div>
          </div>
       </div>
    </div>
  );
}