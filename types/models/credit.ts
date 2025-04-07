export interface Credit {
    transaction_id: number;
    credit_type: "PP" | "GP" | "PO" | "GO";
    format_credit: "Individual" | "Dupla" | "Grupal";
    used_credits: number;
    available_credits: number;
    expiration_date: string;
}
