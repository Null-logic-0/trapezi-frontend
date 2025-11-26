import BusinessForm from "@/components/BusinessListings/BusinessForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Add New Place",
};

function AddNewPlacePage() {
  return <BusinessForm />;
}

export default AddNewPlacePage;
