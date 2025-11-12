import { fetchAllPlaces } from "@/lib/api/fetchAllPlaces";
import DiscoverPlaces from "./DiscoverPlaces";

type DiscoverSectionProps = {
  searchParams?: Promise<{ categories?: string }>;
};

async function DiscoverSection({ searchParams }: DiscoverSectionProps) {
  const query = await searchParams;
  const { places } = await fetchAllPlaces({
    categories: query?.categories,
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <DiscoverPlaces places={places} />
    </section>
  );
}

export default DiscoverSection;
