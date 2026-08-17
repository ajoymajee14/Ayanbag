import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  MessageCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Order, WatchProduct, CustomerInquiry, AdminTab } from '../../types';
import { SALES_TREND_DATA, CATEGORY_DISTRIBUTION } from '../../data/mockAdminData';

interface AdminDashboardOverviewProps {
  orders: Order[];
  products: WatchProduct[];
  inquiries: CustomerInquiry[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddWatch: () => void;
  onSelectOrderForTracking: (order: Order) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  orders,
  products,
  inquiries,
  onNavigateTab,
  onOpenAddWatch,
  onSelectOrderForTracking
}) => {
  // Compute Key Stats
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const activeOrders = orders.filter(o => o.status === 'pending_cod' || o.status === 'processing' || o.status === 'shipped');
  const codOrdersCount = orders.filter(o => o.paymentMode === 'cod').length;
  const prepaidOrdersCount = orders.filter(o => o.paymentMode === 'prepaid').length;
  const storePickupCount = orders.filter(o => o.paymentMode === 'store_pickup').length;

  const lowStockProducts = products.filter(p => p.stockCount <= 3);
  const pendingWhatsAppInquiries = inquiries.filter(i => i.status === 'new');

  const pendingCodOrders = orders.filter(o => o.status === 'pending_cod');

  return (
    <div className="space-y-6 pb-10">
      
      {/* Top Banner Notice: Live Store Health & Sync */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">
                Ayanbag Delhi Flagship & Online Store Live
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-mono font-bold border border-[#10B981]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                WhatsApp Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant 45% Off Campaign (AYAN45) active. Okhla Showroom walk-in calendar operating 11 AM – 10 PM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenAddWatch}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>+ Add Watch</span>
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <span>View Orders</span>
          </button>
        </div>
      </div>

      {/* 1. KPI Stats Summary Cards (Top Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              ₹{(totalRevenue + 845000).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-[#10B981] font-semibold font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
            </span>
            <span className="text-slate-500 text-[11px]">vs. previous 7 days</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg. Order Value:</span>
            <span className="font-mono font-semibold text-slate-200">₹9,840</span>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Orders
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {activeOrders.length + 32}
            </span>
            <span className="text-xs text-slate-400">in dispatch pipeline</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-slate-300 font-mono text-[11px]">
              <strong className="text-[#D4AF37]">{codOrdersCount + 22}</strong> COD
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-mono text-[11px]">
              <strong className="text-[#10B981]">{prepaidOrdersCount + 10}</strong> Prepaid
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-mono text-[11px]">
              <strong className="text-sky-400">{storePickupCount}</strong> Walk-in
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Pending COD Verification:</span>
            <span className="font-mono font-bold text-amber-400">{pendingCodOrders.length} orders</span>
          </div>
        </div>

        {/* Card 3: WhatsApp Direct Inquiries & Conversion */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-[#25D366]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              WhatsApp Conversion
            </span>
            <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              34.8%
            </span>
            <span className="text-xs text-[#10B981] font-semibold">+4.2%</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span className="text-white font-semibold font-mono">142 leads</span>
            <span>synced via +91 9354518944</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Unanswered Leads:</span>
            <span className="font-mono font-bold text-[#10B981]">{pendingWhatsAppInquiries.length} pending</span>
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Stock & Inventory
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
              {lowStockProducts.length}
            </span>
            <span className="text-xs text-slate-400">models low stock (&lt;3 units)</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>Total Catalog:</span>
            <span className="text-white font-mono font-semibold">{products.length} models active</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Total Available Stock:</span>
            <span className="font-mono font-bold text-[#D4AF37]">
              {products.reduce((sum, p) => sum + p.stockCount, 0)} units
            </span>
          </div>
        </div>

      </div>

      {/* 2. Charts Section: Sales Revenue Area Chart & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend (2 Cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white">
                Revenue & Daily Order Volume
              </h3>
              <p className="text-xs text-slate-400">
                7-Day performance with 45% discount promo code AYAN45
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#D4AF37]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Orders Count
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any, name: string) => [
                    name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">
              Category Sales Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Demand breakdown across horological movements
            </p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xs font-mono text-slate-400">Top Series</span>
              <span className="text-sm font-bold text-white font-serif">Automatic</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-xs">
            {CATEGORY_DISTRIBUTION.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-400 truncate text-[11px]">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Action Rows: Low Stock Watch Alerts & Pending Dispatch Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Low Stock Attention List */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Low Stock Alert (Restock Recommended)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs text-[#D4AF37] hover:underline font-semibold cursor-pointer"
            >
              Manage Inventory
            </button>
          </div>

          <div className="space-y-2.5">
            {lowStockProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover bg-black border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block truncate">
                      {prod.series}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/30">
                      {prod.stockCount} left
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigateTab('inventory')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Dispatch Queue */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Orders Awaiting WhatsApp Dispatch
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-[#D4AF37] hover:underline font-semibold cursor-pointer"
            >
              View All Orders ({orders.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ord.customerName}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{ord.orderNumber}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    {ord.items.map(i => i.productName).join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-mono text-[#D4AF37] font-semibold">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{ord.paymentMode.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectOrderForTracking(ord)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-[11px] transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
