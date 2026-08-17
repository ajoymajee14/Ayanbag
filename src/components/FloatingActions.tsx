import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultWaMessage = `Hello Ayanbag, I am browsing your Master Luxury Watches catalog on your website. I want to inquire about availability, live video inspection, and COD delivery.`;

  return (
    <div id="floating-actions-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          id="btn-floating-scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto p-3 rounded-full bg-[#1A1A1A] hover:bg-black border border-white/10 hover:border-[#D4AF37] text-[#D4AF37] shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Live Help */}
      <a
        id="btn-floating-whatsapp"
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(defaultWaMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105"
      >
        <span className="absolute -top-1.5 -left-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-current" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/90 leading-none">
            Live 24/7 Desk
          </span>
          <span className="text-xs font-bold leading-tight">
            Order on WhatsApp
          </span>
        </div>
      </a>

    </div>
  );
};
