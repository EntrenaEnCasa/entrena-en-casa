<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full text-center">
                    <div
                        class="text-center lg:text-start grid grid-cols-1 place-items-center justify-center lg:grid-cols-2 mb-8 w-10/12 mx-auto mt-5">
                        <div class="mb-5 space-y-2 px-1">
                            <h3 class="text-gray-500">Nombre</h3>
                            <p
                                class="text-2xl font-medium text-gray-700"
                                v-if="student?.first_name">
                                {{ student?.first_name }}
                                {{ student?.last_name }}
                            </p>
                            <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                        </div>

                        <div class="mb-5 space-y-2 px-1">
                            <h3 class="text-gray-500">Correo electrónico</h3>
                            <p class="text-2xl font-medium text-gray-700">
                                {{ student?.email }}
                            </p>
                        </div>
                    </div>
                    <div class="overflow-hidden lg:w-full px-10">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="mx-auto text-2xl">Modificar Plan</h3>
                        </div>
                        <table
                            class="bg-white table-auto text-sm text-center mx-auto mb-7"
                            v-if="plan">
                            <thead class="text-gray-400">
                                <tr>
                                    <th scope="col" class="font-medium"></th>
                                    <th scope="col" class="font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-6 py-2">
                                        <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                            <p class="font-light text-right">Plan</p>
                                            <p class="font-bold text-left">
                                                {{
                                                    getFormattedCreditType(
                                                        plan.credit_type,
                                                        plan.format_credit
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="grid grid-cols-2 w-4/6 mx-auto gap-5 mb-5">
                                        <p class="font-light text-right">
                                            Cantidad de sesiones compradas
                                        </p>
                                        <div class="flex items-center">
                                            <div
                                                v-if="
                                                    plan.credit_type === 'PP' &&
                                                    plan.format_credit === 'Dupla'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="material-symbols:supervisor-account-rounded"
                                                        class="text-3xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PP' &&
                                                    plan.format_credit === 'Individual'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon name="ion:person" class="text-2xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div v-else-if="plan.credit_type === 'GP'">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="mdi:account-multiple-plus"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PO' &&
                                                    plan.format_credit === 'Dupla'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="material-symbols:supervisor-account-rounded"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PO' &&
                                                    plan.format_credit === 'Individual'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon name="ion:person" class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div v-else-if="plan.credit_type === 'GO'">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="mdi:account-multiple-plus"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <p class="font-bold ml-3">
                                                {{ plan?.available_credits + plan?.used_credits }}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="grid grid-cols-2 w-4/6 mx-auto gap-5 mb-5">
                                        <p class="font-light text-right">
                                            Cantidad de créditos restantes disponibles
                                        </p>
                                        <div class="flex items-center">
                                            <div
                                                v-if="
                                                    plan.credit_type === 'PP' &&
                                                    plan.format_credit === 'Dupla'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="material-symbols:supervisor-account-rounded"
                                                        class="text-3xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PP' &&
                                                    plan.format_credit === 'Individual'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon name="ion:person" class="text-2xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div v-else-if="plan.credit_type === 'GP'">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="mdi:account-multiple-plus"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="mdi:weight-lifter"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PO' &&
                                                    plan.format_credit === 'Dupla'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="material-symbols:supervisor-account-rounded"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div
                                                v-else-if="
                                                    plan.credit_type === 'PO' &&
                                                    plan.format_credit === 'Individual'
                                                ">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon name="ion:person" class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <div v-else-if="plan.credit_type === 'GO'">
                                                <div class="text-primary whitespace-nowrap">
                                                    <Icon
                                                        name="mdi:account-multiple-plus"
                                                        class="text-2xl" />
                                                    <Icon
                                                        name="material-symbols:laptop-mac-outline"
                                                        class="text-3xl" />
                                                </div>
                                            </div>
                                            <p class="font-bold ml-3">
                                                {{ plan?.available_credits }}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-2">
                                        <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                            <p class="font-light text-right">
                                                Fecha de expiración actual
                                            </p>
                                            <p class="font-bold text-left">
                                                {{ formatDate(plan?.expiration_date) }}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-2">
                                        <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                            <p class="font-light text-right">
                                                Fecha de expiración actual
                                            </p>
                                            <form>
                                                <input
                                                    type="date"
                                                    class="form-input"
                                                    v-model="newExpirationDate" />
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-between">
                        <CommonButton bg-color="tertiary" class="px-4 py-2" @click="closeModal()">
                            Cancelar
                        </CommonButton>
                        <CommonButton class="px-4 py-2" @click="modifyPlan()">
                            Continuar
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
const modal = ref<Modal | null>(null);
const runtimeConfig = useRuntimeConfig();
import { useToast } from "vue-toastification";
const toast = useToast();

const newExpirationDate = ref(null as string | null);

const modifyPlanLoading = ref(false);

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    enabled: boolean;
    region: number;
}

interface Plan {
    transaction_id: number;
    credit_type: string;
    format_credit: string;
    used_credits: number;
    available_credits: number;
    expiration_date: string;
}

const props = defineProps<{
    student: Student | null;
    plan: Plan | null;
}>();

const openModal = () => {
    modal.value?.openModal();
    newExpirationDate.value = props.plan?.expiration_date ?? "";
};

const closeModal = () => {
    cleanExpirationDate();
    modal.value?.closeModal();
};

const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

defineExpose({
    openModal,
});

const cleanExpirationDate = () => {
    newExpirationDate.value = "";
};

const modifyPlan = async () => {
    modifyPlanLoading.value = true;
    const planId = props.plan?.transaction_id ?? 0;

    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/credits/expiration`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transaction_id: planId,
                    expiration_date: newExpirationDate.value,
                }),
            }
        );

        if (!response.success) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        modifyPlanLoading.value = false;
        closeModal();
    }
};

const getFormattedCreditType = (creditType: string, creditFormat: string) => {
    if (creditType === "PP" && creditFormat === "Dupla") {
        return "Personalizado Presencial Dupla";
    }
    if (creditType === "PP") {
        return "Personalizado Presencial";
    }
    if (creditType === "GP") {
        return "Grupal Presencial";
    }
    if (creditType === "PO" && creditFormat === "Dupla") {
        return "Personalizado Online Dupla";
    }
    if (creditType === "PO") {
        return "Personalizado Online";
    }
    if (creditType === "GO") {
        return "Grupal Online";
    }
};

watch(
    () => props.plan,
    (newPlan) => {
        newExpirationDate.value = newPlan?.expiration_date ?? "";
    },
    { immediate: true }
);
</script>
