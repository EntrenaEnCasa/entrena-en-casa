<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full">
                    <CommonLoading v-if="props.student === null || plansLoading" />
                    <div v-else>
                        <div
                            class="mx-auto my-5 grid w-10/12 grid-cols-1 place-items-center justify-center gap-5 text-center lg:grid-cols-2 lg:text-start"
                        >
                            <div class="space-y-2 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p
                                    class="text-2xl font-medium text-gray-700"
                                    v-if="student && student?.first_name"
                                >
                                    {{ student?.first_name }}
                                    {{ student?.last_name }}
                                </p>
                                <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                            </div>

                            <div class="space-y-2 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="break-all text-2xl font-medium text-gray-700">
                                    {{ student?.email }}
                                </p>
                            </div>
                        </div>
                        <div class="mb-5 mt-8 w-full px-8">
                            <div class="flex items-center justify-between">
                                <h3 class="mx-auto mb-1 text-2xl font-medium">Planes</h3>
                            </div>
                            <div v-if="plans.length > 0" class="overflow-x-auto">
                                <table
                                    class="mb-4 table-auto bg-white text-left text-sm text-gray-500"
                                >
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-4 font-medium"></th>
                                            <th scope="col" class="px-6 py-4 font-medium">
                                                Sesiones restantes
                                            </th>
                                            <th scope="col" class="px-6 py-4 font-medium">
                                                Tipo de Plan
                                            </th>
                                            <th scope="col" class="px-6 py-4 font-medium">
                                                Fecha de expiración
                                            </th>
                                            <th scope="col" class="px-6 py-4 font-medium"></th>
                                                                                        <th scope="col" class="px-6 py-4 font-medium"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b" v-for="credit in plans">
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <div
                                                    v-if="
                                                        credit.credit_type === 'PP' &&
                                                        credit.format_credit === 'Dupla'
                                                    "
                                                >
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon
                                                            name="material-symbols:supervisor-account-rounded"
                                                            class="text-3xl"
                                                        />
                                                        <Icon
                                                            name="mdi:weight-lifter"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="
                                                        credit.credit_type === 'PP' &&
                                                        credit.format_credit === 'Individual'
                                                    "
                                                >
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon name="ion:person" class="text-2xl" />
                                                        <Icon
                                                            name="mdi:weight-lifter"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GP'">
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon
                                                            name="mdi:account-multiple-plus"
                                                            class="text-2xl"
                                                        />
                                                        <Icon
                                                            name="mdi:weight-lifter"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="
                                                        credit.credit_type === 'PO' &&
                                                        credit.format_credit === 'Dupla'
                                                    "
                                                >
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon
                                                            name="material-symbols:supervisor-account-rounded"
                                                            class="text-2xl"
                                                        />
                                                        <Icon
                                                            name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="
                                                        credit.credit_type === 'PO' &&
                                                        credit.format_credit === 'Individual'
                                                    "
                                                >
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon name="ion:person" class="text-2xl" />
                                                        <Icon
                                                            name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GO'">
                                                    <div class="whitespace-nowrap text-secondary">
                                                        <Icon
                                                            name="mdi:account-multiple-plus"
                                                            class="text-2xl"
                                                        />
                                                        <Icon
                                                            name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ credit.available_credits }} /
                                                {{ credit.available_credits + credit.used_credits }}
                                                sesiones
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <div v-if="credit.credit_type === 'PO'">
                                                    <p>
                                                        Personalizado
                                                        {{ credit.format_credit }}
                                                        Online
                                                    </p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'PP'">
                                                    <p>
                                                        Personalizado
                                                        {{ credit.format_credit }}
                                                        Presencial
                                                    </p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GO'">
                                                    <p>Grupal Online</p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GP'">
                                                    <p>Grupal Presencial</p>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap px-6 py-4">
                                                <p>
                                                    {{ credit.expiration_date }}
                                                </p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <button
                                                    @click="openModalModifyPlan(credit)"
                                                    class="rounded-full bg-secondary px-4 py-2 font-medium text-white"
                                                >
                                                    Modificar
                                                </button>
                                            </td>
                                            <td class="px-6 py-6">
                                                <button v-show="credit.available_credits > 0"
                                                    @click="openDeleteModal(credit.transaction_id)"
                                                    class="rounded-full bg-red-500 px-4 py-2 font-medium text-white"
                                                >
                                                    Eliminar Compra
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>
                                <h3 class="text-center">
                                    Este estudiante no tiene planes contratados
                                </h3>
                            </div>
                        </div>
                        <div class="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:justify-center">
                            <CommonButton
                                bg-color="tertiary"
                                class="px-4 py-2"
                                @click="closeModal()"
                            >
                                Cancelar
                            </CommonButton>
                            <CommonButton class="px-4 py-2" @click="goToAddPlan()">
                                Agregar Plan
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <AdminDashboardStudentsModifyPlanModal
            ref="modifyPlan"
            :student="student"
            :plan="planToModify"
        />
        <Teleport to="body">
                    <CommonModal ref="modalDelete">
                        <div class="p-4 text-center">
                            <div class="mb-4">
                                <h3 class="mb-2 font-semibold">
                                    ¿Estas seguro/a de eliminar esta compra? Se consumirán todos los créditos.
                                </h3>
                            </div>
                            <div class="flex flex-col gap-4 lg:flex-row lg:justify-center">
                                <div>
                                    <CommonButton
                                        bg-color="tertiary"
                                        class="px-4 py-2"
                                        @click="closeDeleteModal()"
                                    >
                                        Cancelar
                                    </CommonButton>
                                </div>
                                <div>
                                    <CommonButton class="px-4 py-2 bg-secondary" @click="deletePurchase()">
                                        Si, estoy seguro/a
                                    </CommonButton>
                                </div>
                            </div>
                        </div>
                    </CommonModal>
                </Teleport>
        <AdminDashboardStudentsAddPlanModal ref="addPlan" :student="student" />
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'vue-toastification'
const modal = ref<Modal | null>(null);
const deleteTransaction = ref(0);
const runtimeConfig = useRuntimeConfig();

