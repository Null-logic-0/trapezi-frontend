"use client";
import BusinessCard from "./BusinessCard";
import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import Link from "next/link";
import { BusinessInterface } from "@/interfaces/places.interface";

export interface BusinessProps {
  businesses: BusinessInterface[];
}

function DiscoverPlaces({ businesses }: BusinessProps) {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("#");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">{messages.more_places}</h2>
        <p className="text-lg text-[#737373]">{messages.explore_near_you}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.slice(0, 3).map((business, index) => (
          <Link key={business.id} href={`places/${business.id}`}>
            <div
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <BusinessCard
                business_name={business.business_name}
                categories={business.categories}
                address={business.address}
                image={business.images_url?.[0] || ""}
                rating={business.average_rating}
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
    </div>
  );
}

export default DiscoverPlaces;
