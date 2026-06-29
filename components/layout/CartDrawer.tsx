"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-[380px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E4]">
              <h2 className="font-semibold text-base text-[#1A1A1A]">
                Your Cart
                <span
                  className="ml-2 text-[#6B6B6B] font-normal"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="flex items-center justify-center w-8 h-8 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-[#E8E8E4]" />
                  <div>
                    <p className="font-medium text-[#1A1A1A] mb-1">Your cart is empty</p>
                    <p className="text-sm text-[#6B6B6B]">Add something beautiful to get started.</p>
                  </div>
                  <Button onClick={closeCart} size="sm" variant="ghost">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-5" aria-label="Cart items">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-[#F5F5F3] flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-[#1A1A1A] hover:underline leading-tight line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[#6B6B6B] hover:text-[#C0392B] transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-[#6B6B6B] mt-1">
                          {item.size} / {item.color}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <QuantityStepper
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            size="sm"
                          />
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E8E4] px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-[#6B6B6B]">Shipping calculated at checkout</p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button fullWidth size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
