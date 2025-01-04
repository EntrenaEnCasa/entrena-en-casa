import type { Plan } from "@/types/models/plan";

export interface GetPlansResponse extends APIResponse {
    plans: Plan[];
}

export interface GetPlanResponse extends APIResponse {
    plan: Plan;
}
