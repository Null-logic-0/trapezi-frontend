"use client";

import { useMessages } from "@/hooks/useMessages";
import BusinessCard from "./BusinessCard";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { BusinessProps } from "@/interfaces/business.interface";
import Link from "next/link";

const FeaturedSpots = ({ businesses }: BusinessProps) => {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("#");
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">{messages.featured_spots}</h2>
          <p className="text-lg text-[#737373]">{messages.discover_VIP}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business, index) => (
            <Link key={business.id} href={`places/${business.id}`}>
              <div
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BusinessCard {...business} />
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
    </section>
  );
};

export default FeaturedSpots;
