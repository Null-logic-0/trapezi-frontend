"use client";

import { useActionState, useEffect } from "react";
import Button from "../UI/Button";
import { upgradePlan } from "@/lib/actions/upgradePlan";
import { useMessages } from "@/hooks/useMessages";

type ActionState = {
  error: string;
  checkout_url: string;
};

type Props = {
  billingPeriod: "monthly" | "yearly";
};

const initialState: ActionState = {
  error: "",
  checkout_url: "",
};

function PlanForm({ billingPeriod }: Props) {
  const messages = useMessages();

  const [state, formAction, isPending] = useActionState(
    upgradePlan,
    initialState
  );

  useEffect(() => {
    if (state.checkout_url) {
      window.location.href = state.checkout_url;
    }
  }, [state.checkout_url]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="plan_type" value={billingPeriod} />

      <Button type="submit" disabled={isPending} isPending={isPending}>
        {messages.plan_object.getStarted}
      </Button>

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </form>
  );
}

export default PlanForm;
