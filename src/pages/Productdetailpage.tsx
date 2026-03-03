
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, ShoppingCart, ArrowLeft,
  Minus, Plus
} from "lucide-react";
import { productMeta } from "@/data/products";
import { ProductDetailSkeleton } from "@/components/ProductSkeletons";
import { fetchProductById, fetchProductsByCategory } from "@/services/Api";
import type { Product } from "@/types/Product.types";
import { useCartStore } from "@/store/cartStore";
import { Navbar } from "@/components/Navbar";

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={
          star <= Math.round(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-slate-200 fill-slate-200"
        }
      />
    ))}
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      if (!id) return;
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);

        // Fetch related products
        const related = await fetchProductsByCategory(productData.category);
        setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">Opps</div>
          <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
          <p className="text-slate-500 mt-2 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const meta = productMeta[product.id] ?? { rating: product.rating.rate, reviews: product.rating.count };
  const hasDiscount = meta.oldPrice !== undefined;
  const discountPct = hasDiscount ? Math.round(((meta.oldPrice! - product.price) / meta.oldPrice!) * 100) : 0;
  const totalPrice = (product.price * quantity).toFixed(2);

  const inCart = items.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium line-clamp-1">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6 group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-100">
          <div className="flex flex-col gap-4">
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8">
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                  -{discountPct}% OFF
                </span>
              )}
              {meta.badge && (
                <span className={`absolute top-4 right-4 ${meta.badgeColor} text-white text-sm font-bold px-3 py-1 rounded-full z-10`}>
                  {meta.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/500x500/f1f5f9/94a3b8?text=${encodeURIComponent(product.title)}`;
                }}
              />
            </div>

          </div>

          <div className="flex flex-col gap-5">
            <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{product.category}</span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">{product.title}</h1>

            <div className="flex items-center gap-3">
              <StarRating rating={meta.rating || product.rating.rate} />
              <span className="text-sm font-semibold text-slate-700">{meta.rating || product.rating.rate}</span>
              <span className="text-sm text-slate-400">({(meta.reviews || product.rating.count).toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
              <span className="text-4xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-slate-400 line-through">${meta.oldPrice!.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ${(meta.oldPrice! - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Quantity</label>
              <div className="flex items-center gap-3 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-bold text-slate-900 text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {quantity > 1 && (
              <p className="text-sm text-slate-500">Total: <span className="font-bold text-slate-800">${totalPrice}</span></p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${inCart
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
              >
                <ShoppingCart size={18} />
                {inCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => { addToCart(product, quantity); navigate("/cart"); }}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>

      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <div className="bg-slate-50 h-36 flex items-center justify-center p-4">
                  <img src={p.image} alt={p.title} className="h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-indigo-600">{p.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <StarRating rating={productMeta[p.id]?.rating || p.rating.rate} size={12} />
                    <span className="text-sm font-bold">${p.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
