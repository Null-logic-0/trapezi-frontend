"use client";
import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import Input from "../UI/Input";

function MessageForm() {
  const messages = useMessages();
  return (
    <form className="flex flex-col gap-4  w-full">
      <Input
        type="email"
        name="email"
        placeholder="your@email.com"
        label={messages.email}
      />

      <Input
        type="text"
        name="subject"
        placeholder={messages.subject_placeholder}
        label={messages.subject}
      />

      <Input
        isTextArea
        name="message"
        label={messages.message}
        className="h-30"
      />

      <div className="flex justify-end w-full">
        <Button type="submit" className="mt-2 text-sm  w-34">
          {messages.send}
        </Button>
      </div>
    </form>
  );
}

export default MessageForm;
