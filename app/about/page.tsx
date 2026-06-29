import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Tripline",
  description: "The story behind Tripline — fashion built on simplicity, quality, and editorial vision.",
};

const values = [
  {
    title: "Simplicity",
    description: "We strip away the noise. Every piece we design starts with the question: does this serve a purpose, and does it do it beautifully?",
  },
  {
    title: "Quality",
    description: "We partner with mills and manufacturers who share our commitment to longevity. Our pieces are made to outlast trends.",
  },
  {
    title: "Sustainability",
    description: "Slow fashion means investing in pieces worth keeping. We use responsible materials and ethical production throughout.",
  },
  {
    title: "Inclusivity",
    description: "Modern dressing has no gender. Our collections are designed for everyone who wants to dress with intention.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-[#1A1A1A]">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop"
          alt="Tripline editorial campaign"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10 pb-12 w-full">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-3">Our Story</p>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight max-w-xl">
              Dressed for the world you want to live in
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 max-w-lg">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium">Who We Are</p>
              <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A] leading-snug">
                Born from a belief that fashion should feel effortless
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Tripline was founded in 2019 with a single idea: that modern dressing shouldn't be complicated. We were tired of choosing between quality and style, between comfort and sophistication. So we built something better.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Today, we design collections that move through seasons without looking dated — pieces built around real life, real bodies, and real wardrobes. Each drop is considered. Nothing is filler.
              </p>
              <Link href="/shop">
                <Button>Shop the Collection</Button>
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F3]">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80&auto=format&fit=crop"
                alt="Tripline brand story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Our Values</p>
            <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A] max-w-sm">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-[#1A1A1A] pt-6 space-y-3">
                <h3 className="font-semibold text-[#1A1A1A]">{v.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
