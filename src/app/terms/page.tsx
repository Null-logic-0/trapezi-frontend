import TermsOfService from "@/components/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Terms",
};

function TermsPage() {
  return <TermsOfService />;
}

export default TermsPage;
