"use client";

import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import ProfileHeading from "./ProfileHeading";
import { FaCreditCard } from "react-icons/fa";
import { Card } from "../UI/Card";
import { useRouter } from "next/navigation";

function Subscription() {
  const messages = useMessages();
  const router = useRouter();

  const handleNavigate = () => router.push("/plan");
  return (
    <Card className="p-6">
      <div className="mb-6 mt-2 max-md:text-center">
        <ProfileHeading title={messages.subscriptions} />
      </div>

      <div className="border border-[#e8e8e8] flex justify-between w-full max-md:flex-col gap-4 items-center rounded-xl p-4">
        <div className="flex items-center max-md:flex-col gap-2">
          <div className="bg-[#ffd466] text-2xl rounded-lg h-14 w-14 flex justify-center items-center">
            <FaCreditCard />
          </div>

          <div>
            <p className="text-lg max-md:text-center font-bold">
              {messages.plan}
            </p>
            <span className="text-gray-400 text-sm font-semibold max-md:text-center">
              {messages.paid_plan}
            </span>
          </div>
        </div>
        <Button
          onClick={handleNavigate}
          buttonType="outline"
          className="w-[120px] max-md:w-full text-sm p-2"
        >
          {messages.subscribe}
        </Button>
      </div>
    </Card>
  );
}

export default Subscription;
