
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShoppingCart, Star, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { productMeta } from "@/data/products";
import type { ProductMeta } from "@/data/products";
import { ProductsPageSkeleton } from "@/components/ProductSkeletons";
import { Navbar } from "@/components/Navbar";
import { fetchAllProducts, fetchCategories } from "@/services/Api";
import type { Product } from "@/types/Product.types";
import { useCartStore } from "@/store/cartStore";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={12}
        className={star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
      />
    ))}
  </div>
);

const ProductCard = ({ product, meta }: { product: Product; meta: ProductMeta }) => {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const inCart = items.some((item) => item.id === product.id);
  const hasDiscount = meta.oldPrice !== undefined;
  const discountPct = hasDiscount ? Math.round(((meta.oldPrice! - product.price) / meta.oldPrice!) * 100) : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative bg-slate-50 h-48 overflow-hidden">
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
        <button className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-50 hover:text-rose-500 text-slate-400">
          <Heart size={14} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{product.category}</span>
        <Link to={`/products/${product.id}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
          {product.title}
        </Link>
        <div className="flex items-center gap-1.5">
          <StarRating rating={meta.rating || product.rating.rate} />
          <span className="text-xs text-slate-400">{meta.rating || product.rating.rate} ({(meta.reviews || product.rating.count).toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
            {hasDiscount && <span className="text-xs text-slate-400 line-through">${meta.oldPrice!.toFixed(2)}</span>}
          </div>
          <button
            onClick={() => addToCart(product)}
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

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "rating", label: "Top Rated" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load products/categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchTerm = (urlSearch || localSearch).toLowerCase().trim();
    let results = [...products];

    if (searchTerm) {
      results = results.filter((p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    if (activeCategory !== "all") {
      results = results.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case "price-asc": results.sort((a, b) => a.price - b.price); break;
      case "price-desc": results.sort((a, b) => b.price - a.price); break;
      case "name-asc": results.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "rating":
        results.sort((a, b) => {
          const ratingA = productMeta[a.id]?.rating ?? a.rating.rate;
          const ratingB = productMeta[b.id]?.rating ?? b.rating.rate;
          return ratingB - ratingA;
        });
        break;
    }

    return results;
  }, [products, urlSearch, localSearch, activeCategory, sortBy]);

  const clearSearch = () => {
    setSearchParams({});
    setLocalSearch("");
  };

  const allCategories = ["all", ...categories];

  if (isLoading) return <ProductsPageSkeleton />;

  return (

    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold text-slate-900 text-center">All Products</h1>
          <div className="flex justify-between items-center mt-4">
            <p className="text-slate-500 text-sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
          {urlSearch && (
            <div className="mt-3 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 text-sm px-3 py-1.5 rounded-full">
              <Search size={13} />
              Showing results for: <strong>"{urlSearch}"</strong>
              <button onClick={clearSearch} className="hover:text-indigo-900 ml-1"><X size={13} /></button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (urlSearch) setSearchParams({});
              }}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-700"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-wrap gap-2 mb-6`}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} meta={productMeta[product.id] ?? { rating: product.rating.rate, reviews: product.rating.count }} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800">No products found</h3>
            <button
              onClick={() => { clearSearch(); setActiveCategory("all"); setLocalSearch(""); }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
