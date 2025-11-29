"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Bed, Bath, Square, ArrowLeft } from "lucide-react";

// We wrap the content in Suspense because useSearchParams needs it in Next.js
export default function SearchPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center">Loading Search...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      
      // Search Logic: Look in title OR location OR type
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`title.ilike.%${query}%,location.ilike.%${query}%,type.ilike.%${query}%`); // 'ilike' is case-insensitive search

      if (data) setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-20">
      
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
          <ArrowLeft size={14} /> Back Home
        </Link>
        <h1 className="text-4xl font-serif">
          Search Results for <span className="text-[#D4AF37] italic">"{query}"</span>
        </h1>
        <p className="text-gray-500 mt-2">{results.length} properties found</p>
      </div>

      {/* Loading */}
      {loading && <p className="text-center py-20 text-gray-500">Searching the vault...</p>}

      {/* No Results */}
      {!loading && results.length === 0 && (
        <div className="py-20 border border-white/10 rounded-lg text-center">
          <p className="text-xl mb-4">No properties found matching "{query}"</p>
          <button onClick={() => window.location.href = '/'} className="bg-[#D4AF37] text-black px-6 py-3 font-bold text-xs uppercase rounded">
             View All Listings
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {results.map((p) => (
          <Link href={`/property/${p.id}`} key={p.id} className="group cursor-pointer">
            <div className="relative h-[350px] mb-6 overflow-hidden border border-white/10 p-1 group-hover:border-[#D4AF37] transition-colors">
              <div className="relative w-full h-full overflow-hidden bg-[#111]">
                <Image 
                  src={p.image_url} 
                  alt={p.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 text-[#D4AF37] font-serif text-lg">
                  {p.price}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                <MapPin size={12} /> {p.location}
              </div>
              <div className="flex gap-4 text-xs font-mono text-gray-400 border-t border-white/10 pt-3">
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