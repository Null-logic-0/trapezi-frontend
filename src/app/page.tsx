import DiscoverSection from "@/components/BusinessListings/DiscoverSection";
import FeaturedSection from "@/components/BusinessListings/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero/Hero";

function Page() {
  return (
    <>
      <Hero />
      <CategoryFilter />
      <FeaturedSection />
      <DiscoverSection />
      <CTASection />
    </>
  );
}

export default Page;