const openModal = () => {
    modal.value?.openModal();
};

const closeModal = () => {
    modal.value?.closeModal();
};

// Use as a function to get the toast instance
const toast = useToast();


const modalDelete = ref<Modal | null>(null);

const openDeleteModal = (transaction_id: number) => {
    deleteTransaction.value = transaction_id;
    modalDelete.value?.openModal();
};

const closeDeleteModal = () => {
    if (modalDelete.value) {
        modalDelete.value.closeModal();
    }
    deleteTransaction.value = 0;
};
const deletePurchase = async () => {
    try{
     const response = await $fetch<APIResponse>(
        `${runtimeConfig.public.apiBase}/admin/purchase/consume`,
        {
            method: "POST",
            credentials: "include",
            body: {
                transaction_id: deleteTransaction.value,
            },
        },
    );
    if (response.success) {
        toast.success("Compra deshabilitada");
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error("Error al deshabilitar compra");
    }
    }
    catch{
        toast.error("Error al deshabilitar compra");
    }
    finally{
        if (modalDelete.value) {
            modalDelete.value.closeModal();
        }
    }
}

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
    plans: Plan[];
    plansLoading: boolean;
}>();

const modifyPlan = ref<Modal | null>(null);
const planToModify = ref<Plan | null>(null);
const addPlan = ref<Modal | null>(null);

const goToAddPlan = () => {
    modal.value?.closeModal();
    addPlan.value?.openModal();
};

const openModalModifyPlan = (credit: Plan) => {
    modal.value?.closeModal();
    modifyPlan.value?.openModal();
    planToModify.value = credit;
};
defineExpose({
    openModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal
});
</script>
