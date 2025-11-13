import BlogsSection from "@/components/Blogs/BlogsSection";
import FAQSection from "@/components/HelpCenter/FAQSection";
import HelpHero from "@/components/HelpCenter/HelpHero";
import SendMessageSection from "@/components/HelpCenter/SendMessageSection";
import VideoTutorial from "@/components/HelpCenter/VideoTutorial";

function HelpPage() {
  return (
    <main>
      <HelpHero />
      <VideoTutorial />
      <FAQSection />
      <BlogsSection />
      <SendMessageSection />
    </main>
  );
}

export default HelpPage;
