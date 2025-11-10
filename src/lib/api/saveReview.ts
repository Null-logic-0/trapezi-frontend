import { CreateReview } from "@/interfaces/reviews.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

type Method = "POST" | "PATCH";

interface SaveReviewOptions {
  placeId?: number;
  reviewId?: number;
  method?: Method;
  data: CreateReview;
}

export async function saveReview({
  placeId,
  reviewId,
  method = "POST",
  data,
}: SaveReviewOptions) {
  try {
    const { token, success } = await getCookies();
    if (!success || !token) return;

    const endpoint =
      method === "PATCH"
        ? `${ENDPOINTS.places.update_review}/${placeId}/${reviewId}`
        : `${ENDPOINTS.places.create_review}/${placeId}`;

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody?.message || "Action failed");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
