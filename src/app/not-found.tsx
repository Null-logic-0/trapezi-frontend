"use client";

import Navigation from "@/components/UI/navigation";
import { useMessages } from "@/hooks/useMessages";

function NotFound() {
  const messages = useMessages();
  return (
    <div className="h-screen flex gap-2 flex-col justify-center items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-[#ff6933] font-bold text-3xl">404</h1> |
        <p className="text-lg font-semibold text-gray-600">
          {messages.not_found}
        </p>
      </div>
      <Navigation path={"/"} className="text-lg">
        {messages.back}
      </Navigation>
    </div>
  );
}

export default NotFound;
