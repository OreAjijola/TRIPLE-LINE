import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, originalPrice, className, size = "md" }: PriceDisplayProps) {
  const isOnSale = price < originalPrice;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-semibold text-[#1A1A1A]",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-xl"
        )}
      >
        {formatPrice(price)}
      </span>
      {isOnSale && (
        <span
          className={cn(
            "text-[#6B6B6B] line-through",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
