"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartStore } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item: CartItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id: string, size: string) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        }));
      },

      updateQuantity: (id: string, size: string, qty: number) => {
        if (qty <= 0) {
          get().removeItem(id, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "tripline-cart",
    }
  )
);
