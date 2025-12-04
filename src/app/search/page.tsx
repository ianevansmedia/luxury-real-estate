"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PropertyImage from "@/components/PropertyImage";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Bed, Bath, Square, ArrowLeft, SearchX } from "lucide-react";

export default function SearchPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center text-[#D4AF37]">Loading...</div>}>
        <SearchResultsContent />
      </Suspense>
      <Footer />
    </main>
  );
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  
  // 1. Get Params
  const mode = searchParams.get("mode") || "buy"; 
  const rawLocation = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const beds = searchParams.get("beds") || "";
  const baths = searchParams.get("baths") || "";

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      let queryBuilder = supabase.from('properties').select('*');

      // ---------------------------------------------------------
      // 🟢 MODE FILTERING
      // ---------------------------------------------------------
      if (mode === 'rent') {
        queryBuilder = queryBuilder.eq('status', 'for_rent');
      } 
      else if (mode === 'sold') {
        queryBuilder = queryBuilder.eq('status', 'sold');
      } 
      else {
        // Default (Buy) -> Show ONLY 'for_sale'
        queryBuilder = queryBuilder.eq('status', 'for_sale');
      } 

      // Location Filter
      if (rawLocation) {
        const cleanLoc = rawLocation.includes(',') ? rawLocation.split(',')[0].trim() : rawLocation;
        queryBuilder = queryBuilder.or(`title.ilike.%${cleanLoc}%,location.ilike.%${cleanLoc}%,tag.ilike.%${cleanLoc}%`);
      }

      // Other Filters
      if (type) queryBuilder = queryBuilder.eq('type', type);
      if (beds && !isNaN(parseInt(beds))) queryBuilder = queryBuilder.gte('beds', parseInt(beds));
      if (baths && !isNaN(parseInt(baths))) queryBuilder = queryBuilder.gte('baths', parseInt(baths));
      
      const { data, error } = await queryBuilder;

      if (data) {
        let filteredData = data;
        // Price Filter
        if (minPrice) {
          const minVal = parseInt(minPrice);
          filteredData = data.filter(p => {
            const priceNum = parseInt(p.price.toString().replace(/[^0-9]/g, ''));
            return priceNum >= minVal;
          });
        }
        setResults(filteredData);
      }
      
      setLoading(false);
    };

    fetchResults();
  }, [mode, rawLocation, type, minPrice, beds, baths]);

  // Helper text
  const getModeTitle = () => {
    if (mode === 'rent') return "For Rent";
    if (mode === 'sold') return "Previously Sold";
    return "For Sale";
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-20 relative z-0">
      
      {/* Header */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <Link href="/" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
          <ArrowLeft size={14} /> Back Home
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-end">
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                 {getModeTitle()} • {rawLocation ? `"${rawLocation}"` : "All Locations"}
              </p>
              <h1 className="text-4xl font-serif mb-2">
                {results.length === 0 ? "No Matches Found" : "Acquisitions"}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                 <span className="bg-white text-black border border-white px-3 py-1 rounded-full uppercase text-[10px] font-bold">
                    {getModeTitle()}
                 </span>
                 {type && <span className="border border-[#D4AF37] text-[#D4AF37] px-3 py-1 rounded-full uppercase text-[10px] font-bold">Type: {type}</span>}
                 {minPrice && <span className="border border-[#D4AF37] text-[#D4AF37] px-3 py-1 rounded-full uppercase text-[10px] font-bold">Price &gt; ${parseInt(minPrice)/1000000}M</span>}
              </div>
           </div>
        </div>
      </div>

      {loading && <p className="text-center py-20 text-gray-500 animate-pulse">Accessing Vault...</p>}

      {!loading && results.length === 0 && (
        <div className="py-20 text-center border border-white/10 rounded-lg bg-white/5">
          <SearchX size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-xl text-white mb-4">No properties found in this category.</p>
          <button onClick={() => window.location.href = '/'} className="bg-[#D4AF37] text-black px-8 py-3 font-bold text-xs uppercase rounded hover:bg-white transition-colors cursor-pointer">
            Clear Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {results.map((p) => (
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
                  // 🟢 Grayscale effect ONLY for Sold items
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 ${mode === 'sold' ? 'grayscale opacity-60' : 'opacity-80'}`} 
                />
                
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 text-[#D4AF37] font-serif text-xl border border-white/10 shadow-xl">
                  {p.price}
                  {mode === 'rent' && <span className="text-xs font-sans text-white ml-1">/mo</span>}
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase px-2 py-1">
                   {/* 🟢 SMART TAG LOGIC */}
                   {/* If mode is Sold, force 'SOLD' tag. Otherwise, show DB tag, or default to Exclusive */}
                   {mode === 'sold' ? 'SOLD' : (p.tag || (mode === 'rent' ? 'For Rent' : 'Exclusive'))}
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
    </div>
  );
}