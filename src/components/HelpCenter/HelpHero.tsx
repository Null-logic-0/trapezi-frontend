"use client";

import Image from "next/image";
import helpHero from "../../../public/hero_help.jpeg";
import { useMessages } from "@/hooks/useMessages";

function HelpHero() {
  const messages = useMessages();
  return (
    <section className="text-center md:pt-24 pb-16 max-w-7xl mx-auto">
      <div className="relative w-full h-[400px] md:h-[500px] md:rounded-2xl overflow-hidden mb-8">
        <Image
          src={helpHero}
          alt="Georgian traditional feast(supra)"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#f5f5f5]/50 to-transparent" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3 ">
        {messages.help_title}
      </h1>
      <p className="text-lg text-[#666666]  max-w-3xl mx-auto">
        {messages.help_subtitle}
      </p>
    </section>
  );
}

export default HelpHero;
