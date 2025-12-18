import { ENDPOINTS } from "../endpoints";
import getCookies from "../cookies";
import { Places } from "@/types/places.types";

export async function fetchMyPlaces(
  queryParams?: Record<string, string | number | boolean | undefined>
): Promise<Places> {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) {
      return {
        places: [],
        pagination: {
          current_page: 0,
          per_page: 0,
          total_pages: 0,
          total_count: 0,
        },
      };
    }

    const query = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, value.toString());
        }
      });
    }
    const url = query.toString()
      ? `${ENDPOINTS.user.my_places}?${query.toString()}`
      : ENDPOINTS.user.my_places;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch my food places");
    }

    const data = await res.json();

    return {
      places: Array.isArray(data.data) ? data.data : [],
      pagination: data.pagination ?? {},
    };
  } catch (error) {
    throw error;
  }
}
