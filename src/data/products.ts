
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// ── Mock data — same shape as the real API ──
// image field uses a free placeholder service (no signup needed)
// Format: https://placehold.co/300x300?text=ProductName
// When real API is ready, these image URLs get replaced automatically

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 79.99,
    description: "High-quality over-ear headphones with active noise cancellation, 30-hour battery life, and premium sound quality for an immersive listening experience.",
    category: "electronics",
    image: "https://placehold.co/300x300/e0e7ff/4f46e5?text=Headphones",
  },
  {
    id: 2,
    title: "Classic Leather Sneakers",
    price: 89.99,
    description: "Timeless leather sneakers with cushioned insoles and durable rubber outsoles. Perfect for everyday casual wear with a clean, minimal design.",
    category: "fashion",
    image: "https://placehold.co/300x300/fce7f3/db2777?text=Sneakers",
  },
  {
    id: 3,
    title: "Minimalist Desk Lamp",
    price: 45.00,
    description: "Sleek adjustable LED desk lamp with 3 color modes and 5 brightness levels. USB charging port built into the base. Perfect for home offices.",
    category: "home & living",
    image: "https://placehold.co/300x300/fef9c3/ca8a04?text=Lamp",
  },
  {
    id: 4,
    title: "Yoga Mat Pro",
    price: 34.99,
    description: "Non-slip professional yoga mat with alignment lines, extra thick 6mm cushioning, and eco-friendly TPE material. Includes carry strap.",
    category: "sports",
    image: "https://placehold.co/300x300/dcfce7/16a34a?text=Yoga+Mat",
  },
  {
    id: 5,
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Double-wall vacuum insulated bottle keeps drinks cold 24 hours and hot 12 hours. BPA-free, leak-proof lid. Available in 500ml and 1L.",
    category: "sports",
    image: "https://placehold.co/300x300/cffafe/0891b2?text=Bottle",
  },
  {
    id: 6,
    title: "Smart Watch Series X",
    price: 199.99,
    description: "Feature-packed smartwatch with health monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    category: "electronics",
    image: "https://placehold.co/300x300/ede9fe/7c3aed?text=SmartWatch",
  },
  {
    id: 7,
    title: "Linen Throw Blanket",
    price: 39.99,
    description: "Soft, breathable linen throw blanket for year-round comfort. Machine washable, pre-washed for extra softness. 130x170cm.",
    category: "home & living",
    image: "https://placehold.co/300x300/fff7ed/ea580c?text=Blanket",
  },
  {
    id: 8,
    title: "Sunscreen SPF 50+",
    price: 18.99,
    description: "Lightweight, non-greasy broad spectrum SPF 50+ sunscreen. Water resistant for 80 minutes. Suitable for all skin types including sensitive skin.",
    category: "beauty",
    image: "https://placehold.co/300x300/fdf4ff/a21caf?text=Sunscreen",
  },
];

// ── Extra data we add on top of the API response ──
// The real API doesn't return badge/rating — we manage those ourselves.
// This is a separate map so it stays independent of the API shape.

export interface ProductMeta {
  rating: number;
  reviews: number;
  badge?: string;       
  badgeColor?: string;  // Tailwind class e.g. "bg-rose-500"
  oldPrice?: number;    // only for sale items
}

export const productMeta: Record<number, ProductMeta> = {
  // key = product id, value = extra display info
  1: { rating: 4.8, reviews: 2341, badge: "Sale",       badgeColor: "bg-rose-500",   oldPrice: 129.99 },
  2: { rating: 4.6, reviews: 876,  badge: "New",        badgeColor: "bg-emerald-500"                  },
  3: { rating: 4.7, reviews: 543,  badge: "Sale",       badgeColor: "bg-rose-500",   oldPrice: 60.00  },
  4: { rating: 4.9, reviews: 1203, badge: "Bestseller", badgeColor: "bg-amber-500"                    },
  5: { rating: 4.5, reviews: 3210                                                                      },
  6: { rating: 4.7, reviews: 987,  badge: "Hot",        badgeColor: "bg-orange-500", oldPrice: 249.99 },
  7: { rating: 4.8, reviews: 654,  badge: "New",        badgeColor: "bg-emerald-500"                  },
  8: { rating: 4.6, reviews: 4501, badge: "Bestseller", badgeColor: "bg-amber-500"                    },
};