<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">Nuestros planes</h2>
            <div class="mx-auto mb-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                <CommonSelect
                    label="Región"
                    v-model="region"
                    name="region"
                    id="region"
                    :options="regionOptions"
                />
                <CommonSelect
                    label="Formato"
                    v-model="format"
                    name="format"
                    id="format"
                    :options="sessionFormats"
                />
                <CommonSelect
                    label="Modalidad"
                    v-model="modality"
                    name="modality"
                    id="modality"
                    :options="sessionModalities"
                />
            </div>
            <div v-if="plansLoading">
                <CommonLoading />
            </div>
            <div v-else-if="error">Hubo un error al obtener los planes</div>
            <div v-else-if="plansResponse.plans.length === 0">
                No hay planes disponibles para la región, formato y modalidad seleccionada
            </div>
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="plan in plansResponse.plans"
                    class="flex flex-col items-center space-y-5 rounded-xl bg-white p-8 shadow"
                >
                    <h3 class="text-3xl font-semibold text-secondary">
                        {{ plan.formattedPrice }}
                    </h3>
                    <h4 class="text-center text-2xl font-semibold text-gray-800">
                        Plan de {{ plan.credit_quantity }} sesiones
                        {{
                            format === "Individual"
                                ? "individuales"
                                : format === "Dupla"
                                  ? "dupla"
                                  : "grupales"
                        }}
                    </h4>
                    <p class="text-center font-medium">
                        {{ plan.description }}
                    </p>
                    <p class="text-center font-medium">
                        Duración del plan: {{ plan.expiration_time }}
                    </p>
                    <ul class="space-y-3">
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
                                    format === "Individual"
                                        ? "Formato personalizado, un tiempo solo para ti"
                                        : format === "Dupla"
                                          ? "Formato en dupla, siempre con alguien de confianza"
                                          : "Formato grupal, entrena junto a la comunidad de Entrena en Casa"
                                }}
                            </p>
                        </li>
                    </ul>
                    <div class="w-full space-y-2">
                        <CommonButton
                            :to="`/plans/${plan.plan_id}`"
                            class="w-full bg-secondary px-4 py-2"
                            rounded-size="full"
                        >
                            Ver detalles del plan
                        </CommonButton>
                        <CommonButton
                            @click="
                                goToWhatsapp(
                                    plan.format_credit,
                                    plan.credit_type,
                                    plan.credit_quantity,
                                )
                            "
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
</template>

<script setup>
const config = useRuntimeConfig();

const region = ref(13);
const format = ref("Individual");
const modality = ref("P");
const creditType = computed(() => {
    return format.value === "Dupla" || format.value === "Individual"
        ? "P" + modality.value
        : "G" + modality.value;
});

const regionOptions = ref([
    { value: 11, label: "Aisén del General Carlos Ibañez del Campo" },
    { value: 2, label: "Antofagasta" },
    { value: 15, label: "Arica y Parinacota" },
    { value: 3, label: "Atacama" },
    { value: 8, label: "Bío Bío" },
    { value: 4, label: "Coquimbo" },
    { value: 9, label: "Araucanía" },
    { value: 6, label: "Libertador General Bernardo O'Higgins" },
    { value: 10, label: "Los Lagos" },
    { value: 14, label: "Los Ríos" },
    { value: 12, label: "Magallanes y de la Antártica Chilena" },
    { value: 7, label: "Maule" },
    { value: 13, label: "Metropolitana de Santiago" },
    { value: 16, label: "Ñuble" },
    { value: 1, label: "Tarapacá" },
    { value: 5, label: "Valparaíso" },
]);

const sessionFormats = ref([
    { value: "Individual", label: "Individual" },
    { value: "Dupla", label: "Dupla" },
    { value: "Grupal", label: "Grupal" },
]);

const sessionModalities = ref([
    { value: "P", label: "Presencial" },
    { value: "O", label: "Online" },
]);

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

const goToWhatsapp = async (planFormat, planType, planCreditQuantity) => {
    if (!planFormat || !planType || !planCreditQuantity) return;
    const modality = formatPlan(planType);
    const planRegion = formatRegion(region.value);

    const link =
        "https://wa.me/56971370313?text=Hola%20Jorge,%20quiero%20contratar%20un%20plan%20" +
        modality +
        "%20" +
        planFormat +
        "%20" +
        planCreditQuantity +
        "%20sesiones%20en%20la%20región%20de%20" +
        planRegion +
        ".";
    await navigateTo(link, {
        external: true,
        open: {
            target: "_blank",
        },
    });

    return;
};

const formatRegion = (region) => {
    if (!region) return "";
    const selectedRegion = regionOptions.value.find((r) => r.value === region);
    return selectedRegion ? selectedRegion.label : "";
};

const {
    data: plansResponse,
    pending: plansLoading,
    error,
} = await useFetch(`${config.public.apiBase}/user/plans`, {
    method: "POST",
    body: {
        region: region,
        credit_type: creditType,
        format_credit: format,
    },
    watch: [region, creditType, format],
});
</script>
