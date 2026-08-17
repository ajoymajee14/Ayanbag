import React, { useState, useMemo } from 'react';
import { WatchProduct } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown, CheckCircle2 } from 'lucide-react';

interface ProductShowcaseProps {
  products: WatchProduct[];
  onQuickView: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'diver', label: 'Diver & Automatic' },
    { id: 'chronograph', label: 'Chronographs' },
    { id: 'skeleton', label: 'Skeleton Art' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="collections" className="py-16 sm:py-20 bg-[#0D0D0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Curated Showcase
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            The Master Edition <span className="italic text-[#D4AF37]">Collection</span>
          </h2>

          <p className="text-[#A1A1AA] text-sm sm:text-base max-w-2xl">
            Each timepiece undergoes 24-point horological calibration: Swiss-standard timegrapher accuracy, ceramic bezel alignment, and waterproof pressure testing.
          </p>

        </div>

        {/* Filter Tabs & Sorting Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1A1A1A] border border-white/10 text-zinc-200 text-xs rounded px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        <div 
          id="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Bottom Verification Guarantee Bar */}
        <div className="mt-14 p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">
                Every Watch Includes Luxury Wooden Box & Authentication Card
              </h4>
              <p className="text-xs text-[#A1A1AA]">
                Pre-tested before dispatch. Live video inspection available on WhatsApp (+91 9354518944).
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/919354518944?text=${encodeURIComponent("Hi Ayanbag, I want to see live video demonstration of your watches in stock.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962D] text-black px-4 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors"
          >
            Request Live Video
          </a>
        </div>

      </div>
    </section>
  );
};
