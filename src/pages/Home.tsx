import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import { motion } from 'motion/react';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <Hero />
      
      {/* Philosophy Section (Static but inspired by reference) */}
      <section id="philosophy" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[3/4] overflow-hidden relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Architecture" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 bg-black p-8 max-w-xs">
                <div className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-2">Foundation</div>
                <p className="text-white font-serif text-xl italic">"Form follows function."</p>
              </div>
            </motion.div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-bold">01 / The Philosophy</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-12">
                Design that respects <span className="italic text-black/40">tradition</span>, while embracing the <span className="italic">future.</span>
              </h2>
              <div className="space-y-6 text-black/60 leading-relaxed">
                <p>
                  Choosing an architect you can count on doesn't have to be difficult. Through our years of experience, we understand that taking on a new building or planning project can be time-consuming and expensive.
                </p>
                <p>
                  This is why we guide you through the entire process in a straightforward way, helping to minimize your time spent. We capture the vision of your project and deliver your dream property at a competitive price.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-2 h-2 bg-black" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Full Service Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </motion.div>
  );
};

export default Home;
