"use client";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { MdEmail } from "react-icons/md";
import Navigation from "../UI/navigation";
import { useMessages } from "@/hooks/useMessages";

function ForgotPassword() {
  const messages = useMessages();
  return (
    <form
      className="bg-[#ffffff] flex flex-col gap-4 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-lg w-full "
    >
      <h2 className="text-xl font-bold">{messages.forgot_password_title}</h2>
      <p className="text-sm text-[#6b6b6b]">
        {messages.forgot_password_subtitle}
      </p>

      <Input
        label={messages.email}
        type="email"
        name="email"
        placeholder="your@email.com"
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />
      <Button type="submit" className="text-sm ">
        {messages.send}
      </Button>

      <Navigation path="/login">{messages.back}</Navigation>
    </form>
  );
}

export default ForgotPassword;
