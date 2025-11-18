import { BlogInterface } from "@/interfaces/blog.interface";

export type Blogs = {
  blogs: BlogInterface[];
  pagination: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
};
