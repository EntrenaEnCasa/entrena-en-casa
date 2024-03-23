<template>
    <div class="relative grid gap-y-10">
        <h3 class="text-xl font-semibold ">Compra de sesiones</h3>
        <div class="grid gap-2">
            <div class="text-secondary flex justify-end items-center">
                <p class="text-sm mr-1 font-medium">¿Qué significa cada sesión?</p>
                <Icon name="fa6-solid:circle-info" />
            </div>
            <div class="bg-white flex flex-col items-center py-6 px-8 rounded-xl border"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <h5 class="text-xl font-medium text-center mb-5">Sesiones compradas</h5>
                <div>
                    <CommonLoading v-show="getCreditsLoading" />
                    <div v-show="!getCreditsLoading && creditsData && creditsData.credits.length > 0"
                        class="grid grid-cols-1 xl:grid-cols-2 gap-2">
                        <div v-for="credit in creditsData?.credits"
                            class="flex flex-col md:flex-row items-center justify-between border rounded-xl p-5 gap-2 text-gray-400 font-medium w-full">
                            <template v-if="credit.credit_type === 'PP' && credit.format_credit === 'Dupla'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="material-symbols:supervisor-account-rounded" class="text-3xl" />
                                    <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Personalizado Presencial Dupla
                                </p>
                            </template>

                            <template v-else-if="credit.credit_type === 'PP'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="ion:person" class="text-2xl" />
                                    <Icon name="mdi:weight-lifter" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Personalizado Presencial</p>
                            </template>

                            <template v-else-if="credit.credit_type === 'GP'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="mdi:account-multiple-plus" class="text-2xl" />
                                    <Icon name="mdi:weight-lifter" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Grupal Presencial</p>
                            </template>

                            <template v-else-if="credit.credit_type === 'PO' && credit.format_credit === 'Dupla'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="material-symbols:supervisor-account-rounded" class="text-2xl" />
                                    <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Personalizado Online Dupla</p>
                            </template>

                            <template v-else-if="credit.credit_type === 'PO'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="ion:person" class="text-2xl" />
                                    <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Personalizado Online</p>
                            </template>

                            <template v-else-if="credit.credit_type === 'GO'">
                                <div class="text-secondary whitespace-nowrap">
                                    <Icon name="mdi:account-multiple-plus" class="text-2xl" />
                                    <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                                </div>
                                <p>{{ credit.available_credits }} sesiones restantes - Grupal Online</p>
                            </template>
                            <button class="text-secondary whitespace-nowrap" @click="handleOpenDetailsModal(credit)">
                                <span>
                                    Ver detalles
                                </span>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                    <div v-show="!getCreditsLoading && creditsData && creditsData.credits.length === 0">
                        <p>No tienes sesiones compradas</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <CommonButton @click="changeSelectedInformation('PP')"
                class="px-4 py-2 rounded-lg font-medium w-full outline"
                :class="plansInformation.selected === 'PP' ? ' outline-primary-600' : 'outline-transparent'">
                <div class="flex items-center justify-center gap-2">
                    <div>
                        <Icon name="ion:person" class="text-2xl" />
                        <Icon name="mdi:weight-lifter" class="text-3xl" />
                    </div>
                    <div class="flex flex-col items-start">
                        <span>
                            Personalizado
                        </span>
                        <span>
                            Presencial
                        </span>
                    </div>
                </div>
            </CommonButton>
            <CommonButton @click="changeSelectedInformation('GP')" class="px-4 py-2 rounded-lg font-medium outline"
                :class="plansInformation.selected === 'GP' ? ' outline-primary-600' : 'outline-transparent'">
                <div class="flex items-center justify-center gap-2">
                    <div>
                        <Icon name="mdi:account-multiple-plus" class="text-3xl" />
                        <Icon name="mdi:weight-lifter" class="text-3xl" />
                    </div>
                    <div class="flex flex-col items-start">
                        <span>
                            Grupal
                        </span>
                        <span>
                            Presencial
                        </span>
                    </div>
                </div>
            </CommonButton>
            <CommonButton @click="changeSelectedInformation('PO')" bg-color="secondary"
                class="px-4 py-2 rounded-lg text-white font-medium outline"
                :class="plansInformation.selected === 'PO' ? ' outline-secondary-600' : 'outline-transparent'">
                <div class="flex items-center justify-center gap-2">
                    <div class="space-x-2">
                        <Icon name="ion:person" class="text-2xl" />
                        <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                    </div>
                    <div class="flex flex-col items-start">
                        <span>
                            Personalizado
                        </span>
                        <span>
                            Online
                        </span>
                    </div>
                </div>
            </CommonButton>
            <CommonButton @click="changeSelectedInformation('GO')" bg-color="secondary"
                class="px-4 py-2 rounded-lg font-medium outline"
                :class="plansInformation.selected === 'GO' ? ' outline-secondary-600' : 'outline-transparent'">
                <div class="flex items-center justify-center gap-2">
                    <div class="space-x-1">
                        <Icon name="mdi:account-multiple-plus" class="text-3xl" />
                        <Icon name="material-symbols:laptop-mac-outline" class="text-3xl" />
                    </div>
                    <div class="flex flex-col items-start">
                        <span>
                            Grupal
                        </span>
                        <span>
                            Online
                        </span>
                    </div>
                </div>
            </CommonButton>
        </div>
        <CommonLoading v-show="plansInformationLoading" />
        <div v-show="!plansInformationLoading" class="overflow-auto">
            <div class="grid grid-cols-6 items-end mb-5 gap-5 min-w-[900px]">
                <div class="col-span-2">
                    Descripción
                </div>
                <div class="">
                    Duración
                </div>
                <div class="">
                    Sesiones totales
                </div>
                <div class="">
                    Valor
                </div>
                <div class=""></div>
                <div v-show="plansInformation.plans.length > 0" v-for="plan, index in plansInformation.plans"
                    :key="index"
                    class="col-span-6 border rounded-lg px-6 py-4 bg-white grid grid-cols-6 gap-5 items-center">
                    <div class="col-span-2">
                        {{ plan.description }}
                    </div>
                    <div>
                        {{ plan.expiration_time }}
                    </div>
                    <div>
                        {{ plan.credit_quantity }}
                    </div>
                    <div class="text-lg font-medium text-secondary">
                        {{ plan.formattedPrice }}
                    </div>
                    <div>
                        <button @click="handleOpenConfirmationModal(plan.plan_id)"
                            class="px-4 py-2 bg-primary text-white rounded-md font-medium">
                            Comprar
                        </button>
                    </div>
                </div>
                <div v-show="plansInformation.plans.length === 0" class="col-span-6 mt-10">
                    <h3 class="col-span-6 text-lg text-center text-gray-700">No hay información disponible</h3>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="confirmationModal">
                <div class="px-5 py-2">
                    <h3 class="text-xl font-semibold mb-6 text-center">Detalles del tu compra</h3>
                    <div class="text-center">
                        <div v-if="selectedPlan" class="grid custom-grid items-center grid-cols-2 gap-4">
                            <p>Plan </p>
                            <p class="font-semibold">{{ getFormattedCreditType(selectedPlan.credit_type,
                        selectedPlan.format_credit)
                                }}</p>
                            <p>Cantidad de sesiones</p>
                            <p class="font-semibold">{{ selectedPlan.credit_quantity }}</p>
                            <p>Tiempo máximo para utilizar sesiones</p>
                            <p class="font-semibold">{{ selectedPlan.expiration_time }}</p>

                            <template v-if="selectedPlan.format_credit === 'Dupla'">
                                <p>Condiciones extra</p>
                                <p class="font-semibold">Ambas personas deberán entrenar juntas todas las sesiones.</p>
                                <p>Beneficiario plan dupla</p>
                                <StudentDashboardCreditsStudentSearch v-model:clients="dupla" />
                            </template>
                            <p class="text-xl font-semibold mt-3">Valor a pagar</p>
                            <h4 class="text-secondary font-bold text-2xl mt-3">{{ selectedPlan.formattedPrice }}</h4>
                        </div>
                        <div class="flex justify-between mt-6">
                            <CommonButton class="px-4 py-2" bg-color="tertiary" @click="handleCloseConfirmationModal">
                                Cancelar
                            </CommonButton>
                            <CommonButton class="px-4 py-2" @click="buyPlan" :loading="buyPlanLoading">
                                Comprar plan
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <Teleport to="body">
            <CommonModal ref="detailsModal">
                <div class="px-5 py-2">
                    <h3 class="text-xl font-semibold mb-6 text-center">Detalles</h3>
                    <div class="text-center">
                        <h4 class="font-semibold text-lg mb-4">Tu compra</h4>
                        <div v-if="selectedCredit" class="grid custom-grid items-center grid-cols-2 gap-4">
                            <p>Plan </p>
                            <p class="font-semibold">{{ getFormattedCreditType(selectedCredit.credit_type,
                        selectedCredit.format_credit) }}</p>
                            <p>Cantidad de sesiones compradas</p>
                            <p class="font-semibold">{{ selectedCredit.available_credits + selectedCredit.used_credits
                                }}
                            </p>
                            <p>Cantidad de créditos restantes disponibles</p>
                            <p class="font-semibold">{{ selectedCredit.available_credits }}</p>
                            <p>Fecha de expiración</p>
                            <p class="font-semibold">{{ selectedCredit.expiration_date }}</p>
                        </div>
                        <div class="flex justify-center mt-6">
                            <CommonButton class="px-10 py-2" bg-color="tertiary" @click="handleCloseDetailsModal">
                                Cerrar
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

    </div>
