import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export function Navbar() {

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500)

  const cartCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {

    if (debouncedSearch.trim() === "") return;

    navigate(`/products?search=${encodeURIComponent(debouncedSearch.trim())}`);
  }, [debouncedSearch, navigate])
  return (
    <nav className="fixed top-0 w-full border-b bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-8">

        {/* 1. Logo */}
        <Link to="/" className="text-xl font-bold shrink-0">
          All<span className="text-indigo-600">-In-</span>One
        </Link>

        {/* 2. Navigation Menu (Categories) */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>


            <NavigationMenuItem>
              <Link to="/products" className={navigationMenuTriggerStyle()}>
                All Products
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 3. Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 4. Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-indigo-600">Login</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full px-1.5"></span>
          </Link>
        </div>

      </div>
    </nav>
  );
}