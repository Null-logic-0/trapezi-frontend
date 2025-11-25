"use client";

import Image from "next/image";
import heroImage from "../../../public/hero-food.png";
import LanguageToggle from "../UI/LanguageToggle";
import { useMessages } from "@/hooks/useMessages";
import { Card, CardContent, CardFooter } from "../UI/Card";

function FullScreenHero() {
  const messages = useMessages();

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
            {messages.maintenance_mod}
          </p>
          <hr className="border-gray-400" />
        </CardContent>
        <CardFooter className="justify-self-end">
          <LanguageToggle />
        </CardFooter>
      </Card>
    </main>
  );
}

export default FullScreenHero;
