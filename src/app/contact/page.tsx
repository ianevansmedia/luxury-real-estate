"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-[#D4AF37]">Loading Contact Form...</div>}>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  const urlAgent = searchParams.get('agent') || "";
  const urlProperty = searchParams.get('property') || "";
  // 🟢 NEW: Get generic subject from URL (for Private Office links)
  const urlSubject = searchParams.get('subject') || "";

  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState(urlAgent);
  
  // 🟢 Logic to determine initial subject line
  const initialSubject = urlProperty 
    ? `Inquiry regarding: ${urlProperty}` 
    : (urlSubject || "");

  const [subject, setSubject] = useState(initialSubject);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase.from('agents').select('*');
      if (data) setAgents(data);
    };
    fetchAgents();
  }, []);

  useEffect(() => {
    if (urlAgent) setSelectedAgent(urlAgent);
  }, [urlAgent]);

  return (
    <div>
      {/* ... Hero Section code remains same ... */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1600&auto=format&fit=crop"
          alt="Contact Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Start the Conversation</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">Contact Us</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Contact Details (Same as before) */}
        <div>
            <h2 className="text-3xl font-serif mb-8 text-white">Global Headquarters</h2>
            <div className="space-y-8 text-gray-400">
                <div className="flex gap-4">
                    <MapPin className="text-[#D4AF37] shrink-0" size={24} />
                    <div>
                        <p className="text-white text-lg font-medium">Beverly Hills Office</p>
                        <p className="leading-relaxed">1200 Pacific Coast Hwy, Suite 100 <br/> Beverly Hills, CA 90210</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-[#D4AF37] shrink-0" size={24} />
                    <div>
                        <p className="text-white text-lg font-medium">Phone</p>
                        <p>+1 (800) 555-0123</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Mail className="text-[#D4AF37] shrink-0" size={24} />
                    <div>
                        <p className="text-white text-lg font-medium">Email</p>
                        <p>concierge@obsidian.com</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form */}
        <form className="bg-[#111] p-10 border border-white/10 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Name</label>
                    <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Email</label>
                    <input className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" placeholder="Email Address" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Select Agent</label>
                <div className="relative">
                    <select 
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors appearance-none cursor-pointer"
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                    >
                        <option value="" className="bg-[#111] text-gray-500">General Inquiry (No Specific Agent)</option>
                        {agents.map(agent => (
                            <option key={agent.id} value={agent.name} className="bg-[#111] text-white">
                                {agent.name} ({agent.location})
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <ArrowRight size={14} className="rotate-90" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Subject</label>
                <input 
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors" 
                    placeholder="General Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Message</label>
                <textarea className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors h-32 resize-none" placeholder="How can we assist you?" />
            </div>

            <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-5 hover:bg-[#D4AF37] transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer">
                Send Message <ArrowRight size={14} />
            </button>
        </form>

      </section>
    </div>
  );
}