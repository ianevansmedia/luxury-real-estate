"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SaveButton({ propertyId }: { propertyId: number }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Optional: Check if already saved on load
  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('saved_properties')
        .select('*')
        .eq('user_id', user.id)
        .eq('property_id', propertyId)
        .single();

      if (data) setIsSaved(true);
    };
    checkStatus();
  }, [propertyId]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the click from opening the property page
    e.stopPropagation();
    
    setLoading(true);

    // 1. Check user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to save properties.");
      setLoading(false);
      return;
    }

    // 2. Toggle Save
    if (isSaved) {
      // Remove
      await supabase
        .from('saved_properties')
        .delete()
        .match({ user_id: user.id, property_id: propertyId });
      setIsSaved(false);
    } else {
      // Add
      await supabase
        .from('saved_properties')
        .insert({ user_id: user.id, property_id: propertyId });
      setIsSaved(true);
    }

    setLoading(false);
  };

  return (
    <button 
      onClick={handleSave}
      disabled={loading}
      className={`
        p-3 rounded-full border transition-all duration-300 group shadow-xl
        ${isSaved 
          ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
          : 'bg-black/60 border-white/20 text-white hover:bg-white hover:text-black'
        }
      `}
    >
      <Heart 
        size={18} 
        className={`transition-all ${isSaved ? "fill-black" : "group-hover:scale-110"}`} 
      />
    </button>
  );
}