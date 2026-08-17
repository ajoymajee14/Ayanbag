import { Order, Coupon, CustomerInquiry } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AYAN-2026-8491',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 98112 34567',
    customerEmail: 'aakash.malhotra@gmail.com',
    shippingAddress: 'Flat 402, Tower B, Palm Springs, Sector 54, Golf Course Road',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    items: [
      {
        productId: 'submariner-master-black',
        productName: 'Submariner Master Edition',
        series: 'Oyster Professional 41mm',
        thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 8999,
        originalPrice: 16400,
        boxOption: 'luxury_wood_box'
      }
    ],
    subtotal: 16400,
    discountAmount: 7401,
    shippingFee: 0,
    totalAmount: 8999,
    paymentMode: 'cod',
    status: 'processing',
    orderDate: '2026-08-16T19:45:00.000Z',
    trackingNumber: 'BLUEDART-AWB-9481029',
    courierPartner: 'BlueDart Air Express',
    whatsappSent: true,
    unboxingVideoSent: true,
    notes: 'Customer requested 1:1 bezel sweep check video prior to boxing.'
  },
  {
    id: 'ord-1002',
    orderNumber: 'AYAN-2026-8490',
    customerName: 'Rohit Deshmukh',
    customerPhone: '+91 98201 88721',
    customerEmail: 'rohit.deshmukh@outlook.com',
    shippingAddress: 'B-12, Sagar Darshan, Bandra West, Near Carter Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    items: [
      {
        productId: 'royal-oak-chronograph-blue',
        productName: 'Royal Oak Chronograph',
        series: 'Audemars Haute Horlogerie 41mm',
        thumbnail: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 9499,
        originalPrice: 17200,
        boxOption: 'full_set_papers'
      }
    ],
    subtotal: 17200,
    discountAmount: 7701,
    shippingFee: 0,
    totalAmount: 9024,
    paymentMode: 'prepaid',
    status: 'shipped',
    orderDate: '2026-08-16T14:20:00.000Z',
    trackingNumber: 'BLUEDART-AWB-9480811',
    courierPartner: 'BlueDart Air Express',
    whatsappSent: true,
    unboxingVideoSent: true,
    notes: 'Prepaid via UPI. 5% extra discount applied. High priority dispatch.'
  },
  {
    id: 'ord-1003',
    orderNumber: 'AYAN-2026-8489',
    customerName: 'Sanjay Reddy',
    customerPhone: '+91 99890 12345',
    customerEmail: 'sanjay.reddy@techcorp.in',
    shippingAddress: 'Villa 14, Prestige Ozone, Whitefield Main Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    items: [
      {
        productId: 'cosmograph-daytona-panda',
        productName: 'Cosmograph Daytona',
        series: 'Motorsport Heritage 40mm',
        thumbnail: 'https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 9999,
        originalPrice: 18100,
        boxOption: 'luxury_wood_box'
      },
      {
        productId: 'gmt-master-batman-jubilee',
        productName: "GMT-Master II 'Batgirl'",
        series: 'Dual-Time Pilot 40mm',
        thumbnail: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 9299,
        originalPrice: 16900,
        boxOption: 'luxury_wood_box'
      }
    ],
    subtotal: 35000,
    discountAmount: 15702,
    shippingFee: 0,
    totalAmount: 19298,
    paymentMode: 'cod',
    status: 'pending_cod',
    orderDate: '2026-08-16T21:10:00.000Z',
    whatsappSent: false,
    unboxingVideoSent: false,
    notes: 'Needs WhatsApp verification before dispatch. 2-watch bundle order.'
  },
  {
    id: 'ord-1004',
    orderNumber: 'AYAN-2026-8488',
    customerName: 'Dr. Tariq Anwar',
    customerPhone: '+91 93120 44556',
    customerEmail: 'tariq.anwar@maxhealthcare.com',
    shippingAddress: 'House 82, Pocket 1, Jasola Vihar (Store Pickup Walk-in)',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110025',
    items: [
      {
        productId: 'nautilus-skeleton-automatic',
        productName: 'Nautilus Skeleton Automatic',
        series: 'Patek Haute Mechanical 40mm',
        thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 11999,
        originalPrice: 21800,
        boxOption: 'full_set_papers'
      }
    ],
    subtotal: 21800,
    discountAmount: 9801,
    shippingFee: 0,
    totalAmount: 11999,
    paymentMode: 'store_pickup',
    status: 'delivered',
    orderDate: '2026-08-15T16:00:00.000Z',
    trackingNumber: 'STORE-INSPECTION-DELHI',
    courierPartner: 'Okhla Flagship Counter Handover',
    whatsappSent: true,
    unboxingVideoSent: true,
    notes: 'Walk-in customer inspected under loupe at Jamia Nagar showroom.'
  },
  {
    id: 'ord-1005',
    orderNumber: 'AYAN-2026-8487',
    customerName: 'Vikram Sethi',
    customerPhone: '+91 98765 99881',
    customerEmail: 'vikram.sethi@ventures.co',
    shippingAddress: 'Penthouse 18, Golf Links, Near Khan Market',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    items: [
      {
        productId: 'santos-skeleton-steel',
        productName: 'Santos De Cartier Skeleton',
        series: 'Aviator Haute Horlogerie 39.8mm',
        thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 10499,
        originalPrice: 19000,
        boxOption: 'luxury_wood_box'
      }
    ],
    subtotal: 19000,
    discountAmount: 8501,
    shippingFee: 0,
    totalAmount: 10499,
    paymentMode: 'cod',
    status: 'out_for_delivery',
    orderDate: '2026-08-15T11:30:00.000Z',
    trackingNumber: 'BLUEDART-AWB-9479901',
    courierPartner: 'BlueDart Air Express',
    whatsappSent: true,
    unboxingVideoSent: true,
    notes: 'Delivering today via Delhi Bluedart hub.'
  },
  {
    id: 'ord-1006',
    orderNumber: 'AYAN-2026-8486',
    customerName: 'Naveen Jindal',
    customerPhone: '+91 97110 55667',
    customerEmail: 'naveen.j@jindalgroup.com',
    shippingAddress: 'Plot 44, Civil Lines, Near Raj Bhavan',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302006',
    items: [
      {
        productId: 'submariner-master-black',
        productName: 'Submariner Master Edition',
        series: 'Oyster Professional 41mm',
        thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 8999,
        originalPrice: 16400,
        boxOption: 'luxury_wood_box'
      }
    ],
    subtotal: 16400,
    discountAmount: 7401,
    shippingFee: 0,
    totalAmount: 8999,
    paymentMode: 'cod',
    status: 'delivered',
    orderDate: '2026-08-14T09:15:00.000Z',
    trackingNumber: 'BLUEDART-AWB-9478120',
    courierPartner: 'BlueDart Air Express',
    whatsappSent: true,
    unboxingVideoSent: true,
    notes: 'Cash collected successfully. 5-star review left.'
  },
  {
    id: 'ord-1007',
    orderNumber: 'AYAN-2026-8485',
    customerName: 'Mohd. Faisal',
    customerPhone: '+91 99991 23456',
    customerEmail: 'faisal.m@gmail.com',
    shippingAddress: 'House 12B, Noor Nagar, Jamia Nagar',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110025',
    items: [
      {
        productId: 'cosmograph-daytona-panda',
        productName: 'Cosmograph Daytona',
        series: 'Motorsport Heritage 40mm',
        thumbnail: 'https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 9999,
        originalPrice: 18100,
        boxOption: 'standard'
      }
    ],
    subtotal: 18100,
    discountAmount: 8101,
    shippingFee: 0,
    totalAmount: 9999,
    paymentMode: 'store_pickup',
    status: 'delivered',
    orderDate: '2026-08-13T18:40:00.000Z',
    trackingNumber: 'STORE-INSPECTION-DELHI',
    courierPartner: 'Direct In-Store Delivery',
    whatsappSent: true,
    unboxingVideoSent: false,
    notes: 'Customer collected directly from boutique counter.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'AYAN45',
    discountPercentage: 45,
    minOrderValue: 5000,
    description: '45% Flat Sitewide Independence & Master Edition Special Offer',
    isActive: true,
    expiryDate: '2026-08-31',
    totalRedemptions: 642,
    totalRevenueGenerated: 5840000
  },
  {
    id: 'coup-2',
    code: 'PREPAID5',
    discountPercentage: 5,
    minOrderValue: 8000,
    description: 'Extra 5% discount for instant UPI / Online payments',
    isActive: true,
    expiryDate: '2026-12-31',
    totalRedemptions: 189,
    totalRevenueGenerated: 1720000
  },
  {
    id: 'coup-3',
    code: 'DELHIWALKIN',
    discountPercentage: 50,
    minOrderValue: 8000,
    description: 'Exclusive 50% flat discount voucher for Okhla showroom visitors',
    isActive: true,
    expiryDate: '2026-09-30',
    totalRedemptions: 94,
    totalRevenueGenerated: 980000
  },
  {
    id: 'coup-4',
    code: 'COLLECTOR55',
    discountPercentage: 55,
    minOrderValue: 20000,
    description: 'Special 55% OFF on 2+ Watch bundle orders',
    isActive: false,
    expiryDate: '2026-07-31',
    totalRedemptions: 48,
    totalRevenueGenerated: 620000
  }
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-1',
    type: 'whatsapp_lead',
    customerName: 'Harsh Vardhan',
    customerPhone: '+91 98109 91234',
    customerEmail: 'harsh.v@gmail.com',
    watchModel: 'Cosmograph Daytona (Panda)',
    message: 'Can you share actual video of the chronograph reset and ceramic bezel close-up? Looking for COD delivery to Chandigarh.',
    source: 'WhatsApp Webhook (+91 9354518944)',
    date: '2026-08-16T22:15:00.000Z',
    status: 'new',
    priority: 'high',
    internalNotes: 'Video sent on WhatsApp. Awaiting address confirmation.'
  },
  {
    id: 'inq-2',
    type: 'store_appointment',
    customerName: 'Aditya Oberoi',
    customerPhone: '+91 98711 22334',
    customerEmail: 'aditya.oberoi@oberoihotels.com',
    preferredDate: '2026-08-18',
    preferredTime: '04:30 PM',
    watchModel: 'Royal Oak Chronograph (Blue Tapisserie)',
    message: 'Visiting Delhi showroom to compare AP Royal Oak and Patek Nautilus before final purchase. Please keep both boxed for inspection.',
    source: 'Website Appointment Form',
    date: '2026-08-16T18:30:00.000Z',
    status: 'appointment_confirmed',
    priority: 'high',
    internalNotes: 'Showroom VIP desk pass generated. Specialist assigned.'
  },
  {
    id: 'inq-3',
    type: 'support_email',
    customerName: 'Sameer Kulkarni',
    customerPhone: '+91 94220 89012',
    customerEmail: 'sameer.kulkarni@pune.ac.in',
    watchModel: 'Submariner Master Edition',
    message: 'Is the Glidelock extension functional on the Submariner bracelet? Also confirm water resistance testing for swimming.',
    source: 'Support Inbox (support@ayanbag.in)',
    date: '2026-08-16T11:10:00.000Z',
    status: 'in_contact',
    priority: 'medium',
    internalNotes: 'Confirmed 2mm glidelock works identically to original.'
  },
  {
    id: 'inq-4',
    type: 'custom_request',
    customerName: 'Jaspreet Singh',
    customerPhone: '+91 98140 77665',
    customerEmail: 'jaspreet.singh@ludhiana.in',
    watchModel: 'Richard Mille RM 35-02 Rafael Nadal Carbon',
    message: 'Do you have the RM NTPT carbon fiber skeleton edition in stock or can it be arranged on special order?',
    source: 'WhatsApp Catalog Inquiry',
    date: '2026-08-15T20:00:00.000Z',
    status: 'in_contact',
    priority: 'high',
    internalNotes: 'Checking master supplier factory inventory.'
  },
  {
    id: 'inq-5',
    type: 'whatsapp_lead',
    customerName: 'Ramanathan Swamy',
    customerPhone: '+91 98401 55678',
    customerEmail: 'r.swamy@chennaifinance.com',
    watchModel: "GMT-Master II 'Batgirl'",
    message: 'Does this watch feature the real 24-hour independent timezone jump hour hand for overseas travel?',
    source: 'WhatsApp (+91 9354518944)',
    date: '2026-08-15T15:20:00.000Z',
    status: 'resolved',
    priority: 'medium',
    internalNotes: 'Explained 2836 GMT caliber operation with video link.'
  }
];

export const SALES_TREND_DATA = [
  { day: 'Mon', revenue: 78900, orders: 8, codOrders: 6, prepaidOrders: 2 },
  { day: 'Tue', revenue: 94500, orders: 10, codOrders: 7, prepaidOrders: 3 },
  { day: 'Wed', revenue: 68400, orders: 7, codOrders: 5, prepaidOrders: 2 },
  { day: 'Thu', revenue: 112000, orders: 12, codOrders: 8, prepaidOrders: 4 },
  { day: 'Fri', revenue: 135800, orders: 14, codOrders: 9, prepaidOrders: 5 },
  { day: 'Sat', revenue: 168400, orders: 18, codOrders: 11, prepaidOrders: 7 },
  { day: 'Sun', revenue: 189200, orders: 20, codOrders: 13, prepaidOrders: 7 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Automatic Master', value: 38, color: '#D4AF37' },
  { name: 'Chronograph', value: 28, color: '#10B981' },
  { name: 'Skeleton Haute', value: 20, color: '#38BDF8' },
  { name: 'Diver Pro', value: 14, color: '#F59E0B' },
];
