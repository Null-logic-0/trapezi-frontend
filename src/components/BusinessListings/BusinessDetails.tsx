"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../UI/Carousel";

import { Badge } from "../UI/Badge";
import { IoMdStar } from "react-icons/io";
import { Card, CardContent } from "../UI/Card";

import GoogleMap from "../GoogleMap";
import ReviewsSection from "../Reviews/ReviewsSection";
import BusinessInfo from "./BusinessInfo";
import FullScreenImageDialog from "./FullScreenImageDialog";
import { BusinessInterface } from "@/interfaces/places.interface";
import { useMessages } from "@/hooks/useMessages";
import GoBack from "../UI/GoBack";
import HeartShapeButton from "../UI/HeartShapeButton";

type Props = {
  business: BusinessInterface;
  id: number;
};

const BusinessDetail = ({ business, id }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const messages = useMessages();

  return (
    <div className="min-h-screen mx-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <GoBack />
      {/* Image Carousel */}
      <div className="mb-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Carousel className="w-full">
          <CarouselContent>
            {business.images_url?.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative rounded-lg overflow-hidden h-[820px] max-md:h-[375px] cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    fill
                    unoptimized
                    src={image}
                    alt={`${business.business_name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-12 w-12 bg-[#f5f5f5]/80 hover:bg-[#f5f5f5]" />

          <CarouselNext className="right-4 h-12 w-12  bg-[#f5f5f5]/80 hover:bg-[#f5f5f5]" />
        </Carousel>
        <div className="space-y-6">
          <Card className="bg-[#ffffff] border-[#e6e6e6]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl max-md:text-2xl font-bold">
                      {business.business_name}
                    </h1>
                    {business.is_vip && (
                      <Badge className="bg-[#ffd466]">VIP</Badge>
                    )}
                  </div>
                  <p className="text-lg max-md:text-sm font-semibold text-[#666666]">
                    {business.categories.join(", ")}
                  </p>
                </div>
                <div className="space-y-4 text-end">
                  <HeartShapeButton id={id} />

                  <span className="text-sm flex items-center max-md:text-xl font-bold">
                    {business.average_rating?.toFixed(1)}

                    <IoMdStar className="text-[16px] text-[#ff6633]" />
                  </span>
                </div>
              </div>

              <p className="text-[16px] text-[#666666] border-t border-gray-400 pt-4  font-medium leading-relaxed">
                {business.description}
              </p>
            </CardContent>
          </Card>
          <BusinessInfo id={id} />
        </div>
      </div>

      {/* Full-Screen Image Dialog */}
      <FullScreenImageDialog
        business={business}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Reviews Section */}
        <ReviewsSection id={id} />
        <Card className="bg-[#ffffff] border-[#e6e6e6]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">{messages.location}</h3>
            <GoogleMap
              address={business.address}
              className="w-full h-[400px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDetail;
