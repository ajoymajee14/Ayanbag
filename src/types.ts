export interface WatchProduct {
  id: string;
  name: string;
  series: string;
  badge?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  thumbnail: string;
  description: string;
  movement: string;
  caseMaterial: string;
  bezel: string;
  glass: string;
  dialDiameter: string;
  waterResistance: string;
  weight: string;
  clasp: string;
  category: 'automatic' | 'chronograph' | 'skeleton' | 'diver' | 'all';
  inStock: boolean;
  stockCount: number;
  features: string[];
  videoThumbnail?: string;
  isBestSeller?: boolean;
  isMasterEdition?: boolean;
  sku?: string;
  createdAt?: string;
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
  selectedBox?: 'standard' | 'luxury_wood_box' | 'full_set_papers';
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  title: string;
  comment: string;
  verified: boolean;
  userImage?: string;
  watchImage?: string;
}

export interface StoreInfo {
  name: string;
  addressLine1: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  timings: string;
  openDays: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  enableAnnouncement?: boolean;
  announcementText?: string;
  promoCode?: string;
  promoDiscountPercent?: number;
  countdownTargetDate?: string;
  enableAppointments?: boolean;
  maxDailyAppointments?: number;
}

export type OrderStatus = 
  | 'pending_cod' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 'cod' | 'prepaid' | 'store_pickup';

export interface OrderItem {
  productId: string;
  productName: string;
  series: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  originalPrice: number;
  boxOption: 'standard' | 'luxury_wood_box' | 'full_set_papers';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMode: PaymentMethod;
  status: OrderStatus;
  orderDate: string;
  trackingNumber?: string;
  courierPartner?: string;
  whatsappSent?: boolean;
  unboxingVideoSent?: boolean;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
  expiryDate: string;
  totalRedemptions: number;
  totalRevenueGenerated: number;
}

export type InquiryType = 'whatsapp_lead' | 'store_appointment' | 'support_email' | 'custom_request';
export type InquiryStatus = 'new' | 'in_contact' | 'appointment_confirmed' | 'resolved' | 'closed';

export interface CustomerInquiry {
  id: string;
  type: InquiryType;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate?: string;
  preferredTime?: string;
  watchModel?: string;
  message: string;
  source: string;
  date: string;
  status: InquiryStatus;
  priority: 'high' | 'medium' | 'low';
  internalNotes?: string;
}

export type AdminTab = 
  | 'dashboard' 
  | 'orders' 
  | 'inventory' 
  | 'discounts' 
  | 'inquiries' 
  | 'settings';

