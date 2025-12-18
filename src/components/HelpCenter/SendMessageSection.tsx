"use client";

import { useMessages } from "@/hooks/useMessages";
import { Card } from "../UI/Card";
import MessageForm from "./MessageForm";
import { MdOutlineEmail } from "react-icons/md";

function SendMessageSection() {
  const messages = useMessages();
  const SUPPORT_EMAIL = "support@trapezi.ge";

  return (
    <section className="max-w-3xl mx-auto mb-24 mt-16 px-4">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {messages.need_help}
        </h2>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          {messages.send_message}
        </p>

        <div className="inline-flex  items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer">
          <MdOutlineEmail className="text-lg" />

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="hover:text-[#ff6633] font-semibold hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>

      <Card className="p-6 md:p-8 ">
        <MessageForm />
      </Card>
    </section>
  );
}

export default SendMessageSection;
