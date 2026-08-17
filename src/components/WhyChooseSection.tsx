import React from 'react';
import { ShieldCheck, Cog, Store, Truck, Sparkles, Check, X, Award } from 'lucide-react';
import { COMPARISON_POINTS } from '../data/products';

export const WhyChooseSection: React.FC = () => {
  const valueProps = [
    {
      icon: ShieldCheck,
      title: "1:1 Weight & Finishing",
      subtitle: "Surgical Grade 904L Steel",
      desc: "Machined from solid surgical grade stainless steel and scratch-proof synthetic sapphire crystal. Gram-for-gram identical weight on the wrist."
    },
    {
      icon: Cog,
      title: "Real Automatic Movements",
      subtitle: "Fluid Sweeping Hands",
      desc: "High-beat Japanese Miyota & Swiss ETA clone calibres with 21,600 vph smooth sweeping second hands. Zero cheap quartz battery ticking."
    },
    {
      icon: Store,
      title: "Physical Store Verification",
      subtitle: "Flagship Walk-in Boutique",
      desc: "Visit our physical store in Jamia Nagar, Okhla, New Delhi. Try, inspect under horological loupes, and test before taking it home."
    },
    {
      icon: Truck,
      title: "Pan-India Express COD",
      subtitle: "Discreet & Insured Delivery",
      desc: "Air dispatched within 24 hours via Bluedart. Pay comfortably at your doorstep with Cash On Delivery or UPI upon unboxing."
    }
  ];

  return (
    <section id="why-choose" className="py-16 sm:py-24 bg-[#1A1A1A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              The Master Benchmark
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            Why Discerning Collectors <span className="italic text-[#D4AF37]">Choose Ayanbag</span>
          </h2>

          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
            The replica market is flooded with flimsy, lightweight alloys. Ayanbag stands apart through genuine horological grade materials and transparent physical store accountability.
          </p>
        </div>

        {/* 4 Pillars Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0D0D0D] border border-white/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  {prop.subtitle}
                </span>

                <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2">
                  {prop.title}
                </h3>

                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Master Copy vs Market Cheap Table Comparison */}
        <div className="bg-white/5 rounded-xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Ayanbag 1:1 Master Copies vs. Ordinary Market Copies
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Know what you are paying for before purchasing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[#A1A1AA] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold w-1/4">Specification</th>
                  <th className="py-3 px-4 font-bold text-[#D4AF37] bg-[#D4AF37]/10 rounded-t-lg w-2/5">
                    ✨ Ayanbag Master 1:1 Edition
                  </th>
                  <th className="py-3 px-4 font-semibold text-zinc-500 w-1/3">
                    Ordinary Market Copies
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_POINTS.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-zinc-200">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 font-medium text-white bg-[#D4AF37]/5">
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{row.ayanbag}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#A1A1AA]">
                      <div className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.marketCheap}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
