"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = "md",
}: QuantityStepperProps) {
  const btnClass =
    size === "sm"
      ? "w-6 h-6 flex items-center justify-center border border-[#E8E8E4] hover:border-[#1A1A1A] transition-colors disabled:opacity-30"
      : "w-8 h-8 flex items-center justify-center border border-[#E8E8E4] hover:border-[#1A1A1A] transition-colors disabled:opacity-30";
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <div className="flex items-center gap-0">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={btnClass}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </button>
      <span
        className={`${size === "sm" ? "w-8 text-xs" : "w-10 text-sm"} text-center font-medium tabular-nums`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={btnClass}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
