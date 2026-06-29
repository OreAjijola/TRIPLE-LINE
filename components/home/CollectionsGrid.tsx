import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const collections = [
  {
    id: "mens",
    label: "Men's Wear",
    heading: "Modern Menswear",
    description: "Clean silhouettes, premium fabrics, and understated details for the modern man.",
    priceRange: "From $35",
    image1: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&auto=format&fit=crop",
    href: "/shop?gender=mens",
  },
  {
    id: "womens",
    label: "Women's Wear",
    heading: "Editorial Femininity",
    description: "Fluid forms and refined layers for a wardrobe built around confidence.",
    priceRange: "From $45",
    image1: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop",
    href: "/shop?gender=womens",
  },
];

export function CollectionsGrid() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Our Collections</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] max-w-lg leading-tight">
            Modern collections defined by simplicity
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <div key={col.id} className="group flex flex-col gap-4">
              {/* Images stack */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                    <Image
                      src={col.image1}
                      alt={`${col.label} collection`}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3] mt-8">
                    <Image
                      src={col.image2}
                      alt={`${col.label} collection style`}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                {/* New badge */}
                <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5">
                  New
                </span>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium">{col.label}</p>
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">{col.heading}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">{col.description}</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">{col.priceRange}</p>
                <Link href={col.href}>
                  <Button variant="ghost" size="sm">All Collections</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
