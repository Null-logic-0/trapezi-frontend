"use client";

import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";

function GoBack() {
  const router = useRouter();
  const messages = useMessages();
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex gap-1 text-gray-600 items-center cursor-pointer"
    >
      <RiArrowGoBackFill className="text-xl" />
      <span className="text-[16px] font-semibold">{messages.back}</span>
    </button>
  );
}

export default GoBack;
