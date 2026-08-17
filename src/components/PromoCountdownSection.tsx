import React, { useState, useEffect } from 'react';
import { Flame, Clock, Ticket, Check, Sparkles, AlertCircle } from 'lucide-react';

export const PromoCountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to create persistent urgency
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AYAN45');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatTwoDigits = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="promo-offer-section" className="py-8 bg-[#1A1A1A] border-y border-white/10 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline & Offer Details */}
            <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Limited Edition Drop</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
                45% Off Instant <span className="italic text-[#D4AF37]">Master Discount</span>
              </h2>
              
              <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-lg">
                Direct factory master pricing on all 1:1 precision timepieces. Enter code during checkout or mention it directly on WhatsApp.
              </p>

              {/* Progress Urgency Bar */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-1.5">
                  <span className="flex items-center gap-1 text-[#D4AF37] font-medium text-[11px] uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" /> High Demand Batch
                  </span>
                  <span className="font-mono text-zinc-300 text-[11px]">Only 6 Units Left Today</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8962D] w-[78%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right: Dynamic Countdown & Code Pill */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6">
              
              {/* Countdown Clocks */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-2 font-bold">
                  Ends In:
                </div>
                <div className="flex items-center gap-3 text-2xl sm:text-3xl font-serif">
                  
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0D0D0D] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-serif">
                        {formatTwoDigits(timeLeft.hours)}
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#A1A1AA] mt-1 font-medium">
                      Hrs
                    </span>
                  </div>

                  <span className="text-2xl font-serif text-[#D4AF37] mb-4">:</span>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0D0D0D] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-serif">
                        {formatTwoDigits(timeLeft.minutes)}
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#A1A1AA] mt-1 font-medium">
                      Min
                    </span>
                  </div>

                  <span className="text-2xl font-serif text-[#D4AF37] mb-4">:</span>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0D0D0D] border border-[#D4AF37]/40 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-[#D4AF37] font-serif">
                        {formatTwoDigits(timeLeft.seconds)}
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#A1A1AA] mt-1 font-medium">
                      Sec
                    </span>
                  </div>

                </div>
              </div>

              {/* Coupon Box Button */}
              <div className="flex flex-col items-center sm:items-start">
                <button
                  id="btn-promo-copy-coupon"
                  onClick={handleCopyCode}
                  className="group flex items-center gap-3 bg-[#0D0D0D] hover:bg-[#151515] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <Ticket className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-widest text-[#A1A1AA]">
                      Click To Copy
                    </span>
                    <span className="font-mono font-bold text-base sm:text-lg text-white tracking-widest group-hover:text-[#D4AF37]">
                      AYAN45
                    </span>
                  </div>
                  <div className="ml-2 pl-3 border-l border-white/10">
                    {copied ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-[#D4AF37] font-semibold group-hover:underline">
                        Apply
                      </span>
                    )}
                  </div>
                </button>
                <span className="text-[10px] text-[#A1A1AA] mt-1.5">
                  Valid on all master editions
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
