"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[#F5F5F3] overflow-hidden mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={product.badge === "New" ? "new" : "best-seller"} />
        </div>

        {/* Quick add overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium py-3 text-center transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          aria-hidden="true"
        >
          View Product
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-[#6B6B6B]">{product.category}</p>
        <h3 className="text-sm font-medium text-[#1A1A1A] leading-snug group-hover:underline underline-offset-2 transition-all">
          {product.name}
        </h3>
        <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
      </div>
    </Link>
  );
}
