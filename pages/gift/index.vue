<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">Nuestros planes</h2>
            <!-- Loading and Error States -->
            <div v-if="plansLoading">
                <CommonLoading />
            </div>

            <!-- Plans Grid -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GiftPlanCard v-for="plan in plansResponse?.plans" :key="plan.plan_id" :plan="plan" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();

// State
const region = ref<number>(13);
const format = ref<"Individual" | "Dupla" | "Grupal">("Individual");
const modality = ref<"P" | "O">("P");

// Computed
const creditType = computed(() => {
    return (format.value === "Dupla" || format.value === "Individual" ? "P" : "G") + modality.value;
});

interface GetPlansResponse {
    success: boolean;
    message: string;
    plans: [{
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

    }];
}

// API call
const {
    data: plansResponse,
    pending: plansLoading,
    error,
} = await useFetch<GetPlansResponse>(`${config.public.apiBase}/user/gift-plans`, {
    method: "GET"

});
</script>
