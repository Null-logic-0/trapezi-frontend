"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { BsThreeDots } from "react-icons/bs";

type DropdownMenuProps = {
  items: { label: ReactNode; onClick: () => void }[];
  align?: "left" | "right";
};

export default function DropdownMenu({
  items,
  align = "left",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute z-30 top-2 right-2 inline-block text-left"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="inline-flex z-50 cursor-pointer justify-center rounded-md  shadow-sm bg-[#2A2D34] text-white text-lg p-2 hover:bg-[#FF6B35] transition-colors"
      >
        <BsThreeDots />
      </button>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-48 z-50 rounded-md shadow-xl bg-white ring-1 ring-gray-400  ring-opacity-5 focus:outline-none ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left font-semibold px-4 py-2 text-sm cursor-pointer hover:bg-[#FFD166] hover:text-[#2A2D34] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
