"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const slides = [
  {
    id: 1,
    label: "New Season",
    heading: "Soft Textures,\nClean Lines",
    subtitle: "A collection built for quiet luxury and everyday ease.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format&fit=crop",
    cta: "See All Collections",
    ctaHref: "/shop",
  },
  {
    id: 2,
    label: "Urban Edit",
    heading: "City-Ready\nEssentials",
    subtitle: "Technical fabrics meet editorial silhouettes for the modern wardrobe.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop",
    cta: "Shop the Look",
    ctaHref: "/shop",
  },
  {
    id: 3,
    label: "Latest Drop",
    heading: "The New\nArrivals",
    subtitle: "Fresh pieces landing weekly — be first to discover the latest.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80&auto=format&fit=crop",
    cta: "Explore Now",
    ctaHref: "/shop?badge=New",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-screen max-h-[900px] min-h-[600px] overflow-hidden bg-[#1A1A1A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {/* Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.heading.replace("\n", " ")}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium mb-4">
                {slide.label}
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
                {slide.heading}
              </h1>
              <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed max-w-sm">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={slide.ctaHref}>
                  <Button size="lg">
                    {slide.cta}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10" role="tablist" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-0.5 transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
