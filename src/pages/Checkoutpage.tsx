import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Navbar } from "@/components/Navbar";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { checkoutSchema, type CheckoutForm } from "@/schema/checkout.schema";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartSummary, clearCart } = useCartStore();
  const summary = getCartSummary();
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutForm, string>>
  >({});

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <ShoppingBag size={64} className="text-slate-200 mb-4" />
          <h2 className="text-xl font-bold text-slate-800">
            Your cart is empty
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Add items to your cart before checking out.
          </p>
          <Link
            to="/products"
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 max-w-md w-full">
            <CheckCircle size={64} className="text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-slate-900">
              Order Placed!
            </h2>
            <p className="text-slate-500 text-sm mt-2 mb-6">
              Thank you for your purchase. Your order has been received.
            </p>
            <Link
              to="/"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const validate = () => {
    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutForm, string>> = {};
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof CheckoutForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    setPlaced(true);
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors[field] ? "border-rose-400 bg-rose-50" : "border-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Checkout</h1>
          <p className="text-slate-500 text-sm mt-1">
            Complete your order below
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="text-base font-extrabold text-slate-900 mb-4">
                  Shipping Information
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Street Address
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      className={inputClass("address")}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        City
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className={inputClass("city")}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-500">{errors.city}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        ZIP Code
                      </label>
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="10001"
                        className={inputClass("zip")}
                      />
                      {errors.zip && (
                        <p className="text-xs text-rose-500">{errors.zip}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="text-base font-extrabold text-slate-900 mb-4">
                  Payment Details
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Card Number
                    </label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={inputClass("cardNumber")}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-rose-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        Expiry Date
                      </label>
                      <input
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        maxLength={7}
                        className={inputClass("expiry")}
                      />
                      {errors.expiry && (
                        <p className="text-xs text-rose-500">{errors.expiry}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        CVV
                      </label>
                      <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={3}
                        className={inputClass("cvv")}
                      />
                      {errors.cvv && (
                        <p className="text-xs text-rose-500">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                <h2 className="text-base font-extrabold text-slate-900 mb-4">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 object-contain bg-slate-50 rounded-lg p-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-900 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Items</span>
                    <span className="font-semibold">{summary.totalItems}</span>
                  </div>
                  <div className="flex justify-between text-slate-900">
                    <span className="font-bold">Total Price</span>
                    <span className="text-lg font-extrabold">
                      ${summary.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Place Order
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="mt-2 w-full text-sm text-slate-400 hover:text-slate-600 transition-colors text-center py-1"
                >
                  ← Back to Cart
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
