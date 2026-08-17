import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles, Send, CheckCircle2, Shield, Video, HelpCircle } from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../data/products';

export const WhatsAppOrderSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [orderType, setOrderType] = useState<'cod' | 'prepaid' | 'walkin'>('cod');
  const [customNote, setCustomNote] = useState('');

  // Generate customized WhatsApp Message
  const buildWhatsAppMessage = () => {
    let msg = `*NEW WATCH ORDER / INQUIRY - AYANBAG*\n\n`;
    msg += `• *Watch Model:* ${selectedProduct}\n`;
    if (customerName.trim()) msg += `• *Customer Name:* ${customerName.trim()}\n`;
    if (city.trim()) msg += `• *Delivery City:* ${city.trim()}\n`;
    msg += `• *Payment Preference:* ${orderType === 'cod' ? 'Cash on Delivery (COD)' : orderType === 'prepaid' ? 'Prepaid UPI / Discount' : 'Store Walk-in Verification'}\n`;
    if (customNote.trim()) msg += `• *Note:* ${customNote.trim()}\n`;
    msg += `\nPlease confirm final 45% discount pricing (Code: AYAN45), available stock, and dispatch timeline.`;
    return msg;
  };

  const whatsappLink = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  return (
    <section id="whatsapp-ordering" className="py-16 sm:py-24 bg-[#1A1A1A] border-t border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-white/5 rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="uppercase tracking-widest text-[9px]">Instant WhatsApp Concierge</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight">
                Order Instantly via <span className="italic text-[#D4AF37]">WhatsApp</span>
              </h2>

              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Connect directly with our master horologist on <span className="text-white font-bold font-mono">+91 9354518944</span>. Receive actual photos, live timegrapher tests, and 1-click order confirmation.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Real unboxing video sent before packing</span>
                </div>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Cash on Delivery (COD) confirmed via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>24/7 dedicated customer care & tracking updates</span>
                </div>
              </div>

            </div>

            {/* Right: Interactive Order Composer */}
            <div className="lg:col-span-6 bg-[#0D0D0D] border border-white/10 p-5 sm:p-6 rounded-xl shadow-xl space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Quick Inquiry Builder
                </span>
                <span className="text-[10px] text-[#D4AF37] font-medium font-mono">
                  +91 9354518944
                </span>
              </div>

              {/* Watch Selector */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#A1A1AA] font-medium">
                  Select Watch Model:
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name} className="bg-[#1A1A1A] text-white">
                      {p.name} ({p.series}) — ₹{p.price.toLocaleString('en-IN')}
                    </option>
                  ))}
                  <option value="Custom Request / Other Model" className="bg-[#1A1A1A] text-white">
                    Other / Custom Luxury Model Inquiry
                  </option>
                </select>
              </div>

              {/* Name & City in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#A1A1AA] font-medium">Your Name (Optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Verma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#A1A1AA] font-medium">Delivery City:</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi / Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Payment / Order Preference */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#A1A1AA] font-medium">Preference:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('cod')}
                    className={`py-2 px-1 rounded border text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      orderType === 'cod'
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : 'bg-white/5 border-white/10 text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    COD
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('prepaid')}
                    className={`py-2 px-1 rounded border text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      orderType === 'prepaid'
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : 'bg-white/5 border-white/10 text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Prepaid
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('walkin')}
                    className={`py-2 px-1 rounded border text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      orderType === 'walkin'
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : 'bg-white/5 border-white/10 text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Store Walk-in
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <a
                id="btn-submit-custom-whatsapp-order"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-wider transition-all duration-200 shadow-md text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send WhatsApp Order Inquiry</span>
              </a>

              <p className="text-center text-[10px] text-[#A1A1AA]">
                Average reply time: Under 5 minutes on WhatsApp
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
