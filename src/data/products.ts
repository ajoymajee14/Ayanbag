import { WatchProduct, StoreInfo, CustomerReview } from '../types';

export const STORE_INFO: StoreInfo = {
  name: "Ayanbag Horology Boutique",
  addressLine1: "Thokar No. 9, High Tension Road, Abul Fazal Road",
  landmark: "Near Bikanerwala",
  area: "Jamia Nagar, Okhla",
  city: "New Delhi",
  pincode: "110025",
  phone: "+91 9354518944",
  whatsapp: "919354518944",
  email: "Support@ayanbag.in",
  timings: "11:00 AM – 10:00 PM",
  openDays: "All 7 Days Open (Physical Walk-in & Inspection Welcome)",
  googleMapsUrl: "https://maps.google.com/?q=Thokar+No.+9+High+Tension+Road+Abul+Fazal+Enclave+Jamia+Nagar+Okhla+New+Delhi+110025",
  googleMapsEmbedQuery: "Thokar No. 9, High Tension Road, Jamia Nagar, Okhla, New Delhi, 110025"
};

export const PRODUCTS: WatchProduct[] = [
  {
    id: "submariner-master-black",
    name: "Submariner Master Edition",
    series: "Oyster Professional 41mm",
    badge: "Most Popular",
    price: 8999,
    originalPrice: 16400,
    discountPercentage: 45,
    rating: 4.9,
    reviewsCount: 184,
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The ultimate 1:1 master copy of the iconic diver's timepiece. Engineered with solid 904L surgical stainless steel, unidirectional rotating Cerachrom ceramic bezel, and a high-beat Japanese Miyota Caliber automatic movement with seamless sweeping second hand.",
    movement: "Japanese 8215 High-Beat Automatic (No Battery, Smooth Sweep)",
    caseMaterial: "Solid 904L Surgical-Grade Oystersteel",
    bezel: "Real Unidirectional Rotating Cerachrom Ceramic (120 Clicks)",
    glass: "Scratch-Proof Synthetic Sapphire Crystal with 2.5x Cyclops Lens",
    dialDiameter: "41 mm",
    waterResistance: "50m Tested (Daily Waterproof & Splash Resistant)",
    weight: "155 grams (Exact 1:1 Heavyweight Feel)",
    clasp: "Folding Oysterlock Safety Clasp with Glidelock Fine-Adjustment",
    category: "diver",
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isMasterEdition: true,
    features: [
      "1:1 Laser Engraved Rehaut with Serial Numbers",
      "True Blue Chromalight Luminescent Dial & Hands",
      "Triplock Triple Waterproofness Screw-Down Crown",
      "Glidelock 2mm Extension Mechanism for Perfect Fit"
    ]
  },
  {
    id: "royal-oak-chronograph-blue",
    name: "Royal Oak Chronograph",
    series: "Audemars Haute Horlogerie 41mm",
    badge: "Masterpiece",
    price: 9499,
    originalPrice: 17200,
    discountPercentage: 45,
    rating: 5.0,
    reviewsCount: 142,
    thumbnail: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Legendary octagonal bezel secured by eight hexagonal polished screws. Features a mesmerizing Grande Tapisserie patterned guilloché dial, functional chronograph counters, integrated tapered bracelet, and satin-brushed hand-beveling.",
    movement: "Precision Chronograph Movement with Fully Functional Sub-Dials",
    caseMaterial: "Heavy-Gauge 316L Brushed & Polished Stainless Steel",
    bezel: "Iconic Octagonal Bezel with 8 Recessed Hexagonal Screws",
    glass: "Anti-Reflective Double-Coated Sapphire Crystal",
    dialDiameter: "41 mm",
    waterResistance: "50m Daily Resistance",
    weight: "172 grams (Substantial Luxury Wrist Weight)",
    clasp: "AP Dual-Folding Deployment Hidden Butterfly Clasp",
    category: "chronograph",
    inStock: true,
    stockCount: 4,
    isBestSeller: true,
    isMasterEdition: true,
    features: [
      "Hand-Finished Grande Tapisserie Guilloché Textured Dial",
      "Sweeping Chronograph Seconds Hand & 60-Min Counter",
      "Integrated Ergonomic Tapering Link Steel Bracelet",
      "Exhibition Caseback Displaying Oscillating Rotor"
    ]
  },
  {
    id: "nautilus-skeleton-automatic",
    name: "Nautilus Skeleton Automatic",
    series: "Patek Haute Mechanical 40mm",
    badge: "Limited Edition",
    price: 11999,
    originalPrice: 21800,
    discountPercentage: 45,
    rating: 4.9,
    reviewsCount: 96,
    thumbnail: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "An open-worked masterpiece showcasing the intricate beating heart of mechanical horology. Features dual front and rear sapphire crystals revealing the skeletonized bridges, ruby jewels, and gold-plated balance wheel in perpetual motion.",
    movement: "Open-Work Skeletonized High-Precision Automatic Calibre",
    caseMaterial: "Dual-Finish Satin Brushed 316L Stainless Steel",
    bezel: "Rounded Octagonal Porthole-Inspired Bezel",
    glass: "Front & Rear Scratch-Proof Domed Sapphire Glass",
    dialDiameter: "40 mm",
    waterResistance: "30m Splash Proof",
    weight: "148 grams (Featherlight Wrist Balance)",
    clasp: "Nautilus Fold-over Safety Clasp with Calatrava Cross Engraving",
    category: "skeleton",
    inStock: true,
    stockCount: 3,
    isBestSeller: false,
    isMasterEdition: true,
    features: [
      "Dual Sided Sapphire See-Through Skeleton Architecture",
      "24 Ruby Jewel Bearings Visible Through Escapement",
      "Silky Smooth Integrated Bracelet with Rounded Edge Links",
      "Luminescent Baton Hands for Night Visibility"
    ]
  },
  {
    id: "cosmograph-daytona-panda",
    name: "Cosmograph Daytona",
    series: "Motorsport Heritage 40mm",
    badge: "Trending #1",
    price: 9999,
    originalPrice: 18100,
    discountPercentage: 45,
    rating: 5.0,
    reviewsCount: 215,
    thumbnail: "https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547996160-71dfa63096aa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The quintessential racing chronograph. Boasts a high-gloss monobloc black ceramic bezel with engraved tachymetric scale, iconic high-contrast Panda sub-dials, screw-down pushers, and an ergonomic Oyster bracelet.",
    movement: "VK63 True Quartz Chronograph (Instant Snap-Back & Smooth Sweep)",
    caseMaterial: "904L Solid High-Polish Stainless Steel",
    bezel: "Monobloc Black Ceramic Tachymeter Bezel with Platinum Dust Markings",
    glass: "Sapphire Crystal with Anti-Fingerprint Hydrophobic Coating",
    dialDiameter: "40 mm",
    waterResistance: "50m Daily Tested",
    weight: "152 grams (True Heavyweight Ratio)",
    clasp: "Oysterlock Safety Clasp with 5mm Easylink Comfort Extension",
    category: "chronograph",
    inStock: true,
    stockCount: 5,
    isBestSeller: true,
    isMasterEdition: true,
    features: [
      "Working 1/5th Second Center Chronograph Hand & Minute Counter",
      "Ceramic Tachymetric Scale Measuring Speeds up to 400 Units/Hr",
      "Screw-Down Threaded Pushers Preventing Accidental Actuation",
      "Deeply Stamped Crown and Clasp Crests"
    ]
  },
  {
    id: "gmt-master-batman-jubilee",
    name: "GMT-Master II 'Batgirl'",
    series: "Dual-Time Pilot 40mm",
    badge: "Collector Pick",
    price: 9299,
    originalPrice: 16900,
    discountPercentage: 45,
    rating: 4.8,
    reviewsCount: 118,
    thumbnail: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Designed for world travelers, this master edition features a bi-color blue and black ceramic 24-hour bezel, independent blue GMT 2nd timezone hand, and a supple five-piece link Jubilee bracelet in 904L steel.",
    movement: "Automatic 2836 GMT Dual-Time Zone Movement",
    caseMaterial: "Corrosion-Resistant 904L Surgical Steel",
    bezel: "Bi-Directional 24-Hour Rotatable Dual-Tone Ceramic Bezel",
    glass: "Sapphire Crystal with Date Magnifier Lens",
    dialDiameter: "40 mm",
    waterResistance: "50m Daily Tested",
    weight: "150 grams",
    clasp: "Oysterlock Safety Clasp with Jubilee Solid End Links",
    category: "automatic",
    inStock: true,
    stockCount: 7,
    isBestSeller: false,
    isMasterEdition: true,
    features: [
      "Independent 24-Hour GMT Hand for Tracking 2 Timezones",
      "Seamless Bi-Color Ceramic Sintering without Joint Lines",
      "Ultra-Comfortable 5-Link Jubilee Solid Link Bracelet",
      "Laser Etched Crown at 6 O'clock on Sapphire Crystal"
    ]
  },
  {
    id: "santos-skeleton-steel",
    name: "Santos De Cartier Skeleton",
    series: "Aviator Haute Horlogerie 39.8mm",
    badge: "Exclusive",
    price: 10499,
    originalPrice: 19000,
    discountPercentage: 45,
    rating: 4.9,
    reviewsCount: 88,
    thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The world's first modern aviator watch reimagined in high horology skeleton format. The Roman numeral bridges act as the movement baseplate, adorned with blued steel sword hands and a faceted blue sapphire cabochon crown.",
    movement: "Custom 9611 MC Calibre Skeleton Hand-Wound & Automatic",
    caseMaterial: "316L Solid Steel with Satin-Brushed & Beveled Edges",
    bezel: "Square Curved Bezel with 8 Distinct Screws",
    glass: "Scratch-Resistant Sapphire Crystal (Front & Back)",
    dialDiameter: "39.8 mm (Large Model)",
    waterResistance: "30m Water Resistant",
    weight: "142 grams",
    clasp: "Double Folding Deployant Buckle with SmartLink System",
    category: "skeleton",
    inStock: true,
    stockCount: 2,
    isBestSeller: false,
    isMasterEdition: true,
    features: [
      "Roman Numerals Forming the Skeleton Movement Bridges",
      "Blue Spinel Synthetic Cabochon Crown Setting",
      "Heat-Treated Royal Blue Sword Style Hands",
      "Included Interchangeable Alligator Leather Strap"
    ]
  }
];

