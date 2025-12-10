"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSaved } from "@/context/SavedContext"; // 🟢 Get IDs from Local Storage
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyImage from "@/components/PropertyImage";
import SaveButton from "@/components/SaveButton";
import { MapPin, Bed, Bath, Square, ArrowLeft, HeartOff } from "lucide-react";

export default function SavedPage() {
  const { savedIds } = useSaved();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchSavedProperties = async () => {
      setLoading(true);

      if (savedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      // Fetch only the properties that match the saved IDs
      const { data } = await supabase
        .from('properties')
        .select('*')
        .in('id', savedIds);

      if (data) {
        setProperties(data);
      }
      setLoading(false);
    };

    fetchSavedProperties();
  }, [savedIds]); // Re-run if savedIds change (e.g. user un-saves something)

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-40 pb-20 relative z-0">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <Link href="/" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <ArrowLeft size={14} /> Back Home
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end">
             <div>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
                   Personal Portfolio
                </p>
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
                  Saved Properties
                </h1>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-4">
                   {properties.length} {properties.length === 1 ? 'Residence' : 'Residences'} Saved
                </p>
             </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                      <div className="h-[400px] bg-white/5 w-full mb-6 border border-white/5 rounded-sm"></div>
                      <div className="h-8 bg-white/10 w-3/4 mb-4 rounded"></div>
                      <div className="h-4 bg-white/5 w-1/2 rounded"></div>
                  </div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
            <HeartOff size={48} className="mx-auto text-gray-600 mb-6" />
            <h3 className="text-2xl font-serif text-white mb-2">Your collection is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
               Start curating your personal portfolio by saving properties you love.
            </p>
            <Link href="/search" className="bg-[#D4AF37] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors cursor-pointer">
               Browse Properties
            </Link>
          </div>
        )}

        {/* Grid */}
        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {properties.map((p) => (
              <Link 
                  href={`/property/${p.id}`} 
                  key={p.id} 
                  className="group cursor-pointer block w-full h-full"
              >
                  <div className="relative h-[400px] mb-6 overflow-hidden border border-white/10 p-1 group-hover:border-[#D4AF37] transition-colors">
                    <div className="relative w-full h-full overflow-hidden bg-[#111]">
                        <PropertyImage 
                            src={p.image_url} 
                            alt={p.title}
                            category={p.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" 
                        />
                        
                        {/* 🟢 Save Button (Clicking this on Saved Page removes it instantly) */}
                        <div className="absolute top-4 right-4 z-30">
                            <SaveButton propertyId={p.id} />
                        </div>

                        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 text-[#D4AF37] font-serif text-xl border border-white/10 shadow-xl">
                            {p.price}
                        </div>
                        
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase px-2 py-1">
                            {p.tag || 'Exclusive'}
                        </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-1 text-white group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 truncate">
                        <MapPin size={12} /> {p.location}
                    </div>
                    <div className="flex gap-6 text-xs font-mono text-gray-400 border-t border-white/10 pt-3">
                        <span className="flex items-center gap-1"><Bed size={14} /> {p.beds}</span>
                        <span className="flex items-center gap-1"><Bath size={14} /> {p.baths}</span>
                        <span className="flex items-center gap-1"><Square size={14} /> {p.sqft}</span>
                    </div>
                  </div>
              </Link>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}