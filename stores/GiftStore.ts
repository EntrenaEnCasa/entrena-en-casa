import { defineStore } from "pinia";

interface GiftTransaction {
    plan_id: number;
    user_id: number | null; // ID del usuario a quien se le cargará el regalo
    recipient_email: string; // Correo electrónico del destinatario
    sender_name: string; // Nombre de quien está haciendo el regalo
    sender_email: string; // Correo electrónico de quien está haciendo el regalo
    had_account: boolean; // Indica si el destinatario ya tiene cuenta
    flowOrder: number; // Orden de pago de Flow
}

export const useGiftStore = defineStore(
    "GiftStore",
    () => {
        const giftTransaction: Ref<GiftTransaction | null> = ref(null);

        const setGiftTransaction = (newGiftTransaction: GiftTransaction | null) => {
            giftTransaction.value = newGiftTransaction;
        };

        return {
            giftTransaction,
            setGiftTransaction,
        };
    },
    {
        persist: {
            storage: localStorage,
        },
    },
);