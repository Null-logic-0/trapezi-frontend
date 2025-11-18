import Link from "next/link";
import BlogCard from "./BlogCard";
import { BlogInterface } from "@/interfaces/blog.interface";

export interface BlogsListProps {
  blogs: BlogInterface[];
  limit?: number;
}

function BlogPreview({ blogs, limit }: BlogsListProps) {
  const previewBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {previewBlogs.map((blog, index) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`}>
          <div
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <BlogCard
              title={blog.title}
              content={blog.content}
              date={blog.created_at}
              image={blog.image_url}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogPreview;
