import BusinessDetail from "@/components/BusinessListings/BusinessDetails";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchSinglePlace } from "@/lib/api/fetchSinglePlace";
import { Suspense } from "react";

interface PlaceDetailsProps {
  params: Promise<{ id: string }>;
  searchParams?: { lang?: "en" | "ka" };
}

export default async function PlaceDetails({
  params,
  searchParams,
}: PlaceDetailsProps) {
  const { id } = await params;
  const locale = searchParams?.lang || "ka";
  const place = await fetchSinglePlace(Number(id), locale);
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <BusinessDetail business={place!} id={Number(id)} />
    </Suspense>
  );
}
