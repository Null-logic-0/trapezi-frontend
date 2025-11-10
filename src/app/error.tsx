"use client";

import Button from "@/components/UI/Button";
import { useMessages } from "@/hooks/useMessages";

function Error() {
  const messages = useMessages();
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen flex gap-2 flex-col justify-center items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-[#ff6933] font-bold text-3xl">500</h1> |
        <p className="text-lg font-semibold text-gray-600">
          {messages.error_500}
        </p>
      </div>
      <Button
        onClick={handleRefresh}
        buttonType="outline"
        className="w-full max-w-[220px] text-[#ff6933]"
      >
        {messages.refresh_page}
      </Button>
    </div>
  );
}

export default Error;
