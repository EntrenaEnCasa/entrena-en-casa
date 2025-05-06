<template>
    <div class="flex flex-col items-center space-y-5 rounded-xl bg-white p-8 shadow">
        <!-- Price and Title Section -->
        <div class="text-center">
            <h2 class="text-3xl font-semibold text-secondary">
                {{ plan.formattedPrice }}
            </h2>
        </div>
        <!-- Title and Description Section -->
        <div class="text-center">
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
            <p class="text-center font-medium text-primary">
                {{ formatRegion(plan.region) }}
            </p>
            <p class="text-center font-medium">
                {{ plan.description }}
            </p>
            <p class="text-center font-medium">Duración del plan: {{ plan.expiration_time }}</p>
        </div>

        <!-- Features List -->
        <ul class="space-y-4">
            <li class="flex gap-2">
                <div class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40">
                    <Icon name="mingcute:check-fill" class="text-secondary" />
                </div>
                <p>Entrenamiento con Personal Trainer el 100% de la sesión</p>
            </li>
            <li class="flex gap-2">
                <div class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40">
                    <Icon name="mingcute:check-fill" class="text-secondary" />
                </div>
                <p>Horario a convenir</p>
            </li>
            <li class="flex gap-2">
                <div class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full bg-secondary-50/40">
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

        <!-- Actions Section -->
        <div class="w-full space-y-2.5">
            <!-- Primary Action Button (Slotted) -->
            <slot name="primary-action">
                <CommonButton :to="`/gift/${plan.plan_id}`" class="w-full bg-secondary px-4 py-2" rounded-size="full">
                    Regalar plan
                </CommonButton>
            </slot>

        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
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
const formatRegion = (region: number) => {
    const regions = {
        0: "Sin región específica",
        1: "Región Metropolitana",
        2: "Región de Valparaíso",
        3: "Región del Libertador General Bernardo O'Higgins",
        4: "Región del Maule",
        5: "Región de Ñuble",
        6: "Región del Biobío",
        7: "Región de La Araucanía",
        8: "Región de Los Ríos",
        9: "Región de Los Lagos",
        10: "Región Aysén del General Carlos Ibáñez del Campo",
        11: "Región de Magallanes y de la Antártica Chilena",
        12: "Región de Arica y Parinacota",
        13: "Región de Tarapacá",
        14: "Región de Antofagasta",
        15: "Región de Atacama",
    };
    return regions[region as keyof typeof regions] || "Sin región";
};
const props = defineProps<Props>();


</script>
