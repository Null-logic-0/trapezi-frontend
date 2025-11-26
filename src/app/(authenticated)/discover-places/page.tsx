import DiscoverAllPlaces from "@/components/BusinessListings/DiscoverAllPlaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Discover",
};

function DiscoverPlacesPage() {
  return <DiscoverAllPlaces />;
}

export default DiscoverPlacesPage;
