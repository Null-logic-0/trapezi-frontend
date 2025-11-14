"use client";

import Navigation from "@/components/UI/navigation";
import { useMessages } from "@/hooks/useMessages";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function SuccessPage() {
  const messages = useMessages();
  return (
    <div className="h-screen  w-full  flex justify-center items-center   mx-auto ">
      <div
        className="bg-[#ffffff] flex flex-col gap-4 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-xl w-full "
      >
        <h2 className="text-6xl text-[#ff6b35] flex justify-center text-center font-bold">
          <IoCheckmarkDoneCircle />
        </h2>
        <p className="text-[16px] text-center font-semibold text-[#6b6b6b]">
          {messages.instruction_sent}
        </p>
        <Navigation path={"/login"}>{messages.back}</Navigation>
      </div>
    </div>
  );
}

export default SuccessPage;
