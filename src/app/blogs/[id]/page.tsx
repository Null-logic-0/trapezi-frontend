import BlogDetails from "@/components/Blogs/BlogDetails";
import Spinner from "@/components/UI/Spinner/Spinner";
import { Suspense } from "react";

function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <BlogDetails />
    </Suspense>
  );
}

export default BlogPage;
