import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  LayoutGrid, 
  List, 
  ArrowUpDown,
  DollarSign,
  Package,
  Layers
} from 'lucide-react';
import { WatchProduct } from '../../types';

interface AdminInventoryManagerProps {
  products: WatchProduct[];
  onOpenAddModal: () => void;
  onOpenEditModal: (product: WatchProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onDuplicateProduct: (product: WatchProduct) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onToggleInStock: (productId: string, inStock: boolean) => void;
  onToggleBestSeller: (productId: string, isBestSeller: boolean) => void;
}

export const AdminInventoryManager: React.FC<AdminInventoryManagerProps> = ({
  products,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProduct,
  onDuplicateProduct,
  onUpdateStock,
  onToggleInStock,
  onToggleBestSeller
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockStatusFilter, setStockStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.movement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      categoryFilter === 'all' || p.category === categoryFilter;

    let matchesStock = true;
    if (stockStatusFilter === 'in_stock') {
      matchesStock = p.inStock && p.stockCount > 0;
    } else if (stockStatusFilter === 'low_stock') {
      matchesStock = p.stockCount > 0 && p.stockCount <= 3;
    } else if (stockStatusFilter === 'out_of_stock') {
      matchesStock = !p.inStock || p.stockCount === 0;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Action & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
            Watch Catalog & Master Inventory
          </h2>
          <p className="text-xs text-slate-400">
            Real-time stock adjustment, automated 45% discount pricing, and 1:1 specification controller
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Master Watch</span>
        </button>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-3.5 shadow-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by watch name, series, movement (Miyota/VK63), or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Categories</option>
              <option value="automatic">Automatic Calibre</option>
              <option value="chronograph">Chronograph</option>
              <option value="skeleton">Skeleton Haute</option>
              <option value="diver">Diver Pro</option>
            </select>

            <select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock Only</option>
              <option value="low_stock">Low Stock (≤3 Units)</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#0B0F17] border border-slate-700 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-slate-800 text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-800 text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
          <span>Showing: <strong className="text-white">{filteredProducts.length}</strong> / {products.length} Models</span>
          <span>•</span>
          <span>Total Stock in Vault: <strong className="text-[#D4AF37]">{products.reduce((acc, p) => acc + p.stockCount, 0)} Units</strong></span>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="border border-slate-800/80 rounded-2xl bg-[#111827] overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Watch & Specs</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Pricing (45% Auto)</th>
                  <th className="p-4">Stock Counter</th>
                  <th className="p-4">Store Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-300">No watch models found</p>
                      <p className="text-xs text-slate-500 mt-1">Try adjusting the search query or category filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                      
                      {/* Watch Thumbnail & Title */}
                      <td className="p-4 align-top">
                        <div className="flex items-start gap-3">
                          <img
                            src={prod.thumbnail}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover bg-black border border-slate-700 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-white text-xs">{prod.name}</h4>
                              {prod.badge && (
                                <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[220px]">
                              {prod.series}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[220px]">
                              {prod.movement}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 align-top">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                          {prod.category}
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          {prod.dialDiameter} • {prod.weight}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="p-4 align-top font-mono">
                        <div className="text-sm font-bold text-[#D4AF37]">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-500 line-through">
                          MRP: ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-[#10B981] font-semibold block">
                          {prod.discountPercentage}% OFF Active
                        </span>
                      </td>

                      {/* Stock Counter with Instant +/- Controls */}
                      <td className="p-4 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onUpdateStock(prod.id, Math.max(0, prod.stockCount - 1))}
                              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center border border-slate-700 cursor-pointer"
                              title="Decrease Stock"
                            >
                              -
                            </button>
                            <span className={`w-10 text-center font-mono font-bold text-xs py-0.5 rounded border ${
                              prod.stockCount <= 3 
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                                : 'bg-slate-900 text-white border-slate-800'
                            }`}>
                              {prod.stockCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateStock(prod.id, prod.stockCount + 1)}
                              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center border border-slate-700 cursor-pointer"
                              title="Increase Stock"
                            >
                              +
                            </button>
                          </div>

                          {prod.stockCount <= 3 && prod.stockCount > 0 && (
                            <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Low Stock
                            </span>
                          )}
                          {prod.stockCount === 0 && (
                            <span className="text-[10px] text-rose-500 font-bold block">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Store Visibility / Status Toggles */}
                      <td className="p-4 align-top">
                        <div className="space-y-2">
                          {/* In Stock Toggle */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={prod.inStock}
                              onChange={(e) => onToggleInStock(prod.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#10B981]"></div>
                            <span className="text-[11px] text-slate-300">
                              {prod.inStock ? 'Published' : 'Hidden'}
                            </span>
                          </label>

                          {/* Best Seller Toggle */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={prod.isBestSeller ?? false}
                              onChange={(e) => onToggleBestSeller(prod.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            <span className="text-[11px] text-slate-400">
                              Best Seller
                            </span>
                          </label>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Edit */}
                          <button
                            onClick={() => onOpenEditModal(prod)}
                            title="Edit Watch Details"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-slate-700 transition-colors cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Duplicate */}
                          <button
                            onClick={() => onDuplicateProduct(prod)}
                            title="Duplicate Model"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Delete with Confirmation */}
                          {deleteConfirmId === prod.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  onDeleteProduct(prod.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="px-2 py-1 rounded bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-1 rounded bg-slate-800 text-slate-400 text-[10px] hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(prod.id)}
                              title="Delete from Catalog"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden bg-black border border-slate-800 mb-3">
                  <img 
                    src={prod.thumbnail} 
                    alt={prod.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {prod.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30">
                      {prod.badge}
                    </span>
                  )}
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    prod.stockCount <= 3 ? 'bg-rose-600 text-white' : 'bg-black/80 text-[#10B981]'
                  }`}>
                    {prod.stockCount} in Vault
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm">{prod.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{prod.series}</p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] font-mono">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 line-through block font-mono">
                    ₹{prod.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenEditModal(prod)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-slate-700 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicateProduct(prod)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
