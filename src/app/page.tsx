import DiscoverSection from "@/components/BusinessListings/DiscoverSection";
import FeaturedSection from "@/components/BusinessListings/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero/Hero";

function Page() {
  return (
    <>
      <Hero />
      <CategoryFilter className="py-16 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-y border-[#e3e3e3]" />
      <FeaturedSection />
      <DiscoverSection />
      <CTASection />
    </>
  );
}

export default Page;
