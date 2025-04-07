import type { Credit } from "@/types/models/credit";

export interface APICreditsResponse extends APIResponse {
    credits: Credit[];
}

export interface APIPaymentCreateResponse extends APIResponse {
    url: string;
    flowOrder: number;
}
