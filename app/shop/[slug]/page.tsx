"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getProductBySlug, getRelatedProducts, formatPrice } from "@/lib/products";
import { ImageGallery } from "@/components/product/ImageGallery";
import { SizeSelector } from "@/components/product/SizeSelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductCard } from "@/components/shop/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  function handleSizeError() {
    setSizeError(true);
    document.getElementById("size-selector")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <ImageGallery mainImage={product.image} productName={product.name} />

        {/* Info */}
        <div className="space-y-6">
          {/* Badge + name */}
          <div>
            <Badge variant={product.badge === "New" ? "new" : "best-seller"} className="mb-3" />
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-snug">
              {product.name}
            </h1>
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" className="mt-3" />
          </div>

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Color</span>
                <span className="text-xs text-[#6B6B6B]">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs border transition-all ${
                      selectedColor === color
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                        : "border-[#E8E8E4] text-[#6B6B6B] hover:border-[#1A1A1A]"
                    }`}
                    aria-pressed={selectedColor === color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div id="size-selector">
            <SizeSelector
              sizes={product.sizes ?? ["XS", "S", "M", "L", "XL"]}
              selectedSize={selectedSize}
              onSelect={(size) => { setSelectedSize(size); setSizeError(false); }}
              error={sizeError}
            />
          </div>

          {/* Quantity */}
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] block mb-3">Quantity</span>
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          {/* Add to cart */}
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
            onSizeError={handleSizeError}
          />

          {/* Description accordion */}
          <div className="border-t border-[#E8E8E4] pt-4">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="flex items-center justify-between w-full py-2 text-left"
              aria-expanded={accordionOpen}
            >
              <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Product Details</span>
              <ChevronDown
                size={16}
                className={`text-[#6B6B6B] transition-transform duration-200 ${accordionOpen ? "rotate-180" : ""}`}
              />
            </button>
            {accordionOpen && (
              <div className="pt-3 pb-2">
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="text-xs text-[#6B6B6B]">• Premium quality materials</li>
                  <li className="text-xs text-[#6B6B6B]">• Free returns within 30 days</li>
                  <li className="text-xs text-[#6B6B6B]">• Ethically manufactured</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">You Might Also Like</p>
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A]">Complete the Look</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
