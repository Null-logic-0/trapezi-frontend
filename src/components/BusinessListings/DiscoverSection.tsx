import { fetchAllPlaces } from "@/lib/api/fetchAllPlaces";
import DiscoverPlaces from "./DiscoverPlaces";

async function DiscoverSection() {
  const businesses = await fetchAllPlaces();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <DiscoverPlaces businesses={businesses} />
    </section>
  );
}

export default DiscoverSection;
