"use client";
import { BiStar, BiCheckCircle } from "react-icons/bi";

export type VipPlanId = "vip_2_days" | "vip_2_weeks" | "vip_1_month";

interface PlanDefinition {
  id: VipPlanId;
  price: number;
  duration: string;
  label: string;
  description: string;
  isPopular?: boolean;
  backendValue: string;
}

const VIP_PLANS: PlanDefinition[] = [
  {
    id: "vip_2_days",
    price: 5,
    duration: "2 Days",
    label: "Starter",
    description: "Quick boost visibility",
    backendValue: "2_days",
  },
  {
    id: "vip_2_weeks",
    price: 10,
    duration: "2 Weeks",
    label: "Standard",
    description: "Best for short term events",
    isPopular: true,
    backendValue: "2_weeks",
  },
  {
    id: "vip_1_month",
    price: 15,
    duration: "1 Month",
    label: "Premium",
    description: "Maximum long-term exposure",
    backendValue: "1_month",
  },
];

interface VipPlanSectionProps {
  selectedPlan: VipPlanId | string;
  onSelect: (planId: VipPlanId | string) => void;
  error?: string;
}

function VipPlanSection({
  selectedPlan,
  onSelect,
  error,
}: VipPlanSectionProps) {
  const isVip = !!selectedPlan;

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
          <BiStar className="w-5 h-5 text-yellow-500" />
          Promote your Business (VIP)
        </label>

        {selectedPlan && (
          <button
            type="button"
            onClick={() => onSelect("")}
            className="text-xs text-gray-400 cursor-pointer hover:text-red-500 underline transition-colors"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {VIP_PLANS.map((plan) => {
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
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
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
