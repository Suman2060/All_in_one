
import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { productMeta } from "@/data/products";
import type { ProductMeta } from "@/data/products";
import { fetchFeaturedProducts } from "@/services/Api";
import type { Product } from "@/types/Product.types";
import { useCartStore } from "@/store/cartStore";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={13}
        className={
          star <= Math.round(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-slate-300 fill-slate-300"
        }
      />
    ))}
  </div>
);
// Single Product card 
interface ProductCardProps {
  product: Product;
  meta: ProductMeta;
}

const ProductCard = ({ product, meta }: ProductCardProps) => {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const inCart = items.some((item) => item.id === product.id);
  const hasDiscount = meta.oldPrice !== undefined;
  const discountPct = hasDiscount
    ? Math.round(((meta.oldPrice! - product.price) /
      meta.oldPrice!) * 100)
    : 0;
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden flex flex-col">


      <div className="relative bg-slate-50 h-52 overflow-hidden">


        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // If image URL fails, show a placeholder with the product title
            (e.target as HTMLImageElement).src =
              `https://placehold.co/300x300/f1f5f9/94a3b8?text=${encodeURIComponent(product.title)}`;
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


        <button className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-50 hover:text-rose-500 text-slate-400">
          <Heart size={15} />
        </button>

      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">

        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
          {product.category}
        </span>


        <Link
          to={`/products/${product.id}`}
          className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1.5">
          <StarRating rating={meta.rating || product.rating.rate} />
          <span className="text-xs text-slate-400">
            {meta.rating || product.rating.rate} ({(meta.reviews || product.rating.count).toLocaleString()})
          </span>
        </div>


        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                ${meta.oldPrice!.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200 active:scale-95 ${inCart
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
          >
            <ShoppingCart size={14} />
            {inCart ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};


const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeaturedProducts(8);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <span className="text-indigo-600 text-sm font-bold uppercase tracking-widest">
              Handpicked For You
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
              Featured Products
            </h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md">
              Top-rated picks across every category, selected just for you.
            </p>
          </div>

          <Link
            to="/products"
            className="w-fit mx-auto md:mx-0 text-sm font-bold text-indigo-600 hover:text-white border border-indigo-200 hover:bg-indigo-600 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm"
          >
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                meta={productMeta[product.id] ?? { rating: product.rating.rate, reviews: product.rating.count }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};


export default FeaturedProducts
