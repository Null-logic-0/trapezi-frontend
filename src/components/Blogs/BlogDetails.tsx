"use client";
import Image from "next/image";
import GoBack from "../UI/GoBack";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { formatDate } from "@/utils/formatDate";
import { useLanguage } from "@/store/language-context";
import { BlogInterface } from "@/interfaces/blog.interface";
import BlogHeader from "./BlogHeader";
import { Suspense } from "react";
import Spinner from "../UI/Spinner/Spinner";
import BlogsSection from "./BlogsSection";

type BlogProps = {
  blog: BlogInterface;
  blogs: BlogInterface[];
};

function BlogDetails({ blog, blogs }: BlogProps) {
  const { locale } = useLanguage();
  return (
    <>
      <div className="flex max-w-7xl mx-auto flex-col px-2  justify-center pt-24 pb-12">
        <GoBack />

        <div className="relative md:h-[680px] h-[380px] w-full">
          <Image
            src={blog?.image_url}
            alt={blog?.title}
            fill
            unoptimized
            className="rounded-lg object-cover shadow-xl"
          />
        </div>
      </div>

      <div className="flex justify-center px-4 items-center pb-24 pt-6 bg-white w-full">
        <div className="md:text-lg text-[16px] flex flex-col gap-4 font-medium max-w-7xl">
          <h1 className="md:text-4xl text-3xl font-bold">{blog?.title}</h1>

          <p className="md:text-lg text-sm flex items-center gap-2  text-start font-semibold text-[#686868]">
            <HiOutlineCalendarDateRange />
            {formatDate(blog?.created_at, locale)}
          </p>
          {blog.formatted_content?.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <BlogHeader
            titleStyles="text-3xl font-bold mb-2"
            subtitleStyles="text-[#737373]"
          />
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center mb-12">
              <Spinner />
            </div>
          }
        >
          <BlogsSection blogs={blogs} />
        </Suspense>
      </section>
    </>
  );
}

export default BlogDetails;
