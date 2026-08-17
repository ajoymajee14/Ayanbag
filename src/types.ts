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
}
