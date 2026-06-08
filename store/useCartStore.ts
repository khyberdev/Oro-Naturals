import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { effectivePrice } from "@/lib/format";
import type { ProductCard } from "@/types/sanity";

export interface CartLineItem {
  product: ProductCard;
  quantity: number;
}

interface CartState {
  items: CartLineItem[];
  isOpen: boolean;
  addItem: (product: ProductCard, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

function linePrice(product: ProductCard, quantity: number) {
  return effectivePrice(product.price, product.discountPrice) * quantity;
}

function clampToStock(quantity: number, stockLevel: number) {
  if (quantity <= 0) return 0;
  return Math.min(quantity, stockLevel);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1) => {
        if (quantity <= 0 || product.stockLevel <= 0) return;

        set((state) => {
          const existing = state.items.find(
            (item) => item.product._id === product._id,
          );

          if (existing) {
            const nextQuantity = clampToStock(
              existing.quantity + quantity,
              product.stockLevel,
            );

            if (nextQuantity <= 0) {
              return {
                items: state.items.filter(
                  (item) => item.product._id !== product._id,
                ),
              };
            }

            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, product, quantity: nextQuantity }
                  : item,
              ),
            };
          }

          const nextQuantity = clampToStock(quantity, product.stockLevel);
          if (nextQuantity <= 0) return state;

          return {
            items: [...state.items, { product, quantity: nextQuantity }],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.product._id !== productId) return item;

              const nextQuantity = clampToStock(
                quantity,
                item.product.stockLevel,
              );

              return nextQuantity > 0
                ? { ...item, quantity: nextQuantity }
                : null;
            })
            .filter((item): item is CartLineItem => item !== null),
        }));
      },

      clearCart: () => set({ items: [] }),

      cartTotal: () =>
        get().items.reduce(
          (total, { product, quantity }) =>
            total + linePrice(product, quantity),
          0,
        ),

      cartCount: () =>
        get().items.reduce((count, { quantity }) => count + quantity, 0),
    }),
    {
      name: "oro-naturals-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
