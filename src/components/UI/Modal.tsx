"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useUIContext } from "@/store/ui-context";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: "-50%" },
  visible: {
    opacity: 1,
    scale: 1,
    y: "-50%",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: "-50%",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function Modal({ children }: { children: React.ReactNode }) {
  const { openModal, handleToggleModal } = useUIContext();

  return (
    <AnimatePresence>
      {openModal && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleToggleModal}
          />

          <motion.dialog
            role="dialog"
            aria-modal="true"
            open
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 mt-24 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5f5f5] z-50 max-w-[500px] w-full flex flex-col
            shadow-md border-2 border-[#e3e3e3] p-4 rounded-md"
          >
            <div className="p-4 flex flex-col gap-6">{children}</div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