</template>

<style scoped>
.custom-grid> :nth-child(odd) {
    justify-self: end;
    max-width: 300px;
    text-align: right;
}

.custom-grid> :nth-child(even) {
    justify-self: start;
    max-width: 300px;
    text-align: left;
}
</style>

<script setup lang="ts">

import { usePaymentStore } from '~/stores/PaymentStore';
import { useUserStore } from '~/stores/UserStore';
import { useToast } from 'vue-toastification';

const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();
const paymentStore = usePaymentStore();
const toast = useToast();

const user = userStore.user as Student;

const selectedPlan = ref<Plan | null>(null); // This is the plan that the user selected to buy
const selectedCredit = ref<Credit | null>(null); // This is the credit that the user selected to see details
const buyPlanLoading = ref<boolean>(false);

const confirmationModal = ref<Modal | null>(null);
const detailsModal = ref<Modal | null>(null);

interface Client {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email: string;
}

const dupla = ref<Client[]>([]);

const plansInformation = reactive({
    selected: "PP",
    plans: [] as Plan[],
});

interface APIPlansResponse extends APIResponse {
    plans: Plan[];
}

interface Plan {
    plan_id: number;
    description: string;
    credit_type: 'PP' | 'GP' | 'PO' | 'GO';
    expiration_time: string;
    credit_quantity: number;
    format_credit: 'Personalizado' | 'Grupal' | 'Dupla';
    price: number;
    formattedPrice: string;
}

