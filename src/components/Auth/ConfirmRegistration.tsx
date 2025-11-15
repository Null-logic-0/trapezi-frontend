"use client";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Navigation from "../UI/navigation";
import { useMessages } from "@/hooks/useMessages";
import ConfirmRegistrationButton from "./ConfirmRegistrationButton";

function ConfirmRegistration({ token }: { token: string }) {
  const messages = useMessages();

  return (
    <div className="h-screen  w-full flex justify-center items-center   mx-auto ">
      <div
        className="bg-[#ffffff] flex flex-col gap-2 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-xl w-full "
      >
        <div className="text-4xl  text-white rounded-full w-15 h-15 bg-[#ff6b35] flex justify-center items-center mx-auto font-bold">
          <MdOutlineMarkEmailRead />
        </div>
        <h2 className="text-2xl font-bold text-center">
          {messages.confirm_title}
        </h2>
        <p className="text-[16px] text-center mx-auto max-w-sm  text-[#6b6b6b]">
          {messages.confirm_subtitle}
        </p>
        <ConfirmRegistrationButton token={token} />
        <Navigation path={"/login"}>{messages.back}</Navigation>
      </div>
    </div>
  );
}

export default ConfirmRegistration;
