import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { firebaseService } from '../services/firebaseService';
import { Review } from '../types';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToCollection('reviews', (data) => {
      setReviews(data);
    }, 'name');
    return () => unsubscribe();
  }, []);

  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-blue-600 font-bold">Google</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-black">Client Voices</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#F5F5F0] p-12 relative group"
            >
              <Quote className="absolute top-8 right-8 text-black/5 w-12 h-12" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-black/70 italic leading-relaxed mb-8 font-light">
                "{review.review}"
              </p>

              <div>
                <div className="font-bold text-xs uppercase tracking-widest text-black mb-1">
                  {review.name}
                </div>
                <div className="text-[10px] text-black/40 uppercase tracking-widest">
                  Homeowner
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12 text-black/20 font-serif italic">
            No reviews yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
