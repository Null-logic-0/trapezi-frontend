import { BlogInterface } from "@/interfaces/blog.interface";
import { ENDPOINTS } from "../endpoints";

export async function fetchBlog(
  id: number,
  locale: "ka" | "en" = "ka"
): Promise<BlogInterface | null> {
  try {
    const res = await fetch(`${ENDPOINTS.blogs.one}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch blog post.");
    }

    const data = await res.json();
    return Array.isArray(data) ? data[0] ?? null : data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
