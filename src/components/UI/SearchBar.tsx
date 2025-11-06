"use client";
import { useMessages } from "@/hooks/useMessages";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const messages = useMessages();
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form className="relative flex items-center bg-[#f5f5f5] rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <input
          name="search"
          type="text"
          placeholder={messages.search_placeholder}
          className="flex-1 transition-all  w-full focus:border-[#ff6633] border border-[#e5e5e5] focus:outline-none rounded-full pl-6 pr-4 py-4 text-base focus-visible:ring-0"
        />
        <Button
          type="submit"
          className="absolute right-2 rounded-full h-12 w-12 p-0"
        >
          <FaSearch />
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
