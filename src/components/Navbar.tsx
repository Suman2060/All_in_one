import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function Navbar() {

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  // debounce function
  const debouncedSearch =useDebounce(searchInput,500)
  
  useEffect(() => {
     
    if (debouncedSearch.trim() === "") return;

    navigate(`/products?search=${encodeURIComponent(debouncedSearch.trim())}`);
  },[debouncedSearch,navigate])
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
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-400px gap-3 p-4 md:w-125 md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/fashion" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Fashion</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Trending clothes and accessories.</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/electronics" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Electronics</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Innovativoe tech </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {/* Add more categories here */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full px-1.5"></span>
          </Link>
        </div>

      </div>
    </nav>
  );
}