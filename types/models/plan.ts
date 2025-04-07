export interface Plan {
    plan_id: number;
    credit_type: "PP" | "GP" | "PO" | "GO";
    format_credit: "Individual" | "Dupla" | "Grupal";
    expiration_time: string;
    price: number;
    credit_quantity: number;
    description: string;
    formattedPrice: string;
}
