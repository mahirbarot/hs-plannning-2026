import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 bg-[#151515] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">04 / Connect</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-12">
              Let's Build Your<br />
              <span className="italic">Vision.</span>
            </h2>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Call Us</div>
                  <div className="text-xl font-serif">07962 223141</div>
                  <div className="text-sm text-white/40">Hemen Suthar (Consulting Engineer)</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Email Us</div>
                  <div className="text-xl font-serif">info@hsplanningltd.com</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Visit Us</div>
                  <div className="text-xl font-serif">Pinner & Surrounding Areas<br />Greater London</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-12 rounded-2xl backdrop-blur-sm border border-white/10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-serif mb-4">Message Sent!</h3>
                <p className="text-white/60">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[10px] uppercase tracking-widest font-bold text-orange-500 hover:text-orange-400"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-orange-500 outline-none transition-colors font-serif text-xl"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-orange-500 outline-none transition-colors font-serif text-xl"
                    placeholder="hello@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-orange-500 outline-none transition-colors font-serif text-xl resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-white text-black py-6 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
