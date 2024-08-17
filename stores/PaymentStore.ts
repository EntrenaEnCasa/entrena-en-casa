import { defineStore } from "pinia";

interface FlowTransaction {
    plan_id: number;
    user_id: number;
    flowOrder: number;
}

export const usePaymentStore = defineStore(
    "PaymentStore",
    () => {
        const flowTransaction: Ref<FlowTransaction | null> = ref(null);

        const setFlowTransaction = (
            newFlowTransaction: FlowTransaction | null
        ) => {
            flowTransaction.value = newFlowTransaction;
        };

        return {
            flowTransaction,
            setFlowTransaction,
        };
    },
    {
        persist: {
            storage: localStorage,
        },
    }
);
