import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem, CartSummary } from "@/types/Product.types";

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productID: number) => void;
  increaseQuantity: (productID: number) => void;
  decreaseQuantity: (productID: number) => void;
  updateQuantity: (productID: number, quantity: number) => void;
  clearCart: () => void;

  getItemCount: () => number;
  getCartSummary: () => CartSummary;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...product, quantity } as CartItem] });
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQuantity: (productId) => {
        const items = get().items;
        const item = items.find((i) => i.id === productId);

        if (!item) return;

        if (item.quantity <= 1) {
          set({ items: items.filter((i) => i.id !== productId) });
        } else {
          set({
            items: items.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== productId) });
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getCartSummary: () => {
        const items = get().items;
        return {
          totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          totalDiscount: 0,
        };
      },

      isInCart: (id) => get().items.some((item) => item.id === id),

      getItemQuantity: (id) =>
        get().items.find((item) => item.id === id)?.quantity ?? 0,
    }),
    {
      name: "cart-storage",
    }
  )
);