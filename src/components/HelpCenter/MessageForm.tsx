"use client";

import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { toast } from "react-hot-toast";
import { ENDPOINTS } from "@/lib/endpoints";

function MessageForm() {
  const messages = useMessages();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formElement = e.target as HTMLFormElement;

    try {
      const response = await fetch(ENDPOINTS.email, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success(messages.message_sent);
        formElement.reset();
      } else {
        toast.error(messages.error_message);
      }
    } catch (error) {
      console.error(error);
      toast.error(messages.error_500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="hidden"
        name="_subject"
        value="New Contact Message (Trapezi)"
      />
      <input type="text" name="_honey" className="hidden" />

      <Input
        type="email"
        name="email"
        placeholder="your@email.com"
        label={messages.email}
        required
      />

      <Input
        type="text"
        name="subject"
        placeholder={messages.subject_placeholder}
        label={messages.subject}
        required
      />

      <Input
        isTextArea
        name="message"
        label={messages.message}
        className="h-32"
        required
      />

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          className="mt-2 text-sm w-34 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? messages.sending : messages.send}
        </Button>
      </div>
    </form>
  );
}

export default MessageForm;
