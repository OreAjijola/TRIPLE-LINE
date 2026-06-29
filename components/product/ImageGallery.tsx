"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string;
  productName: string;
}

// Generate a gallery from the main image + complementary placeholders
function getGalleryImages(mainImage: string): string[] {
  return [
    mainImage,
    mainImage.replace("w=800", "w=800").replace("fit=crop", "fit=crop&ar=4:3"),
    mainImage + "&seed=2",
    mainImage + "&seed=3",
    mainImage + "&seed=4",
  ];
}

export function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
  const images = getGalleryImages(mainImage);
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:max-h-[600px]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 overflow-hidden border transition-all duration-200 ${
              selected === i ? "border-[#1A1A1A]" : "border-[#E8E8E4] hover:border-[#9B9B9B]"
            }`}
            aria-label={`View image ${i + 1} of ${productName}`}
            aria-current={selected === i}
          >
            <Image
              src={img}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative aspect-[3/4] bg-[#F5F5F3] overflow-hidden">
        <Image
          src={images[selected]}
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}
