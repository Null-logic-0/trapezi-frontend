"use client";
import { VIP_PLANS } from "@/helpers/vipPlans";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";
import { useMessages } from "@/hooks/useMessages";
import { VipPlanId } from "@/interfaces/vipPlan.interface";
import { BiStar, BiCheckCircle } from "react-icons/bi";

type VipPlanSectionProps = {
  selectedPlan: VipPlanId | string;
  onSelect: (planId: VipPlanId | string) => void;
  error?: string;
};

function VipPlanSection({
  selectedPlan,
  onSelect,
  error,
}: VipPlanSectionProps) {
  const isVip = !!selectedPlan;
  const messages = useMessages();
  const { user } = useFetchCurrentUser();
  const isPro = user?.plan === "pro";
  const plans = VIP_PLANS(messages, isPro);

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <label className="text-lg font-bold flex items-center gap-1 text-gray-800">
          <BiStar className="text-yellow-500" />
          VIP
        </label>

        {selectedPlan && (
          <button
            type="button"
            onClick={() => onSelect("")}
            className="text-xs text-gray-400 cursor-pointer hover:text-red-500 underline transition-colors"
          >
            {messages.cancel}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className={`
                relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex flex-col justify-between gap-3
                ${
                  isSelected
                    ? "border-[#ff6633] bg-gray-50 ring-1 ring-black/5"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }
              `}
            >
              {plan.isPopular && !isSelected && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6633] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm whitespace-nowrap">
                  Best Value
                </span>
              )}

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.label}</h3>
                  <p className="text-xs text-gray-500">{plan.description}</p>
                </div>
                {isSelected ? (
                  <BiCheckCircle className="w-6 h-6 text-[#ff6633]" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                )}
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  {isPro && (
                    <span className="text-xl line-through font-bold text-gray-500">
                      {plan.originalPrice} ₾
                    </span>
                  )}
                  <span
                    className={`text-2xl font-bold ${
                      isPro ? "text-[#ff6b36]" : "text-gray-900"
                    }`}
                  >
                    {plan.price} ₾
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    / {plan.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden inputs for form submission */}
      <input
        type="hidden"
        name="vip_plan"
        value={selectedPlan ? selectedPlan.replace("vip_", "") : ""}
      />
      <input type="hidden" name="is_vip" value={isVip ? "true" : "false"} />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default VipPlanSection;
