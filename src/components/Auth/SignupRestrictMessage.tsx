"use client";

import { useMessages } from "@/hooks/useMessages";
import Navigation from "../UI/navigation";

function SignupRestrictMessage() {
  const messages = useMessages();
  return (
    <div className="h-screen flex gap-2 flex-col justify-center items-center">
      <p className="text-lg font-semibold text-gray-600 ">
        {messages.register_restriction}
      </p>
      <Navigation path={"/"} className="text-lg text-[#ff6933]">
        {messages.back}
      </Navigation>
    </div>
  );
}

export default SignupRestrictMessage;
