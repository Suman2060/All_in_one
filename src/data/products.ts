
export interface ProductMeta {
  rating?: number;
  reviews?: number;
  badge?: string;
  badgeColor?: string;
  oldPrice?: number;
}

export const productMeta: Record<number, ProductMeta> = {
  // key = product id, value = extra display info
  1: { badge: "Sale", badgeColor: "bg-rose-500", oldPrice: 129.99 },
  2: { badge: "New", badgeColor: "bg-emerald-500" },
  3: { badge: "Sale", badgeColor: "bg-rose-500", oldPrice: 60.00 },
  4: { badge: "Bestseller", badgeColor: "bg-amber-500" },
  6: { badge: "Hot", badgeColor: "bg-orange-500", oldPrice: 249.99 },
  7: { badge: "New", badgeColor: "bg-emerald-500" },
  8: { badge: "Bestseller", badgeColor: "bg-amber-500" },
};