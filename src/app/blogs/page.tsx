import BlogHeader from "@/components/Blogs/BlogHeader";
import Blogs from "@/components/Blogs/Blogs";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchBlogs } from "@/lib/api/fetchBlogs";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trapezi | Blog",
};

type Props = {
  searchParams?: { page?: string } | Promise<{ page?: string }>;
};

async function BlogsPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const page = params.page ? parseInt(params.page, 10) : 1;

  const { blogs, pagination } = await fetchBlogs({
    page,
  });
  return (
    <>
      <div className="pb-12 text-center bg-[#2A2D34]">
        <BlogHeader
          titleStyles="pt-26 pb-4 text-4xl text-[#ff6633]"
          subtitleStyles="opacity-90 mb-8 text-white"
        />
      </div>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <Blogs blogs={blogs} pagination={pagination} />
      </Suspense>
    </>
  );
}

export default BlogsPage;
