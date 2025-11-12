"use client";

import { useMessages } from "@/hooks/useMessages";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  pagesCount,
  itemsPerPage,
  className,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(pagesCount / itemsPerPage);
  const messages = useMessages();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-2 mt-10",
        className
      )}
    >
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl cursor-pointer bg-[#2A2D34] text-white disabled:opacity-50 hover:bg-[#FF6B35] transition-all"
      >
        {messages.prev}
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={twMerge(
            "px-3 py-2 rounded-xl border cursor-pointer text-sm transition-all",
            currentPage === page
              ? "bg-[#FF6B35] text-white border-[#FF6B35]"
              : "bg-white border-gray-300 text-[#2A2D34] hover:border-[#FF6B35]"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl bg-[#2A2D34] cursor-pointer text-white disabled:opacity-50 hover:bg-[#FF6B35] transition-all"
      >
        {messages.next}
      </button>
    </div>
  );
}
