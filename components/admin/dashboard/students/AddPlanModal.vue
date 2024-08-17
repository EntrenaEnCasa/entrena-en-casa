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
                            <p class="text-2xl font-medium text-gray-700 break-all">
                                {{ student?.email }}
                            </p>
                        </div>
                    </div>
                    <div class="overflow-hidden lg:w-full px-10">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="mx-auto text-2xl">Agregar Plan</h3>
                        </div>
                        <div>
                            <form class="flex flex-col items-center justify-center">
                                <div class="flex flex-col items-center w-full py-5">
                                    <label for="plan" class="text-gray-500 text-left w-full mb-2"
                                        >Tipo de Plan</label
                                    >
                                    <select
                                        v-model="selectedPlan"
                                        id="plan"
                                        class="w-full px-5 py-3 border border-gray-200 rounded-lg outline-none">
                                        <option value="0" disabled selected>
                                            Selecciona un plan
                                        </option>
                                        <option v-for="plan in plans" :value="plan.plan_id">
                                            {{ formatPlan(plan.credit_type) }} -
                                            {{ plan.credit_quantity }} créditos
                                        </option>
                                    </select>
                                </div>
                            </form>
                            <div v-show="selectedPlan !== 0">
                                <table class="bg-white table-auto text-sm text-center mx-auto mb-7">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="font-medium"></th>
                                            <th scope="col" class="font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="selectedPlanData">
                                        <tr>
                                            <td class="px-6 py-2">
                                                <div
                                                    class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5 items-center">
                                                    <p class="font-light text-right">Plan</p>
                                                    <p class="font-bold text-left">
                                                        {{
                                                            formatPlan(selectedPlanData.credit_type)
                                                        }}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                class="grid grid-cols-2 w-4/6 mx-auto gap-5 items-center mb-5">
                                                <p class="font-light text-right">
                                                    Cantidad de sesiones
                                                </p>
                                                <div class="flex items-center">
                                                    <div
                                                        v-if="
                                                            selectedPlanData.credit_type === 'PP'
                                                        ">
                                                        <div class="text-primary whitespace-nowrap">
                                                            <Icon
                                                                name="ion:person"
                                                                class="text-2xl" />
                                                            <Icon
                                                                name="mdi:weight-lifter"
                                                                class="text-3xl" />
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-else-if="
                                                            selectedPlanData.credit_type === 'GP'
                                                        ">
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
                                                            selectedPlanData.credit_type === 'PO'
                                                        ">
                                                        <div class="text-primary whitespace-nowrap">
                                                            <Icon
                                                                name="ion:person"
                                                                class="text-2xl" />
                                                            <Icon
                                                                name="material-symbols:laptop-mac-outline"
                                                                class="text-3xl" />
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-else-if="
                                                            selectedPlanData.credit_type === 'GO'
                                                        ">
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
                                                        {{ selectedPlanData?.credit_quantity }}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-2">
                                                <div
                                                    class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5 items-center">
                                                    <p class="font-light text-right">
                                                        Tiempo máximo para utilizar sesiones
                                                    </p>
                                                    <p class="font-bold text-left">
                                                        {{ selectedPlanData?.expiration_time }}
                                                        días
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <CommonButton bg-color="tertiary" class="px-4 py-2" @click="closeModal()">
                            Cancelar
                        </CommonButton>
                        <CommonButton class="px-4 py-2" @click="addPlan"> Confirmar </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
const modal = ref<Modal | null>(null);
import { useToast } from "vue-toastification";
const toast = useToast();

interface PlansResponse extends APIResponse {
    plans: Plan[];
}
const runtimeConfig = useRuntimeConfig();

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    enabled: boolean;
    region: number;
}

interface Plan {
    plan_id: number;
    region: string;
    credit_type: string;
    format_credit: string;
    expiration_time: number;
    price: number;
    credit_quantity: number;
    description: string;
}

const selectedPlan = ref<number>(0);
const addPlanLoading = ref(false);
const selectedPlanData = ref<Plan | null>();

const props = defineProps<{
    student: Student | null;
}>();

const openModal = () => {
    modal.value?.openModal();
};

const closeModal = () => {
    modal.value?.closeModal();
    selectedPlan.value = 0;
};

defineExpose({
    openModal,
});

const plans = ref<Plan[]>([]);
const plansLoading = ref<boolean>(false);

const getPlans = async () => {
    plansLoading.value = true;
    try {
        const region = props.student?.region;
        const response = await $fetch<PlansResponse>(
            `${runtimeConfig.public.apiBase}/admin/plans/${region}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (response.success) {
            plans.value = response.plans;
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        plansLoading.value = false;
    }
};

const addPlan = async () => {
    addPlanLoading.value = true;

    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/credits`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: [props.student?.user_id],
                    plan_id: selectedPlan.value,
                }),
            }
        );

        if (!response.success) {
            toast.error(response.message);
        } else {
            toast.success("Plan añadido exitosamente");
        }
    } catch (error) {
        console.error(error);
    } finally {
        addPlanLoading.value = false;
        closeModal();
    }
};

const formatPlan = (creditType: string) => {
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

watch(
    selectedPlan,
    (newSelectedPlan) => {
        selectedPlanData.value = plans.value.find((plan) => plan.plan_id === newSelectedPlan);
    },
    { immediate: true }
);

watch(
    () => props.student,
    async (newStudent) => {
        if (newStudent) {
            console.log(newStudent);
            await getPlans();
        }
    }
);
</script>
