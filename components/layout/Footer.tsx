import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-semibold tracking-[0.15em] uppercase text-white">
              Tripline
            </Link>
            <p className="mt-4 text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Modern fashion defined by simplicity, quality, and editorial style. Clothes for people who move through the world with intention.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#6B6B6B] mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/shop?badge=New", label: "New Arrivals" },
                { href: "/shop?badge=Best+Seller", label: "Best Sellers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#9B9B9B] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#6B6B6B] mb-5">Follow Us</h3>
            <div className="flex flex-col gap-3">
              {[
                { href: "#", label: "Instagram" },
                { href: "#", label: "Facebook" },
                { href: "#", label: "Twitter / X" },
                { href: "#", label: "TikTok" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-sm text-[#9B9B9B] hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#6B6B6B] mb-5">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-[#9B9B9B]">
              <li>
                <a href="mailto:hello@tripline.co" className="hover:text-white transition-colors">
                  hello@tripline.co
                </a>
              </li>
              <li>
                <a href="tel:+12125550100" className="hover:text-white transition-colors">
                  +1 (212) 555-0100
                </a>
              </li>
              <li className="leading-relaxed">
                123 Editorial Row<br />
                New York, NY 10001<br />
                United States
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D2D2D] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B6B]">
            &copy; {new Date().getFullYear()} Tripline. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#6B6B6B] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[#6B6B6B] hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
