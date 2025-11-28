import { Tutorials } from "@/types/tutorials.types";
import { ENDPOINTS } from "../endpoints";

interface FetchTutorialsParams {
  page?: number;
  per_page?: number;
  [key: string]: string | number | boolean | undefined;
}

export async function fetchTutorials(
  queryParams?: FetchTutorialsParams
): Promise<Tutorials> {
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
      ? `${ENDPOINTS.tutorials}?${query.toString()}`
      : ENDPOINTS.tutorials;

    const res = await fetch(url, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch tutorials");
    }

    const data = await res.json();

    return {
      tutorials: Array.isArray(data.data) ? data.data : [],
      pagination: data.pagination ?? {},
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
