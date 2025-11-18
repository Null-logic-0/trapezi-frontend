import BlogDetails from "@/components/Blogs/BlogDetails";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchBlog } from "@/lib/api/fetchBlog";
import { fetchBlogs } from "@/lib/api/fetchBlogs";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    id?: string;
  }>;
};

async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await fetchBlog(Number(id));
  const { blogs } = await fetchBlogs();
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <BlogDetails blog={blog!} blogs={blogs} />
    </Suspense>
  );
}

export default BlogPage;
