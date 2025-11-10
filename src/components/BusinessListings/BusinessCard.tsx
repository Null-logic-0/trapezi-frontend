import Image from "next/image";
import { Card } from "../UI/Card";
import { IoMdStar } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { Badge } from "../UI/Badge";

interface BusinessCardProps {
  business_name: string;
  categories: string[];
  rating?: number;

  image: string;
  address: string;
  isOpen: boolean;
  isVIP?: boolean;
}

const BusinessCard = ({
  business_name,
  categories,
  rating,

  image,
  address,
  isOpen,
  isVIP = false,
}: BusinessCardProps) => {
  return (
    <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#e3e3e3]">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={business_name}
          fill
          unoptimized
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isVIP && (
          <Badge className="absolute top-3 right-3 bg-[#ffd466] text-[#1a1a1a] border-0 shadow-lg">
            ⭐ VIP
          </Badge>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold  group-hover:text-[#ff6933] transition-colors">
              {business_name}
            </h3>
            <p className="text-sm text-[#737373]">{categories.join(", ")}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <IoMdStar className="text-[#ff6933]" />
          <span className="text-sm font-medium text-[#1a1a1a]">
            {rating?.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm text-[#737373]">
          <div className="flex items-center gap-1">
            <FiMapPin className="text-[#737373]" />
            <span className="truncate w-[150px] block">{address}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegClock className="text-[#737373]" />

            <span className={isOpen ? "text-green-600" : "text-red-600"}>
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BusinessCard;
