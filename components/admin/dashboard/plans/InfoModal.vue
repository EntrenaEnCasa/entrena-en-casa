<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <CommonLoading v-if="loadingData" />
                <div v-else>
                    <h2 class="text-2xl text-center mb-5 font-semibold">
                        Detalle Plan
                    </h2>
                    <form v-if="newPlan" class="grid gap-5">
                        <div class="grid grid-cols-3 gap-10 items-center">
                            <label class="col-span-1 text-right" for=""
                                >Cantidad</label
                            >
                            <div class="flex items-center col-span-2 space-x-2">
                                <CommonInput
                                    type=" text"
                                    class="text-left"
                                    name="quantity"
                                    v-model="newPlan.credit_quantity" />
                                <span class="text-gray-500">sesiones</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-center">
                            <label class="col-span-1 text-right" for=""
                                >Tipo de sesión</label
                            >
                            <CommonSelect
                                v-model="newPlan.credit_type"
                                name="tipo"
                                id="tipo"
                                :options="creditTypeOptions" />
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-center">
                            <label class="col-span-1 text-right" for=""
                                >Formato</label
                            >
                            <CommonSelect
                                v-model="newPlan.format_credit"
                                name="format"
                                id="format"
                                :options="formatOptions" />
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-center">
                            <label class="col-span-1 text-right" for=""
                                >Expiración</label
                            >
                            <div class="flex items-center col-span-2 space-x-2">
                                <CommonInput
                                    type=" text"
                                    name="expiration"
                                    class="text-left"
                                    v-model="newPlan.expiration_time" />
                                <span class="text-gray-500">días</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-center">
                            <label class="col-span-1 text-right" for=""
                                >Precio</label
                            >
                            <div class="flex items-center col-span-2 space-x-2">
                                <span class="text-gray-500">$</span>
                                <CommonInput
                                    type=" text"
                                    class="text-left"
                                    name="price"
                                    v-model="newPlan.price" />
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-center pb-5">
                            <label class="col-span-1 text-right" for=""
                                >Descripción</label
                            >
                            <CommonTextarea
                                type=" text"
                                name="description"
                                class="w-4/5 h-12 col-span-2"
                                v-model="newPlan.description"></CommonTextarea>
                        </div>
                        <div class="grid grid-cols-3 gap-10 items-start pb-5">
                            <label class="col-span-1 text-right pt-3" for=""
                                >Region</label
                            >

                            <div class="col-span-2 grid gap-2">
                                <CommonSelect
                                    aria-multiselectable="true"
                                    v-model="selectedRegion"
                                    name="region"
                                    id="region"
                                    :options="regionOptions"
                                    @change="handleRegionChange" />
                                <div
                                    v-for="chip in chipsRegion"
                                    class="flex items-center">
                                    <span
                                        class="inline-flex items-left px-3 py-2 rounded-full text-xs font-medium bg-secondary text-white">
                                        <Icon
                                            @click="removeChip(chip)"
                                            class="text-lg mr-2 my-auto"
                                            name="fa6-solid:circle-xmark" />

                                        <span class="text-xs">
                                            {{ chip.label }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="flex justify-between gap-4 mt-5">
                        <CommonButton
                            @click="openModalDeletePlan"
                            bg-color="tertiary"
                            class="px-4 py-2 rounded-lg text-white font-medium outline"
                            >Borrar plan</CommonButton
                        >
                        <CommonButton
                            @click="updatePlan"
                            bg-color="primary"
                            class="px-4 py-2 rounded-lg text-white font-medium outline"
                            >Modificar plan
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
            <AdminDashboardPlansDeletePlanModal
                ref="deletePlanModal"
                :plan_id="plan_id" />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const plan_id = ref<number | null>(null);
const deletePlanModal = ref<Modal | null>(null);
const openModalDeletePlan = () => {
    if (props.plan) plan_id.value = props.plan?.plan_id;
    deletePlanModal.value?.openModal();
    modal.value?.closeModal();
};

const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const props = defineProps<{
    plan: Plan | null;
}>();

interface chip {
    value: number;
    label: string;
}
const loadingData = ref(true);
const chipsRegion = ref<chip[]>([]);
let selectedRegion = ref<number>(-1);

const handleRegionChange = () => {
    if (selectedRegion.value == 0) {
        for (const region of chipsRegion.value) {
            removeChip(region);
        }
    }
    const region = findOption(selectedRegion.value);
    if (region) {
        addChip(region);
    }
};
const regionOptions = [
    { value: 0, label: "Todas las regiones" },
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
    { value: 13, label: "Región Metropolitana de Santiago" },
    { value: 16, label: "Ñuble" },
    { value: 1, label: "Tarapacá" },
    { value: 5, label: "Valparaíso" },
];

const modal = ref<Modal | null>(null);
const findOption = (value: number) => {
    return regionOptions.find((option) => option.value == value);
};

const creditTypeOptions = [
    { value: "GO", label: "Grupal Online" },
    { value: "PO", label: "Personalizado Online" },
    { value: "GP", label: "Grupal Presencial" },
    { value: "PP", label: "Personalizado Presencial" },
];

const formatOptions = [
    { value: "Individual", label: "Individual" },
    { value: "Grupal", label: "Grupal" },
    { value: "Dupla", label: "Dupla" },
];
const results = ref([]);

interface Plan {
    plan_id: number;
    credit_type: string;
    format_credit: string;
    expiration_time: number;
    price: number;
    formattedPrice: string;
    credit_quantity: number;
    description: string;
    regions: number[];
}

const addInitialRegion = () => {
    if (!newPlan.value) return;

    chipsRegion.value = []; // Limpiar chips antes de agregar las regiones iniciales
    for (const region of newPlan.value.regions) {
        const regionOption = findOption(region);
        if (regionOption) {
            addChip(regionOption);
        }
    }
};

const addChip = (region: chip) => {
    chipsRegion.value.unshift(region);
    results.value = [];
};

const removeChip = (region: chip) => {
    const index = chipsRegion.value.findIndex(
        (chip) => chip.value === region.value
    );
    if (index !== -1) {
        chipsRegion.value.splice(index, 1);
    }
};
const newPlan = ref<Plan | null>(null);

const resetModal = () => {
    newPlan.value = {
        plan_id: 0,
        credit_type: "",
        format_credit: "",
        expiration_time: 0,
        price: 0,
        formattedPrice: "",
        credit_quantity: 0,
        description: "",
        regions: [],
    };
    chipsRegion.value = [];
    selectedRegion.value = -1;
};
const openModal = () => {
    modal.value?.openModal();
    loadingData.value = false;
};
const closeModal = () => {
    modal.value?.closeModal();
    resetModal();
};

defineExpose({
    openModal,
    closeModal,
});

watch(
    () => props.plan,
    (plan) => {
        newPlan.value = plan;
        if (plan) {
            addInitialRegion();
        }
    }
);

const updatePlan = async () => {
    if (!newPlan.value) return;

    const regions = chipsRegion.value.map((chip) => chip.value);
    newPlan.value.regions = regions;
    const planModified = {
        plan_id: newPlan.value.plan_id,
        credit_type: newPlan.value.credit_type,
        format_credit: newPlan.value.format_credit,
        expiration_time: newPlan.value.expiration_time,
        price: newPlan.value.price,
        credit_quantity: newPlan.value.credit_quantity,
        description: newPlan.value.description,
        region: newPlan.value.regions,
    };

    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/plan`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: planModified,
            }
        );

        if (response.success) {
            closeModal();
            toast.success(response.message);
            reloadNuxtApp();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    }
};
</script>
