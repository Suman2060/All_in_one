import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "@/types/Product.types";
import type { ProductMeta } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

// Reusable Star Rating Component
export const StarRating = ({ rating, size = 13 }: { rating: number; size?: number }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                size={size}
                className={star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
            />
        ))}
    </div>
);

interface ProductCardProps {
    product: Product;
    meta: ProductMeta;
}

// Reusable Product Card Component
export const ProductCard = ({ product, meta }: ProductCardProps) => {
    const items = useCartStore((state) => state.items);
    const addToCart = useCartStore((state) => state.addToCart);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const inCart = items.some((item) => item.id === product.id);
    const hasDiscount = meta.oldPrice !== undefined;
    const discountPct = hasDiscount
        ? Math.round(((meta.oldPrice! - product.price) / meta.oldPrice!) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
            return;
        }
        addToCart(product);
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden flex flex-col">
            <Link to={`/products/${product.id}`} className="relative block bg-slate-50 h-52 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/300x300/f1f5f9/94a3b8?text=${encodeURIComponent(product.title)}`;
                    }}
                />
                {meta.badge && (
                    <span className={`absolute top-3 left-3 ${meta.badgeColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-full`}>
                        {meta.badge}
                    </span>
                )}
                {hasDiscount && (
                    <span className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-1 rounded-full">
                        -{discountPct}%
                    </span>
                )}
                <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-50 hover:text-rose-500 text-slate-400"
                >
                    <Heart size={15} />
                </button>
            </Link>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{product.category}</span>
                <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
                >
                    {product.title}
                </Link>
                <div className="flex items-center gap-1.5">
                    <StarRating rating={meta.rating ?? product.rating.rate} />
                    <span className="text-xs text-slate-400">
                        {meta.rating ?? product.rating.rate} ({(meta.reviews ?? product.rating.count).toLocaleString()})
                    </span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                        {hasDiscount && <span className="text-xs text-slate-400 line-through">${meta.oldPrice!.toFixed(2)}</span>}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors active:scale-95 ${inCart
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                            }`}
                    >
                        <ShoppingCart size={14} />
                        {inCart ? "Added ✓" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};
