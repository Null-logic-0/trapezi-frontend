export type VipPlanId = "vip_2_days" | "vip_2_weeks" | "vip_1_month";

export interface PlanDefinition {
  id: VipPlanId;
  price: number;
  originalPrice?: number;

  duration: string;
  label: string;
  description: string;
  isPopular?: boolean;
  backendValue: string;
}
