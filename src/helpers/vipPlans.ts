import { PlanDefinition } from "@/interfaces/vipPlan.interface";

const getString = (value: string | undefined, fallback: string) =>
  typeof value === "string" ? value : fallback;

const PRO_DISCOUNT = 0.2;

const applyProDiscount = (price: number, isPro: boolean) => {
  if (!isPro) return price;
  return Math.round(price * (1 - PRO_DISCOUNT) * 100) / 100;
};

type Messages = {
  plan_object: {
    vip: {
      quick_boost: string;
      short_term_boost: string;
      long_term_boost: string;
      two_days: string;
      two_weeks: string;
      month: string;
    };
  };
};

export const VIP_PLANS = (
  messages: Messages,
  isPro: boolean
): PlanDefinition[] => [
  {
    id: "vip_2_days",
    price: applyProDiscount(5, isPro),
    originalPrice: isPro ? 5 : undefined,
    duration: getString(messages?.plan_object.vip?.two_days, "2 Days"),
    label: "Starter",
    description: getString(
      messages.plan_object.vip?.quick_boost,
      "Quick boost visibility"
    ),
    backendValue: "2_days",
  },
  {
    id: "vip_2_weeks",
    price: applyProDiscount(10, isPro),
    originalPrice: isPro ? 10 : undefined,
    duration: getString(messages.plan_object.vip?.two_weeks, "2 Weeks"),
    label: "Standard",
    description: getString(
      messages.plan_object.vip?.short_term_boost,
      "Best for short term events"
    ),
    isPopular: true,
    backendValue: "2_weeks",
  },
  {
    id: "vip_1_month",
    price: applyProDiscount(15, isPro),
    originalPrice: isPro ? 15 : undefined,
    duration: getString(messages.plan_object.vip?.month, "1 Month"),
    label: "Premium",
    description: getString(
      messages.plan_object.vip?.long_term_boost,
      "Maximum long-term exposure"
    ),
    backendValue: "1_month",
  },
];
