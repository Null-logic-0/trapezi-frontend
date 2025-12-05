"use client";

import { useRouter } from "next/navigation";
import Pagination from "../UI/Pagination";
import BlogPreview from "./BlogPreview";
import { Blogs as BlogsProps } from "@/types/blogs.types";

function Blogs({ blogs, pagination }: BlogsProps) {
  const router = useRouter();
  const handlePaginate = (page: number) => {
    if (
      page < 1 ||
      page > Math.ceil(pagination.total_count / pagination.per_page)
    )
      return;

    router.push(`/blogs?page=${page}`);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 py-24 md:px-6 px-4">
      <BlogPreview blogs={blogs} />
      <Pagination
        currentPage={pagination.current_page}
        pagesCount={pagination.total_count}
        itemsPerPage={pagination.per_page}
        onPageChange={handlePaginate}
      />
    </div>
  );
}

export default Blogs;
