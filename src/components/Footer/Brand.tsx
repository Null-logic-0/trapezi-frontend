"use client";

import { useMessages } from "@/hooks/useMessages";

function Brand() {
  const messages = useMessages();
  return (
    <div>
      <h3 className="text-2xl font-bold mb-3">TRAPEZI</h3>
      <p className="text-[#fafafa]/80 text-sm font-medium">
        {messages.discover}
      </p>
    </div>
  );
}

export default Brand;
