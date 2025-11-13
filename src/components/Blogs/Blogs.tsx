"use client";

import { BlogInterface } from "@/interfaces/blog.interface";
import Pagination from "../UI/Pagination";
import BlogPreview from "./BlogPreview";

export interface BlogsProps {
  blogs: BlogInterface[];
}

function Blogs({ blogs }: BlogsProps) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 py-24 md:px-6 px-4">
      <BlogPreview blogs={blogs} />
      <Pagination
        currentPage={1}
        pagesCount={10}
        itemsPerPage={1}
        onPageChange={() => {}}
      />
    </div>
  );
}

export default Blogs;
