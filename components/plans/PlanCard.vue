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
            <p class="text-center font-medium">
                {{ plan.description }}
            </p>
            <p class="text-center font-medium">Duración del plan: {{ plan.expiration_time }}</p>
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

        <!-- Actions Section -->
        <div class="w-full space-y-2.5">
            <!-- Primary Action Button (Slotted) -->
            <slot name="primary-action">
                <CommonButton
                    :to="`/plans/${plan.plan_id}`"
                    class="w-full bg-secondary px-4 py-2"
                    rounded-size="full"
                >
                    Contrata aquí
                </CommonButton>
            </slot>

            <!-- Contact Sales Button (Consistent across all views) -->
            <CommonButton
                @click="handleContactSales"
                class="w-full bg-primary px-4 py-2"
                rounded-size="full"
            >
                Hablar con ventas
            </CommonButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Plan } from "@/types/models/plan";

interface Props {
    plan: Plan;
}

const props = defineProps<Props>();

const handleContactSales = async () => {
    const modality = formatPlan(props.plan.credit_type);

    const link = `https://wa.me/56971370313?text=Hola%20Jorge,%20quiero%20contratar%20un%20plan%20${modality}%20${props.plan.format_credit}%20${props.plan.credit_quantity}%20sesiones%20.`;

    await navigateTo(link, {
        external: true,
        open: {
            target: "_blank",
        },
    });
};

const formatPlan = (creditType: string): string => {
    if (creditType === "PP") {
        return "Personalizado Presencial";
    } else if (creditType === "GP") {
        return "Grupal Presencial";
    } else if (creditType === "PO") {
        return "Personalizado Online";
    } else if (creditType === "GO") {
        return "Grupal Online";
    }
    return "";
};
</script>
