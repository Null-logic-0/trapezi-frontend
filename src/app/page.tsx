import DiscoverSection from "@/components/BusinessListings/DiscoverSection";
import FeaturedSection from "@/components/BusinessListings/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero/Hero";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Home",
};

type HomePageProps = {
  searchParams?: Promise<{ categories?: string }>;
};

async function HomePage({ searchParams }: HomePageProps) {
  const user = await fetchCurrentUser();
  return (
    <>
      <Hero />
      <CategoryFilter className="py-16 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-y border-[#e3e3e3]" />
      <FeaturedSection searchParams={searchParams} />
      <DiscoverSection searchParams={searchParams} />
      {!user && <CTASection />}
    </>
  );
}

export default HomePage;
