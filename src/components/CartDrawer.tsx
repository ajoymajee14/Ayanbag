import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Ticket, Check, MessageCircle, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('AYAN45');
  const [couponApplied, setCouponApplied] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'cod' | 'prepaid' | 'store_pickup'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const discountedSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalSavings = rawSubtotal - discountedSubtotal;
  const extraPrepaidDiscount = paymentMode === 'prepaid' ? Math.round(discountedSubtotal * 0.05) : 0;
  const finalPayable = discountedSubtotal - extraPrepaidDiscount;

  const handleCheckoutWhatsApp = () => {
    let message = `*AYANBAG HOROLOGY - NEW LUXURY BAG CHECKOUT*\n\n`;
    
    if (customerName.trim()) {
      message += `• *Customer Name:* ${customerName.trim()}\n`;
    }
    if (shippingAddress.trim()) {
      message += `• *Shipping Address:* ${shippingAddress.trim()}\n`;
    }

    message += `• *Payment Method:* ${paymentMode === 'cod' ? 'Cash On Delivery (COD)' : paymentMode === 'prepaid' ? 'Prepaid UPI (+5% Extra Discount)' : 'Store Walk-in Inspection (Jamia Nagar, Delhi)'}\n\n`;
    
    message += `*ORDERED ITEMS:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (Qty: ${item.quantity})\n`;
      message += `   - Series: ${item.product.series}\n`;
      message += `   - Packaging: ${item.selectedBox || 'Luxury Wooden Box'}\n`;
      message += `   - Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    message += `---------------------------------\n`;
    message += `*Original Total:* ₹${rawSubtotal.toLocaleString('en-IN')}\n`;
    message += `*Discount (Code: AYAN45):* -₹${totalSavings.toLocaleString('en-IN')} (45% OFF)\n`;
    if (extraPrepaidDiscount > 0) {
      message += `*Prepaid 5% Off:* -₹${extraPrepaidDiscount.toLocaleString('en-IN')}\n`;
    }
    message += `*Express Delivery:* FREE\n`;
    message += `*FINAL PAYABLE AMOUNT:* ₹${finalPayable.toLocaleString('en-IN')}\n`;
    message += `---------------------------------\n\n`;
    message += `Please confirm stock reservation and send the dispatch unboxing video.`;

    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#1A1A1A] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-normal text-white">
              Your Luxury Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#A1A1AA]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base text-zinc-300">Your bag is currently empty</h4>
              <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto">
                Explore our 1:1 master copy timepieces and enjoy flat 45% discount with code AYAN45.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-5 py-2.5 rounded text-xs uppercase tracking-wider cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-18 h-18 rounded object-cover bg-black border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate font-serif">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A1A1AA] hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] text-[#D4AF37] block font-mono">
                      {item.product.series}
                    </span>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-white font-serif">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#A1A1AA] line-through font-mono">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-white/10 bg-black/50 rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold">
                        45% Applied
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              {/* Coupon Box */}
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-[#D4AF37] font-semibold text-[10px] uppercase tracking-wider">
                    <Ticket className="w-3.5 h-3.5" /> 45% Master Code Active
                  </span>
                  <span className="font-mono font-bold text-white">AYAN45</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#A1A1AA]">
                  <span>Total discount saving:</span>
                  <span className="text-[#D4AF37] font-bold font-mono">
                    -₹{totalSavings.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Quick Checkout Info Fields */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white block">
                  Delivery & Payment Preference
                </span>

                <input
                  type="text"
                  placeholder="Your Full Name (for parcel label)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
                />

                <textarea
                  placeholder="Complete Delivery Address & City (with Pincode)"
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded p-2.5 focus:outline-none focus:border-[#D4AF37]"
                />

                {/* Payment Option Radio Pills */}
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('cod')}
                    className={`p-2 rounded border text-center uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      paymentMode === 'cod'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                        : 'border-white/10 bg-white/5 text-[#A1A1AA]'
                    }`}
                  >
                    COD
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('prepaid')}
                    className={`p-2 rounded border text-center uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      paymentMode === 'prepaid'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                        : 'border-white/10 bg-white/5 text-[#A1A1AA]'
                    }`}
                  >
                    Prepaid (5% Off)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('store_pickup')}
                    className={`p-2 rounded border text-center uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      paymentMode === 'store_pickup'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                        : 'border-white/10 bg-white/5 text-[#A1A1AA]'
                    }`}
                  >
                    Store Pickup
                  </button>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Footer with Totals & Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0D0D0D] space-y-3">
            
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-[#A1A1AA]">
              <div className="flex justify-between">
                <span>Original Bag Value</span>
                <span className="font-mono line-through text-zinc-500">
                  ₹{rawSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#D4AF37] font-medium">
                <span>Discount (AYAN45)</span>
                <span className="font-mono">-₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              {extraPrepaidDiscount > 0 && (
                <div className="flex justify-between text-[#D4AF37] font-medium">
                  <span>Prepaid UPI Bonus (5%)</span>
                  <span className="font-mono">-₹{extraPrepaidDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="text-[#D4AF37] font-semibold">FREE (Pan-India)</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-white">
                <span className="font-bold text-sm font-serif">Final Payable:</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">
                  ₹{finalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <button
              id="btn-drawer-checkout-whatsapp"
              onClick={handleCheckoutWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#A1A1AA]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Unboxing video sent before dispatch • 7-Day Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
