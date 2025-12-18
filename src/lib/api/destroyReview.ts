import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function destroyReview(
  placeId?: number,
  reviewId?: number
): Promise<void> {
  const { token, success } = await getCookies();

  if (!success || !token) return;

  const res = await fetch(
    `${ENDPOINTS.places.delete_review}/${placeId}/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Could not destroy business");
  }
}
