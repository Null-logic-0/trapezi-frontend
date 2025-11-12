"use client";

import { useMessages } from "@/hooks/useMessages";
import BusinessCard from "./BusinessCard";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BusinessInterface } from "@/interfaces/places.interface";

export interface BusinessProps {
  places: BusinessInterface[];
}

const FeaturedSpots = ({ places }: BusinessProps) => {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("/discover-places");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">{messages.featured_spots}</h2>
        <p className="text-lg text-[#737373]">{messages.discover_VIP}</p>
      </div>

      {places?.length === 0 ? (
        <p className="text-center text-lg font-semibold text-[#737373]">
          {messages.no_places}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.slice(0, 4).map((business, index) => (
              <Link key={business.id} href={`places/${business.id}`}>
                <div
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BusinessCard
                    business_name={business.business_name}
                    categories={business.categories}
                    address={business.address}
                    image={business.images_url?.[0] || ""}
                    rating={business.average_rating}
                    isVIP={business.is_vip}
                    isOpen={true}
                  />
                </div>
              </Link>
            ))}
          </div>
          <Button
            onClick={handleNavigate}
            buttonType="outline"
            className="mt-12 rounded-full mx-auto text-sm font-semibold w-30"
          >
            {messages.load_more}
          </Button>
        </>
      )}
    </div>
  );
};

export default FeaturedSpots;
