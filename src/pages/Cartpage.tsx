import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types/Product.types";
import { Navbar } from "@/components/Navbar";


const CartItemRow = ({ item }: { item: CartItem }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore()

  return (
    <div className="flex gap-4 py-5  border-b border-slate-100 last:border-0">
      <Link to={`/products/${item.id}`}
        className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/80x80/f1f5f9/94a3b8?text=IMG`;
          }}
        />
      </Link>

      <div className="flex-1 min-w-0">
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide capitalize">
          {item.category}
        </span>

        <Link to={`/products/${item.id}`}
          className="block text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors mt-0.5 line-clamp-2">
          {item.title}
        </Link>

        <p className="text-base font-extrabold text-slate-900 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {item.quantity > 1 && (
          <p className="text-xs text-slate-400 mt-0.5">
            ${item.price.toFixed(2)} each
          </p>
        )}
      </div>

      <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">

        {/* Remove button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
          title="Remove item"
        >
          <Trash2 size={15} />
        </button>

        {/* Quantity decrease */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-indigo-600"
          >
            <Minus size={13} />
          </button>

          <span className="w-6 text-center text-sm font-bold text-slate-900">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-indigo-600"
          >
            <Plus size={13} />
          </button>
        </div>

      </div>
    </div>
  )
};

//  Order Summery

const OrderSummary = () => {
  const { getCartSummary, clearCart } = useCartStore();
  const summary = getCartSummary();

  const shipping = summary.totalPrice >= 50 ? 0 : 9.99;
  // Free shipping over $50
  const grandTotal = summary.totalPrice + shipping;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4 sticky top-24">
      {/* sticky top-24 → stays visible as you scroll, below the navbar */}

      <h2 className="text-lg font-extrabold text-slate-900">Order Summary</h2>

      {/* Price breakdown */}
      <div className="flex flex-col gap-3 text-sm">

        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({summary.totalItems} item{summary.totalItems !== 1 ? "s" : ""})</span>
          <span className="font-semibold">${summary.totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          {shipping === 0
            ? <span className="text-emerald-600 font-semibold">Free</span>
            : <span className="font-semibold">${shipping.toFixed(2)}</span>
          }
        </div>

        {/* Free shipping progress bar */}
        {shipping > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 font-medium">
              Add ${(50 - summary.totalPrice).toFixed(2)} more for free shipping!
            </p>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((summary.totalPrice / 50) * 100, 100)}%` }}
              // style width is calculated dynamically based on current total
              />
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-100 pt-3 flex justify-between text-slate-900">
          <span className="font-bold">Total</span>
          <span className="text-xl font-extrabold">${grandTotal.toFixed(2)}</span>
        </div>

      </div>

      {/* Promo code input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-2.5 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Promo code"
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          Apply
        </button>
      </div>

      {/* Checkout button */}
      <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
        Proceed to Checkout
        <ArrowRight size={16} />
      </button>

      {/* Clear cart */}
      <button
        onClick={clearCart}
        className="text-xs text-slate-400 hover:text-rose-500 transition-colors text-center"
      >
        Clear entire cart
      </button>

    </div>
  );
};

// empty cart 
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <ShoppingBag size={64} className="text-slate-200 mb-4" />
    <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
    <p className="text-slate-500 text-sm mt-2 max-w-xs">
      Looks like you haven't added anything yet. Start shopping!
    </p>
    <Link
      to="/products"
      className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
    >
      <ShoppingBag size={16} />
      Browse Products
    </Link>

  </div>
)

const Cartpage = () => {

  const { items, getItemCount } = useCartStore()
  const itemCount = getItemCount();
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold text-slate-900">My Cart</h1>
          <p className="text-slate-500 text-sm mt-1">
            {itemCount} item{itemCount !== 1 ? "s" : ""} i your cart
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Cart Items ({itemCount})
                </h2>
                <Link to="/products"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                  + Continue Shopping
                </Link>
              </div>

              <div>
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

            </div>

            <div>
              <OrderSummary />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cartpage
