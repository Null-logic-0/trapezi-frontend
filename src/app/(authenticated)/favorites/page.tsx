import FavoritePlaces from "@/components/BusinessListings/FavoritePlaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Favorites",
};

function FavoritePlacesPage() {
  return <FavoritePlaces />;
}

export default FavoritePlacesPage;
