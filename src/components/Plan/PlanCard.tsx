"use client";

import { FaCrown } from "react-icons/fa";
import { Badge } from "../UI/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../UI/Card";
import { FiZap } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { useMessages } from "@/hooks/useMessages";
import PlanForm from "./PlanForm";

type Props = {
  isPopular?: boolean;
  billingPeriod?: "monthly" | "yearly";
};

function PlanCard({ isPopular, billingPeriod = "monthly" }: Props) {
  const messages = useMessages();

  const price =
    billingPeriod === "monthly"
      ? messages.plan_object.monthlyPrice
      : messages.plan_object.yearlyPrice;

  const billedText =
    billingPeriod === "monthly"
      ? messages.plan_object.perMonth
      : messages.plan_object.perYear;

  return (
    <Card
      className={`relative shrink-0 rounded-xl ${
        isPopular && "border-[#ff6933]"
      }
      border-2`}
    >
      {isPopular && (
        <Badge className="rounded-none text-xs absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-[#ff6933] text-white px-4 py-1">
          <FaCrown className=" mr-1" />
          {messages.plan_object.popular}
        </Badge>
      )}
      <CardHeader className="text-center pt-12 pb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FiZap className="text-2xl text-[#ff6933]" />
          <CardTitle className="text-4xl font-bold">
            {messages.plan_object.pro}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="text-center pb-8">
        <div className="mb-8">
          <span className="text-5xl font-bold">{price}</span>
          <span className="text-gray-500 font-medium text-[16px]">
            {billedText}
          </span>
        </div>

        <ul className="space-y-4 text-left">
          {messages.plan_object.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="shrink-0 w-5 h-5 rounded-full bg-[#ff6933]/10 flex items-center justify-center">
                <BiCheck className="text-lg text-[#ff6933]" />
              </div>
              <span className="text-gray-600 text-[16px]">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pb-8 flex-col">
        <PlanForm billingPeriod={billingPeriod} />
      </CardFooter>
    </Card>
  );
}

export default PlanCard;
