import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Calendar,
  Save
} from 'lucide-react';
import { StoreInfo } from '../../types';

interface AdminStoreSettingsProps {
  storeInfo: StoreInfo;
  onUpdateStoreInfo: (updated: Partial<StoreInfo>) => void;
}

export const AdminStoreSettings: React.FC<AdminStoreSettingsProps> = ({
  storeInfo,
  onUpdateStoreInfo
}) => {
  const [formData, setFormData] = useState<StoreInfo>({ ...storeInfo });
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreInfo(formData);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
            Store Profile, Boutique Location & WhatsApp Sync
          </h2>
          <p className="text-xs text-slate-400">
            Changes saved here immediately update the customer-facing storefront, contact cards, and Google Maps embed
          </p>
        </div>

        {saveStatus && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-xl text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Store Profile Synced!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Section 1: Physical Flagship Showroom & Address */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                New Delhi Flagship Showroom Details
              </h3>
              <p className="text-slate-400 text-[11px]">
                Physical boutique location for customer walk-in inspections and counter delivery
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Store / Brand Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Address Line 1 (Road / Building)</label>
              <input
                type="text"
                required
                value={formData.addressLine1}
                onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Landmark</label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Area & Locality</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">City & State</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Postal Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Numbers & WhatsApp Dispatch Integration */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Official Support & WhatsApp Dispatch Webhook
              </h3>
              <p className="text-slate-400 text-[11px]">
                Customer helpline and automated order tracking notification phone numbers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Official Support Phone
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                WhatsApp Hotline (+91 with country code)
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#25D366]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Official Support Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Boutique Operating Timings
              </label>
              <input
                type="text"
                value={formData.timings}
                onChange={(e) => setFormData(prev => ({ ...prev, timings: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: VIP Walk-in Appointments Config */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  VIP Showroom Walk-in Booking Scheduler
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Allows customers on the live storefront to reserve a private inspection session
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enableAppointments ?? true}
                onChange={(e) => setFormData(prev => ({ ...prev, enableAppointments: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Max Daily Appointment Slots</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.maxDailyAppointments || 12}
                onChange={(e) => setFormData(prev => ({ ...prev, maxDailyAppointments: Number(e.target.value) }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Working Days</label>
              <input
                type="text"
                value={formData.openDays}
                onChange={(e) => setFormData(prev => ({ ...prev, openDays: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Settings Everywhere</span>
          </button>
        </div>

      </form>
    </div>
  );
};
