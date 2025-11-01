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

const BusinessDetail = ({ id }: { id: string }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Mock data - in real app this would come from API
  const business = {
    name: "Shavi Lomi",
    category: "Restaurant",
    rating: 4.9,
    reviews: 342,
    location: "13 Zandarashvili St, Tbilisi",
    hours: "12:00 PM - 11:00 PM",
    phone: "+995 555 123 456",
    website: "www.shavilomi.ge",
    description:
      "Shavi Lomi is a beloved restaurant in Tbilisi, offering authentic Georgian cuisine with a modern twist. Known for its warm atmosphere and exceptional service, we serve traditional dishes made with locally sourced ingredients.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    ],
    isVIP: true,
    workingDays: [
      { day: "Monday", hours: "12:00 PM - 11:00 PM" },
      { day: "Tuesday", hours: "12:00 PM - 11:00 PM" },
      { day: "Wednesday", hours: "12:00 PM - 11:00 PM" },
      { day: "Thursday", hours: "12:00 PM - 11:00 PM" },
      { day: "Friday", hours: "12:00 PM - 12:00 AM" },
      { day: "Saturday", hours: "12:00 PM - 12:00 AM" },
      { day: "Sunday", hours: "Closed" },
    ],
    social: {
      instagram: "https://instagram.com/shavilomi",
      facebook: "https://facebook.com/shavilomi",
      twitter: "https://twitter.com/shavilomi",
    },
  };

  return (
    <div className="min-h-screen mx-w-7xl mx-auto pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Image Carousel */}
      <div className="mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {business.images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative rounded-2xl overflow-hidden h-[500px] cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    fill
                    src={image}
                    alt={`${business.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-12 w-12 bg-[#f5f5f5]/80 hover:bg-[#f5f5f5]" />

          <CarouselNext className="right-4 h-12 w-12  bg-[#f5f5f5]/80 hover:bg-[#f5f5f5]" />
        </Carousel>
      </div>

      {/* Full-Screen Image Dialog */}
      <FullScreenImageDialog
        business={business}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{business.name}</h1>
                  {business.isVIP && (
                    <Badge className="bg-[#ffd466]">VIP</Badge>
                  )}
                </div>
                <p className="text-lg font-semibold text-[#666666]">
                  {business.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <IoMdStar className="text-4xl text-[#ff6633]" />

                <span className="text-2xl font-bold">{business.rating}</span>
                <span className="text-[#7c7c7c]">
                  ({business.reviews} reviews)
                </span>
              </div>
            </div>
            <p className="text-[16px] text-[#666666]  font-medium leading-relaxed">
              {business.description}
            </p>
          </div>

          {/* Reviews Section */}
          <ReviewsSection />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <BusinessInfo business={business} />
          <Card className="bg-[#ffffff] border-[#e6e6e6]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <GoogleMap
                address={business.location}
                className="w-full h-[300px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
