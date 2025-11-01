import BusinessDetail from "@/components/BusinessListings/BusinessDetails";

interface PlaceDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PlaceDetails({ params }: PlaceDetailsProps) {
  const { id } = await params;
  return (
    <>
      <BusinessDetail id={id} />
    </>
  );
}
