import Image from "next/image";
import GoBack from "../UI/GoBack";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

function BlogDetails() {
  return (
    <>
      <div className="flex max-w-7xl mx-auto flex-col px-2  justify-center pt-24 pb-8">
        <GoBack />

        <div className="relative md:h-[500px] h-[300px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
            alt=""
            fill
            unoptimized
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      <div className="flex justify-center px-4 items-center pb-24 pt-6 bg-white w-full">
        <div className="md:text-lg text-[16px] flex flex-col gap-4 font-medium max-w-7xl">
          <h1 className="md:text-4xl text-3xl font-bold">
            New Features: What&apos;s Coming in 2025
          </h1>

          <p className="md:text-lg text-sm flex items-center gap-2  text-start font-semibold text-[#686868]">
            <HiOutlineCalendarDateRange />
            Nov 5,2025
          </p>
          <p>
            We&apos;re thrilled to share what&apos;s coming to Trapezi in 2025.
            Our team has been working tirelessly to bring you features that will
            transform how you work. AI-Powered Insights
          </p>

          <p>
            Our new AI assistant will analyze your workflow patterns and provide
            personalized recommendations to boost your productivity. It learns
            from your habits and suggests optimizations automatically.
          </p>
          <p>
            Advanced Reporting Dashboard Get deeper insights into your business
            performance with our new analytics dashboard. Track key metrics,
            generate custom reports, and make data-driven decisions with
            confidence. Mobile App Redesign
          </p>
          <p>
            We&apos;re launching a completely redesigned mobile experience. Work
            seamlessly on the go with improved performance and intuitive new
            features. Team Collaboration Hub Our new collaboration hub brings
            all your team communication into one place. Share updates, assign
            tasks, and keep everyone aligned without switching between apps.
            Integration Marketplace
          </p>
          <p>
            Connect Trapezi with hundreds of popular apps through our new
            integration marketplace. From accounting software to marketing
            tools, everything works together seamlessly. Custom Workflows
          </p>
          <p>
            Build workflows that match your unique business processes. Our
            visual workflow builder makes it easy to automate complex tasks
            without code. These are just a few highlights. Stay tuned for more
            announcements throughout the year!
          </p>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
