import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white flex items-center justify-center text-black font-bold text-xl">HS</div>
              <span className="font-bold tracking-tighter text-xl">PLANNING LTD.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Designing the future of London living with precision, elegance, and integrity.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-white/60">
                <span className="text-orange-500">T</span> 07962 223141
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <span className="text-orange-500">E</span> info@hsplanningltd.com
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <span className="text-orange-500">A</span> Pinner & Surrounding Areas, Greater London
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#projects" className="text-white/60 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#philosophy" className="text-white/60 hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="/admin" className="text-white/60 hover:text-white transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Accredited By</h4>
            <div className="grid grid-cols-2 gap-4">
              {['RIBA', 'CIAT', 'ARB', 'Houzz'].map((brand) => (
                <div key={brand} className="border border-white/10 px-4 py-3 text-center text-[10px] font-bold tracking-widest text-white/20">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-widest text-white/20">
            © 2026 HS Planning Ltd. All rights reserved.
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Facebook size={18} /></a>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-white/20">
            London, UK
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
