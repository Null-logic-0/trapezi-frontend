import { CreateReview } from "@/interfaces/reviews.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

type Method = "POST" | "PATCH";

interface SaveReviewOptions {
  placeId?: number;
  reviewId?: number;
  method?: Method;
  data: CreateReview;
  locale: "en" | "ka";
}

export async function saveReview({
  placeId,
  reviewId,
  method = "POST",
  locale = "ka",
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
        "Accept-Language": locale,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = body.error || body.message || "Action failed";
      const userBlocked = body.user_blocked === true;

      return { error: message, userBlocked };
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
