import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProductsPageSkeleton } from "@/components/ProductSkeletons";
import { ProductDetailSkeleton } from "@/components/ProductSkeletons";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const ProductPage = lazy(() => import("../pages/Productpage"));
const ProductDetailPage = lazy(() => import("../pages/Productdetailpage"));
const CartPage = lazy(() => import("../pages/Cartpage"));
const LoginPage = lazy(() => import("../pages/Loginpage"));
const CheckoutPage = lazy(() => import("../pages/Checkoutpage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 font-medium">Loading...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<PageLoader />}><Home /></Suspense>,
  },
  {
    path: "/products",
    element: <Suspense fallback={<ProductsPageSkeleton />}><ProductPage /></Suspense>,
  },
  {
    path: "/products/:id",
    element: (
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailPage />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CartPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CheckoutPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-7xl font-extrabold text-slate-200">404</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-2">Page Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6 text-sm">The page you're looking for doesn't exist.</p>
        <a href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
          Go Home
        </a>
      </div>
    ),
  },
]);