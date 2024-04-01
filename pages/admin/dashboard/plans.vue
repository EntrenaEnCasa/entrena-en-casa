<template>
    <div>
        <div class="mb-4 flex justify-between">
            <h3 class="text-xl font-medium">Planes</h3>
            <CommonButton @click="openModalCreatePlan" bg-color="primary" class="px-4 py-2 rounded-md text-white">
                Crear Plan
            </CommonButton>
        </div>
        <CommonLoading v-if="plansDataPending" />
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="bg-white w-full table-auto text-sm text-left text-gray-500" v-if="!plansDataPending && data">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" class="p-6">Sesiones</th>
                        <th scope="col" class="p-6">Tipo</th>
                        <th scope="col" class="p-6">Formato</th>
                        <th scope="col" class="p-6">Región</th>
                        <th scope="col" class="p-6">Expiración</th>
                        <th scope="col" class="p-6">Precio</th>
                        <th scope="col" class="p-6"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plan in data?.plans" class="border-b" :key="plan.plan_id">
                        <td class="px-6 py-4 whitespace-nowrap ">
                            {{ plan.credit_quantity }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                            <div v-if="plan.credit_type === 'PP'">
                                Personalizado Presencial
                            </div>
                            <div v-else-if="plan.credit_type === 'PO'">
                                Personalizado Online
                            </div>
                            <div v-else-if="plan.credit_type === 'GP'">
                                Grupal Presencial
                            </div>
                            <div v-else-if="plan.credit_type === 'GO'">
                                Grupal Online
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                            {{ plan.format_credit }}
                        </td>
                        <td class="px-6 py-4 ">
                            <div v-for="region in plan.regions">
                                {{ formatRegion(region) }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                            {{ plan.expiration_time }} días
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                            {{ plan.formattedPrice }}
                        </td>
                        <td class=" h-full px-5">
                            <button
                                class="px-4 py-1.5 bg-primary text-white my-auto rounded-md font-medium whitespace-nowrap "
                                @click="openPlanModal(plan)">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <AdminDashboardPlansInfoModal ref="planInfoModal" :plan="currentPlan" />
        <AdminDashboardPlansCreatePlanModal ref="createPlanModal" />
    </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

interface planAPIResponse extends APIResponse {
    plans: Plan[];
}

const currentPlan = ref<Plan | null>(null);

interface Plan {
    plan_id: number;
    credit_type: string;
    format_credit: string;
    expiration_time: number;
    price: number
    formattedPrice: string;
    credit_quantity: number;
    description: string;
    regions: number[];
}
const planInfoModal = ref<Modal | null>(null);
const createPlanModal = ref<Modal | null>(null);

const openModalCreatePlan = () => {
    createPlanModal.value?.openModal();
};

const openPlanModal = (plan: Plan) => {
    currentPlan.value = plan;
    planInfoModal.value?.openModal();
};


const formatRegion = (region: number) => {
    switch (region) {
        case 0:
            return 'Todas las regiones';
        case 1:
            return 'Tarapacá';
        case 2:
            return 'Antofagasta';
        case 3:
            return 'Atacama';
        case 4:
            return 'Coquimbo';
        case 5:
            return 'Valparaíso';
        case 6:
            return 'Libertador General Bernardo O\'Higgins';
        case 7:
            return 'Maule';
        case 8:
            return 'Bío Bío';
        case 9:
            return 'Araucanía';
        case 10:
            return 'Los Lagos';
        case 11:
            return 'Aisén del General Carlos Ibañez del Campo';
        case 12:
            return 'Magallanes y de la Antártica Chilena';
        case 13:
            return 'Región Metropolitana de Santiago';
        case 14:
            return 'Los Ríos';
        case 15:
            return 'Arica y Parinacota';
        case 16:
            return 'Ñuble';
        default:
            return 'Sin datos';
    }
};

const { data, pending: plansDataPending, error } = await useFetch<planAPIResponse>(`${runtimeConfig.public.apiBase}/admin/plans`, {
    method: "GET",
    credentials: "include",
    lazy: true
});

</script>