export const VALUE_PROPOSITIONS = [
  {
    icon: "ShieldCheck",
    title: "1:1 Weight & Finishing",
    description: "Constructed with solid 904L/316L surgical stainless steel and scratch-proof sapphire crystal, achieving exact gram-for-gram wrist heft."
  },
  {
    icon: "Cog",
    title: "Real Automatic Movements",
    description: "Genuine mechanical automatic calibres with sweeping second hands and functional multi-dials — zero cheap battery ticking."
  },
  {
    icon: "Store",
    title: "Physical Store Verification",
    description: "Walk into our flagship store in Jamia Nagar, New Delhi to hold, inspect, and verify the build quality before you pay a single rupee."
  },
  {
    icon: "Truck",
    title: "Fast Pan-India Express Delivery",
    description: "Dispatched within 24 hours via Bluedart Air with tracking, discreet tamper-proof packaging, and Cash on Delivery (COD) across India."
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Karan Singhal",
    location: "South Delhi / Defence Colony",
    rating: 5,
    date: "3 days ago",
    productName: "Submariner Master Edition",
    title: "Indistinguishable from my cousin's original",
    comment: "I visited their physical shop at Thokar No. 9 Okhla after reading reviews. The ceramic bezel click is crisp, the sweeping automatic movement is silent and fluid, and the weight on wrist is heavy. Absolutely top notch for ₹8,999.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Dr. Farhan Qureshi",
    location: "Mumbai / Bandra West",
    rating: 5,
    date: "1 week ago",
    productName: "Royal Oak Chronograph",
    title: "Ordered via WhatsApp with COD — arrived in 48 hours",
    comment: "Was skeptical about ordering first copies online, but Ayanbag sent video proof on WhatsApp before dispatching. Tapisserie dial reflection in sunlight is identical. Great packaging with wooden luxury box.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Vikramaditya Roy",
    location: "Bangalore / Indiranagar",
    rating: 5,
    date: "2 weeks ago",
    productName: "Nautilus Skeleton Automatic",
    title: "The open-worked skeleton balance wheel is hypnotic",
    comment: "The sapphire glass on both sides lets you see the tiny gears and ruby jewels running smoothly. Easily the best conversation starter at my office. 10/10 master copy craftsmanship.",
    verified: true
  },
  {
    id: "rev-4",
    author: "Zaid Khan",
    location: "New Delhi / Jamia Nagar",
    rating: 5,
    date: "Just yesterday",
    productName: "Cosmograph Daytona Panda",
    title: "Direct walk-in purchase near Bikanerwala",
    comment: "Super convenient location near High Tension road. Friendly staff let me try on 4 different models before deciding on the Panda Daytona. Real ceramic bezel and screw pushers!",
    verified: true
  }
];

