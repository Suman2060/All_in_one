import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  fetchFeaturedProducts,
} from "../services/Api";

import type { Product, Categories } from "../types/Product.types";

export const queryKeys = {
  allProducts: ["products"] as const,
  product: (id: number | string) => ["products", id] as const,
  categories: ["categories"] as const,
  byCategory: (cat: string) => ["products", "category", cat] as const,
  featured: ["products", "featured"] as const,
};

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: queryKeys.allProducts,
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000,
  });

export const useProduct = (id: number | string) =>
  useQuery<Product>({
    queryKey: queryKeys.product(id),
    queryFn: () => fetchProductById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });

export const useCategories = () =>
  useQuery<Categories>({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    staleTime: 60 * 60 * 1000,
  });

export const useProductsByCategory = (category: string) =>
  useQuery<Product[]>({
    queryKey: queryKeys.byCategory(category),
    queryFn: () => fetchProductsByCategory(category),
    staleTime: 5 * 60 * 1000,
    enabled: !!category && category !== "all",
  });

export const useFeaturedProducts = (limit = 8) =>
  useQuery<Product[]>({
    queryKey: queryKeys.featured,
    queryFn: () => fetchFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000,
  });