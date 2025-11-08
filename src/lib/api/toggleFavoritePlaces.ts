import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function toggleFavoritePlaces(id: number) {
  try {
    const { token, success } = await getCookies();
    if (!success || !token) return;

    const res = await fetch(`${ENDPOINTS.places.toggle_favorite}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to toggle favorite");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
