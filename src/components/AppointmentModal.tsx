import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_INFO, PRODUCTS } from '../data/products';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('04:00 PM');
  const [preferredModel, setPreferredModel] = useState('Submariner Master Edition');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);

    const message = `*VIP WALK-IN STORE APPOINTMENT - AYANBAG*\n\n` +
      `• *Client Name:* ${name || 'Valued Collector'}\n` +
      `• *Phone:* ${phone}\n` +
      `• *Date of Visit:* ${preferredDate || 'Tomorrow'}\n` +
      `• *Preferred Time:* ${preferredTime}\n` +
      `• *Watch Model to Inspect:* ${preferredModel}\n` +
      `• *Location:* Thokar No. 9, High Tension Road, Jamia Nagar, Okhla, New Delhi\n\n` +
      `Please reserve the piece for live inspection at the boutique.`;

    const waUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
      setIsBooked(false);
    }, 1200);
  };

  return (
    <div 
      id="appointment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close VIP Appointment Modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6 text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Delhi Flagship Boutique
          </span>
          <h3 className="font-serif text-2xl font-normal text-white">
            Book VIP Walk-in Inspection
          </h3>
          <p className="text-xs text-[#A1A1AA]">
            Hold, wear, and inspect your preferred master edition under horological lighting with our store specialists.
          </p>
        </div>

        {isBooked ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif text-lg font-bold text-white">
              Appointment Slot Reserved!
            </h4>
            <p className="text-xs text-[#A1A1AA]">
              Redirecting to WhatsApp to send your instant store pass...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-white font-medium block mb-1 text-[11px]">Your Full Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Sameer Kapoor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-1 text-[11px]">WhatsApp / Phone Number:</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white font-medium block mb-1 text-[11px]">Preferred Date:</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded p-2 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-white font-medium block mb-1 text-[11px]">Preferred Time:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded p-2 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="12:00 PM" className="bg-[#1A1A1A] text-white">12:00 PM (Afternoon)</option>
                  <option value="02:30 PM" className="bg-[#1A1A1A] text-white">02:30 PM (Afternoon)</option>
                  <option value="04:30 PM" className="bg-[#1A1A1A] text-white">04:30 PM (Evening)</option>
                  <option value="07:00 PM" className="bg-[#1A1A1A] text-white">07:00 PM (Evening)</option>
                  <option value="09:00 PM" className="bg-[#1A1A1A] text-white">09:00 PM (Late Night)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white font-medium block mb-1 text-[11px]">Model You Wish to Inspect:</label>
              <select
                value={preferredModel}
                onChange={(e) => setPreferredModel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
              >
                {PRODUCTS.map(p => (
                  <option key={p.id} value={p.name} className="bg-[#1A1A1A] text-white">{p.name} ({p.series})</option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold py-3 px-4 rounded uppercase tracking-wider text-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Store Appointment & Get Pass</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-[#A1A1AA]">
              Address: Thokar No. 9, High Tension Road, Jamia Nagar, Okhla (Near Bikanerwala), New Delhi
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
