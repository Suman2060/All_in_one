import type { LoginCredentials, LoginResponse } from "@/types/auth.types";
import axiosInstance from "../services/axiosInstance";
import type {
  Product,
  Categories,
} from "../types/Product.types";


export const fetchAllProducts = (): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>("/products")
    .then((res) => res.data);


export const fetchProductById = (id: number | string): Promise<Product> =>
  axiosInstance
    .get<Product>(`/products/${id}`)
    .then((res) => res.data);

export const fetchCategories = (): Promise<Categories> =>
  axiosInstance
    .get<Categories>("/products/categories")
    .then((res) => res.data);

export const fetchProductsByCategory = (category: string): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>(`/products/category/${encodeURIComponent(category)}`)
    .then((res) => res.data);

export const fetchFeaturedProducts = (limit = 8): Promise<Product[]> =>
  axiosInstance
    .get<Product[]>("/products", { params: { limit } })
    .then((res) => res.data);

export const LoginUser = (credentials: LoginCredentials): Promise<LoginResponse> =>
  axiosInstance.post<LoginResponse>("/auth/login", credentials).then(r=>r.data)