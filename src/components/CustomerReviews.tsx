import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp, Sparkles, UserCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewAuthor('');
      setNewComment('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0D0D0D] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Total Rating summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Verified Horology Enthusiasts
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              What Our Owners <span className="italic text-[#D4AF37]">Say</span>
            </h2>
            <p className="text-[#A1A1AA] text-xs sm:text-sm">
              Real reviews from walk-in Delhi boutique visitors & nationwide COD deliveries.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-right">
              <div className="flex items-center gap-1 text-[#D4AF37] justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs text-[#A1A1AA]">Based on 640+ Master Orders</span>
            </div>
            <div className="pl-4 border-l border-white/10">
              <span className="font-serif text-3xl font-bold text-white">
                4.9<span className="text-base text-[#D4AF37]">/5</span>
              </span>
            </div>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 flex flex-col justify-between space-y-4 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[#A1A1AA] text-[10px]">{rev.date}</span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-white text-sm font-serif leading-snug">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-zinc-200 block text-xs">{rev.author}</span>
                  <span className="text-[10px] text-[#A1A1AA]">{rev.location}</span>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
