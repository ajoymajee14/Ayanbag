import React, { useState, useMemo } from 'react';
import { Search, X, Star, Eye, ShoppingBag } from 'lucide-react';
import { WatchProduct } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: WatchProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.series.toLowerCase().includes(q) ||
      p.movement.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.caseMaterial.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div 
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0D0D0D]">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <input
            type="text"
            placeholder="Search master editions by model (Submariner, Daytona, Royal Oak, Skeleton)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A1A1AA] px-1">
            <span>Showing {filtered.length} master models</span>
            <span className="text-[11px] text-[#D4AF37] font-semibold">Code AYAN45 (45% OFF)</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#A1A1AA] text-sm">
              No matching master models found for "{query}". Try "Daytona", "Submariner", or "Royal Oak".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/60 p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover bg-black border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block truncate font-mono">
                      {product.series}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate font-serif">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs font-bold text-white font-serif">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#A1A1AA] line-through font-mono">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
