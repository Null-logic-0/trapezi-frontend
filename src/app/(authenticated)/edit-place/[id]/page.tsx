import BusinessForm from "@/components/BusinessListings/BusinessForm";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchSinglePlace } from "@/lib/api/fetchSinglePlace";
import { Suspense } from "react";

interface PlaceDetailsProps {
  params: Promise<{ id: string }>;
}

async function EditPlacePage({ params }: PlaceDetailsProps) {
  const { id } = await params;
  const place = await fetchSinglePlace(Number(id));

  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <BusinessForm initialValues={place!} />
    </Suspense>
  );
}

export default EditPlacePage;
