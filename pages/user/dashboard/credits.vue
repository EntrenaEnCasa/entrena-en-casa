<template>
    <div class="space-y-10">
        <h3 class="text-xl font-semibold">Compra de sesiones</h3>

        <!-- Current Credits Section -->
        <div>
            <div class="mb-2 flex items-center justify-end text-secondary">
                <p class="mr-1 text-sm font-medium">¿Qué significa cada sesión?</p>
                <Icon name="fa6-solid:circle-info" />
            </div>

            <div
                class="flex flex-col items-center rounded-xl border bg-white px-8 py-6 shadow-[0px_4px_50px_-16px_rgba(0,0,0,0.1)]"
            >
                <h5 class="mb-5 text-center text-xl font-medium">Sesiones compradas</h5>
                <div>
                    <CommonLoading v-show="getCreditsLoading" />
                    <div
                        v-show="!getCreditsLoading && creditsData && creditsData.credits.length > 0"
                        class="grid grid-cols-1 gap-2 xl:grid-cols-2"
                    >
                        <div
                            v-for="credit in creditsData?.credits"
                            :key="credit.transaction_id"
                            class="flex w-full flex-col items-center justify-between gap-2 rounded-xl border p-5 font-medium text-gray-400 md:flex-row"
                        >
                            <div class="whitespace-nowrap text-secondary">
                                <Icon
                                    :name="
                                        getCreditTypeIcon(credit.credit_type, credit.format_credit)
                                            .person
                                    "
                                    class="text-2xl"
                                />
                                <Icon
                                    :name="
                                        getCreditTypeIcon(credit.credit_type, credit.format_credit)
                                            .activity
                                    "
                                    class="text-3xl"
                                />
                            </div>
                            <p>
                                {{ credit.available_credits }} sesiones restantes -
                                {{
                                    getFormattedCreditType(credit.credit_type, credit.format_credit)
                                }}
                            </p>
                            <button
                                class="whitespace-nowrap text-secondary"
                                @click="handleOpenDetailsModal(credit)"
                            >
                                <span>Ver detalles</span>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                    <div
                        v-show="
                            !getCreditsLoading && (!creditsData || creditsData.credits.length === 0)
                        "
                        class="text-center text-gray-600"
                    >
                        <p>No tienes sesiones compradas</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Plan Selection Section -->
        <div class="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-2">
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

        <!-- Plans Grid -->
        <div v-if="plansInformationLoading">
            <CommonLoading />
        </div>
        <div v-else-if="plansInformation.plans.length === 0" class="text-center text-gray-600">
            No hay planes disponibles para el formato y modalidad seleccionados
        </div>
        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <PlansPlanCard
                v-for="plan in plansInformation.plans"
                :key="plan.plan_id"
                :plan="plan"
                @primary-action="handleOpenConfirmationModal(plan.plan_id)"
            >
                <template #primary-action>
                    <CommonButton
                        @click="handleOpenConfirmationModal(plan.plan_id)"
                        class="w-full bg-secondary px-4 py-2"
                        rounded-size="full"
                    >
                        Comprar
                    </CommonButton>
                </template>
            </PlansPlanCard>
        </div>

        <!-- Modals -->
        <Teleport to="body">
            <CommonModal ref="detailsModal">
                <div class="px-5 py-2">
                    <h3 class="mb-6 text-center text-xl font-semibold">Detalles</h3>
                    <div class="text-center">
                        <h4 class="mb-4 text-lg font-semibold">Tu compra</h4>
                        <div
                            v-if="selectedCredit"
                            class="custom-grid grid grid-cols-2 items-center gap-4"
                        >
                            <p>Plan</p>
                            <p class="font-semibold">
                                {{
                                    getFormattedCreditType(
                                        selectedCredit.credit_type,
                                        selectedCredit.format_credit,
                                    )
                                }}
                            </p>
                            <p>Cantidad de sesiones compradas</p>
                            <p class="font-semibold">
                                {{ selectedCredit.available_credits + selectedCredit.used_credits }}
                            </p>
                            <p>Cantidad de créditos restantes disponibles</p>
                            <p class="font-semibold">
                                {{ selectedCredit.available_credits }}
                            </p>
                            <p>Fecha de expiración</p>
                            <p class="font-semibold">
                                {{ selectedCredit.expiration_date }}
                            </p>
                        </div>
                        <div class="mt-6 flex justify-center">
                            <CommonButton
                                class="px-10 py-2"
                                bg-color="tertiary"
                                @click="handleCloseDetailsModal"
                            >
                                Cerrar
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>

            <CommonModal ref="confirmationModal">
                <div class="px-5 py-2">
                    <h3 class="mb-6 text-center text-xl font-semibold">Detalles de tu compra</h3>
                    <div class="text-center">
                        <div
                            v-if="selectedPlan"
                            class="custom-grid grid grid-cols-2 items-center gap-4"
                        >
                            <p>Plan</p>
                            <p class="font-semibold">
                                {{
                                    getFormattedCreditType(
                                        selectedPlan.credit_type,
                                        selectedPlan.format_credit,
                                    )
                                }}
                            </p>
                            <p>Cantidad de sesiones</p>
                            <p class="font-semibold">
                                {{ selectedPlan.credit_quantity }}
                            </p>
                            <p>Tiempo máximo para utilizar sesiones</p>
                            <p class="font-semibold">
                                {{ selectedPlan.expiration_time }}
                            </p>

                            <template v-if="selectedPlan.format_credit === 'Dupla'">
                                <p>Condiciones extra</p>
                                <p class="font-semibold">
                                    Ambas personas deberán entrenar juntas todas las sesiones.
                                </p>
                                <p>Beneficiario plan dupla</p>
                                <StudentDashboardCreditsStudentSearch v-model:clients="dupla" />
                            </template>
                            <p class="mt-3 text-xl font-semibold">Valor a pagar</p>
                            <h4 class="mt-3 text-2xl font-bold text-secondary">
                                {{ selectedPlan.formattedPrice }}
                            </h4>
                        </div>
                        <div class="mt-6 flex justify-between">
                            <CommonButton
                                class="px-4 py-2"
                                bg-color="tertiary"
                                @click="handleCloseConfirmationModal"
                            >
                                Cancelar
                            </CommonButton>
                            <CommonButton
                                class="px-4 py-2"
                                @click="buyPlan"
                                :loading="buyPlanLoading"
                            >
                                Comprar plan
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import type { Credit } from "@/types/models/credit";
import type { Plan } from "@/types/models/plan";
import type { GetPlansResponse } from "@/types/api/plans";
import type { APICreditsResponse } from "@/types/api/credits";
import type { APIPaymentCreateResponse } from "@/types/api/credits";

