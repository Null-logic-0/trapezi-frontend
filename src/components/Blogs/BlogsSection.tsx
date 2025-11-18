"use client";

import { BlogInterface } from "@/interfaces/blog.interface";

import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/navigation";
import BlogPreview from "./BlogPreview";
import Button from "../UI/Button";

export interface BlogsProps {
  blogs: BlogInterface[];
}

function BlogsSection({ blogs }: BlogsProps) {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("/blogs");

  return (
    <>
      {blogs.length === 0 ? (
        <p className="text-center text-lg font-semibold text-[#737373]">
          {messages.no_content}
        </p>
      ) : (
        <>
          <BlogPreview blogs={blogs} limit={3} />
          <Button
            onClick={handleNavigate}
            buttonType="outline"
            className="mt-12 rounded-full mx-auto text-sm font-semibold w-30"
          >
            {messages.load_more}
          </Button>
        </>
      )}
    </>
  );
}

export default BlogsSection;
