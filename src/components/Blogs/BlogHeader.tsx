"use client";

import { useMessages } from "@/hooks/useMessages";
import { twMerge } from "tailwind-merge";

type Props = {
  titleStyles?: string;
  subtitleStyles?: string;
};

function BlogHeader({ titleStyles, subtitleStyles }: Props) {
  const message = useMessages();
  return (
    <>
      <h1 className={twMerge(titleStyles, "font-bold")}>
        {message.blog_title}
      </h1>
      <p className={twMerge(subtitleStyles, "text-lg")}>
        {message.blog_subtitle}
      </p>
    </>
  );
}

export default BlogHeader;
