"use client";

import React, { useState, useEffect, useRef } from "react";
// UPDATED: Import the custom PropertyImage component
import PropertyImage from "@/components/PropertyImage"; 
import { useRouter } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal, ArrowRight, MapPin, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Options
const PROPERTY_TYPES = ["Estate", "Penthouse", "Villa", "Modern", "Alpine", "Historic", "Skyline", "Desert"];
const PRICE_RANGES = [
  { label: "$1M+", value: "1000000" },
  { label: "$2M+", value: "2000000" },
  { label: "$5M+", value: "5000000" },
  { label: "$10M+", value: "10000000" },
  { label: "$20M+", value: "20000000" },
  { label: "$50M+", value: "50000000" },
];

export default function SearchWidget() {
  const router = useRouter();
  const supabase = createClient();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Search States
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [activeTab, setActiveTab] = useState("buy");

  // Dropdown Visibility
  const [activeMenu, setActiveMenu] = useState<"none" | "location" | "type" | "price">("none");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveMenu("none");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autosuggest Logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (locationQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      const { data } = await supabase
        .from('properties')
        .select('id, title, location, image_url, price')
        .or(`title.ilike.%${locationQuery}%,location.ilike.%${locationQuery}%`)
        .limit(5);
      if (data) setSuggestions(data);
    };
    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [locationQuery]);

  // Execute Search
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // 1. Pass the active tab
    if (activeTab) params.set("mode", activeTab);

    // 2. Sanitize Location (Remove Text After Comma)
    if (locationQuery) {
        let cleanQuery = locationQuery;
        if (cleanQuery.includes(',')) {
            cleanQuery = cleanQuery.split(',')[0];
        }
        params.set("q", cleanQuery.trim());
    }
    
    if (selectedType) params.set("type", selectedType);
    if (selectedPrice) params.set("minPrice", selectedPrice);
    
    setActiveMenu("none");
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div ref={searchRef} className="bg-black/40 backdrop-blur-xl border border-white/20 p-1 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-300 relative z-50">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-2 px-4 pt-2">
          {['buy', 'rent', 'sold'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                // UPDATED: Added cursor-pointer
                className={`pb-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'text-white border-[#D4AF37]' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                  {tab}
              </button>
          ))}
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 border border-white/10">
          
          {/* 1. LOCATION INPUT */}
          <div className="md:col-span-5 relative">
              <div 
                className="bg-black/60 flex items-center px-6 py-6 hover:bg-black/80 transition-colors cursor-text backdrop-blur-md h-full"
                onClick={() => setActiveMenu("location")}
              >
                <Search size={18} className="text-gray-400 mr-4 group-hover:text-white" />
                <div className="w-full">
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Location</label>
                    <input 
                        placeholder="City, Zip, Address..." 
                        className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm font-medium"
                        value={locationQuery}
                        onChange={(e) => { setLocationQuery(e.target.value); setActiveMenu("location"); }}
                        onFocus={() => setActiveMenu("location")}
                        onKeyDown={handleKeyDown}
                    />
                </div>
              </div>

              {/* Autosuggest Dropdown (Dark Mode) */}
              {activeMenu === "location" && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    <p className="px-4 py-2 text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest bg-black/50 sticky top-0">Suggestions</p>
                    {suggestions.map((s) => (
                      <div 
                          key={s.id}
                          onClick={() => {
                            setLocationQuery(s.location || ""); 
                            setActiveMenu("none");
                          }}
                          className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 text-sm font-medium text-gray-300 border-b border-white/5 last:border-0"
                      >
                          <div className="w-8 h-8 relative rounded overflow-hidden shrink-0 bg-gray-800">
                            {/* UPDATED: Using PropertyImage Component */}
                            <PropertyImage 
                                src={s.image_url} 
                                alt={s.title}
                                category={s.title} // Pass title as category so it finds keywords like "Villa"
                                fill 
                                className="object-cover" 
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white line-clamp-1">{s.title}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10}/> {s.location}</div>
                          </div>
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 2. TYPE SELECTOR */}
          <div className="md:col-span-3 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-6 py-6 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "type" ? "none" : "type")}
              >
                <div>
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Type</label>
                    <span className="text-sm font-medium text-white">{selectedType || "All Types"}</span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>

              {/* Type Dropdown */}
              {activeMenu === "type" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    {PROPERTY_TYPES.map(type => (
                      <div 
                          key={type} 
                          onClick={() => { setSelectedType(type); setActiveMenu("none"); }} 
                          // UPDATED: Added cursor-pointer
                          className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {type} {selectedType === type && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 3. PRICE SELECTOR */}
          <div className="md:col-span-2 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-6 py-6 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "price" ? "none" : "price")}
              >
                <div>
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Price</label>
                    <span className="text-sm font-medium text-white">
                      {PRICE_RANGES.find(p => p.value === selectedPrice)?.label || "Any"}
                    </span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>

              {/* Price Dropdown */}
              {activeMenu === "price" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    {/* UPDATED: Added cursor-pointer */}
                    <div onClick={() => { setSelectedPrice(""); setActiveMenu("none"); }} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">Any Price</div>
                    {PRICE_RANGES.map(price => (
                      <div 
                          key={price.value} 
                          onClick={() => { setSelectedPrice(price.value); setActiveMenu("none"); }} 
                          // UPDATED: Added cursor-pointer
                          className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {price.label}
                          {selectedPrice === price.value && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 4. SEARCH BUTTON */}
          <button 
              onClick={handleSearch}
              // UPDATED: Added cursor-pointer
              className="md:col-span-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
          >
              Search <ArrowRight size={14}/>
          </button>
        </div>
        
        {/* Advanced Link */}
        <div className="flex justify-between items-center px-4 py-3 bg-black/40">
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <SlidersHorizontal size={12} /> Advanced
          </button>
        </div>
    </div>
  );
}