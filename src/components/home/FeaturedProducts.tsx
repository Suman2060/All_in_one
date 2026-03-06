import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productMeta } from "@/data/products";
import { fetchFeaturedProducts } from "@/services/Api";
import type { Product } from "@/types/Product.types";
import { ProductCard } from "@/components/ProductCard";

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
                meta={productMeta[product.id] ?? {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;