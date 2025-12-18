import { Reviews } from "@/interfaces/reviews.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function fetchReviews(
  id: number,
  page: number = 1,
  pageSize: number = 5
): Promise<Reviews[]> {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) return [];
    const res = await fetch(
      `${ENDPOINTS.places.reviews}/${id}?page=${page}&per_page=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch my food places");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw error;
  }
}
