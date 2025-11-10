"use server";

import { ReviewFormState } from "@/interfaces/reviews.interface";
import { saveReview } from "../api/saveReview";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrUpdateReview(
  _prevState: ReviewFormState,
  formData: FormData,
  placeId?: number,
  reviewId?: number
) {
  const data = {
    comment: String(formData.get("comment") || ""),
    rating: Number(formData.get("rating") || 0),
  };

  if (!placeId) throw new Error("Missing place ID");

  await saveReview({
    data,
    placeId,
    reviewId,
    method: reviewId ? "PATCH" : "POST",
  });

  revalidatePath(`/places/${placeId}`, "page");
  redirect(`/places/${placeId}`);
}
