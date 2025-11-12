"use client";

import { useMessages } from "@/hooks/useMessages";
import Button from "./Button";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasButton?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  query?: string;
};

function SearchBar({
  onChange,
  onSubmit,
  query = "",
  hasButton = true,
}: Props) {
  const messages = useMessages();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(query);

  // --- Sync with ?search= param ---
  useEffect(() => {
    const paramValue = searchParams.get("search") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(paramValue);
  }, [searchParams]);

  // --- Handle input changes ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  // --- Handle reset (clear search + params) ---
  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={onSubmit}
        className="relative flex items-center bg-[#f5f5f5] rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <input
          name="search"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={messages.search_placeholder}
          className="flex-1 transition-all w-full focus:border-[#ff6633] border border-[#e5e5e5] focus:outline-none rounded-full pl-6 pr-12 py-4 text-base focus-visible:ring-0"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-gray-400 hover:text-[#ff6633] transition"
          >
            <FaTimes />
          </button>
        )}

        {hasButton ? (
          <Button
            type="submit"
            className="absolute right-2 rounded-full h-12 w-12 p-0"
          >
            <FaSearch />
          </Button>
        ) : (
          <span className="absolute right-6 text-xl text-[#ff6633]">
            <FaSearch />
          </span>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
