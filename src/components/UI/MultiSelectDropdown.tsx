"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

type Option = {
  id: string | number;
  label: string | string[];
};

type Props = {
  options: Option[];
  name?: string;
  placeholder?: string;
  error?: string;
  defaultSelected?: Array<string | number>;
};

export default function MultiSelectDropdown({
  options,
  error,
  defaultSelected = [],
  name = "categories",
  placeholder = "Select categories...",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Array<string | number>>(
    defaultSelected ?? []
  );

  const toggleOption = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectedLabels = options
    .filter((option) => selected.includes(option.id))
    .map((option) => option.label)
    .join(", ");

  return (
    <div className="relative w-full">
      <div
        onClick={handleToggleDropdown}
        className={`flex items-center text-sm  font-semibold justify-between bg-[#f5f5f5] border ${
          error ? "border-red-500" : "border-[#e5e5e5]"
        }  rounded-xl px-3 py-3 cursor-pointer hover:border-[#ff6933] transition`}
      >
        <span className="truncate font-medium text-sm text-gray-700">
          {selected.length > 0 ? selectedLabels : placeholder}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-[#959595] text-sm" />
        ) : (
          <FaChevronDown className="text-[#959595] text-sm" />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                toggleOption(option.id);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#ffd466] transition"
            >
              <span className="text-gray-700 text-sm font-semibold">
                {option.label}
              </span>
              {selected.includes(option.id) && (
                <FaCheck className="text-gray-700 text-sm" />
              )}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-red-500 mt-2 font-medium text-sm">{error}</p>
      )}

      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}
    </div>
  );
}
