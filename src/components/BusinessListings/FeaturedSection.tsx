import { fetchAllPlaces } from "@/lib/api/fetchAllPlaces";
import FeaturedSpots from "./FeaturedSpots";

async function FeaturedSection() {
  const featuredBusinesses = await fetchAllPlaces();
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <FeaturedSpots businesses={featuredBusinesses} />
    </section>
  );
}

export default FeaturedSection;
