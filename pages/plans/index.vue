// pages/plans/index.vue
<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">Nuestros planes</h2>

            <!-- Filters Section -->
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

            <!-- Loading and Error States -->
            <div v-if="plansLoading">
                <CommonLoading />
            </div>
            <div v-else-if="error" class="text-center text-red-500">
                Hubo un error al obtener los planes
            </div>
            <div v-else-if="!plansResponse?.plans.length" class="text-center text-gray-600">
                No hay planes disponibles para la región, formato y modalidad seleccionada
            </div>

            <!-- Plans Grid -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PlansPlanCard
                    v-for="plan in plansResponse?.plans"
                    :key="plan.plan_id"
                    :plan="plan"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GetPlansResponse } from "@/types/api/plans";

const config = useRuntimeConfig();

// State
const region = ref<number>(13);
const format = ref<"Individual" | "Dupla" | "Grupal">("Individual");
const modality = ref<"P" | "O">("P");

// Computed
const creditType = computed(() => {
    return (format.value === "Dupla" || format.value === "Individual" ? "P" : "G") + modality.value;
});

// Options for selects
const regionOptions = ref<SelectOption[]>([
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

const sessionFormats = ref<SelectOption[]>([
    { value: "Individual", label: "Individual" },
    { value: "Dupla", label: "Dupla" },
    { value: "Grupal", label: "Grupal" },
]);

const sessionModalities = ref<SelectOption[]>([
    { value: "P", label: "Presencial" },
    { value: "O", label: "Online" },
]);

// API call
const {
    data: plansResponse,
    pending: plansLoading,
    error,
} = await useFetch<GetPlansResponse>(`${config.public.apiBase}/user/plans`, {
    method: "POST",
    body: {
        region: region,
        credit_type: creditType,
        format_credit: format,
    },
    watch: [region, creditType, format],
});

console.log(plansResponse.value);
</script>
