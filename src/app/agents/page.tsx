"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase.from('agents').select('*');
      if (data) setAgents(data);
    };
    fetchAgents();
  }, []);

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- HERO SECTION --- */}
      {/* 🟢 MOBILE ONLY: Reduced height to h-[55vh] to pull content up */}
      <section className="relative h-[55vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
          alt="Agents Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        
        {/* 🟢 MOBILE ONLY: Reduced pt-12 to center text better in shorter hero */}
        <div className="relative z-10 text-center max-w-4xl px-6 pt-12 md:pt-20">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6 animate-in slide-in-from-bottom-4 duration-700">
            Global Advisors
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight animate-in slide-in-from-bottom-8 duration-1000 [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">
            The Industry's <br /> Finest.
          </h1>
        </div>
      </section>

      {/* --- AGENT GRID --- */}
      {/* 🟢 MOBILE ONLY: Reduced pt-2 to bring the images closer to the hero */}
      <section className="pt-2 pb-20 md:py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {agents.map((agent) => (
                <div 
                    key={agent.id} 
                    className="group relative h-[600px] bg-[#111] border border-white/5 overflow-hidden"
                >
                    {/* Image */}
                    <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                        {agent.image_url ? (
                          <Image 
                              src={agent.image_url} 
                              alt={agent.name} 
                              fill 
                              className="object-cover transition-all duration-700" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800" />
                        )}
                    </div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>

                    {/* Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20 pointer-events-none"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2">
                                {agent.location}
                            </p>
                            <h3 className="text-3xl font-serif text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                                {agent.name}
                            </h3>
                            <p className="text-gray-400 text-sm font-medium mb-6">
                                {agent.role}
                            </p>
                        </div>

                        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <div className="border-t border-white/20 pt-6 flex flex-col gap-3">
                                <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    <Mail size={14} className="text-[#D4AF37]" /> {agent.email}
                                </a>
                                <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    <Phone size={14} className="text-[#D4AF37]" /> {agent.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}