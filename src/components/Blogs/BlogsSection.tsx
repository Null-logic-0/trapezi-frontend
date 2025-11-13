import { BlogInterface } from "@/interfaces/blog.interface";
import BlogsList from "./BlogsList";

const blogs: BlogInterface[] = [
  {
    id: 1,
    title: "10 Tips to Maximize Your Productivity",
    content:
      "Discover proven strategies to boost your efficiency and get more done in less time with Trapezi.",

    date: "Nov 8, 2025",

    image_url:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
  },
  {
    id: 2,
    title: "New Features: What's Coming in 2025",
    content:
      "Get an exclusive preview of the exciting features we're launching this year to help you work smarter.",

    date: "Nov 5, 2025",

    image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 3,
    title: "Customer Success Story: How Local Businesses Thrive",
    content:
      "Learn how local businesses are using Trapezi to streamline operations and increase revenue.",

    date: "Nov 1, 2025",

    image_url:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  },
];

function BlogsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <BlogsList blogs={blogs} />
    </section>
  );
}

export default BlogsSection;
