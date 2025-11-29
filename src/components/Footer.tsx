import React from "react";
import { Instagram, Twitter, Linkedin, MoveRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 px-6 md:px-12 text-white">
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
  );
}