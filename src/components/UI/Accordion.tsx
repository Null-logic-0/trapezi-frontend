"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem = ({
  title,
  children,
  className,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={twMerge("border-b", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center cursor-pointer font-semibold justify-between py-4 hover:text-[#ff6b35] transition-all"
      >
        {title}
        <FaChevronDown
          className={twMerge(
            "h-4 w-4 shrink-0 transition-transform duration-300 ",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              paddingTop: 0,
              paddingBottom: "1rem",
            }}
            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-sm"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion = ({ children, className }: AccordionProps) => {
  return <div className={twMerge("space-y-2", className)}>{children}</div>;
};
