import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2, Calendar, Shield, Sparkles, Building2 } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface StoreLocatorSectionProps {
  onBookAppointment: () => void;
}

export const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({
  onBookAppointment,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fullAddress = `${STORE_INFO.addressLine1}, ${STORE_INFO.landmark}, ${STORE_INFO.area}, ${STORE_INFO.city} - ${STORE_INFO.pincode}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="store-locator" className="py-16 sm:py-24 bg-[#0D0D0D] relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Physical Boutique
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            Visit Our New Delhi <span className="italic text-[#D4AF37]">Boutique</span>
          </h2>

          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
            Experience our 1:1 master copy collection in person. Hold the weight, test the rotating bezels, and verify mechanical movements with our horology experts.
          </p>
        </div>

        {/* Store Detail & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Store Card & Contact Info */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 shadow-2xl space-y-6">
            
            <div className="space-y-6">
              
              {/* Boutique Name & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                    Ayanbag Flagship
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Okhla South Delhi Boutique
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open Today</span>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0D0D0D] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-semibold block">
                    Physical Store Address:
                  </span>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {STORE_INFO.addressLine1}, <span className="text-[#D4AF37] font-semibold">{STORE_INFO.landmark}</span>, {STORE_INFO.area}, {STORE_INFO.city} - {STORE_INFO.pincode}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    {copiedAddress ? "✓ Full Address Copied" : "Copy Complete Address"}
                  </button>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">Call Store:</span>
                    <a 
                      href={`tel:${STORE_INFO.phone}`} 
                      className="text-sm font-bold text-white hover:text-[#D4AF37] font-mono"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">WhatsApp Direct:</span>
                    <a 
                      href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hi Ayanbag, I am planning to visit your Delhi store. Please confirm today's opening time and store staff availability.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-400 hover:underline font-mono"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

              </div>

              {/* Visiting Hours & Verification Guarantee */}
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-semibold text-white block">
                    Visiting Hours: {STORE_INFO.timings}
                  </span>
                  <p className="text-[#A1A1AA]">
                    {STORE_INFO.openDays}. Nearby parking available. Located 50m from Bikanerwala on High Tension Road.
                  </p>
                </div>
              </div>

            </div>

            {/* CTAs: Directions + Appointment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              
              <a
                id="btn-get-directions-google-maps"
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962D] text-black font-bold py-3 px-4 rounded text-[11px] uppercase tracking-wider transition-all duration-200 shadow-md text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <button
                id="btn-book-walkin-consultation"
                onClick={onBookAppointment}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold py-3 px-4 rounded text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book VIP Inspection</span>
              </button>

            </div>

          </div>

          {/* Right: Map Embed Simulation & Landmarks */}
          <div className="lg:col-span-6 flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative min-h-[380px]">
            
            {/* Map Frame Header */}
            <div className="bg-[#1A1A1A] p-3.5 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">Okhla / Jamia Nagar Location View</span>
              </div>
              <span className="text-[#A1A1AA] text-[11px]">Pin: 110025</span>
            </div>

            {/* Embedded Interactive Map Frame */}
            <div className="relative flex-1 w-full min-h-[320px] bg-[#0A0A0A]">
              <iframe
                title="Ayanbag Store Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.678772097017!2d77.2831!3d28.552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3895e69e3cb%3A0x6b87db68164ba01e!2sJamia%20Nagar%2C%20Okhla%2C%20New%20Delhi%2C%20Delhi%20110025!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-lg shadow-xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Ayanbag Horology Boutique</span>
                  <span className="text-[#A1A1AA] text-[11px]">Near Bikanerwala, Thokar No. 9, High Tension Rd</span>
                </div>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D4AF37] text-black font-bold px-3 py-1.5 rounded text-[10px] uppercase tracking-wider shrink-0"
                >
                  Open Maps
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
