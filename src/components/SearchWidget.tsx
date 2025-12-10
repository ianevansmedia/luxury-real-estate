"use client";

import React, { useState, useEffect, useRef } from "react";
import PropertyImage from "@/components/PropertyImage"; 
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ArrowRight, MapPin, Check } from "lucide-react";
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
const NUMBER_OPTIONS = ["1+", "2+", "3+", "4+", "5+"];

export default function SearchWidget() {
  const router = useRouter();
  const supabase = createClient();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Search States
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedBeds, setSelectedBeds] = useState(""); 
  const [selectedBaths, setSelectedBaths] = useState(""); 
  const [activeTab, setActiveTab] = useState("buy");

  // Dropdown Visibility
  const [activeMenu, setActiveMenu] = useState<"none" | "location" | "type" | "price" | "beds" | "baths">("none");
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
    if (activeTab) params.set("mode", activeTab);
    if (locationQuery) {
        let cleanQuery = locationQuery;
        if (cleanQuery.includes(',')) {
            cleanQuery = cleanQuery.split(',')[0];
        }
        params.set("q", cleanQuery.trim());
    }
    if (selectedType) params.set("type", selectedType);
    if (selectedPrice) params.set("minPrice", selectedPrice);
    if (selectedBeds) params.set("beds", selectedBeds);   
    if (selectedBaths) params.set("baths", selectedBaths); 
    
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
                className={`pb-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'text-white border-[#D4AF37]' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                  {tab}
              </button>
          ))}
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 border border-white/10">
          
          {/* 1. LOCATION (Col-4) */}
          <div className="md:col-span-4 relative">
              <div 
                className="bg-black/60 flex items-center px-6 py-4 hover:bg-black/80 transition-colors cursor-text backdrop-blur-md h-full"
                onClick={() => setActiveMenu("location")}
              >
                <Search size={18} className="text-gray-400 mr-4 group-hover:text-white" />
                <div className="w-full">
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Location</label>
                    <input 
                        placeholder="City, Zip..." 
                        className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm font-medium"
                        value={locationQuery}
                        onChange={(e) => { setLocationQuery(e.target.value); setActiveMenu("location"); }}
                        onFocus={() => setActiveMenu("location")}
                        onKeyDown={handleKeyDown}
                    />
                </div>
              </div>

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
                            <PropertyImage 
                                src={s.image_url} 
                                alt={s.title}
                                category={s.title}
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

          {/* 2. TYPE (Col-2) */}
          <div className="md:col-span-2 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-4 py-4 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "type" ? "none" : "type")}
              >
                <div className="overflow-hidden">
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Type</label>
                    <span className="text-sm font-medium text-white block truncate">{selectedType || "All"}</span>
                </div>
                <ChevronDown size={14} className="text-gray-500 shrink-0 ml-2" />
              </div>

              {activeMenu === "type" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    {PROPERTY_TYPES.map(type => (
                      <div 
                          key={type} 
                          onClick={() => { setSelectedType(type); setActiveMenu("none"); }} 
                          className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {type} {selectedType === type && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 3. PRICE (Col-2) */}
          <div className="md:col-span-2 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-4 py-4 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "price" ? "none" : "price")}
              >
                <div className="overflow-hidden">
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Price</label>
                    <span className="text-sm font-medium text-white block truncate">
                      {PRICE_RANGES.find(p => p.value === selectedPrice)?.label || "Any"}
                    </span>
                </div>
                <ChevronDown size={14} className="text-gray-500 shrink-0 ml-2" />
              </div>

              {activeMenu === "price" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    <div onClick={() => { setSelectedPrice(""); setActiveMenu("none"); }} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">Any Price</div>
                    {PRICE_RANGES.map(price => (
                      <div 
                          key={price.value} 
                          onClick={() => { setSelectedPrice(price.value); setActiveMenu("none"); }} 
                          className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {price.label}
                          {selectedPrice === price.value && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 4. BEDS (Col-2) */}
          <div className="md:col-span-2 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-3 py-4 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "beds" ? "none" : "beds")}
              >
                <div>
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Beds</label>
                    <span className="text-sm font-medium text-white">{selectedBeds || "Any"}</span>
                </div>
                <ChevronDown size={14} className="text-gray-500 shrink-0" />
              </div>

              {activeMenu === "beds" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    <div onClick={() => { setSelectedBeds(""); setActiveMenu("none"); }} className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">Any</div>
                    {NUMBER_OPTIONS.map(num => (
                      <div 
                          key={num} 
                          onClick={() => { setSelectedBeds(num); setActiveMenu("none"); }} 
                          className="px-4 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {num} {selectedBeds === num && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* 5. BATHS (Col-2) */}
          <div className="md:col-span-2 relative">
              <div 
                className="bg-black/60 flex items-center justify-between px-3 py-4 hover:bg-black/80 transition-colors cursor-pointer border-l border-white/5 backdrop-blur-md h-full"
                onClick={() => setActiveMenu(activeMenu === "baths" ? "none" : "baths")}
              >
                <div>
                    <label className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 block">Bath</label>
                    <span className="text-sm font-medium text-white">{selectedBaths || "Any"}</span>
                </div>
                <ChevronDown size={14} className="text-gray-500 shrink-0" />
              </div>

              {activeMenu === "baths" && (
                <div className="absolute top-full left-0 w-full mt-px bg-[#111] border border-white/10 shadow-2xl z-[100] max-h-[300px] overflow-y-auto">
                    <div onClick={() => { setSelectedBaths(""); setActiveMenu("none"); }} className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">Any</div>
                    {NUMBER_OPTIONS.map(num => (
                      <div 
                          key={num} 
                          onClick={() => { setSelectedBaths(num); setActiveMenu("none"); }} 
                          className="px-4 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 flex justify-between items-center cursor-pointer"
                      >
                          {num} {selectedBaths === num && <Check size={14} className="text-[#D4AF37]"/>}
                      </div>
                    ))}
                </div>
              )}
          </div>

        </div>

        {/* 6. SEARCH BUTTON - 🟢 3D GOLD GRADIENT */}
        <button 
            onClick={handleSearch}
            className="w-full bg-gradient-to-b from-[#F3D87E] via-[#D4AF37] to-[#B38F1D] text-black font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer py-4 mt-px border-t border-white/40 border-b border-black/20 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:brightness-110 active:scale-[0.99]"
        >
            Search Portfolio <ArrowRight size={14}/>
        </button>
        
    </div>
  );
}