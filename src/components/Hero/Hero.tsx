"use client";
import Image from "next/image";
import heroImage from "../../../public/hero-food.png";
import SearchBar from "../UI/SearchBar";
import { useMessages } from "@/hooks/useMessages";

function Hero() {
  const messages = useMessages();
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Georgian cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#ff6b36]/40 via-black/50 to-background" />
      </div>

      <div className="relative z-10 container text-center space-y-6 px-4">
        <h1 className="text-3xl md:text-5xl  font-bold text-white drop-shadow">
          {messages.discover}
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto drop-shadow">
          {messages.hero_subtitle}
        </p>
        <SearchBar />
      </div>
    </section>
  );
}

export default Hero;
