"use client";

import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";

import { BlogInterface } from "@/interfaces/blog.interface";
import BlogPreview from "./BlogPreview";

export interface BlogsListProps {
  blogs: BlogInterface[];
}

function BlogsList({ blogs }: BlogsListProps) {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("/blogs");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">{messages.blog_title}</h2>
        <p className="text-lg text-[#737373]">{messages.blog_subtitle}</p>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-lg font-semibold text-[#737373]">
          {messages.no_content}
        </p>
      ) : (
        <>
          <BlogPreview blogs={blogs} />
          <Button
            onClick={handleNavigate}
            buttonType="outline"
            className="mt-12 rounded-full mx-auto text-sm font-semibold w-30"
          >
            {messages.load_more}
          </Button>
        </>
      )}
    </div>
  );
}

export default BlogsList;
