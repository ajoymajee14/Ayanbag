import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { Order, StoreInfo } from '../../types';

interface WhatsAppTrackingModalProps {
  order: Order | null;
  storeInfo: StoreInfo;
  onClose: () => void;
  onMarkWhatsAppSent: (orderId: string) => void;
}

export const WhatsAppTrackingModal: React.FC<WhatsAppTrackingModalProps> = ({
  order,
  storeInfo,
  onClose,
  onMarkWhatsAppSent
}) => {
  if (!order) return null;

  const rawPhone = order.customerPhone.replace(/[^0-9]/g, '');
  const formattedWhatsAppNumber = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone}`;

  const defaultMessage = `Hello ${order.customerName}! ⌚✨

Thank you for choosing *Ayanbag Luxury Horology*.

Your master edition watch order *#${order.orderNumber}* has been prepared and packed with care.

📦 *Order Details:*
• Watch: *${order.items.map(i => `${i.productName} (${i.quantity}x)`).join(', ')}*
• Packaging: Luxury Wooden Presentation Box + Microfiber Polish Cloth
• Payment Mode: *${order.paymentMode === 'cod' ? `Cash on Delivery (₹${order.totalAmount.toLocaleString('en-IN')})` : 'Paid Online (Prepaid)'}*

🚚 *Dispatch & Tracking Details:*
• Courier: ${order.courierPartner || 'BlueDart Air Express'}
• AWB Tracking ID: *${order.trackingNumber || 'BLUEDART-AWB-948' + order.id.slice(-4)}*
• Live Track: https://www.bluedart.com/tracking?awb=${order.trackingNumber || 'BLUEDART-AWB-948' + order.id.slice(-4)}

🎥 *Unboxing Guarantee:*
Your personal timegrapher calibration & 1:1 sapphire scratch-resistance inspection video is archived under your order ID. Please make a 360° unboxing video when accepting the parcel from the delivery agent.

If you have any questions, reply here or call our New Delhi showroom at *${storeInfo.phone}*.

Warm regards,
*Ayanbag Dispatch Team*
${storeInfo.addressLine1}, Jamia Nagar, Okhla, New Delhi`;

  const [message, setMessage] = useState(defaultMessage);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    onMarkWhatsAppSent(order.id);
    const url = `https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0B0F17] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Dispatch WhatsApp Tracking Dispatcher
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                To: {order.customerName} ({order.customerPhone})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Editor Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Edit WhatsApp Dispatch Template:</span>
            <span className="text-[11px] text-[#D4AF37] font-mono font-semibold">
              AWB: {order.trackingNumber || 'Auto-generated'}
            </span>
          </div>

          <textarea
            rows={11}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30"
          />

          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Includes live courier tracking link & unboxing disclaimer</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold px-2.5 py-1 bg-slate-800 rounded border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#0B0F17] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Direct via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
