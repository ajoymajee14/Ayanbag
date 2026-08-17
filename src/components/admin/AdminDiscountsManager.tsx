import React, { useState } from 'react';
import { 
  Tag, 
  Percent, 
  Plus, 
  Sparkles, 
  Check, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Trash2, 
  Eye, 
  Sliders, 
  Megaphone,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Coupon, StoreInfo } from '../../types';

interface AdminDiscountsManagerProps {
  coupons: Coupon[];
  storeInfo: StoreInfo;
  onUpdateStoreInfo: (updated: Partial<StoreInfo>) => void;
  onAddCoupon: (newCoupon: Coupon) => void;
  onToggleCouponActive: (couponId: string, isActive: boolean) => void;
  onDeleteCoupon: (couponId: string) => void;
}

export const AdminDiscountsManager: React.FC<AdminDiscountsManagerProps> = ({
  coupons,
  storeInfo,
  onUpdateStoreInfo,
  onAddCoupon,
  onToggleCouponActive,
  onDeleteCoupon
}) => {
  const [isAddCouponModalOpen, setIsAddCouponModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState<number>(45);
  const [newMinOrder, setNewMinOrder] = useState<number>(5000);
  const [newDescription, setNewDescription] = useState('');
  const [newExpiry, setNewExpiry] = useState('2026-12-31');

  // Announcement Bar state
  const [announcementEnabled, setAnnouncementEnabled] = useState(storeInfo.enableAnnouncement ?? true);
  const [announcementText, setAnnouncementText] = useState(
    storeInfo.announcementText || 'EXCLUSIVE SALE: FLAT 45% OFF ON ALL MASTER COPIES | Use Code: AYAN45 | Free Nationwide Shipping'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAnnouncementSettings = () => {
    onUpdateStoreInfo({
      enableAnnouncement: announcementEnabled,
      announcementText: announcementText
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    const coupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCode.toUpperCase().trim(),
      discountPercentage: Number(newDiscount),
      minOrderValue: Number(newMinOrder),
      description: newDescription || `${newDiscount}% special discount voucher`,
      isActive: true,
      expiryDate: newExpiry,
      totalRedemptions: 0,
      totalRevenueGenerated: 0
    };

    onAddCoupon(coupon);
    setIsAddCouponModalOpen(false);
    setNewCode('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
            Discounts & Sitewide Campaign Controller
          </h2>
          <p className="text-xs text-slate-400">
            Configure flat 45% discount codes, custom VIP vouchers, and top sticky announcement banners
          </p>
        </div>

        <button
          onClick={() => setIsAddCouponModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon Code</span>
        </button>
      </div>

      {/* 1. Live Sitewide Announcement Bar Controller */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Storefront Top Sticky Announcement Bar
              </h3>
              <p className="text-xs text-slate-400">
                This banner sits on top of the storefront with the animated marquee ticker and AYAN45 copy button
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-[#0B0F17] px-3.5 py-1.5 rounded-xl border border-slate-700">
            <input
              type="checkbox"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#10B981]"></div>
            <span className="text-xs font-semibold text-slate-200">
              {announcementEnabled ? 'Banner Enabled' : 'Banner Hidden'}
            </span>
          </label>
        </div>

        {/* Live Preview of Announcement Bar */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider flex items-center gap-1">
            <Eye className="w-3 h-3" /> Live Storefront Banner Preview:
          </span>
          <div className={`p-2.5 rounded-lg border text-center transition-all ${
            announcementEnabled 
              ? 'bg-gradient-to-r from-[#D4AF37]/15 via-black to-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]' 
              : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-60'
          }`}>
            <span className="text-xs font-bold font-mono tracking-wide">
              {announcementText}
            </span>
          </div>
        </div>

        {/* Text editor */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Banner Announcement Copy
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSaveAnnouncementSettings}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
              <span>{savedSuccess ? 'Updated Storefront!' : 'Apply to Live Store'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Coupons & Promo Codes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#D4AF37]" />
            <span>Active Discount Codes & Redemption Performance</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {coupons.length} Active Rules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupons.map((coup) => (
            <div 
              key={coup.id}
              className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold font-mono text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-700 tracking-wider">
                        {coup.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                        {coup.discountPercentage}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 font-medium">
                      {coup.description}
                    </p>
                  </div>

                  {/* Toggle Active */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={coup.isActive}
                      onChange={(e) => onToggleCouponActive(coup.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>

                {/* Min order & Expiry */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="block text-slate-500 font-mono">Min. Cart Value:</span>
                    <span className="font-bold text-slate-200 font-mono">₹{coup.minOrderValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono">Valid Until:</span>
                    <span className="font-bold text-slate-200 font-mono">{coup.expiryDate}</span>
                  </div>
                </div>
              </div>

              {/* Redemptions & Total Discount Generated */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono">Total Redemptions:</span>
                  <span className="font-mono font-bold text-[#D4AF37] block">
                    {coup.totalRedemptions} Orders Checked Out
                  </span>
                </div>

                {coup.code !== 'AYAN45' && (
                  <button
                    onClick={() => onDeleteCoupon(coup.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isAddCouponModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAddCouponModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200 text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Promotional Coupon</h3>
              <button
                onClick={() => setIsAddCouponModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE50, VIPDELHI"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Min. Cart Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description / Campaign Purpose</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Exclusive 50% discount voucher for Diwali VIP clients"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddCouponModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
