"use client";

import type { SortOption } from "@/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-xs uppercase tracking-widest text-[#6B6B6B] whitespace-nowrap">
        Sort by
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border border-[#E8E8E4] text-sm text-[#1A1A1A] px-3 py-2 focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
