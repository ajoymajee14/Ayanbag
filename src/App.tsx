import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromoCountdownSection } from './components/PromoCountdownSection';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WhyChooseSection } from './components/WhyChooseSection';
import { StoreLocatorSection } from './components/StoreLocatorSection';
import { WhatsAppOrderSection } from './components/WhatsAppOrderSection';
import { CustomerReviews } from './components/CustomerReviews';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PRODUCTS } from './data/products';
import { WatchProduct, CartItem } from './types';

export default function App() {
  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<WatchProduct | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ayanbag_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: WatchProduct, 
    boxOption: 'standard' | 'luxury_wood_box' | 'full_set_papers' = 'luxury_wood_box'
  ) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedBox === boxOption);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedBox === boxOption
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedBox: boxOption }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStore = () => {
    const el = document.getElementById('store-locator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E4E4E7] flex flex-col relative selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Premium Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        
        {/* 3. Hero Section */}
        <HeroSection
          onExploreClick={scrollToCollections}
          onVisitStoreClick={scrollToStore}
        />

        {/* 4. Promotional Countdown & Offer Section */}
        <PromoCountdownSection />

        {/* 5. Curated Product Showcase */}
        <ProductShowcase
          products={PRODUCTS}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />

        {/* 6. Why Choose Ayanbag Value Proposition & Comparison */}
        <WhyChooseSection />

        {/* 7. Interactive Store Locator & Physical Address */}
        <StoreLocatorSection
          onBookAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* 8. Direct WhatsApp / Phone Ordering Section */}
        <WhatsAppOrderSection />

        {/* Customer Verified Reviews */}
        <CustomerReviews />

      </main>

      {/* 9. Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating WhatsApp Concierge & Back to top */}
      <FloatingActions />

    </div>
  );
}
