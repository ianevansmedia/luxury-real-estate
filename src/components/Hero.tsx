"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal, ArrowRight, MapPin } from "lucide-react";
import { properties } from "@/lib/data"; // Keep for background image
import { createClient } from "@/lib/supabase/client";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();
  const searchRef = useRef<HTMLDivElement>(null);

  // 🟢 AUTO-SUGGEST LOGIC
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      const { data } = await supabase
        .from('properties')
        .select('id, title, location, image_url, price')
        .or(`title.ilike.%${query}%,location.ilike.%${query}%`)
        .limit(5); // Limit to 5 suggestions to keep UI clean

      if (data) setSuggestions(data);
    };

    // Debounce: Wait 300ms after typing stops to fetch
    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full min-h-[100vh] flex flex-col justify-center items-center pb-20 pt-32 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={properties[0].image} 
          alt="Hero" 
          fill 
          className="object-cover opacity-50 scale-105 animate-in fade-in duration-[2s]" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] to-95%"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 mt-8">
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 animate-in slide-in-from-bottom-4 duration-700">
            The Authority in Luxury
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight mb-8 animate-in slide-in-from-bottom-8 duration-1000">
            Curators of <br/> the Exceptional.
          </h1>
        </div>

        {/* ⚪ WHITE SEARCH WIDGET */}
        <div className="bg-white rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-1000 delay-300 relative z-20">
           
           {/* Tabs */}
           <div className="flex gap-4 mb-2 px-4 pt-2">
              {['buy', 'sell', 'rent'].map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`pb-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>

           {/* Inputs Grid */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-2 relative" ref={searchRef}>
              
              {/* Location Input */}
              <div className="md:col-span-5 bg-gray-100 flex items-center px-4 py-4 rounded-lg hover:bg-gray-200 transition-colors group cursor-text relative">
                 <Search size={18} className="text-gray-400 mr-3 group-hover:text-black" />
                 <input 
                    placeholder="Search City, Address, or Zip..." 
                    className="bg-transparent w-full outline-none text-black placeholder-gray-500 text-sm font-bold"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                 />

                 {/* 🟢 AUTO-SUGGEST DROPDOWN */}
                 {showSuggestions && query.length > 1 && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                       <div className="py-2">
                          <p className="px-4 py-2 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Top Matches</p>
                          {suggestions.map((s) => (
                             <div 
                                key={s.id}
                                onClick={() => router.push(`/property/${s.id}`)}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 group"
                             >
                                {/* Tiny Thumbnail */}
                                <div className="w-10 h-10 relative rounded overflow-hidden shrink-0 bg-gray-200">
                                   <Image src={s.image_url} alt="thumb" fill className="object-cover" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-black group-hover:text-[#D4AF37] transition-colors line-clamp-1">{s.title}</p>
                                   <p className="text-xs text-gray-500 flex items-center gap-1">
                                      <MapPin size={10}/> {s.location}
                                   </p>
                                </div>
                                <div className="ml-auto">
                                   <span className="text-xs font-bold text-black bg-gray-100 px-2 py-1 rounded">{s.price}</span>
                                </div>
                             </div>
                          ))}
                       </div>
                       {/* View All Link */}
                       <div 
                          onClick={handleSearch}
                          className="bg-gray-50 px-4 py-3 text-center text-xs font-bold text-[#D4AF37] uppercase tracking-widest cursor-pointer hover:bg-gray-100 border-t border-gray-100"
                       >
                          View all results for "{query}"
                       </div>
                    </div>
                 )}
              </div>

              {/* Type */}
              <div className="md:col-span-3 bg-gray-100 flex items-center justify-between px-4 py-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                 <span className="text-sm font-bold text-gray-600">All Types</span>
                 <ChevronDown size={16} className="text-gray-400" />
              </div>

              {/* Price */}
              <div className="md:col-span-2 bg-gray-100 flex items-center justify-between px-4 py-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                 <span className="text-sm font-bold text-gray-600">Price</span>
                 <ChevronDown size={16} className="text-gray-400" />
              </div>

              {/* Button */}
              <button 
                onClick={handleSearch}
                className="md:col-span-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-black hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                 Search
              </button>
           </div>
           
           {/* Advanced Link */}
           <div className="flex justify-between items-center px-4 py-3">
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                 <span className="hover:text-black cursor-pointer transition-colors flex items-center gap-1"> New Listings</span>
                 <span className="hover:text-black cursor-pointer transition-colors flex items-center gap-1"> Open Houses</span>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1 hover:text-black transition-colors">
                 <SlidersHorizontal size={12} /> Advanced
              </button>
           </div>
        </div>
      </div>

      {/* Blend Layer */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none"></div>
    </div>
  );
}