const config = useRuntimeConfig();
const userStore = useUserStore();
const paymentStore = usePaymentStore();
const toast = useToast();

const user = userStore.user as Student;

// State
const format = ref<"Individual" | "Dupla" | "Grupal">("Individual");
const modality = ref<"P" | "O">("P");
const selectedPlan = ref<Plan | null>(null);
const selectedCredit = ref<Credit | null>(null);
const buyPlanLoading = ref(false);
const dupla = ref<Student[]>([]);

// Modal refs
const confirmationModal = ref<Modal | null>(null);
const detailsModal = ref<Modal | null>(null);

// Computed
const creditType = computed(
    () => (format.value === "Dupla" || format.value === "Individual" ? "P" : "G") + modality.value,
);

// Options
const sessionFormats: SelectOption[] = [
    { value: "Individual", label: "Individual" },
    { value: "Dupla", label: "Dupla" },
    { value: "Grupal", label: "Grupal" },
];

const sessionModalities: SelectOption[] = [
    { value: "P", label: "Presencial" },
    { value: "O", label: "Online" },
];

// API Calls
const {
    data: creditsData,
    pending: getCreditsLoading,
    refresh: getCredits,
} = await useFetch<APICreditsResponse>(
    `${config.public.apiBase}/student/credits/${user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
    },
);

const { data: plansResponse, pending: plansInformationLoading } = await useFetch<GetPlansResponse>(
    `${config.public.apiBase}/user/plans`,
    {
        method: "POST",
        body: {
            region: user.region,
            credit_type: creditType,
            format_credit: format,
        },
        watch: [creditType, format],
    },
);

const plansInformation = computed(() => ({
    selected: creditType.value,
    plans: plansResponse.value?.plans || [],
}));

// Methods
const handleOpenConfirmationModal = (planId: number) => {
    selectedPlan.value =
        plansInformation.value.plans.find((plan) => plan.plan_id === planId) || null;
    confirmationModal.value?.openModal();
};

const handleCloseConfirmationModal = () => {
    confirmationModal.value?.closeModal();
    selectedPlan.value = null;
};

const handleOpenDetailsModal = (credit: Credit) => {
    selectedCredit.value = credit;
    detailsModal.value?.openModal();
};

const handleCloseDetailsModal = () => {
    detailsModal.value?.closeModal();
};

const getFormattedCreditType = (creditType: string, creditFormat: string) => {
    if (creditType === "PP" && creditFormat === "Dupla") return "Personalizado Presencial Dupla";
    if (creditType === "PP") return "Personalizado Presencial";
    if (creditType === "GP") return "Grupal Presencial";
    if (creditType === "PO" && creditFormat === "Dupla") return "Personalizado Online Dupla";
    if (creditType === "PO") return "Personalizado Online";
    if (creditType === "GO") return "Grupal Online";
    return "";
};

const getCreditTypeIcon = (creditType: string, formatCredit: string) => {
    const icons = {
        person:
            formatCredit === "Dupla"
                ? "material-symbols:supervisor-account-rounded"
                : formatCredit === "Grupal"
                  ? "mdi:account-multiple-plus"
                  : "ion:person",
        activity: creditType.endsWith("O")
            ? "material-symbols:laptop-mac-outline"
            : "mdi:weight-lifter",
    };
    return icons;
};

const buyPlan = async () => {
    if (!selectedPlan.value) return;

    buyPlanLoading.value = true;

    try {
        if (selectedPlan.value.format_credit === "Dupla" && dupla.value.length < 1) {
            throw new Error("Debes seleccionar un beneficiario para el plan dupla");
        }

        const userIds = [user?.user_id];
        if (selectedPlan.value.format_credit === "Dupla") {
            userIds.push(dupla.value[0].user_id);
        }

        const response = await $fetch<APIPaymentCreateResponse>("/api/payment/createPayment", {
            method: "POST",
            body: {
                email: user?.email,
                user_ids: userIds,
                plan_id: selectedPlan.value.plan_id,
            },
        });

        if (response.success) {
            paymentStore.setFlowTransaction({
                user_id: user?.user_id || 0,
                plan_id: selectedPlan.value.plan_id,
                flowOrder: response.flowOrder,
            });

            await navigateTo(response.url, { external: true });
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        toast.error(
            error instanceof Error
                ? error.message
                : "Ocurrió un error al intentar realizar la compra",
        );
    } finally {
        buyPlanLoading.value = false;
        handleCloseConfirmationModal();
    }
};
</script>

<style scoped>
.custom-grid > :nth-child(odd) {
    justify-self: end;
    max-width: 300px;
    text-align: right;
}

.custom-grid > :nth-child(even) {
    justify-self: start;
    max-width: 300px;
    text-align: left;
}
</style>
