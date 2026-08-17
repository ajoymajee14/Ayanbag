import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, CreditCard, Lock, Sparkles, Clock, Check, KeyRound } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer id="main-footer" className="bg-[#0D0D0D] border-t border-white/10 text-[#A1A1AA] text-xs">
      
      {/* Top Banner: Brand Statement & Trust Badges */}
      <div className="border-b border-white/10 py-10 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm font-serif">1:1 Calibrated Quality</h4>
              <p className="text-[#A1A1AA] text-[11px]">Exact sapphire glass, 904L steel & weights</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm font-serif">Same-Day Dispatch</h4>
              <p className="text-[#A1A1AA] text-[11px]">Free Air Shipping + COD across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm font-serif">Offline Delhi Boutique</h4>
              <p className="text-[#A1A1AA] text-[11px]">Walk-in, touch & verify before paying</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl font-normal tracking-[0.2em] text-white">
                AYANBAG
              </span>
              <div className="h-[1px] w-20 bg-[#D4AF37] my-1" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Timeless Precision, Unmatched Luxury
              </span>
            </div>

            <p className="text-[#A1A1AA] text-xs leading-relaxed">
              Ayanbag is India’s premier master copy horology boutique. We bridge the gap between high-end haute horlogerie aesthetics and accessible luxury through 1:1 precision engineering, sapphire crystal durability, and automatic mechanical movements.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Physical Flagship Store in Okhla, New Delhi
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Submariner Master</a></li>
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Royal Oak Chrono</a></li>
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Nautilus Skeleton</a></li>
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Cosmograph Daytona</a></li>
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">GMT-Master Batgirl</a></li>
              <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Santos Skeleton</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Assurance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-choose" className="hover:text-[#D4AF37] transition-colors">Authentication Guide</a></li>
              <li><a href="#store-locator" className="hover:text-[#D4AF37] transition-colors">Store Visit Booking</a></li>
              <li><a href="#promo-offer-section" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</a></li>
              <li><a href="#whatsapp-ordering" className="hover:text-[#D4AF37] transition-colors">Cash On Delivery Terms</a></li>
              <li><a href="#reviews" className="hover:text-[#D4AF37] transition-colors">Owner Testimonials</a></li>
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    id="link-footer-staff-login"
                    onClick={onOpenAdmin}
                    className="hover:text-[#D4AF37] text-zinc-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Lock className="w-3 h-3 text-[#D4AF37]" />
                    <span>Staff Admin Login</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Physical Store & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Flagship Boutique & Support
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#A1A1AA]">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-zinc-200">Address:</strong> Thokar No. 9, High Tension Road, Abul Fazal Road, Jamia Nagar, Okhla (Near Bikanerwala), New Delhi - 110025
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong className="text-zinc-200">Phone:</strong>{' '}
                  <a href={`tel:${STORE_INFO.phone}`} className="text-white hover:text-[#D4AF37] font-mono">
                    {STORE_INFO.phone}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong className="text-zinc-200">Email:</strong>{' '}
                  <a href={`mailto:${STORE_INFO.email}`} className="text-white hover:underline">
                    {STORE_INFO.email}
                  </a>
                </span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hi Ayanbag support, I need assistance regarding my watch order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Payment Badges & Copyright */}
      <div className="border-t border-white/10 bg-[#080808] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="space-y-1">
            <p className="text-[11px] text-[#A1A1AA]">
              © 2026 Ayanbag Luxury Watches. All Rights Reserved. Master Edition Horology.
            </p>
            <p className="text-[10px] text-zinc-600">
              Disclaimer: We offer master 1:1 first copies for watch enthusiasts seeking luxury aesthetics at accessible pricing.
            </p>
          </div>

          {/* Secure Payment Badges & Admin Portal Link */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px]">
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300 font-mono font-semibold">
              COD
            </span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300 font-semibold">
              UPI / GPay
            </span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300 font-semibold">
              Cards / NetBanking
            </span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[#D4AF37] font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> 256-Bit SSL
            </span>

            {onOpenAdmin && (
              <button
                id="btn-footer-admin-login"
                onClick={onOpenAdmin}
                className="bg-slate-900/90 border border-slate-700/80 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-slate-400 hover:text-[#D4AF37] px-2.5 py-1 rounded font-mono text-[10px] flex items-center gap-1.5 transition-colors cursor-pointer ml-1"
                title="Management Admin Login (Password Protected)"
              >
                <KeyRound className="w-3 h-3 text-[#D4AF37]" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

        </div>
      </div>

    </footer>
  );
};
