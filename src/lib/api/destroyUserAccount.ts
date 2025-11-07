import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function destroyUserAccount(): Promise<void> {
  const { token, success } = await getCookies();

  if (!success || !token) return;

  const res = await fetch(ENDPOINTS.user.delete_profile, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Could not destroy account");
  }
}
