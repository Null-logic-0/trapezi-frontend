"use client";

import Image from "next/image";
import { Card, CardContent } from "../UI/Card";
import { FaPlay } from "react-icons/fa";
import { TutorialInterface } from "@/interfaces/tutorial.interface";
import Button from "../UI/Button";
import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";

type Props = {
  tutorials: TutorialInterface[];
  setSelectedVideo: (tutorial: TutorialInterface) => void;
};

function TutorialPreview({ tutorials, setSelectedVideo }: Props) {
  const messages = useMessages();
  const [visibleCount, setVisibleCount] = useState(3);
  const previewTutorials = tutorials.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const isAllShown = visibleCount >= tutorials.length;

  if (tutorials.length === 0)
    return (
      <p className="text-center text-lg font-semibold text-[#737373]">
        {messages.no_content}
      </p>
    );
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {previewTutorials.map((tutorial, index) => (
          <Card
            key={index}
            onClick={() => setSelectedVideo(tutorial)}
            className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#e3e3e3]"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={tutorial.thumbnail_url}
                alt={tutorial.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-[#ff6933] flex items-center justify-center">
                  <FaPlay className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-[#2c2f35]/90 text-white px-2 py-1 rounded text-sm font-medium">
                {tutorial.formatted_duration}
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {tutorial.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {tutorial.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isAllShown && (
        <Button
          buttonType="outline"
          className="mt-12 rounded-full mx-auto text-sm font-semibold w-30"
          onClick={handleLoadMore}
        >
          {messages.load_more}
        </Button>
      )}
    </>
  );
}

export default TutorialPreview;
