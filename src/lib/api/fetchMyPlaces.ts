import { MyFoodPlaceInterface } from "@/interfaces/places.interface";
import { ENDPOINTS } from "../endpoints";
import getCookies from "../cookies";

export async function fetchMyPlaces(): Promise<MyFoodPlaceInterface[]> {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) return [];
    const res = await fetch(ENDPOINTS.user.my_places, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
