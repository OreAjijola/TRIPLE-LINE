import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

interface ProductRowProps {
  label: string;
  heading: string;
  products: Product[];
  viewAllHref: string;
}

export function ProductRow({ label, heading, products, viewAllHref }: ProductRowProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">{label}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight max-w-md">
              {heading}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden md:inline-flex text-xs uppercase tracking-widest text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors border-b border-current pb-0.5"
          >
            View All
          </Link>
        </div>

        {/* Scroll row */}
        <div className="scroll-row -mx-5 lg:-mx-10 px-5 lg:px-10">
          <div className="flex gap-4 lg:gap-5 w-max">
            {products.map((product, i) => (
              <div key={product.id} className="w-52 sm:w-60 lg:w-64 flex-shrink-0">
                <ProductCard product={product} priority={i < 3} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href={viewAllHref}
            className="text-xs uppercase tracking-widest text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors border-b border-current pb-0.5"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
