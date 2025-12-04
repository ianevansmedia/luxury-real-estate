import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; 
import { ArrowLeft, MapPin, Bed, Bath, Square, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyImage from "@/components/PropertyImage";

async function getProperty(id: string) {
  const supabase = await createClient();
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !property) return null;
  return property;
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 15+ compatibility
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return notFound();
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black relative">
      <Navbar />

      {/* Floating Back Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link 
          href="/search" 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white hover:scale-105 transition-all px-6 py-4 rounded-full shadow-2xl border border-white/10"
        >
          <ArrowLeft size={16} /> Back to Search
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <PropertyImage 
          src={property.image_url} 
          alt={property.title} 
          // Pass category for fallback (checks type, then tag, then title)
          category={property.type || property.tag || property.title}
          fill 
          className="object-cover"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 pointer-events-none">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-auto">
            <div>
              <div className="flex gap-4 mb-4">
                <span className="bg-[#D4AF37] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {property.tag || 'Exclusive'}
                </span>
                <span className="bg-white/10 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  Active Listing
                </span>
              </div>
              <h1 className="text-4xl md:text-7xl font-serif mb-2 drop-shadow-lg">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-300 text-sm uppercase tracking-wider font-medium">
                <MapPin size={16} className="text-[#D4AF37]" /> {property.location}
              </div>
            </div>
            
            <div className="text-left md:text-right pb-4 md:pb-0"> 
              <p className="text-4xl md:text-5xl font-light text-[#D4AF37] drop-shadow-lg">{property.price}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                {property.type || 'Luxury Residence'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-wrap gap-8 md:gap-16 border-y border-white/10 py-8">
              <div className="flex items-center gap-3">
                <Bed className="text-[#D4AF37]" size={24} />
                <div>
                    <span className="block text-2xl font-light">{property.beds}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Bedrooms</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="text-[#D4AF37]" size={24} />
                <div>
                    <span className="block text-2xl font-light">{property.baths}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Bathrooms</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Square className="text-[#D4AF37]" size={24} />
                <div>
                    <span className="block text-2xl font-light">{property.sqft?.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Sq Ft</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-6 text-[#D4AF37]">The Residence</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">
                Experience the pinnacle of luxury living. This architectural masterpiece offers unparalleled design, bespoke finishes, and breathtaking views of the {property.location} skyline.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-[#111] border border-white/10 p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-gray-800 border border-[#D4AF37] flex items-center justify-center"><User size={20}/></div>
                 <div>
                    <p className="text-[#D4AF37] text-xs font-bold uppercase">Listing Agent</p>
                    <p className="text-lg font-serif">Jonathan Black</p>
                 </div>
              </div>
              <button className="w-full bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest py-4 hover:bg-white transition-colors">
                Schedule Viewing
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}