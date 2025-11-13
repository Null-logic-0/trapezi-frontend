"use client";

import Image from "next/image";
import { Card, CardContent } from "../UI/Card";
import { FaPlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/hooks/useMessages";

const tutorials = [
  {
    title: "Getting Started with Trapezi",
    duration: "3:45",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    description: "Learn the basics and set up your account in minutes",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Advanced Features Guide",
    duration: "5:20",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "Unlock the full potential with our advanced tools",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    title: "Tips & Best Practices",
    duration: "4:15",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Expert tips to optimize your workflow",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

function VideoTutorial() {
  const [selectedVideo, setSelectedVideo] = useState<
    null | (typeof tutorials)[0]
  >(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const messages = useMessages();

  // Close modal when clicking outside
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
    <section className="py-16 bg-[#fcfcfc] w-full relative">
      <div className="px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {messages.video_tutorials}
          </h2>
          <p className="text-lg text-[#666666]">{messages.video_guides}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card
              key={index}
              onClick={() => setSelectedVideo(tutorial)}
              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#e3e3e3]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#ff6933] flex items-center justify-center">
                    <FaPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-[#2c2f35]/90 text-white px-2 py-1 rounded text-sm font-medium">
                  {tutorial.duration}
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
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute cursor-pointer top-3 right-3 z-10 text-white hover:text-[#ff6933] transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {/* Video player */}
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-[480px] object-cover"
              />

              {/* Title */}
              <div className="p-4 bg-[#111] text-white">
                <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoTutorial;