export const COMPARISON_POINTS = [
  {
    feature: "Case Steel Quality",
    ayanbag: "Solid 904L / 316L Surgical Stainless Steel (Heavyweight, Anti-Corrosion)",
    marketCheap: "Lightweight zinc alloy or plated brass (Tarnishes in 2 months)"
  },
  {
    feature: "Crystal & Lens",
    ayanbag: "True Synthetic Sapphire Crystal with AR Coating & Diamond-Hard Scratch Resistance",
    marketCheap: "Ordinary soft mineral glass (Scratches with keys & coins)"
  },
  {
    feature: "Internal Movement",
    ayanbag: "High-Beat Miyota / ETA Clone Automatic with 21,600 vph Sweeping Hand",
    marketCheap: "Cheap ticking 1-second quartz battery movement"
  },
  {
    feature: "Bezel Material",
    ayanbag: "Real High-Tech Scratchproof Ceramic with Platinum Dust Engravings",
    marketCheap: "Printed plastic or painted aluminum ring"
  },
  {
    feature: "Weight Calibration",
    ayanbag: "Exact 1:1 Solid Wrist Weight (145g – 175g calibrated)",
    marketCheap: "Hollow, lightweight feel (70g – 90g)"
  },
  {
    feature: "Inspection & Trust",
    ayanbag: "Physical Walk-in Flagship Store in New Delhi + WhatsApp Live Video Check",
    marketCheap: "Ghost online sellers with no real address or return policy"
  }
];
