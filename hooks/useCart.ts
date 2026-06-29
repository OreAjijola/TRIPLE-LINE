"use client";

import { useCartStore } from "@/lib/cart";

export function useCart() {
  const store = useCartStore();
  return {
    items: store.items,
    isOpen: store.isOpen,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    total: store.total(),
    itemCount: store.itemCount(),
  };
}