interface Credit {
    credit_type: string;
    format_credit: 'Personalizado' | 'Grupal' | 'Dupla';
    used_credits: number;
    available_credits: number;
    expiration_date: string; // ISO date string
}

interface APICreditsResponse extends APIResponse {
    credits: Credit[];
}

interface APIPaymentCreateResponse extends APIResponse {
    url: string;
    flowOrder: number;
}

const { data: creditsData, error: getCreditsError, pending: getCreditsLoading, refresh: getCredits } = await useFetch<APICreditsResponse>(`${runtimeConfig.public.apiBase}/student/credits/${user.user_id}`, {
    method: 'GET',
    credentials: 'include',
    onResponse({ response }) {
        let responseData = response._data;
        if (responseData.success) {
            console.log(responseData);
        } else {
            toast.error(responseData.message);
        }
    },
    lazy: true
})

const changeSelectedInformation = async (selected: string) => {
    plansInformation.selected = selected;
    getPlansInformation();
}

const setPlansInformation = (plans: Plan[]) => {
    const selected = plansInformation.selected;
    plansInformation.plans = plans.filter((plan) => plan.credit_type === selected);
}

const handleOpenConfirmationModal = (plan_id: number) => {
    selectedPlan.value = plansInformation.plans.find((plan) => plan.plan_id === plan_id) || null;
    confirmationModal.value?.openModal();
}

const handleCloseConfirmationModal = () => {
    confirmationModal.value?.closeModal();
    selectedPlan.value = null;
}

const handleOpenDetailsModal = (credit: Credit) => {
    selectedCredit.value = credit;
    detailsModal.value?.openModal();
}

const handleCloseDetailsModal = () => {
    detailsModal.value?.closeModal();
}

const getFormattedCreditType = (creditType: string, creditFormat: string) => {
    if (creditType === 'PP' && creditFormat === 'Dupla') {
        return "Personalizado Presencial Dupla";
    }
    if (creditType === 'PP') {
        return "Personalizado Presencial";
    }
    if (creditType === 'GP') {
        return "Grupal Presencial";
    }
    if (creditType === 'PO' && creditFormat === 'Dupla') {
        return "Personalizado Online Dupla";
    }
    if (creditType === 'PO') {
        return "Personalizado Online";
    }
    if (creditType === 'GO') {
        return "Grupal Online";
    }
}

const { pending: plansInformationLoading, refresh: getPlansInformation } = await useFetch<APIPlansResponse>(`${runtimeConfig.public.apiBase}/student/prices/${user.region}`, {
    method: 'GET',
    credentials: 'include',
    onResponse({ response }) {
        let responseData = response._data;
        if (responseData.success) {
            setPlansInformation(responseData.plans);
        } else {
            toast.error(responseData.message);
        }
    },
    lazy: true
})

const buyPlan = async () => {

    buyPlanLoading.value = true;

    if (selectedPlan.value == null) return;

    if (selectedPlan.value.format_credit === 'Dupla' && dupla.value.length < 1) {
        toast.error('Debes seleccionar un beneficiario para el plan dupla');
        buyPlanLoading.value = false;
        return;
    }

    let user_ids = [];
    const plan_id = selectedPlan.value.plan_id;
    user_ids.push(user.user_id);

    if (selectedPlan.value.format_credit === 'Dupla') {
        user_ids.push(dupla.value[0].user_id);
    }

    try {

        const body = {
            email: user.email,
            user_ids: user_ids,
            plan_id: plan_id,
        }

        const response = await $fetch<APIPaymentCreateResponse>(`/api/payment/createPayment`, {
            method: 'POST',
            body: body
        });

        if (response.success) {

            const flowTransaction = {
                user_id: userStore.user ? userStore.user.user_id : 0,
                plan_id: plan_id,
                flowOrder: response.flowOrder,
            }

            paymentStore.setFlowTransaction(flowTransaction);

            await navigateTo(response.url, {
                external: true
            });

        }
        else {
            toast.error(response.message);
        }
    }
    catch (error) {
        console.error(error);
        toast.error('Ocurrió un error intentar realizar la compra');
    }
    finally {
        buyPlanLoading.value = false;
        handleCloseConfirmationModal();
    }

}

</script>