"use client";
import Button from "./UI/Button";
import { FaArrowRight } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";

const CTASection = () => {
  const router = useRouter();
  const messages = useMessages();
  const handleNavigation = () => router.push("/signup");

  return (
    <section className="pt-16 pb-42 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Business Owner CTA */}
          <div className="relative group overflow-hidden rounded-2xl bg-linear-to-br from-[#ff6933] to-[#fbbba3] p-8 sm:p-10 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <IoStorefrontOutline className="text-4xl" />
              </div>

              <h3 className="text-3xl font-bold mb-4">
                {messages.own_restaurant_title}
              </h3>
              <p className="text-white/90 text-lg mb-8">
                {messages.own_restaurant_subtitle}
              </p>

              <Button
                onClick={handleNavigation}
                className="bg-white text-[#ff6933] hover:bg-white/90 group-hover:translate-x-1 transition-transform"
              >
                {messages.register_business}
                <FaArrowRight />
              </Button>
            </div>
          </div>

          {/* Regular User CTA */}
          <div className="relative group overflow-hidden rounded-2xl bg-linear-to-br from-[#34383e] to-secondary-[#a6a8aa] p-8 sm:p-10 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <LuUserRound className="text-4xl" />
              </div>

              <h3 className="text-3xl font-bold mb-4">
                {messages.love_great_food_title}
              </h3>
              <p className="text-white/90 text-lg  mb-8">
                {messages.love_great_food_subtitle}
              </p>

              <Button
                onClick={handleNavigation}
                className="bg-[#ffd466] text-[#1a1a1a]  hover:bg-[#ffd466]/90 group-hover:translate-x-1 transition-transform"
              >
                {messages.create_account}
                <FaArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
