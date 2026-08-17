import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, MessageCircle, ShoppingBag, Truck, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { WatchProduct } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductQuickViewModalProps {
  product: WatchProduct | null;
  onClose: () => void;
  onAddToCart: (product: WatchProduct, boxOption?: 'standard' | 'luxury_wood_box' | 'full_set_papers') => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedBox, setSelectedBox] = useState<'standard' | 'luxury_wood_box' | 'full_set_papers'>('luxury_wood_box');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedBox);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const whatsappMessage = `Hi Ayanbag Horology, I would like to order the 1:1 "${product.name}" (${product.series}) with ${selectedBox.replace(/_/g, ' ')}. Price: ₹${product.price.toLocaleString('en-IN')}. Please share bank/UPI details or confirm COD.`;
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div 
      id="product-quick-view-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-quick-view"
          onClick={onClose}
          aria-label="Close product quick view"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery & Angles */}
            <div className="md:col-span-6 space-y-4">
              
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black/80 border border-white/10">
                <img
                  src={product.images[selectedImgIndex] || product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  45% OFF
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-16 h-16 rounded overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        selectedImgIndex === idx ? 'border-[#D4AF37] scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust Guarantee */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Ayanbag 100% Quality Assurance</span>
                </div>
                <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                  Real sapphire scratch test and Japanese automatic timegrapher calibration video provided prior to final dispatch.
                </p>
              </div>

            </div>

            {/* Right: Horological Details & Order Actions */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
                  {product.series}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  {product.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white font-mono">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-[#A1A1AA]">
                    ({product.reviewsCount} verified owner reviews)
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">Master Edition Price:</span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#A1A1AA] line-through font-mono">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold">
                    Free Air Express + COD
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {product.description}
              </p>

              {/* Horological Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Horological Specifications (1:1 Master Copy)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Movement:</span>
                    <span className="text-white font-medium">{product.movement}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Case Steel:</span>
                    <span className="text-white font-medium">{product.caseMaterial}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Glass / Crystal:</span>
                    <span className="text-white font-medium">{product.glass}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Bezel:</span>
                    <span className="text-white font-medium">{product.bezel}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Wrist Weight:</span>
                    <span className="text-[#D4AF37] font-semibold">{product.weight}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[10px]">Clasp:</span>
                    <span className="text-white font-medium">{product.clasp}</span>
                  </div>
                </div>
              </div>

              {/* Packaging Options */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Select Packaging Edition:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedBox('luxury_wood_box')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                      selectedBox === 'luxury_wood_box' 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' 
                        : 'border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    <span className="font-semibold block text-white text-xs">Luxury Wooden Box</span>
                    <span className="text-[10px] text-[#D4AF37]">Complimentary (Included)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBox('full_set_papers')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                      selectedBox === 'full_set_papers' 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' 
                        : 'border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    <span className="font-semibold block text-white text-xs">Full Brand Kit + Card</span>
                    <span className="text-[10px] text-[#A1A1AA]">Card, booklet & tag included</span>
                  </button>
                </div>
              </div>

              {/* Actions: Direct WhatsApp & Add to Cart */}
              <div className="space-y-2.5 pt-2">
                <a
                  id="modal-btn-whatsapp-order"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded text-xs tracking-wide uppercase transition-all duration-200 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order Now on WhatsApp (+91 9354518944)</span>
                </a>

                <button
                  id="modal-btn-add-to-cart"
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    added
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                      : 'bg-transparent hover:bg-white/5 border-white/20 text-white hover:border-[#D4AF37]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add to Bag / Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Service Badges */}
              <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37]" /> 2-4 Days Express Delivery
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" /> 7-Day Replacement
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
