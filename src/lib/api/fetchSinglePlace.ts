import { BusinessInterface } from "@/interfaces/places.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function fetchSinglePlace(
  id: number,
  locale: "ka" | "en" = "ka"
): Promise<BusinessInterface | null> {
  try {
    const { token, success } = await getCookies();
    if (!success || !token) return null;

    const res = await fetch(`${ENDPOINTS.places.one}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": locale,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch my food place");
    }

    const data = await res.json();
    return Array.isArray(data) ? data[0] ?? null : data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
