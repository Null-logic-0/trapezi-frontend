import Image from "next/image";
import { Card } from "../UI/Card";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

type BlogCardProps = {
  title: string;
  content: string;
  image: string;
  date: string;
};

function BlogCard({ title, image, date, content }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#e3e3e3]">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-sm  text-[#737373] flex gap-2 items-center font-semibold">
          <HiOutlineCalendarDateRange />

          {date}
        </span>
        <h3 className="text-xl my-3 font-bold group-hover:text-[#ff6b35]">
          {title}
        </h3>
        <p className="text-[#666666] font-semibold mb-4 text-[16px] truncate">
          {content}
        </p>
      </div>
    </Card>
  );
}

export default BlogCard;
