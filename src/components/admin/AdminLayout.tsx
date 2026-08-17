import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Inbox, 
  Settings, 
  Store, 
  Plus, 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  ExternalLink, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles,
  ArrowLeftRight,
  LogOut
} from 'lucide-react';
import { AdminTab, StoreInfo, Order, WatchProduct, CustomerInquiry } from '../../types';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onSwitchToStorefront: () => void;
  onLogout?: () => void;
  onOpenAddWatchModal: () => void;
  storeInfo: StoreInfo;
  orders: Order[];
  inquiries: CustomerInquiry[];
  children: React.ReactNode;
  onGlobalSearchSelect?: (query: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onSwitchToStorefront,
  onLogout,
  onOpenAddWatchModal,
  storeInfo,
  orders,
  inquiries,
  children
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const pendingOrdersCount = orders.filter(o => o.status === 'pending_cod' || o.status === 'processing').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: undefined
    },
    {
      id: 'orders' as AdminTab,
      label: 'Orders & WhatsApp Dispatch',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Active` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'inventory' as AdminTab,
      label: 'Watch Catalog & Stock',
      icon: Package,
      badge: undefined
    },
    {
      id: 'discounts' as AdminTab,
      label: 'Discounts & AYAN45',
      icon: Tag,
      badge: '45% OFF'
    },
    {
      id: 'inquiries' as AdminTab,
      label: 'Inquiries & VIP Bookings',
      icon: Inbox,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'settings' as AdminTab,
      label: 'Store & Profile Settings',
      icon: Settings,
      badge: undefined
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        
        {/* Left: Mobile Toggle & Brand in Topbar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 hidden md:block cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-extrabold tracking-widest text-[#D4AF37]">
              AYANBAG
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 tracking-wider">
              ADMIN HQ
            </span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search orders, SKUs, or customer phones..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 bg-[#0B0F17] border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
            />
          </div>
        </div>

        {/* Right: Quick Action [+ Add Watch], WhatsApp Status & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Action Button */}
          <button
            onClick={onOpenAddWatchModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Watch</span>
          </button>

          {/* WhatsApp Direct Sync status badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
            <span>WhatsApp: Active</span>
          </div>

          {/* Switch to Live Customer Storefront */}
          <button
            onClick={onSwitchToStorefront}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Open Live Customer Storefront"
          >
            <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Live Store</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-black flex items-center justify-center font-bold text-xs font-mono shadow">
                A
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">SuperAdmin</span>
                <span className="text-[10px] text-slate-400 block font-mono">Delhi Boutique</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl p-2 text-xs text-slate-300 space-y-1 z-50"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="p-2 border-b border-slate-800">
                  <p className="font-bold text-white">Ayanbag Admin</p>
                  <p className="text-[10px] text-slate-400 font-mono">ajoymajee14@gmail.com</p>
                  <span className="mt-1 inline-block px-1.5 py-0.2 bg-[#10B981]/20 text-[#10B981] text-[9px] font-mono rounded">
                    Boutique Live Mode
                  </span>
                </div>

                <button
                  onClick={onSwitchToStorefront}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-left cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#D4AF37]" />
                  <span>Preview Customer Store</span>
                </button>

                <button
                  onClick={() => onSelectTab('settings')}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-left cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Store Settings & WhatsApp</span>
                </button>

                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      else onSwitchToStorefront();
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-950/40 text-rose-400 text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Lock & Exit Admin</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 pt-16 bg-[#0F172A] border-r border-slate-800/80 
          transform transition-all duration-300 ease-in-out md:static md:pt-0
          ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
          ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}
          flex flex-col justify-between shrink-0
        `}>
          {/* Navigation Links */}
          <div className="p-3 sm:p-4 space-y-1.5 overflow-y-auto">
            
            {/* Header in sidebar */}
            <div className={`px-3 py-2 mb-2 flex items-center justify-between ${sidebarCollapsed ? 'justify-center' : ''}`}>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                  MANAGEMENT PORTAL
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                Live
              </span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-white border border-[#D4AF37]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                          item.badgeColor || 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Info: Physical Boutique details & Switch Button */}
          <div className="p-3 sm:p-4 border-t border-slate-800/80 space-y-3 bg-[#0B0F17]/60">
            
            {!sidebarCollapsed && (
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Delhi Showroom Active</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-tight">
                  Jamia Nagar, Okhla, New Delhi
                </p>
                <p className="text-slate-500 text-[9px] font-mono">
                  Helpline: {storeInfo.phone}
                </p>
              </div>
            )}

            {/* Quick Switch to Storefront Button */}
            <button
              onClick={onSwitchToStorefront}
              className={`w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow ${
                sidebarCollapsed ? 'p-2' : ''
              }`}
              title="Switch to Storefront"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              {!sidebarCollapsed && <span>View Customer Store</span>}
            </button>

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F17] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};
