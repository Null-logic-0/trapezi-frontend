import BusinessDetail from "@/components/BusinessListings/BusinessDetails";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchSinglePlace } from "@/lib/api/fetchSinglePlace";
import { Metadata } from "next";
import { Suspense } from "react";

type PlaceDetailsProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ locale: "en" | "ka" }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PlaceDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const { locale } = (await searchParams) || "ka";

  const place = await fetchSinglePlace(Number(id), locale);

  return {
    title: place?.business_name,
    description: place?.description,
  };
}

export default async function PlaceDetails({
  params,
  searchParams,
}: PlaceDetailsProps) {
  const { id } = await params;
  const { locale } = (await searchParams) || "ka";
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
