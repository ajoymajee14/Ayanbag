import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Check, DollarSign } from 'lucide-react';
import { WatchProduct } from '../../types';

interface ProductFormModalProps {
  product: WatchProduct | null; // null for add, object for edit
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: WatchProduct) => void;
}

const PRESET_IMAGES = [
  {
    title: 'Oyster Diver (Black)',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Tapisserie Blue Chrono',
    url: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Open-Work Skeleton Steel',
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Panda Racing Chrono',
    url: 'https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Dual-Time Pilot Jubilee',
    url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Aviator Square Skeleton',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop'
  }
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<WatchProduct>>({
    name: '',
    series: '',
    badge: 'Master Edition',
    originalPrice: 16000,
    discountPercentage: 45,
    price: 8800,
    rating: 4.9,
    reviewsCount: 120,
    thumbnail: PRESET_IMAGES[0].url,
    images: [PRESET_IMAGES[0].url],
    description: '',
    movement: 'Japanese 8215 High-Beat Automatic (Sweeping Second Hand)',
    caseMaterial: 'Solid 904L Surgical-Grade Oystersteel',
    bezel: 'Unidirectional Rotating Cerachrom Ceramic (120 Clicks)',
    glass: 'Scratch-Proof Synthetic Sapphire Crystal with AR Coating',
    dialDiameter: '40 mm',
    waterResistance: '50m Tested (Daily Waterproof)',
    weight: '155 grams (Exact 1:1 Heavyweight Feel)',
    clasp: 'Folding Oysterlock Safety Clasp with Glidelock Fine-Adjustment',
    category: 'automatic',
    inStock: true,
    stockCount: 5,
    features: [
      '1:1 Laser Engraved Rehaut with Serial Numbers',
      'True Blue Chromalight Luminescent Dial & Hands',
      'Screw-Down Triple Waterproofness Crown'
    ],
    isBestSeller: false,
    isMasterEdition: true
  });

  const [newFeatureText, setNewFeatureText] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        name: '',
        series: '',
        badge: 'New Arrival',
        originalPrice: 16000,
        discountPercentage: 45,
        price: Math.round(16000 * 0.55),
        rating: 5.0,
        reviewsCount: 15,
        thumbnail: PRESET_IMAGES[0].url,
        images: [PRESET_IMAGES[0].url],
        description: 'Handcrafted 1:1 master copy with high-precision automatic mechanical movement, 904L surgical stainless steel, and diamond-hard sapphire crystal.',
        movement: 'Japanese 8215 High-Beat Automatic (Sweeping Second Hand)',
        caseMaterial: 'Solid 904L Surgical-Grade Oystersteel',
        bezel: 'Cerachrom High-Tech Ceramic Bezel',
        glass: 'Anti-Reflective Double-Coated Sapphire Crystal',
        dialDiameter: '41 mm',
        waterResistance: '50m Tested Daily Resistance',
        weight: '155 grams',
        clasp: 'Oysterlock Safety Clasp with Comfort Extension',
        category: 'automatic',
        inStock: true,
        stockCount: 5,
        features: [
          '1:1 Precision Laser Engraved Rehaut',
          'High-Intensity Luminescent Markers & Hands',
          'Triple Waterproof Screw-Down Crown'
        ],
        isBestSeller: false,
        isMasterEdition: true
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Auto calculate discounted sale price when original price or discount% changes
  const handleOriginalPriceChange = (origPrice: number) => {
    const discount = formData.discountPercentage ?? 45;
    const salePrice = Math.round(origPrice * ((100 - discount) / 100));
    setFormData(prev => ({
      ...prev,
      originalPrice: origPrice,
      price: salePrice
    }));
  };

  const handleDiscountPercentChange = (discount: number) => {
    const origPrice = formData.originalPrice ?? 16000;
    const salePrice = Math.round(origPrice * ((100 - discount) / 100));
    setFormData(prev => ({
      ...prev,
      discountPercentage: discount,
      price: salePrice
    }));
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeatureText.trim()]
      }));
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.series) return;

    const generatedId = product ? product.id : `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;

    const finalProduct: WatchProduct = {
      id: generatedId,
      name: formData.name || 'Untitled Master Watch',
      series: formData.series || 'Master Edition',
      badge: formData.badge || '',
      price: Number(formData.price) || 8999,
      originalPrice: Number(formData.originalPrice) || 16400,
      discountPercentage: Number(formData.discountPercentage) || 45,
      rating: Number(formData.rating) || 4.9,
      reviewsCount: Number(formData.reviewsCount) || 10,
      thumbnail: formData.thumbnail || PRESET_IMAGES[0].url,
      images: formData.images && formData.images.length > 0 ? formData.images : [formData.thumbnail || PRESET_IMAGES[0].url],
      description: formData.description || '',
      movement: formData.movement || 'Japanese Automatic Caliber',
      caseMaterial: formData.caseMaterial || '904L Surgical Steel',
      bezel: formData.bezel || 'Cerachrom Ceramic',
      glass: formData.glass || 'Sapphire Crystal',
      dialDiameter: formData.dialDiameter || '41 mm',
      waterResistance: formData.waterResistance || '50m',
      weight: formData.weight || '155 grams',
      clasp: formData.clasp || 'Oysterlock Clasp',
      category: formData.category || 'automatic',
      inStock: formData.inStock ?? true,
      stockCount: Number(formData.stockCount) ?? 5,
      features: formData.features || [],
      isBestSeller: formData.isBestSeller || false,
      isMasterEdition: formData.isMasterEdition ?? true,
      sku: `AYAN-SKU-${generatedId.slice(0, 8).toUpperCase()}`,
      createdAt: product?.createdAt || new Date().toISOString()
    };

    onSave(finalProduct);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0B0F17] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {product ? `Edit Watch: ${product.name}` : 'Add New Master Edition Watch'}
              </h3>
              <p className="text-xs text-slate-400">
                1:1 Precision specification catalog entry & stock controller
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Row 1: Model Title & Series / Brand Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Model Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Submariner Master Edition"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Series / Brand Style <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oyster Professional 41mm"
                value={formData.series || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, series: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Row 2: Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Horological Category</label>
              <select
                value={formData.category || 'automatic'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="automatic">Automatic Calibre</option>
                <option value="chronograph">Chronograph (Multi-Dial)</option>
                <option value="skeleton">Skeleton Haute Horlogerie</option>
                <option value="diver">Diver Professional</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Marketing Badge</label>
              <input
                type="text"
                placeholder="e.g. Trending #1, Most Popular"
                value={formData.badge || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Dial Size (Diameter)</label>
              <input
                type="text"
                placeholder="e.g. 40 mm, 41 mm"
                value={formData.dialDiameter || '41 mm'}
                onChange={(e) => setFormData(prev => ({ ...prev, dialDiameter: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Row 3: Pricing & Instant 45% Calculation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Pricing & Discount Engine
              </span>
              <span className="text-[10px] text-slate-400">AYAN45 Auto Calculated</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Original Base MRP (₹)</label>
                <input
                  type="number"
                  min="1000"
                  step="100"
                  value={formData.originalPrice || 16000}
                  onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Discount Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={formData.discountPercentage || 45}
                  onChange={(e) => handleDiscountPercentChange(Number(e.target.value))}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2 text-[#D4AF37] font-bold font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Final Customer Price (₹)</label>
                <div className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-[#10B981] font-bold font-mono text-sm flex items-center justify-between">
                  <span>₹{formData.price?.toLocaleString('en-IN') || 0}</span>
                  <span className="text-[10px] text-slate-400 font-normal">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Stock & Inventory Management */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Stock Count (Units)</label>
              <input
                type="number"
                min="0"
                value={formData.stockCount ?? 5}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  stockCount: Number(e.target.value),
                  inStock: Number(e.target.value) > 0 
                }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.inStock ?? true}
                  onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
                <span className="ml-2.5 text-xs font-semibold text-slate-300">
                  {formData.inStock ? 'Available in Stock' : 'Out of Stock'}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.isBestSeller ?? false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                <span className="ml-2.5 text-xs font-semibold text-slate-300">
                  Feature as Best Seller
                </span>
              </label>
            </div>
          </div>

          {/* Row 5: Product Image URL & Quick Presets */}
          <div className="space-y-2">
            <label className="text-slate-300 font-semibold block">
              High-Resolution Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.thumbnail || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  thumbnail: e.target.value,
                  images: [e.target.value, ...(prev.images?.slice(1) || [])]
                }))}
                className="flex-1 bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
              {formData.thumbnail && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-black shrink-0">
                  <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>

            {/* Quick Luxury Presets Picker */}
            <div className="pt-1.5">
              <span className="text-[10px] text-slate-400 block mb-1">Quick Select Luxury Watch Preset Photo:</span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      thumbnail: preset.url,
                      images: [preset.url]
                    }))}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] border shrink-0 transition-all cursor-pointer ${
                      formData.thumbnail === preset.url
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3 text-[#D4AF37]" />
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 6: Detailed Horological Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Movement Type</label>
              <input
                type="text"
                value={formData.movement || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, movement: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Case Steel Material</label>
              <input
                type="text"
                value={formData.caseMaterial || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, caseMaterial: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Bezel Material</label>
              <input
                type="text"
                value={formData.bezel || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, bezel: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Glass / Crystal</label>
              <input
                type="text"
                value={formData.glass || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, glass: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Wrist Weight</label>
              <input
                type="text"
                value={formData.weight || '155 grams'}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Clasp Mechanism</label>
              <input
                type="text"
                value={formData.clasp || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, clasp: e.target.value }))}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Row 7: Description */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Description & Craftsmanship Details</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Row 8: Key Features Bullet Points */}
          <div className="space-y-2">
            <label className="text-slate-300 font-semibold block">Key Features</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 1:1 Laser Engraved Rehaut with Serial Numbers"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 bg-[#0B0F17] border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.features?.map((feat, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="p-4 border-t border-slate-800 bg-[#0B0F17] -mx-6 -mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{product ? 'Save & Update Watch' : 'Publish Watch to Catalog'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
