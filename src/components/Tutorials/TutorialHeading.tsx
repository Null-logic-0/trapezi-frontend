"use client";
import { useMessages } from "@/hooks/useMessages";

function TutorialHeading() {
  const messages = useMessages();
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">{messages.video_tutorials}</h2>
      <p className="text-lg text-[#666666]">{messages.video_guides}</p>
    </div>
  );
}

export default TutorialHeading;
