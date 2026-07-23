// High-Margin Revenue Products Dataset (100% English)
export const PRODUCTS_DATA = [
  {
    id: "p1",
    name: "Aura Vision Pro - AI Smart Augmented Reality Glasses",
    category: "Technology",
    price: 249,
    originalPrice: 349,
    discountPercent: 29,
    rating: 4.9,
    reviewCount: 342,
    stock: 4,
    isBestSeller: true,
    isNew: true,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    description: "Built with 4K Micro-OLED displays, real-time AI language translation, and spatial gesture tracking. Ultra-light titanium frame with 12-hour battery life.",
    features: [
      "Dual 4K Micro-OLED Displays",
      "Real-Time AI Speech Translation",
      "Spatial Audio Sound Technology",
      "Ultralight Titanium Frame (72g)"
    ],
    upsellBundle: {
      id: "p1-bundle",
      name: "Protective Leather Case & Fast Charging Dock",
      price: 29,
      originalPrice: 49
    }
  },
  {
    id: "p2",
    name: "SonicPulse Studio - Active Noise Cancelling Headphones",
    category: "Audio",
    price: 129,
    originalPrice: 179,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 218,
    stock: 7,
    isBestSeller: true,
    badge: "28% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Studio-grade audio experience featuring 45dB Hi-Res active noise cancellation, 60-hour playtime, and memory foam ear cushions.",
    features: [
      "45dB Active Noise Cancellation (ANC)",
      "60-Hour Battery Life & Fast Charge",
      "LDAC & Hi-Res Wireless Certified",
      "Multi-Device Dual-Link Connection"
    ],
    upsellBundle: {
      id: "p2-bundle",
      name: "Premium Hard Travel Case & Gold Audio Cable",
      price: 19,
      originalPrice: 35
    }
  },
  {
    id: "p3",
    name: "ChronoCraft Elite - Titanium Smartwatch",
    category: "Wearables",
    price: 199,
    originalPrice: 269,
    discountPercent: 26,
    rating: 4.95,
    reviewCount: 412,
    stock: 2,
    isBestSeller: true,
    isNew: true,
    badge: "Limited Deal",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Flagship smartwatch with sapphire glass, grade-5 titanium case, ECG monitoring, 100m water resistance, and 14-day battery life.",
    features: [
      "Sapphire Crystal & Grade-5 Titanium Case",
      "ECG, SpO2 & Sleep Health Tracking",
      "100M Water Resistance (10 ATM)",
      "14 Days Long-Lasting Battery"
    ],
    upsellBundle: {
      id: "p3-bundle",
      name: "Spare Sport Silicone Strap & Screen Protector",
      price: 15,
      originalPrice: 29
    }
  },
  {
    id: "p4",
    name: "ErgoDesk Pro - AI Ergonomic Massage Chair",
    category: "Office & Living",
    price: 499,
    originalPrice: 649,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 156,
    stock: 3,
    badge: "Special Offer",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80",
    description: "Designed for spinal health with automated biometric lumbar support, heated 4D massage rollers, and breathable mesh fabric.",
    features: [
      "Biometric Lumbar Support Tracking",
      "Heated 4D Kneading Massage Modes",
      "160-Degree Recline & Footrest",
      "Heavy Duty 330 lbs Weight Capacity"
    ],
    upsellBundle: {
      id: "p4-bundle",
      name: "Memory Foam Neck Pillow & Floor Mat",
      price: 29,
      originalPrice: 59
    }
  },
  {
    id: "p5",
    name: "LuminaGlow Minimalist Smart Desk Lamp",
    category: "Office & Living",
    price: 59,
    originalPrice: 89,
    discountPercent: 31,
    rating: 4.7,
    reviewCount: 94,
    stock: 9,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Elevate your workspace with built-in wireless fast charging, eye-care RGBW ambient lighting, and smartphone app control.",
    features: [
      "15W Integrated Wireless Fast Charger",
      "Eye-Care CRI > 95 Natural Illumination",
      "16 Million RGB Color Palette",
      "Touch Control & Mobile App Integration"
    ]
  },
  {
    id: "p6",
    name: "Aura Creator Master Pack - Digital Design Asset Suite",
    category: "Digital Asset",
    price: 39,
    originalPrice: 129,
    discountPercent: 68,
    rating: 5.0,
    reviewCount: 520,
    stock: 99,
    isBestSeller: true,
    badge: "100% Profit - Instant Download",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Instant downloadable design bundle featuring 5000+ UI/UX templates, 3D icons, Canva social media kits, and royalty-free audio tracks.",
    features: [
      "5000+ Figma & Canva Ready Templates",
      "1000+ High-Res 3D Rendered Icons",
      "Unlimited Commercial License",
      "Lifetime Free Asset Updates"
    ]
  }
];

export const CATEGORIES = ["All", "Technology", "Wearables", "Audio", "Office & Living", "Digital Asset"];

export const RECENT_PURCHASES = [
  { name: "Michael R.", city: "New York, US", product: "Aura Vision Pro AR Glasses", time: "2 mins ago" },
  { name: "Sarah L.", city: "London, UK", product: "SonicPulse ANC Headphones", time: "5 mins ago" },
  { name: "David M.", city: "Toronto, CA", product: "Aura Creator Master Pack", time: "8 mins ago" },
  { name: "Emma B.", city: "Sydney, AU", product: "ChronoCraft Elite Smartwatch", time: "12 mins ago" }
];
