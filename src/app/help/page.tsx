import BlogHeader from "@/components/Blogs/BlogHeader";
import BlogsSection from "@/components/Blogs/BlogsSection";
import FAQSection from "@/components/HelpCenter/FAQSection";
import HelpHero from "@/components/HelpCenter/HelpHero";
import SendMessageSection from "@/components/HelpCenter/SendMessageSection";
import VideoTutorial from "@/components/HelpCenter/VideoTutorial";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchBlogs } from "@/lib/api/fetchBlogs";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trapezi | Help",
};

async function HelpPage() {
  const { blogs } = await fetchBlogs();

  return (
    <main>
      <HelpHero />
      <VideoTutorial />
      <FAQSection />
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
      <SendMessageSection />
    </main>
  );
}

export default HelpPage;
