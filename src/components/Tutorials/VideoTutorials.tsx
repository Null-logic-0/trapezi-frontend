"use client";

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { TutorialInterface } from "@/interfaces/tutorial.interface";
import Button from "../UI/Button";
import TutorialPreview from "./TutorialPreview";
import VideoTutorialModal from "./VideoTutorialModal";

type TutorialProps = {
  tutorials: TutorialInterface[];
};

function VideoTutorials({ tutorials }: TutorialProps) {
  const [selectedVideo, setSelectedVideo] = useState<
    null | (typeof tutorials)[0]
  >(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const messages = useMessages();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedVideo]);

  return (
    <>
      <TutorialPreview
        tutorials={tutorials}
        setSelectedVideo={setSelectedVideo}
      />

      <VideoTutorialModal selectedVideo={selectedVideo} modalRef={modalRef} />
    </>
  );
}

export default VideoTutorials;
