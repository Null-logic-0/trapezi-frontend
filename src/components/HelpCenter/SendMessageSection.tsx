"use client";

import { useMessages } from "@/hooks/useMessages";
import { Card } from "../UI/Card";
import MessageForm from "./MessageForm";

function SendMessageSection() {
  const messages = useMessages();
  return (
    <section className="max-w-4xl mx-auto mb-24 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">{messages.need_help}</h2>
        <p className="text-lg text-[#737373]">{messages.send_message}</p>
      </div>
      <Card className="group overflow-hidden bg-white p-6 shadow-xl  border border-[#e3e3e3]">
        <MessageForm />
      </Card>
    </section>
  );
}

export default SendMessageSection;
