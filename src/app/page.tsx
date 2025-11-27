"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRight, Search, Menu, Globe, MapPin, ArrowUpRight, 
  ChevronDown, SlidersHorizontal, Bed, Bath, Square, Key, 
  Instagram, Twitter, Linkedin, MoveRight
} from "lucide-react";

// ==========================================
// 💎 DATA: LISTINGS & CATEGORIES
// ==========================================
const properties = [
  {
    id: 1,
    title: "The Midnight Estate",
    location: "Beverly Hills, CA",
    price: "$45,000,000",
    beds: 6,
    baths: 8,
    sqft: 12000,
    tag: "Exclusive",
    // FIXED: New Stable Image (Modern Mansion at Night/Dusk)
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Penthouse 4B",
    location: "New York, NY",
    price: "$22,500,000",
    beds: 3,
    baths: 3.5,
    sqft: 4200,
    tag: "New",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Aspen Ridge",
    location: "Aspen, CO",
    price: "$18,200,000",
    beds: 5,
    baths: 6,
    sqft: 6500,
    tag: "Alpine",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Kyoto Courtyard",
    location: "Kyoto, Japan",
    price: "$9,500,000",
    beds: 4,
    baths: 4,
    sqft: 3800,
    tag: "Modern",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Amangiri Retreat",
    location: "Canyon Point, UT",
    price: "$12,000,000",
    beds: 3,
    baths: 3,
    sqft: 2900,
    tag: "Desert",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Kensington Mansion",
    location: "London, UK",
    price: "£14,000,000",
    beds: 5,
    baths: 5,
    sqft: 5200,
    tag: "Historic",
    // FIXED: New Stable Image (Classic Luxury Home)
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop"
  }
];

