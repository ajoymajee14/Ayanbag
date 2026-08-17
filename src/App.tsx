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

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { AdminOrdersManagement } from './components/admin/AdminOrdersManagement';
import { AdminInventoryManager } from './components/admin/AdminInventoryManager';
import { AdminDiscountsManager } from './components/admin/AdminDiscountsManager';
import { AdminInquiriesManager } from './components/admin/AdminInquiriesManager';
import { AdminStoreSettings } from './components/admin/AdminStoreSettings';
import { ShippingInvoiceModal } from './components/admin/ShippingInvoiceModal';
import { WhatsAppTrackingModal } from './components/admin/WhatsAppTrackingModal';
import { ProductFormModal } from './components/admin/ProductFormModal';

// Initial Data
import { PRODUCTS, STORE_INFO } from './data/products';
import { INITIAL_ORDERS, INITIAL_COUPONS, INITIAL_INQUIRIES } from './data/mockAdminData';
import { 
  WatchProduct, 
  CartItem, 
  StoreInfo, 
  Order, 
  Coupon, 
  CustomerInquiry, 
  AdminTab, 
  OrderStatus, 
  InquiryStatus 
} from './types';
import { Sparkles, Store, ShieldAlert, ArrowLeftRight } from 'lucide-react';

export default function App() {
  // Mode switch: 'storefront' | 'admin'
  const [currentMode, setCurrentMode] = useState<'storefront' | 'admin'>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_mode');
      return (saved as 'storefront' | 'admin') || 'admin';
    } catch {
      return 'admin';
    }
  });

  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('dashboard');

  // Persistence for products, orders, coupons, storeInfo, inquiries, and cart
  const [products, setProducts] = useState<WatchProduct[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_store_info');
      return saved ? JSON.parse(saved) : STORE_INFO;
    } catch {
      return STORE_INFO;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ayanbag_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Modals State
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<WatchProduct | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [selectedWhatsAppOrder, setSelectedWhatsAppOrder] = useState<Order | null>(null);

  // Storefront Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<WatchProduct | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ayanbag_mode', currentMode);
      localStorage.setItem('ayanbag_products', JSON.stringify(products));
      localStorage.setItem('ayanbag_orders', JSON.stringify(orders));
      localStorage.setItem('ayanbag_coupons', JSON.stringify(coupons));
      localStorage.setItem('ayanbag_inquiries', JSON.stringify(inquiries));
      localStorage.setItem('ayanbag_store_info', JSON.stringify(storeInfo));
      localStorage.setItem('ayanbag_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Storage sync error:', e);
    }
  }, [currentMode, products, orders, coupons, inquiries, storeInfo, cartItems]);

  // Handlers for Storefront Cart
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

  // Handlers for Orders Management
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleMarkWhatsAppSent = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, whatsappSent: true } : o));
  };

  // Handlers for Catalog & Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: WatchProduct) => {
    setEditingProduct(prod);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (product: WatchProduct) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? product : p);
      }
      return [product, ...prev];
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleDuplicateProduct = (product: WatchProduct) => {
    const duplicated: WatchProduct = {
      ...product,
      id: `${product.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${product.name} (Copy)`,
      sku: `AYAN-SKU-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [duplicated, ...prev]);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stockCount: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    }));
  };

  const handleToggleInStock = (productId: string, inStock: boolean) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock } : p));
  };

  const handleToggleBestSeller = (productId: string, isBestSeller: boolean) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isBestSeller } : p));
  };

  // Handlers for Discounts & Coupons
  const handleAddCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const handleToggleCouponActive = (couponId: string, isActive: boolean) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, isActive } : c));
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  // Handlers for Inquiries
  const handleUpdateInquiryStatus = (inquiryId: string, status: InquiryStatus) => {
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
  };

  const handleAddInquiryNote = (inquiryId: string, note: string) => {
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, internalNotes: note } : i));
  };

  const handleAddNewInquiry = (inquiry: CustomerInquiry) => {
    setInquiries(prev => [inquiry, ...prev]);
  };

  // Handlers for Store Info
  const handleUpdateStoreInfo = (updated: Partial<StoreInfo>) => {
    setStoreInfo(prev => ({ ...prev, ...updated }));
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
    <>
      {/* Global Mode Switcher Floating Pill */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-black/90 border border-[#D4AF37]/50 p-1.5 rounded-full shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setCurrentMode('storefront')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'storefront'
              ? 'bg-[#D4AF37] text-black shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Customer Store</span>
        </button>

        <button
          onClick={() => setCurrentMode('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'admin'
              ? 'bg-[#D4AF37] text-black shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </div>

      {/* RENDER ADMIN PORTAL OR STOREFRONT */}
      {currentMode === 'admin' ? (
        <AdminLayout
          activeTab={adminActiveTab}
          onSelectTab={(tab) => setAdminActiveTab(tab)}
          onSwitchToStorefront={() => setCurrentMode('storefront')}
          onOpenAddWatchModal={handleOpenAddProduct}
          storeInfo={storeInfo}
          orders={orders}
          inquiries={inquiries}
        >
          {adminActiveTab === 'dashboard' && (
            <AdminDashboardOverview
              orders={orders}
              products={products}
              inquiries={inquiries}
              onNavigateTab={(tab) => setAdminActiveTab(tab)}
              onOpenAddWatch={handleOpenAddProduct}
              onSelectOrderForTracking={(ord) => setSelectedWhatsAppOrder(ord)}
            />
          )}

          {adminActiveTab === 'orders' && (
            <AdminOrdersManagement
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenWhatsAppModal={(ord) => setSelectedWhatsAppOrder(ord)}
              onOpenInvoiceModal={(ord) => setSelectedInvoiceOrder(ord)}
            />
          )}

          {adminActiveTab === 'inventory' && (
            <AdminInventoryManager
              products={products}
              onOpenAddModal={handleOpenAddProduct}
              onOpenEditModal={handleOpenEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onUpdateStock={handleUpdateStock}
              onToggleInStock={handleToggleInStock}
              onToggleBestSeller={handleToggleBestSeller}
            />
          )}

          {adminActiveTab === 'discounts' && (
            <AdminDiscountsManager
              coupons={coupons}
              storeInfo={storeInfo}
              onUpdateStoreInfo={handleUpdateStoreInfo}
              onAddCoupon={handleAddCoupon}
              onToggleCouponActive={handleToggleCouponActive}
              onDeleteCoupon={handleDeleteCoupon}
            />
          )}

          {adminActiveTab === 'inquiries' && (
            <AdminInquiriesManager
              inquiries={inquiries}
              storeInfo={storeInfo}
              onUpdateInquiryStatus={handleUpdateInquiryStatus}
              onAddInquiryNote={handleAddInquiryNote}
              onAddNewInquiry={handleAddNewInquiry}
            />
          )}

          {adminActiveTab === 'settings' && (
            <AdminStoreSettings
              storeInfo={storeInfo}
              onUpdateStoreInfo={handleUpdateStoreInfo}
            />
          )}
        </AdminLayout>
      ) : (
        /* CUSTOMER LUXURY STOREFRONT */
        <div className="min-h-screen bg-[#0D0D0D] text-[#E4E4E7] flex flex-col relative selection:bg-[#D4AF37] selection:text-black">
          
          {/* 1. Top Announcement Bar */}
          {storeInfo.enableAnnouncement !== false && <AnnouncementBar />}

          {/* 2. Premium Sticky Navigation */}
          <Navbar
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAdmin={() => setCurrentMode('admin')}
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
              products={products.filter(p => p.inStock)}
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

          {/* Storefront Modals & Drawers */}
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
      )}

      {/* Shared Admin Global Modals (accessible anywhere) */}
      <ProductFormModal
        product={editingProduct}
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      <ShippingInvoiceModal
        order={selectedInvoiceOrder}
        storeInfo={storeInfo}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

      <WhatsAppTrackingModal
        order={selectedWhatsAppOrder}
        storeInfo={storeInfo}
        onClose={() => setSelectedWhatsAppOrder(null)}
        onMarkWhatsAppSent={handleMarkWhatsAppSent}
      />
    </>
  );
}
