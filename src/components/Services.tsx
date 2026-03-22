import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { firebaseService } from '../services/firebaseService';
import { Service } from '../types';
import { DEFAULT_SERVICES } from '../utils';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToCollection('services', (data) => {
      if (data.length === 0) {
        // If no services in DB, use defaults (for prototype)
        setServices(DEFAULT_SERVICES.map((s, idx) => ({ id: `default-${idx}`, ...s, order: idx })));
      } else {
        setServices(data);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="services" className="py-32 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-bold">02 / Expertise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-12">
              Comprehensive<br />
              Design Solutions.
            </h2>
            <p className="text-black/60 max-w-md leading-relaxed mb-8">
              From initial site visits to final construction oversight, we provide a seamless, end-to-end planning and design service tailored to your vision.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
              Scroll for details
              <ArrowRight size={12} className="rotate-90" />
            </div>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-black/10"
              >
                <button
                  onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  className="w-full py-8 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-mono text-black/20">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl md:text-2xl font-serif text-black group-hover:translate-x-2 transition-transform duration-500">
                      {service.title}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {expandedId === service.id ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-16 pr-12">
                        <p className="text-black/60 leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
