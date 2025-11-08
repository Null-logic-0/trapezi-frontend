import { BusinessInterface } from "@/interfaces/places.interface";
import { ENDPOINTS } from "../endpoints";

export async function fetchAllPlaces(): Promise<BusinessInterface[]> {
  try {
    const res = await fetch(ENDPOINTS.places.all);
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch my food places");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
