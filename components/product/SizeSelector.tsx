"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  error?: boolean;
}

export function SizeSelector({ sizes, selectedSize, onSelect, error }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Size</span>
        {selectedSize && (
          <span className="text-xs text-[#6B6B6B]">Selected: {selectedSize}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "w-12 h-12 text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2",
              selectedSize === size
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                : "border-[#E8E8E4] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]",
              error && !selectedSize && "border-[#C0392B]"
            )}
            aria-pressed={selectedSize === size}
          >
            {size}
          </button>
        ))}
      </div>
      {error && !selectedSize && (
        <p className="mt-2 text-xs text-[#C0392B]" role="alert">Please select a size before adding to cart.</p>
      )}
    </div>
  );
}
