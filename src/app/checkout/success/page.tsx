"use client";

import { useMessages } from "@/hooks/useMessages";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function SuccessPage() {
  const messages = useMessages();

  const handleNavigation = () => {
    window.location.href = "/profile";
  };
  return (
    <div className="h-screen  w-full  flex justify-center items-center   mx-auto ">
      <div
        className="bg-[#ffffff] flex flex-col gap-4 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-xl w-full "
      >
        <div className="text-6xl text-[#ff6b35] flex justify-center text-center font-bold">
          <IoCheckmarkDoneCircle />
        </div>
        <p className="text-[16px] text-center font-semibold text-[#6b6b6b]">
          {messages.payments.success}
        </p>
        <button
          onClick={handleNavigation}
          className="text-center text-[#6d6d6d] cursor-pointer text-sm font-semibold transition-all duration-300 ease-in-out hover:text-[#ff6633] hover:underline underline-offset-4"
        >
          {messages.back}
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
