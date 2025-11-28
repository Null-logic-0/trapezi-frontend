import BlogHeader from "@/components/Blogs/BlogHeader";
import BlogsSection from "@/components/Blogs/BlogsSection";
import FAQSection from "@/components/HelpCenter/FAQSection";
import HelpHero from "@/components/HelpCenter/HelpHero";
import SendMessageSection from "@/components/HelpCenter/SendMessageSection";
import TutorialHeading from "@/components/Tutorials/TutorialHeading";
import VideoTutorials from "@/components/Tutorials/VideoTutorials";
import VideoTutorial from "@/components/Tutorials/VideoTutorials";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchBlogs } from "@/lib/api/fetchBlogs";
import { fetchTutorials } from "@/lib/api/fetchTutorials";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trapezi | Help",
};

async function HelpPage() {
  const { blogs } = await fetchBlogs();
  const { tutorials } = await fetchTutorials();

  return (
    <main>
      <HelpHero />

      <section className="py-16 bg-[#fcfcfc] w-full relative ">
        <div className="px-4 mx-auto max-w-7xl">
          <TutorialHeading />
          <Suspense
            fallback={
              <div className="flex justify-center items-center mb-12">
                <Spinner />
              </div>
            }
          >
            <VideoTutorials tutorials={tutorials} />
          </Suspense>
        </div>
      </section>

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
