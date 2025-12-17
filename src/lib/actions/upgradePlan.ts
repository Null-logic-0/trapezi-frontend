"use server";

import { processPayment } from "../api/createPayment";

type ActionState = {
  error?: string;
  checkout_url?: string;
};

export async function upgradePlan(
  _: ActionState,
  formData: FormData
): Promise<ActionState | never> {
  const plan_type = formData.get("plan_type") as string;

  const data = await processPayment(plan_type);

  return { checkout_url: data.checkout_url };
}
