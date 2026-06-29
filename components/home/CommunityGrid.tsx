import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&q=80&auto=format&fit=crop", alt: "Community member in Tripline outfit", span: "row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop", alt: "Street style look", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80&auto=format&fit=crop", alt: "Urban fashion editorial", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop", alt: "Community portrait", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80&auto=format&fit=crop", alt: "Fashion community moment", span: "row-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80&auto=format&fit=crop", alt: "Style portrait", span: "" },
  { id: 7, src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80&auto=format&fit=crop", alt: "Editorial lifestyle", span: "" },
];

export function CommunityGrid() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Stay Connected</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] max-w-md leading-tight">
              See our community in modern silhouettes
            </h2>
          </div>
          <div className="flex gap-3">
            <Link href="/shop">
              <Button size="sm">Shop Now</Button>
            </Link>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost">@tripline</Button>
            </a>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden bg-[#F5F5F3] group cursor-pointer ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
