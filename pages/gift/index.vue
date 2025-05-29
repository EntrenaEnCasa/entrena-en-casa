<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10 flex flex-col items-center justify-center">
        <!-- <div class="mx-auto w-11/12 max-w-6xl">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">Nuestros planes</h2> -->
        <!-- Loading and Error States -->
        <!-- <div v-if="plansLoading">
                <CommonLoading />
            </div> -->

        <!-- Plans Grid -->
        <!-- <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GiftPlanCard v-for="plan in plansResponse?.plans" :key="plan.plan_id" :plan="plan" />
            </div> -->
        <!-- </div> -->
        <div class="mx-auto w-2/3 max-w-6xl ">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">Por ahora no contamos con planes de regalo.
                ¡Atento a nuevas promociones pronto!</h2>
            <div class="text-center">
                <NuxtLink to="https://www.instagram.com/entrenaencasa/" target="_blank"
                    class="cursor-pointer rounded-lg border-0 bg-secondary px-3 py-2 font-medium text-white">
                    <Icon name="fa6-brands:instagram" class="mr-2 text-xl" />
                    Síguenos en Instagram
                </NuxtLink>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

// const config = useRuntimeConfig();

// // State
// const region = ref<number>(13);
// const format = ref<"Individual" | "Dupla" | "Grupal">("Individual");
// const modality = ref<"P" | "O">("P");

// // Computed
// const creditType = computed(() => {
//     return (format.value === "Dupla" || format.value === "Individual" ? "P" : "G") + modality.value;
// });

// interface GetPlansResponse {
//     success: boolean;
//     message: string;
//     plans: [{
//         plan_id: number;
//         credit_type: string;
//         format_credit: string;
//         expiration_time: string;
//         price: number;
//         credit_quantity: number;
//         description: string;
//         special: number;
//         region: number;
//         formattedPrice: string;

//     }];
// }

// // API call
// const {
//     data: plansResponse,
//     pending: plansLoading,
//     error,
// } = await useFetch<GetPlansResponse>(`${config.public.apiBase}/user/gift-plans`, {
//     method: "GET"

// });
</script>
