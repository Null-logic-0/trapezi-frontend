import Cookies from "@/components/Cookies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Cookies",
};

function CookiesPage() {
  return <Cookies />;
}

export default CookiesPage;
