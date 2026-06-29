"use client";

import { X } from "lucide-react";
import type { FilterState } from "@/types";
import { Button } from "@/components/ui/Button";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  productCount: number;
}

const categories = ["tops", "shirts", "bottoms", "outerwear"];
const genders = ["mens", "womens", "unisex"];
const sizes = ["XS", "S", "M", "L", "XL"];

export function FilterSidebar({ filters, onChange, onClose, productCount }: FilterSidebarProps) {
  function toggleArray<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  function resetFilters() {
    onChange({ category: [], gender: [], priceMin: 0, priceMax: 50000, size: [] });
  }

  const hasActiveFilters =
    filters.category.length > 0 || filters.gender.length > 0 || filters.size.length > 0;

  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Filters</h2>
          {productCount > 0 && (
            <p className="text-xs text-[#6B6B6B] mt-0.5">{productCount} products</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-[#6B6B6B] hover:text-[#1A1A1A] lg:hidden">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => onChange({ ...filters, category: toggleArray(filters.category, cat) })}
                className="w-3.5 h-3.5 border border-[#E8E8E4] accent-[#1A1A1A]"
              />
              <span className="text-sm capitalize text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">Collection</h3>
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.gender.includes(g)}
                onChange={() => onChange({ ...filters, gender: toggleArray(filters.gender, g) })}
                className="w-3.5 h-3.5 border border-[#E8E8E4] accent-[#1A1A1A]"
              />
              <span className="text-sm capitalize text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">
                {g === "mens" ? "Men's" : g === "womens" ? "Women's" : "Unisex"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.priceMin / 100}
            onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) * 100 })}
            min={0}
            placeholder="Min"
            className="w-full border border-[#E8E8E4] px-2 py-1.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
          />
          <span className="text-[#6B6B6B] text-sm">–</span>
          <input
            type="number"
            value={filters.priceMax / 100}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) * 100 })}
            min={0}
            placeholder="Max"
            className="w-full border border-[#E8E8E4] px-2 py-1.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
          />
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, size: toggleArray(filters.size, s) })}
              className={`w-10 h-10 text-xs font-medium border transition-colors ${
                filters.size.includes(s)
                  ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                  : "border-[#E8E8E4] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" fullWidth onClick={resetFilters}>
          Clear Filters
        </Button>
      )}
    </aside>
  );
}
