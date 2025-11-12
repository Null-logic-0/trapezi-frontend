import { ENDPOINTS } from "../endpoints";
import { Places } from "@/types/places.types";

export async function fetchVipPlaces(
  queryParams?: Record<string, string | number | boolean | undefined>
): Promise<Places> {
  try {
    const query = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, value.toString());
        }
      });
    }
    const url = query.toString()
      ? `${ENDPOINTS.places.vip}?${query.toString()}`
      : ENDPOINTS.places.vip;

    const res = await fetch(url, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch  food places");
    }

    const data = await res.json();
    return {
      places: Array.isArray(data.data) ? data.data : [],
      pagination: data.pagination ?? {},
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
