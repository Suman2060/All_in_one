import axiosInstance from "../services/axiosInstance";
import type {
  Product,
  Categories,
} from "../types/Product.types";


export const fetchAllProducts = (): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>("/products")
    .then((res) => res.data);

// GET https://fakestoreapi.com/products/1
export const fetchProductById = (id: number | string): Promise<Product> =>
  axiosInstance
    .get<Product>(`/products/${id}`)
    .then((res) => res.data);

// GET https://fakestoreapi.com/products/categories
export const fetchCategories = (): Promise<Categories> =>
  axiosInstance
    .get<Categories>("/products/categories")
    .then((res) => res.data);

// GET https://fakestoreapi.com/products/category/electronics
export const fetchProductsByCategory = (category: string): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>(`/products/category/${encodeURIComponent(category)}`)
    .then((res) => res.data);

// GET https://fakestoreapi.com/products?limit=8
export const fetchFeaturedProducts = (limit = 8): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>("/products", { params: { limit } })
    .then((res) => res.data);