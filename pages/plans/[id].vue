<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <div v-if="pending">
                <CommonLoading />
            </div>
            <div v-else-if="error">Hubo un error al obtener el plan</div>
            <div v-else class="space-y-8">
                <!-- Back button -->
                <NuxtLink
                    to="/plans"
                    class="inline-flex items-center gap-2 text-secondary hover:text-secondary/80"
                >
                    <Icon name="mingcute:arrow-left-fill" />
                    <span>Volver a planes</span>
                </NuxtLink>

                <!-- Plan Details Card -->
                <div class="rounded-xl bg-white p-8 shadow">
                    <div class="space-y-6">
                        <!-- Price and Title Section -->
                        <div class="text-center">
                            <h2 class="tellural mb-4 text-4xl font-bold text-secondary">
                                {{ plan.formattedPrice }}
                            </h2>
                            <h3 class="text-2xl font-semibold text-gray-800">
                                Plan de {{ plan.credit_quantity }} sesiones
                                {{
                                    plan.format_credit === "Individual"
                                        ? "individuales"
                                        : plan.format_credit === "Dupla"
                                          ? "dupla"
                                          : "grupales"
                                }}
                            </h3>
                        </div>

                        <!-- Description and Details -->
                        <div class="space-y-4">
                            <p class="text-center text-lg">
                                {{ plan.description }}
                            </p>
                            <p class="text-center font-medium">
                                Duración del plan: {{ plan.expiration_time }}
                            </p>
                        </div>

                        <!-- Features List -->
                        <ul class="space-y-4">
                            <li class="flex gap-2">
                                <div
                                    class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40"
                                >
                                    <Icon name="mingcute:check-fill" class="text-secondary" />
                                </div>
                                <p>Entrenamiento con Personal Trainer el 100% de la sesión</p>
                            </li>
                            <li class="flex gap-2">
                                <div
                                    class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40"
                                >
                                    <Icon name="mingcute:check-fill" class="text-secondary" />
                                </div>
                                <p>Horario a convenir</p>
                            </li>
                            <li class="flex gap-2">
                                <div
                                    class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40"
                                >
                                    <Icon name="mingcute:check-fill" class="text-secondary" />
                                </div>
                                <p>
                                    {{
                                        plan.format_credit === "Individual"
                                            ? "Formato personalizado, un tiempo solo para ti"
                                            : plan.format_credit === "Dupla"
                                              ? "Formato en dupla, siempre con alguien de confianza"
                                              : "Formato grupal, entrena junto a la comunidad de Entrena en Casa"
                                    }}
                                </p>
                            </li>
                        </ul>

                        <!-- Action Buttons -->
                        <div class="space-y-3 pt-4">
                            <CommonButton
                                @click="handleBuyPlan"
                                class="w-full bg-secondary px-4 py-2"
                                rounded-size="full"
                            >
                                Comprar plan
                            </CommonButton>
                            <CommonButton
                                @click="handleContactSales"
                                class="w-full bg-primary px-4 py-2"
                                rounded-size="full"
                            >
                                Hablar con ventas
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PlansLoginModal ref="loginModalRef" @openRegister="openRegisterModal" />
        <PlansRegisterModal ref="registerModalRef" @openLogin="openLoginModal" />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const authStore = useAuthStore();

const loginModalRef = ref(null);
const registerModalRef = ref(null);

// Fetch plan data
const {
    data: response,
    pending,
    error,
} = await useFetch(`${config.public.apiBase}/user/plans/${route.params.id}`, {
    method: "GET",
});

// Computed property to get the plan from the response
const plan = computed(() => (response.value?.success ? response.value.plan : null));

const handleBuyPlan = () => {
    if (!authStore.loggedIn) {
        loginModalRef.value?.openModal();
        return;
    }
    // TODO: Handle purchase logic here
    console.log("Plan to purchase: ", plan.value);
};

const handleContactSales = async () => {
    if (!plan.value) return;

    const planRegion = "Metropolitana de Santiago"; // You might want to add region to the plan details
    const modality = formatPlan(plan.value.credit_type);

    const link = `https://wa.me/56971370313?text=Hola%20Jorge,%20quiero%20contratar%20un%20plan%20${modality}%20${plan.value.format_credit}%20${plan.value.credit_quantity}%20sesiones%20en%20la%20región%20de%20${planRegion}.`;

    await navigateTo(link, {
        external: true,
        open: {
            target: "_blank",
        },
    });
};

const formatPlan = (creditType) => {
    if (creditType === "PP") {
        return "Personalizado Presencial";
    } else if (creditType === "GP") {
        return "Grupal Presencial";
    } else if (creditType === "PO") {
        return "Personalizado Online";
    } else if (creditType === "GO") {
        return "Grupal Online";
    }
};

const openLoginModal = () => {
    loginModalRef.value?.openModal();
};

const openRegisterModal = () => {
    registerModalRef.value?.openModal();
};
</script>
