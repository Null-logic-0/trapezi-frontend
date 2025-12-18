import FeaturedSpots from "./FeaturedSpots";
import { fetchVipPlaces } from "@/lib/api/fetchVipPlaces";

type FeaturedSectionProps = {
  searchParams?: Promise<{ categories?: string }>;
};

async function FeaturedSection({ searchParams }: FeaturedSectionProps) {
  const query = await searchParams;
  const { places } = await fetchVipPlaces({
    categories: query?.categories,
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <FeaturedSpots places={places} />
    </section>
  );
}

export default FeaturedSection;
