"use client";

import { useMessages } from "@/hooks/useMessages";

function BlogHeader() {
  const message = useMessages();
  return (
    <div className="pb-12 text-center bg-[#2A2D34]">
      <h1 className="text-4xl font-bold pt-26 pb-4 text-[#ff6633]">
        {message.blog_title}
      </h1>
      <p className="text-lg opacity-90 mb-8 text-white">
        {message.blog_subtitle}
      </p>
    </div>
  );
}

export default BlogHeader;
