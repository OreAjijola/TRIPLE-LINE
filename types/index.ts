export interface Product {
  id: string;
  slug: string;
  name: string;
  badge: "New" | "Best Seller";
  price: number;
  originalPrice: number;
  category: "shirts" | "tops" | "bottoms" | "outerwear";
  gender: "mens" | "womens" | "unisex";
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: "standard" | "express";
}

export interface FilterState {
  category: string[];
  gender: string[];
  priceMin: number;
  priceMax: number;
  size: string[];
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "best-selling";
