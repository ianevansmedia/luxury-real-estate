"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useSaved } from "@/context/SavedContext"; // 🟢 Import Hook

export default function SaveButton({ propertyId }: { propertyId: number }) {
  const { isSaved, toggleSave } = useSaved();
  const active = isSaved(propertyId);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleSave(propertyId);
  };

  return (
    <button 
      onClick={handleSave}
      className={`
        p-3 rounded-full border transition-all duration-300 group shadow-xl cursor-pointer
        ${active 
          ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
          : 'bg-black/60 border-white/20 text-white hover:bg-white hover:text-black'
        }
      `}
    >
      <Heart 
        size={18} 
        className={`transition-all ${active ? "fill-black" : "group-hover:scale-110"}`} 
      />
    </button>
  );
}