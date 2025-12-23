"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react";
import { createClient } from "@/lib/supabase/client"; 
import SaveButton from "@/components/SaveButton";

export default function FeaturedListings() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(6)
        .order('id', { ascending: true });
      
      if (data) setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    // 🟢 UPDATED: Added pt-16 for Mobile (Spacing), kept pt-0 for Desktop
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 md:pt-0 pb-24">
       
       {/* Section Header */}
       {/* 🟢 UPDATED: Changed items-end to items-start md:items-end to fix mobile alignment */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
             <h2 className="text-4xl font-serif text-white mb-2">Recent Acquisitions</h2>
             <p className="text-gray-500 text-sm">Hand-picked properties by our senior partners.</p>
          </div>
          <Link href="/search" className="mt-6 md:mt-0 flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
             View All Listings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
       </div>

       {/* Loading State */}
       {loading && <div className="text-center text-gray-500 py-20">Loading Vault...</div>}

       {/* Listings Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {properties.map((p) => (
             <div key={p.id} className="group relative">
                
                {/* Save Button (Floating) */}
                <div className="absolute top-4 right-4 z-30">
                   <SaveButton propertyId={p.id} />
                </div>

                {/* Clickable Card Area */}
                <Link href={`/property/${p.id}`} className="block cursor-pointer">
                   {/* Image Card */}
                   <div className="relative h-[450px] mb-6 overflow-hidden border border-white/10 p-1 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                      <div className="relative w-full h-full overflow-hidden bg-[#111]">
                         <Image 
                            src={p.image_url} 
                            alt={p.title} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                         />
                         
                         {/* Tags */}
                         <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10">
                               {p.tag || 'Exclusive'}
                            </span>
                         </div>

                         {/* Price Overlay */}
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-[#D4AF37] font-serif text-2xl italic">{p.price}</p>
                         </div>
                      </div>
                   </div>

                   {/* Info */}
                   <div className="flex justify-between items-start px-2">
                      <div>
                         <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                         <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <MapPin size={12} /> {p.location}
                         </div>
                      </div>
                      <div className="text-right flex gap-4 text-xs font-mono text-gray-400 pt-1">
                         <span className="flex items-center gap-1"><Bed size={14} /> {p.beds}</span>
                         <span className="flex items-center gap-1"><Square size={14} /> {p.sqft}</span>
                      </div>
                   </div>
                </Link>
             </div>
          ))}
       </div>
    </div>
  );
}