const categories = [
  { 
    title: "Waterfront", 
    count: 42, 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    title: "Skyline", 
    count: 18, 
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    title: "Estates", 
    count: 35, 
    // FIXED: New Stable Image (Modern Concrete/Glass)
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    title: "Alpine", 
    count: 12, 
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop" 
  },
];

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("buy"); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* ==========================================
          1. NAVIGATION
      ========================================== */}
      <nav 
        className={`
          fixed top-0 w-full z-50 border-b transition-all duration-500
          ${isScrolled 
            ? 'bg-black border-white/10 py-4 shadow-2xl' 
            : 'bg-black/80 border-white/5 py-6 backdrop-blur-sm'
          }
        `}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center gap-12">
            <div className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-[#D4AF37] rotate-45"></div>
              OBSIDIAN
            </div>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex gap-8 text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 transition-all duration-300">
              <a href="#" className="hover:text-white transition-colors">Buy</a>
              <a href="#" className="hover:text-white transition-colors">Sell</a>
              <a href="#" className="hover:text-white transition-colors">Agents</a>
              <a href="#" className="hover:text-white transition-colors">Journal</a>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] cursor-pointer transition-colors">
               <Globe size={14} /> EN
            </div>
            <div className="flex items-center gap-6">
               <Search size={20} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
               <Menu size={20} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      {/* ==========================================
          2. HERO SEARCH SECTION
      ========================================== */}
      <div className="relative w-full min-h-[100vh] flex flex-col justify-center items-center pb-20 pt-32 overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={properties[0].image} // Using Image 1 (Midnight Estate) as hero
            alt="Hero" 
            fill 
            className="object-cover opacity-50 scale-105 animate-in fade-in duration-[2s]" 
            priority 
          />
          {/* Dark Overlay Gradient */}
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
             
             {/* Tabs (UPDATED: Buy, Sell, Rent) */}
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
             <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                
                {/* Location */}
                <div className="md:col-span-5 bg-gray-100 flex items-center px-4 py-4 rounded-lg hover:bg-gray-200 transition-colors group cursor-text">
                   <Search size={18} className="text-gray-400 mr-3 group-hover:text-black" />
                   <input 
                      placeholder="City, Address, or ZIP..." 
                      className="bg-transparent w-full outline-none text-black placeholder-gray-500 text-sm font-bold"
                   />
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
                <button className="md:col-span-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-black hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-lg">
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

      {/* ==========================================
          3. FEATURED LISTINGS
      ========================================== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div>
               <h2 className="text-4xl font-serif text-white mb-2">Recent Acquisitions</h2>
               <p className="text-gray-500 text-sm">Hand-picked properties by our senior partners.</p>
            </div>
            <button className="mt-6 md:mt-0 flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
               View All Listings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {properties.map((p) => (
               <div key={p.id} className="group cursor-pointer">
                  {/* Image Card */}
                  <div className="relative h-[450px] mb-6 overflow-hidden border border-white/10 p-1 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                     <div className="relative w-full h-full overflow-hidden bg-[#111]">
                        <Image 
                           src={p.image} 
                           alt={p.title} 
                           fill 
                           className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                        />
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex gap-2">
                           <span className="bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10">
                              {p.tag}
                           </span>
                        </div>

                        {/* Price Overlay */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                           <p className="text-[#D4AF37] font-serif text-2xl italic">{p.price}</p>
                        </div>
                     </div>
                  </div>

                  {/* Info */}
                  <div className="flex justify-between items-start px-2">
                     <div>
                        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                           <MapPin size={12} /> {p.location}
                        </div>
                     </div>
                     <div className="text-right flex gap-4 text-xs font-mono text-gray-400 pt-1">
                        <span className="flex items-center gap-1"><Bed size={14} /> {p.beds}</span>
                        <span className="flex items-center gap-1"><Square size={14} /> {p.sqft}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* ==========================================
          4. BROWSE BY LIFESTYLE
      ========================================== */}
      <div className="bg-[#0A0A0A] py-32 border-t border-white/10">
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-serif mb-16 text-center">Curated Collections</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {categories.map((cat) => (
                  <div key={cat.title} className="relative h-[400px] group cursor-pointer overflow-hidden border border-white/10">
                     <Image 
                        src={cat.image} 
                        alt={cat.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                     <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                        <h3 className="text-2xl font-serif italic text-white mb-2">{cat.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37] px-3 py-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                           {cat.count} Listings
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* ==========================================
          5. PRIVATE OFFICE CTA
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] border-t border-white/10">
         <div className="bg-[#D4AF37] text-black p-16 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] mb-8 opacity-70">
                  <Key size={16}/> Obsidian Private Office
               </div>
               <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-[0.9]">
                  Off-Market <br/> Opportunities.
               </h2>
               <p className="text-lg font-medium opacity-80 mb-12 max-w-md leading-relaxed">
                  Exclusive access to the world's most coveted properties before they hit the public market.
               </p>
               <div className="flex gap-6">
                  <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-2xl">
                     Become a Member
                  </button>
                  <button className="border-2 border-black text-black px-8 py-4 font-bold uppercase tracking-wider text-xs hover:bg-black hover:text-white transition-colors">
                     Sell with Onyx
                  </button>
               </div>
            </div>
            {/* Texture Overlay */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
         </div>
         
         <div className="relative h-full min-h-[400px] border-l border-white/10 bg-[#111] group">
            <Image 
               src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop" 
               alt="Private" 
               fill 
               className="object-cover grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-1000" 
            />
            <div className="absolute inset-0 bg-black/20"></div>
         </div>
      </div>

      {/* ==========================================
          6. FOOTER
      ========================================== */}
      <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 px-6 md:px-12">
         <div className="max-w-[1600px] mx-auto">
            
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-20">
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-3xl font-bold tracking-[0.2em] text-white mb-8">
                     <div className="w-4 h-4 bg-[#D4AF37] rotate-45"></div>
                     OBSIDIAN
                  </div>
                  <p className="text-gray-500 max-w-sm leading-relaxed text-sm mb-8">
                     Defining the standard of luxury real estate. We connect the world's most discerning buyers with its most exceptional properties.
                  </p>
                  <div className="flex gap-6 text-[#D4AF37]">
                     <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
                     <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
                     <Linkedin size={20} className="hover:text-white cursor-pointer transition-colors" />
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">Real Estate</h4>
                  <ul className="space-y-4 text-sm text-gray-500 font-medium">
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Buy Property</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Sell Property</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">New Developments</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Commercial</a></li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">Company</h4>
                  <ul className="space-y-4 text-sm text-gray-500 font-medium">
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Press & Media</a></li>
                     <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
                  <div className="flex border-b border-gray-700 pb-2">
                     <input placeholder="Email Address" className="bg-transparent outline-none text-sm text-white w-full placeholder-gray-600" />
                     <button className="text-[#D4AF37] hover:text-white transition-colors"><MoveRight /></button>
                  </div>
               </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-[10px] font-bold uppercase tracking-widest text-gray-600">
               <p>© 2025 Obsidian Global Real Estate. All Rights Reserved.</p>
               <div className="flex gap-8 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Sitemap</a>
               </div>
            </div>
         </div>
      </footer>

    </main>
  );
}