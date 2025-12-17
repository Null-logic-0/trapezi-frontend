import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function processPayment(plan_type: string) {
  const { token, success } = await getCookies();
  if (!success || !token) throw new Error("Unauthorized");

  const checkoutRes = await fetch(ENDPOINTS.payments.checkout, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan_type }),
  });

  if (!checkoutRes.ok) {
    const text = await checkoutRes.text();
    throw new Error(`Checkout failed: ${text}`);
  }

  const checkoutData = await checkoutRes.json();

  return { checkout_url: checkoutData.checkout_url };
}
