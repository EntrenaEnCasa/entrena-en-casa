<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full ">
                    <CommonLoading v-if="props.student === null || plansLoading" />
                    <div v-else>
                        <div
                            class="text-center lg:text-start grid grid-cols-1 place-items-center justify-center lg:grid-cols-2 mb-8 w-10/12 mx-auto mt-5">
                            <div class="mb-5 space-y-2 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p class="text-3xl font-medium text-gray-700" v-if="student && student?.first_name">{{
                        student?.first_name }} {{ student?.last_name }}</p>
                                <p class="text-3xl font-medium text-gray-700" v-else>Sin datos </p>
                            </div>

                            <div class="mb-5 space-y-2 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="text-3xl font-medium text-gray-700">{{ student?.email }}</p>
                            </div>
                        </div>
                        <div class="w-full px-8">
                            <div class="flex justify-between items-center ">
                                <h3 class=" mx-auto text-3xl">Planes</h3>
                            </div>
                            <div class="overflow-x-auto ">
                                <table class="bg-white table-auto text-sm text-left text-gray-500 mb-7">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">

                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Sesiones restantes
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Tipo de Plan
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Fecha de expiración
                                            </th>
                                            <th scope="col" class="p-6 font-medium">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr class="border-b " v-for="credit in plans">
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                <div
                                                    v-if="credit.credit_type === 'PP' && credit.format_credit === 'Dupla'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="material-symbols:supervisor-account-rounded"
                                                            class="text-3xl" />
                                                        <Icon name="mdi:weight-lifter" class="text-3xl" />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="credit.credit_type === 'PP' && credit.format_credit === 'Individual'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="ion:person" class="text-2xl" />
                                                        <Icon name="mdi:weight-lifter" class="text-3xl" />
                                                    </div>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GP'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="mdi:account-multiple-plus" class="text-2xl" />
                                                        <Icon name="mdi:weight-lifter" class="text-3xl" />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="credit.credit_type === 'PO' && credit.format_credit === 'Dupla'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="material-symbols:supervisor-account-rounded"
                                                            class="text-2xl" />
                                                        <Icon name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl" />
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="credit.credit_type === 'PO' && credit.format_credit === 'Individual'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="ion:person" class="text-2xl" />
                                                        <Icon name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl" />
                                                    </div>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GO'">
                                                    <div class="text-secondary whitespace-nowrap">
                                                        <Icon name="mdi:account-multiple-plus" class="text-2xl" />
                                                        <Icon name="material-symbols:laptop-mac-outline"
                                                            class="text-3xl" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ credit.available_credits }} / {{ credit.available_credits +
                        credit.used_credits }} sesiones
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                <div v-if="credit.credit_type === 'PO'">
                                                    <p>Personalizado {{ credit.format_credit }} Online</p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'PP'">
                                                    <p>Personalizado {{ credit.format_credit }} Presencial</p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GO'">
                                                    <p>Grupal Online</p>
                                                </div>
                                                <div v-else-if="credit.credit_type === 'GP'">
                                                    <p>Grupal Presencial</p>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <p>{{ credit.expiration_date }}</p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <button @click="openModalModifyPlan(credit)"
                                                    class="px-4 py-2 bg-secondary text-white rounded-full font-medium">
                                                    Modificar
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="flex justify-between">
                            <CommonButton bg-color="tertiary" class="px-4 py-2" @click="closeModal()">
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
        <AdminDashboardStudentsModifyPlanModal ref="modifyPlan" :student="student" :plan="planToModify" />
        <AdminDashboardStudentsAddPlanModal ref="addPlan" :student="student" />
    </div>
</template>
<script setup lang="ts">

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
}

const closeModal = () => {
    modal.value?.closeModal();
}

defineExpose({
    openModal
})

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
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
}

const openModalModifyPlan = (credit: Plan) => {
    modal.value?.closeModal();
    modifyPlan.value?.openModal();
    planToModify.value = credit;
}
</script>