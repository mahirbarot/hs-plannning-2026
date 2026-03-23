import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { client, urlFor, isSanityConfigured } from '../sanityClient';
import { HeroSlide } from '../types';
import { cn, DEFAULT_HERO } from '../utils';

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isSanityConfigured) {
      setSlides(DEFAULT_HERO as any);
      return;
    }
    const query = '*[_type == "hero"] | order(order asc)';
    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setSlides(data);
      } else {
        setSlides(DEFAULT_HERO as any);
      }
    }).catch(() => {
      setSlides(DEFAULT_HERO as any);
    });
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <section className="h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white/20 text-4xl font-serif italic">Visionary Spaces.</div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={urlFor(slides[currentSlide].image).url()}
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-orange-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/80 font-bold">
              Pinner & Greater London
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-serif text-white leading-[0.85] mb-12 tracking-tighter">
            Visionary<br />
            <span className="italic">Spaces.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed font-light border-l border-white/20 pl-6">
              {slides[currentSlide].tagline || "We guide you through the complexities of planning and design to transform your property into a masterpiece of modern living."}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500"
            >
              Start Project
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-6">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Coordinates</div>
          <div className="text-[10px] text-white/60 font-mono">
            LAT: 51.5929° N<br />
            LNG: 0.3804° W<br />
            EST. 2010
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-6 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "w-12 h-[2px] transition-all duration-500",
              currentSlide === idx ? "bg-white" : "bg-white/20"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
