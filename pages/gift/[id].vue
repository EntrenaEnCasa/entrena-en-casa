<!-- Debe detallarse el plan, luego haber un formulario para quien se regala (correo), de quien viene (nombre y correo) y con eso se procede al pago -->
<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <div v-if="pending">
                <CommonLoading />
            </div>
            <div v-else-if="error" class="text-center text-red-500">
                Hubo un error al obtener el plan
            </div>
            <div v-else-if="plan" class=" grid lg:grid-cols-2 grid-cols-1 place-items-center gap-10">

                <!-- Plan Card -->
                <GiftPlanCard :plan="plan">
                </GiftPlanCard>
                <div class="flex flex-col items-center space-y-5 rounded-xl bg-white p-8 shadow">
                    <h2 class="text-2xl font-semibold text-secondary">Regala este plan</h2>
                    <p class="text-center text-gray-600">Completa los siguientes datos para proceder al pago</p>
                    <div class="w-full max-w-md space-y-4">
                        <CommonInput v-model="giftData.recipient_email" name="recipient_email"
                            label="Correo electrónico del destinatario"
                            placeholder="Correo electrónico del destinatario" />
                        <CommonInput v-model="giftData.sender_name" name="sender_name" label="Tu nombre"
                            placeholder="Tu nombre" />
                        <CommonInput v-model="giftData.sender_email" name="sender_email" label="Tu correo electrónico"
                            placeholder="Tu correo electrónico" />
                        <CommonButton @click="handleGiftPlan()" class="w-full bg-secondary px-4 py-2"
                            rounded-size="full">
                            Regalar plan
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useGiftStore } from "~/stores/GiftStore";

interface GetPlanResponse {
    success: boolean;
    message: string;
    plan: {
        plan_id: number;
        credit_type: string;
        format_credit: string;
        expiration_time: string;
        price: number;
        credit_quantity: number;
        description: string;
        special: number;
        region: number;
        formattedPrice: string;

    }
}

interface CheckEmailResponse {
    success: boolean;
    message: string;
    user_id: number;
}
interface SignUpResponse {
    success: boolean;
    message: string;
    user: {
        user_id: number;
        email: string;
        user_type: 0 | 1 | 2;
    }
}
interface CheckoutResponse {
    success: boolean;
    message: string;
    url: string;
    flowOrder: number;
}

const toast = useToast();
const giftStore = useGiftStore();
const config = useRuntimeConfig();
const route = useRoute();
const {
    data: response,
    pending,
    error,
} = await useFetch<GetPlanResponse>(`${config.public.apiBase}/user/plans/${route.params.id}`, {
    method: "GET",
});

// Computed property to get the plan from the response
const plan = computed(() => {
    if (response.value?.success) {
        return {
            ...response.value.plan,
            special: response.value.plan.special ?? 0, // Provide default value if missing
            region: response.value.plan.region ?? 0,  // Provide default value if missing
        };
    }
    return null;
});
const giftData = ref({
    plan_id: Number(route.params.id), // Convert plan_id to a number
    user_id: 0,
    recipient_email: "",
    sender_name: "",
    sender_email: "",
    had_account: false,
    flowOrder: 0
});

const handleGiftPlan = async () => {
    // Check if the recipient email exists
    const checkEmailResponse = await $fetch<CheckEmailResponse>(`${config.public.apiBase}/user/check-email`, {
        method: "POST",
        body: {
            email: giftData.value.recipient_email,
        },
    });

    if (checkEmailResponse.success) {
        giftData.value.had_account = true;
        giftData.value.user_id = checkEmailResponse.user_id;
    } else {
        // If the email does not exist, sign up the recipient and then proceed to checkout
        const signUpResponse = await $fetch<SignUpResponse>(`api/gift/new-gift/sign-up`, {
            method: "POST",
            body: {
                email: giftData.value.recipient_email,
            },
        });
        if (signUpResponse.success) {
            giftData.value.had_account = false;
            giftData.value.user_id = signUpResponse.user.user_id;
        } else {
            console.error("Error al intentar usar este correo para un regalo. Intentalo nuevamente.", signUpResponse.message);
            toast.error("Error al intentar usar este correo para un regalo. Intentalo nuevamente.");
            return;
        }
    }
    // Procede a llamar a crear la orden de pago del regalo
    const checkoutResponse = await $fetch<CheckoutResponse>(
        `/api/gift/payment/createPayment`,
        {
            method: "POST",
            body: {
                email: giftData.value.sender_email,
                user_id: giftData.value.user_id,
                plan_id: giftData.value.plan_id
            },
        },
    );

    if (checkoutResponse.success) {
        giftData.value.flowOrder = checkoutResponse.flowOrder;
        giftStore.setGiftTransaction(giftData.value);
        // Redirect to the payment URL
        await navigateTo(checkoutResponse.url, { external: true });
    } else {
        console.error("Error al crear el pago del regalo. Intentalo nuevamente.", checkoutResponse.message);
        toast.error("Error al crear el pago del regalo. Intentalo nuevamente.");
        return;
    }
}


</script>
