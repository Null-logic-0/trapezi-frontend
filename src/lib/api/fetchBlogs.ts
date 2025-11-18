import { ENDPOINTS } from "../endpoints";
import { Blogs } from "@/types/blogs.types";

interface FetchBlogsParams {
  page?: number;
  per_page?: number;
  [key: string]: string | number | boolean | undefined;
}

export async function fetchBlogs(
  queryParams?: FetchBlogsParams
): Promise<Blogs> {
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
      ? `${ENDPOINTS.blogs.all}?${query.toString()}`
      : ENDPOINTS.blogs.all;

    const res = await fetch(url, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Failed to fetch blogs");
    }

    const data = await res.json();

    return {
      blogs: Array.isArray(data.data) ? data.data : [],
      pagination: data.pagination ?? {},
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
