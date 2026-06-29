import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium text-sm uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          // variants
          variant === "primary" && "bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]",
          variant === "ghost" && "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]",
          variant === "outline" && "bg-transparent text-white border border-white hover:bg-white hover:text-[#1A1A1A]",
          // sizes
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3",
          size === "lg" && "px-8 py-4 text-base",
          // full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
