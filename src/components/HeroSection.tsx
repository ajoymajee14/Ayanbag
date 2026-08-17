import React from 'react';
import { STORE_INFO } from '../data/products';

interface HeroSectionProps {
  onExploreClick: () => void;
  onVisitStoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onVisitStoreClick,
}) => {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D] py-12 lg:py-20"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
            
            {/* High-End Sub-Tag */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                1:1 Premium Craftsmanship
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 text-white">
              Experience <br />
              <span className="italic text-[#D4AF37]">Masterpiece</span> <br />
              Horology.
            </h1>

            {/* Subheadline */}
            <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Indistinguishable 1:1 precision craftsmanship, automatic movements, and heavyweight surgical-grade stainless steel now at an exclusive 45% discount.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                id="hero-btn-explore-collection"
                onClick={onExploreClick}
                className="px-8 sm:px-10 py-4 bg-[#D4AF37] text-black font-bold text-[12px] uppercase tracking-widest hover:bg-[#B8962D] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
              >
                Explore Collection
              </button>

              <button
                id="hero-btn-visit-store"
                onClick={onVisitStoreClick}
                className="px-6 sm:px-8 py-4 bg-white/5 border border-white/20 backdrop-blur-md font-bold text-[12px] uppercase tracking-widest hover:bg-white/10 text-white transition-all cursor-pointer"
              >
                Visit Delhi Store
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
              <div className="flex items-center gap-2 opacity-80">
                <div className="w-4 h-4 border border-[#D4AF37] rounded-full flex items-center justify-center text-[8px] text-[#D4AF37]">
                  ✓
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-medium">
                  Quality Checked
                </span>
              </div>

              <div className="flex items-center gap-2 opacity-80">
                <div className="w-4 h-4 border border-[#D4AF37] rounded-full flex items-center justify-center text-[8px] text-[#D4AF37]">
                  ✓
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-medium">
                  Cash on Delivery
                </span>
              </div>

              <div className="flex items-center gap-2 opacity-80">
                <div className="w-4 h-4 border border-[#D4AF37] rounded-full flex items-center justify-center text-[8px] text-[#D4AF37]">
                  ✓
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-medium">
                  Delhi Flagship Store
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6">
            
            {/* Concentric Ambient Rings */}
            <div className="w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full border border-[#D4AF37]/10 absolute animate-pulse pointer-events-none" />
            <div className="w-[420px] sm:w-[490px] h-[420px] sm:h-[490px] rounded-full border border-[#D4AF37]/5 absolute pointer-events-none" />

            {/* Featured Luxury Showcase Card */}
            <div className="relative z-10 w-full max-w-[440px] h-[460px] sm:h-[480px] bg-gradient-to-tr from-[#1A1A1A] to-[#0D0D0D] border border-white/10 shadow-2xl rounded-2xl flex flex-col items-center justify-between p-6 sm:p-8 group overflow-hidden">
              
              {/* Radial glow */}
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] pointer-events-none" />
              
              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] sm:text-[120px] font-serif text-white/5 select-none pointer-events-none tracking-widest">
                TIME
              </div>

              {/* Card Header Info */}
              <div className="relative z-10 w-full flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold">
                  Limited Edition
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Available
                </span>
              </div>

              {/* Watch Featured Image */}
              <div className="relative z-10 w-48 sm:w-56 h-48 sm:h-56 my-auto flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
                  alt="Ayanbag Masterpiece Automatic Watch"
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Details & Price */}
              <div className="relative z-10 w-full text-center space-y-1">
                <div className="text-[#D4AF37] text-[11px] tracking-[0.4em] uppercase font-medium">
                  Submariner Master Edition
                </div>
                <div className="text-xl sm:text-2xl font-serif italic text-white">
                  Ceramic Automatic
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="text-sm line-through text-[#A1A1AA]">₹16,400</span>
                  <span className="text-lg sm:text-xl font-bold text-[#D4AF37] font-mono">₹8,999</span>
                </div>

                {/* Micro accent bar */}
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="w-8 h-1 bg-[#D4AF37]" />
                  <span className="w-8 h-1 bg-white/20" />
                  <span className="w-8 h-1 bg-white/20" />
                </div>
              </div>

              {/* 45% OFF Badge */}
              <div className="absolute bottom-6 right-6 bg-[#D4AF37] text-black font-bold p-3 rounded-full text-[11px] shadow-lg">
                45% OFF
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
