import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "new" | "best-seller";
  className?: string;
}

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5",
        variant === "new" && "bg-[#1A1A1A] text-white",
        variant === "best-seller" && "border border-[#1A1A1A] text-[#1A1A1A] bg-transparent",
        className
      )}
    >
      {variant === "new" ? "New" : "Best Seller"}
    </span>
  );
}
