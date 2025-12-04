"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

// 💎 CURATED FALLBACK LIBRARY
const FALLBACKS: Record<string, string> = {
  // Penthouse / Skyline / Apartment
  penthouse: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  condo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
  apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
  
  // Alpine / Mountain
  alpine: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop",
  chalet: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1600&auto=format&fit=crop",
  mountain: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  
  // Modern / Villa
  modern: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop",
  
  // Estate / Historic / Mansion
  estate: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
  mansion: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
  historic: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
  
  // Desert
  desert: "https://images.unsplash.com/photo-1509048332357-19497dc43c68?q=80&w=1600&auto=format&fit=crop",

  // Generic Luxury Fallback
  default: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
};

// Extend Next.js Image props to accept a 'category'
interface PropertyImageProps extends ImageProps {
  category?: string; 
}

export default function PropertyImage({ src, alt, category, ...props }: PropertyImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleFallback = () => {
    // 1. Clean the category input (lowercase, remove spaces)
    const key = category?.toLowerCase().trim() || "";

    // 2. Find the best match
    let fallbackUrl = FALLBACKS.default;

    if (key.includes('penthouse') || key.includes('skyline')) fallbackUrl = FALLBACKS.penthouse;
    else if (key.includes('condo') || key.includes('apartment')) fallbackUrl = FALLBACKS.condo;
    else if (key.includes('alpine') || key.includes('chalet') || key.includes('mountain')) fallbackUrl = FALLBACKS.alpine;
    else if (key.includes('modern')) fallbackUrl = FALLBACKS.modern;
    else if (key.includes('villa')) fallbackUrl = FALLBACKS.villa;
    else if (key.includes('historic')) fallbackUrl = FALLBACKS.historic;
    else if (key.includes('desert')) fallbackUrl = FALLBACKS.desert;
    else if (key.includes('estate') || key.includes('mansion')) fallbackUrl = FALLBACKS.estate;

    // 3. Set the new source
    setImgSrc(fallbackUrl);
  };

  return (
    <Image
      {...props}
      src={imgSrc || FALLBACKS.default}
      alt={alt || "Property Image"}
      onError={handleFallback}
    />
  );
}