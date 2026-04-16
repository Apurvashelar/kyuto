import { HeroCarousel } from "@/components/home/HeroCarousel";
import { OfferHighlights } from "@/components/home/OfferHighlights";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomerFavourites } from "@/components/home/CustomerFavourites";
import { NewlyLaunched } from "@/components/home/NewlyLaunched";
import { CandleCustomizer } from "@/components/home/CandleCustomizer";
import { CorporateGifting } from "@/components/home/CorporateGifting";
import { CustomerReviews } from "@/components/home/CustomerReviews";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <OfferHighlights />
      <CategoryGrid />
      <CustomerFavourites />
      <NewlyLaunched />
      <CandleCustomizer />
      <CorporateGifting />
      <CustomerReviews />
    </>
  );
}
