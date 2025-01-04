// pages/plans/[id].vue
<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <div v-if="pending">
                <CommonLoading />
            </div>
            <div v-else-if="error" class="text-center text-red-500">
                Hubo un error al obtener el plan
            </div>
            <div v-else-if="plan" class="space-y-8">
                <!-- Back button -->
                <NuxtLink
                    to="/plans"
                    class="inline-flex items-center gap-2 text-secondary hover:text-secondary/80"
                >
                    <Icon name="mingcute:arrow-left-fill" />
                    <span>Volver a planes</span>
                </NuxtLink>

                <!-- Plan Card -->
                <PlansPlanCard :plan="plan">
                    <template #primary-action>
                        <CommonButton
                            @click="handleBuyPlan"
                            class="w-full bg-secondary px-4 py-2"
                            rounded-size="full"
                        >
                            Comprar plan
                        </CommonButton>
                    </template>
                </PlansPlanCard>
            </div>
        </div>

        <!-- Authentication Modals -->
        <PlansLoginModal ref="loginModalRef" @openRegister="openRegisterModal" />
        <PlansRegisterModal ref="registerModalRef" @openLogin="openLoginModal" />
    </div>
</template>

<script setup lang="ts">
import type { GetPlanResponse } from "@/types/api/plans";

const config = useRuntimeConfig();
const route = useRoute();
const authStore = useAuthStore();

// Modal refs
const loginModalRef = ref<Modal | null>(null);
const registerModalRef = ref<Modal | null>(null);

// Fetch plan data
const {
    data: response,
    pending,
    error,
} = await useFetch<GetPlanResponse>(`${config.public.apiBase}/user/plans/${route.params.id}`, {
    method: "GET",
});

// Computed property to get the plan from the response
const plan = computed(() => (response.value?.success ? response.value.plan : null));

// Action Handlers
const handleBuyPlan = () => {
    if (!authStore.loggedIn) {
        loginModalRef.value?.openModal();
        return;
    }
    // TODO: Handle purchase logic here
    console.log("Plan to purchase: ", plan.value);
};

const openLoginModal = () => {
    loginModalRef.value?.openModal();
};

const openRegisterModal = () => {
    registerModalRef.value?.openModal();
};
</script>
