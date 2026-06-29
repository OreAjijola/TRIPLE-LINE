"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  onSizeError: () => void;
}

export function AddToCartButton({ product, selectedSize, selectedColor, quantity, onSizeError }: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!selectedSize) {
      onSizeError();
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: selectedSize,
      color: selectedColor || (product.colors?.[0] ?? ""),
      quantity,
      slug: product.slug,
    });

    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button fullWidth size="lg" onClick={handleAdd} disabled={added}>
      {added ? (
        <span className="flex items-center gap-2">
          <Check size={16} /> Added to Cart
        </span>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
