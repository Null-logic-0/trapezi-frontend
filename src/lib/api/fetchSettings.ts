import { ENDPOINTS } from "../endpoints";

export async function fetchSettings(settings: "registration" | "maintenance") {
  const url =
    settings === "registration"
      ? ENDPOINTS.settings.registration
      : ENDPOINTS.settings.maintenance_mode;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return { error: "NETWORK_ERROR" };
  }
}
