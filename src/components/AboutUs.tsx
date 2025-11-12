"use client";
import Image from "next/image";
import aboutHero from "../../public/hero-supra.jpg";
import { useMessages } from "@/hooks/useMessages";

function AboutUs() {
  const messages = useMessages();
  return (
    <main className="min-h-screen mx-auto md:pt-24  max-w-7xl">
      <section className="text-center mb-16">
        <div className="relative w-full h-[400px] md:h-[500px] md:rounded-2xl overflow-hidden mb-8">
          <Image
            src={aboutHero}
            alt="Georgian traditional feast(supra)"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#f5f5f5]/70 to-transparent" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-3 ">
          {messages.about_us}
        </h1>
        <p className="text-lg text-[#666666]  max-w-3xl mx-auto">
          {messages.discover}
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {messages.stroy_title}
        </h2>
        <div className="space-y-4 text-[#666666] font-medium text-base">
          {messages.story_paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
