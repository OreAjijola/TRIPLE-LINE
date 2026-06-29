"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import type { FilterState, SortOption } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    gender: [],
    priceMin: 0,
    priceMax: 50000,
    size: [],
  });

  // Apply URL params on mount
  useEffect(() => {
    const badge = searchParams.get("badge");
    const gender = searchParams.get("gender");
    if (badge === "Best Seller") setSort("best-selling");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];

    // URL badge filter
    const badge = searchParams.get("badge");
    if (badge) list = list.filter((p) => p.badge === badge);

    const gender = searchParams.get("gender");
    if (gender) list = list.filter((p) => p.gender === gender);

    // Sidebar filters
    if (filters.category.length > 0) list = list.filter((p) => filters.category.includes(p.category));
    if (filters.gender.length > 0) list = list.filter((p) => filters.gender.includes(p.gender));
    if (filters.size.length > 0) list = list.filter((p) => p.sizes?.some((s) => filters.size.includes(s)));
    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    // Sort
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "best-selling") list = list.filter((p) => p.badge === "Best Seller").concat(list.filter((p) => p.badge !== "Best Seller"));

    return list;
  }, [filters, sort, searchParams]);

  const activeFilterCount =
    filters.category.length + filters.gender.length + filters.size.length;

  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Collection</p>
        <h1 className="font-serif text-4xl font-semibold text-[#1A1A1A]">Shop All</h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E8E4]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#6B6B6B] transition-colors lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters {activeFilterCount > 0 && <span className="text-[#C0392B]">({activeFilterCount})</span>}
          </button>
          <p className="text-sm text-[#6B6B6B]">{filtered.length} products</p>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="flex gap-10">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <FilterSidebar filters={filters} onChange={setFilters} productCount={filtered.length} />
        </div>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="relative bg-white w-72 h-full overflow-y-auto p-6 ml-auto shadow-xl">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClose={() => setShowFilters(false)}
                productCount={filtered.length}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#6B6B6B]">Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
