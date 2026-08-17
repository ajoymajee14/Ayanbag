import React, { useState } from 'react';
import { Star, MessageCircle, ShoppingBag, Eye, Check, Shield, Award } from 'lucide-react';
import { WatchProduct } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductCardProps {
  product: WatchProduct;
  onQuickView: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = `Hi Ayanbag, I want to order the "${product.name}" (${product.series}) at discounted price ₹${product.price.toLocaleString('en-IN')}. Please confirm availability and shipping details.`;
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#0D0D0D] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        
        {/* Main Image with Zoom on Hover */}
        <img
          src={product.images[activeImageIndex] || product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#D4AF37] text-black font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
            45% OFF
          </span>
          {product.badge && (
            <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          aria-label={`Quick view ${product.name}`}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#D4AF37] border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Thumbnail Dots on hover if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-[#D4AF37] w-4' : 'bg-zinc-500 hover:bg-zinc-300'
                }`}
                aria-label={`Show image angle ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Series & Category */}
          <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
            <span className="tracking-wider uppercase text-[10px] text-[#D4AF37] font-semibold">
              {product.series}
            </span>
            <span className="text-[10px] text-[#A1A1AA] font-mono">
              {product.dialDiameter}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-[#D4AF37] group-hover:text-white transition-colors font-bold text-sm sm:text-base line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Key Specs Pill */}
          <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
            {product.movement} • {product.caseMaterial}
          </p>

          {/* Star Rating & Verified Count */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flex items-center text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-zinc-600'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-white font-mono">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-[#A1A1AA]">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          
          {/* Prices */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-white font-mono">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#A1A1AA] line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-[#D4AF37] font-medium bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded">
              -45% OFF
            </span>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            
            {/* Direct WhatsApp Quick Buy */}
            <a
              id={`btn-whatsapp-buy-${product.id}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-200 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="truncate">WA Buy</span>
            </a>

            {/* Add to Cart */}
            <button
              id={`btn-add-to-cart-${product.id}`}
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                isAdded 
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
                  : 'bg-white/5 hover:bg-white/10 border-white/20 text-white hover:border-[#D4AF37]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">Add to Cart</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
