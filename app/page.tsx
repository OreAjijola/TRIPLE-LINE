import { HeroSlider } from "@/components/home/HeroSlider";
import { ProductRow } from "@/components/home/ProductRow";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { CommunityGrid } from "@/components/home/CommunityGrid";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { newArrivals, bestSellers } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ProductRow
        label="New Arrivals"
        heading="Fresh fits in our latest drop"
        products={newArrivals}
        viewAllHref="/shop?badge=New"
      />
      <ProductRow
        label="Best Sellers"
        heading="Our signature best selling pieces"
        products={bestSellers}
        viewAllHref="/shop?badge=Best+Seller"
      />
      <CollectionsGrid />
      <CommunityGrid />
      <NewsletterBanner />
    </>
  );
}
