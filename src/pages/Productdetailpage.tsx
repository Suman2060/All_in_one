import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, ShoppingCart, Heart, ArrowLeft,
    Share2, Minus, Plus
} from "lucide-react";
import { mockProducts, productMeta } from "@/data/products";
import { ProductDetailSkeleton } from "@/components/ProductSkeletons";

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

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, [id]);

  const product = mockProducts.find((p) => p.id === Number(id));
  const meta = product ? productMeta[product.id] : undefined;

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product || !meta) {
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

  const hasDiscount = meta.oldPrice !== undefined;
  const discountPct = hasDiscount ? Math.round(((meta.oldPrice! - product.price) / meta.oldPrice!) * 100) : 0;
  const totalPrice = (product.price * quantity).toFixed(2);

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
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

            <div className="flex gap-3">
              <button
                onClick={() => setWishlisted(!isWishlisted)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isWishlisted ? "bg-rose-50 border-rose-200 text-rose-600" : "border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500"
                }`}
              >
                <Heart size={16} className={isWishlisted ? "fill-rose-500" : ""} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 text-sm font-medium transition-colors">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{product.category}</span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">{product.title}</h1>

            <div className="flex items-center gap-3">
              <StarRating rating={meta.rating} />
              <span className="text-sm font-semibold text-slate-700">{meta.rating}</span>
              <span className="text-sm text-slate-400">({meta.reviews.toLocaleString()} reviews)</span>
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
              <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
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
                      <StarRating rating={productMeta[p.id]?.rating ?? 4.0} size={12} />
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