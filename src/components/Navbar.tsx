import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MessageCircle, Menu, X, MapPin, Sparkles, PhoneCall } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Best Sellers', href: '#best-sellers' },
    { label: 'Master Editions', href: '#master-editions' },
    { label: 'Store Locator', href: '#store-locator' },
    { label: 'Why Ayanbag', href: '#why-choose' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3.5' 
          : 'bg-[#0D0D0D] border-b border-[#D4AF37]/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <a 
          href="#" 
          id="nav-brand-logo" 
          className="group flex flex-col items-start focus:outline-none"
        >
          <div className="flex items-center">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.2em] text-[#D4AF37] group-hover:text-[#FBF4D8] transition-colors">
              AYANBAG
            </span>
          </div>
          <div className="h-[1px] w-12 bg-[#D4AF37] mt-[-2px] group-hover:w-full transition-all duration-300" />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.15em] text-[#A1A1AA] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          
          {/* Search Trigger */}
          <button
            id="btn-nav-search-trigger"
            onClick={onOpenSearch}
            aria-label="Search watches"
            className="flex items-center gap-2 px-3 py-1.5 border border-[#A1A1AA]/30 rounded-full text-[#A1A1AA] bg-white/5 text-[12px] hover:border-[#D4AF37]/50 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="btn-nav-cart-trigger"
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative p-2 text-[#A1A1AA] hover:text-[#D4AF37] transition-all duration-200 cursor-pointer"
          >
            <div className="w-5 h-5 border-2 border-[#D4AF37] rounded-sm flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
            </div>
            {cartCount > 0 && (
              <span 
                id="cart-badge-count"
                className="absolute -top-1 -right-1 bg-[#D4AF37] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Portal Switcher */}
          {onOpenAdmin && (
            <button
              id="btn-nav-admin-portal"
              onClick={onOpenAdmin}
              aria-label="Admin Dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-mono font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin HQ</span>
            </button>
          )}

          {/* Direct WhatsApp Order Button */}
          <a
            id="btn-nav-whatsapp-direct"
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hello Ayanbag, I am looking to purchase a Master Edition luxury watch. Please share your latest available stock catalog and pricing.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Buy</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#A1A1AA] hover:text-white rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Slide Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden border-b border-[#D4AF37]/20 bg-[#121212]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wider uppercase text-zinc-300 hover:text-[#D4AF37] px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-bold text-xs py-2.5 rounded-lg shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Admin Portal & Dashboard</span>
              </button>
            )}

            <a
              id="mobile-call-store-link"
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 text-zinc-200 text-xs py-2.5 rounded-lg"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Delhi Store: {STORE_INFO.phone}</span>
            </a>

            <a
              id="mobile-nav-whatsapp-link"
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hello Ayanbag, I would like to place an order for a luxury master copy watch.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-lg shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp (Instant Reply)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
