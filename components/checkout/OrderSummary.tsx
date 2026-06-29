import Image from "next/image";
import { formatPrice } from "@/lib/products";
import type { CartItem } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  shippingMethod: "standard" | "express";
}

const SHIPPING_RATES = {
  standard: 599,
  express: 1499,
};

export function OrderSummary({ items, shippingMethod }: OrderSummaryProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = SHIPPING_RATES[shippingMethod];
  const total = subtotal + shipping;

  return (
    <div className="bg-[#FAFAF8] border border-[#E8E8E4] p-6 space-y-6">
      <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Order Summary</h2>

      {/* Items */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={`${item.id}-${item.size}`} className="flex gap-4">
            <div className="relative w-16 h-20 bg-[#F5F5F3] flex-shrink-0 overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#6B6B6B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] leading-snug">{item.name}</p>
              <p className="text-xs text-[#6B6B6B] mt-0.5">{item.size} / {item.color}</p>
              <p className="text-sm font-semibold text-[#1A1A1A] mt-2">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-[#E8E8E4] pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Subtotal</span>
          <span className="text-[#1A1A1A]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">
            Shipping ({shippingMethod === "standard" ? "Standard 5–7 days" : "Express 1–2 days"})
          </span>
          <span className="text-[#1A1A1A]">{formatPrice(shipping)}</span>
        </div>
        <div className="border-t border-[#E8E8E4] pt-3 flex justify-between font-semibold">
          <span className="text-[#1A1A1A]">Total</span>
          <span className="text-[#1A1A1A] text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
