"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E4]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]">
            Tripline
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-widest transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#1A1A1A] font-medium"
                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 text-[#1A1A1A] hover:text-[#2D2D2D] transition-colors"
              aria-label={`Shopping bag, ${itemCount} items`}
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#1A1A1A] text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 tabular-nums">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-[#1A1A1A]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E8E8E4] bg-[#FAFAF8]">
          <nav className="max-w-[1440px] mx-auto px-5 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-widest py-2 border-b border-[#E8E8E4]",
                  pathname === link.href ? "text-[#1A1A1A] font-medium" : "text-[#6B6B6B]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
