import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, MoveRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 px-6 md:px-12 text-white">
       <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-20">
             
             {/* 1. Brand / Bio */}
             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-3xl font-bold tracking-[0.2em] text-white mb-8">
                    <div className="w-4 h-4 bg-[#D4AF37] rotate-45"></div>OBSIDIAN
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

             {/* 2. Discover Links */}
             <div>
                <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">Discover</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                    <li><Link href="/search?mode=buy" className="hover:text-[#D4AF37] transition-colors">Buy</Link></li>
                    <li><Link href="/sell" className="hover:text-[#D4AF37] transition-colors">Sell</Link></li>
                    <li><Link href="/search?mode=rent" className="hover:text-[#D4AF37] transition-colors">Rent</Link></li>
                </ul>
             </div>

             {/* 3. Agency Links */}
             <div>
                <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">The Agency</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                    <li><Link href="/agents" className="hover:text-[#D4AF37] transition-colors">Agents</Link></li>
                    <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
                    <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
                </ul>
             </div>

             {/* 4. Newsletter */}
             <div>
                <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
                <div className="flex border-b border-gray-700 pb-2">
                    <input placeholder="Email Address" className="bg-transparent outline-none text-sm text-white w-full placeholder-gray-600" />
                    <button className="text-[#D4AF37] hover:text-white transition-colors"><MoveRight /></button>
                </div>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-[10px] font-bold uppercase tracking-widest text-gray-600">
             <p>© 2025 Obsidian Global Real Estate.</p>
             <div className="flex gap-8 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white">Privacy</Link>
                <Link href="#" className="hover:text-white">Terms</Link>
                <Link href="#" className="hover:text-white">Sitemap</Link>
             </div>
          </div>
       </div>
    </footer>
  );
}