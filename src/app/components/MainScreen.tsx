"use client";

import Image from "next/image";
import heroImage from "../../../public/hero-food.png";
import { Card, CardContent } from "./Card";

export default function MainScreen() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          fill
          alt="Georgian cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#ff6b36]/40 via-black/50 to-background" />
      </div>
      <Card className="fixed mx-auto w-full max-w-xl">
        <CardContent>
          <p className="text-lg font-medium p-6 text-gray-600  mx-auto text-center">
            We’re performing some updates.
            <br /> Thanks for your patience — we’ll be back online soon!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
