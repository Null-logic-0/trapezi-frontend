import MyBusinesses from "@/components/BusinessListings/MyBusinesses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | My Places",
};

async function MyPlacesPage() {
  return <MyBusinesses />;
}

export default MyPlacesPage;
