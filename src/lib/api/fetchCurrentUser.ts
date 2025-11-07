import { UserInterface } from "@/interfaces/user.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function fetchCurrentUser(): Promise<UserInterface | null> {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) return null;

    const res = await fetch(ENDPOINTS.user.profile, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch user");
    }

    const body = await res.json();

    return body;
  } catch (error) {
    throw error;
  }
}
