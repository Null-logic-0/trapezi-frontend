import { TutorialInterface } from "@/interfaces/tutorial.interface";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedVideo: TutorialInterface | null;
  modalRef: React.RefObject<HTMLDivElement | null>;
};
function VideoTutorialModal({ selectedVideo, modalRef }: Props) {
  return (
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
            <video
              src={selectedVideo.video_url}
              controls
              autoPlay
              className="w-full h-[480px] object-cover"
            />

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
  );
}

export default VideoTutorialModal;
