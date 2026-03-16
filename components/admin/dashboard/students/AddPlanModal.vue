<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full text-center">
                    <div
                        class="mx-auto mb-8 mt-5 grid w-10/12 grid-cols-1 place-items-center justify-center text-center lg:grid-cols-2 lg:text-start"
                    >
                        <div class="mb-5 space-y-2 px-1">
                            <h3 class="text-gray-500">Nombre</h3>
                            <p
                                class="text-2xl font-medium text-gray-700"
                                v-if="student?.first_name"
                            >
                                {{ student?.first_name }}
                                {{ student?.last_name }}
                            </p>
                            <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                        </div>

                        <div class="mb-5 space-y-2 px-1">
                            <h3 class="text-gray-500">Correo electrónico</h3>
                            <p class="break-all text-2xl font-medium text-gray-700">
                                {{ student?.email }}
                            </p>
                        </div>
                    </div>
                    <div class="overflow-hidden px-10 lg:w-full">
                        <div class="mb-5 flex items-center justify-between">
                            <h3 class="mx-auto text-2xl">Agregar Plan</h3>
                        </div>
                        <div>
                            <form class="flex flex-col items-center justify-center">
                                <div class="flex w-full flex-col items-center py-5">
                                    <label for="plan" class="mb-2 w-full text-left text-gray-500"
                                        >Tipo de Plan</label
                                    >
                                    <select
                                        v-model="selectedPlan"
                                        id="plan"
                                        class="w-full rounded-lg border border-gray-200 px-5 py-3 outline-none"
                                    >
                                        <option value="0" disabled selected>
                                            Selecciona un plan
                                        </option>
                                        <option v-for="plan in plans" :value="plan.plan_id">
                                            {{ formatPlan(plan.credit_type) }} {{ plan.format_credit }} -
                                            {{ plan.credit_quantity }} créditos
                                        </option>
                                    </select>
                                </div>
                                
                                <!-- Búsqueda de segundo estudiante para planes dupla -->
                                <div v-if="isDuplaPlan" class="flex w-full flex-col items-center py-5">
                                    <label class="mb-2 w-full text-left text-gray-500">
                                        Selecciona el segundo estudiante para el plan dupla
                                    </label>
                                    <div class="relative w-full">
                                        <div
                                            class="box-border w-full rounded-lg border bg-white px-5 py-3.5 text-sm text-gray-800"
                                            :class="{ 'ring-2 ring-inset ring-primary': searchFocused }"
                                        >
                                            <div class="flex flex-wrap items-center gap-x-2 gap-y-4">
                                                <input
                                                    type="text"
                                                    v-model="searchTerm"
                                                    placeholder="Ingresa el correo electrónico o nombre"
                                                    class="w-full outline-none"
                                                    @focus="searchFocused = true"
                                                    @blur="searchFocused = false"
                                                    @input="delayedSearchStudents"
                                                />
                                                <div v-if="secondStudent">
                                                    <span
                                                        class="inline-flex items-center rounded-full bg-secondary px-2.5 py-1.5 text-xs font-medium text-white"
                                                    >
                                                        <Icon
                                                            @click="removeSecondStudent"
                                                            class="mr-1 cursor-pointer text-lg"
                                                            name="fa6-solid:circle-xmark"
                                                        />
                                                        <span v-if="secondStudent.first_name">
                                                            {{ secondStudent.first_name }} {{ secondStudent.last_name }}
                                                        </span>
                                                        <span v-else>
                                                            {{ secondStudent.email }}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute left-0 right-0 top-[110%] z-40 rounded-md border bg-white p-3 shadow-lg"
                                                v-if="searchFocused && searchTerm && !secondStudent"
                                            >
                                                <CommonLoading v-if="searchLoading" text="Buscando" />
                                                <ul v-else>
                                                    <li
                                                        v-if="filteredStudents.length === 0 && !searchLoading && searchTerm"
                                                        class="px-3 py-2"
                                                    >
                                                        No se encontraron resultados
                                                    </li>
                                                    <li
                                                        class="rounded px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                        v-for="result in filteredStudents"
                                                        :key="result.user_id"
                                                        @mousedown="selectSecondStudent(result)"
                                                    >
                                                        <p v-if="result.first_name" class="font-medium">
                                                            {{ result.first_name }} {{ result.last_name }}
                                                        </p>
                                                        <p v-else class="font-medium">
                                                            {{ result.email }}
                                                        </p>
                                                        <p class="text-xs">
                                                            {{ result.email }}
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div v-show="selectedPlan !== 0">
                                <table class="mx-auto mb-7 table-auto bg-white text-center text-sm">
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
                                                    class="mx-auto mb-5 grid w-5/6 grid-cols-2 items-center gap-5"
                                                >
                                                    <p class="text-right font-light">Plan</p>
                                                    <p class="text-left font-bold">
                                                        {{
                                                            formatPlan(selectedPlanData.credit_type)
                                                        }}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="px-6 py-2">
                                                <div
                                                    class="mx-auto mb-5 grid w-5/6 grid-cols-2 items-center gap-5"
                                                >
                                                    <p class="text-right font-light">Formato</p>
                                                    <p class="text-left font-bold">
                                                        {{ selectedPlanData.format_credit }}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                class="mx-auto mb-5 grid w-4/6 grid-cols-2 items-center gap-5"
                                            >
                                                <p class="text-right font-light">
                                                    Cantidad de sesiones
                                                </p>
                                                <div class="flex items-center">
                                                    <div
                                                        v-if="selectedPlanData.credit_type === 'PP'"
                                                    >
                                                        <div class="whitespace-nowrap text-primary">
                                                            <Icon
                                                                name="ion:person"
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
                                                            selectedPlanData.credit_type === 'GP'
                                                        "
                                                    >
                                                        <div class="whitespace-nowrap text-primary">
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
                                                            selectedPlanData.credit_type === 'PO'
                                                        "
                                                    >
                                                        <div class="whitespace-nowrap text-primary">
                                                            <Icon
                                                                name="ion:person"
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
                                                            selectedPlanData.credit_type === 'GO'
                                                        "
                                                    >
                                                        <div class="whitespace-nowrap text-primary">
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
                                                    <p class="ml-3 font-bold">
                                                        {{ selectedPlanData?.credit_quantity }}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-2">
                                                <div
                                                    class="mx-auto mb-5 grid w-5/6 grid-cols-2 items-center gap-5"
                                                >
                                                    <p class="text-right font-light">
                                                        Tiempo máximo para utilizar sesiones
                                                    </p>
                                                    <p class="text-left font-bold">
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
                    <div class="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:justify-center">
                        <CommonButton bg-color="tertiary" class="px-4 py-2" @click="closeModal()">
                            Cancelar
                        </CommonButton>
                        <CommonButton class="px-4 py-2" @click="addPlan">Confirmar</CommonButton>
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

const searchTerm = ref<string>("");
const searchFocused = ref<boolean>(false);
const searchLoading = ref<boolean>(false);
const searchResults = ref<Student[]>([]);
const secondStudent = ref<Student | null>(null);
let searchTimeout: NodeJS.Timeout | null = null;

const props = defineProps<{
    student: Student | null;
}>();

const openModal = () => {
    modal.value?.openModal();
};

const closeModal = () => {
    modal.value?.closeModal();
    selectedPlan.value = 0;
    secondStudent.value = null;
    searchTerm.value = "";
    searchResults.value = [];
};

const delayedSearchStudents = () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (searchTerm.value.trim() !== "") {
            searchStudents();
        } else {
            searchResults.value = [];
        }
    }, 500);
};

const searchStudents = async () => {
    searchLoading.value = true;
    try {
        const response = await $fetch<any>(
            `${runtimeConfig.public.apiBase}/admin/students/search`,
            {
                method: "POST",
                credentials: "include",
                body: {
                    searchTerm: searchTerm.value,
                },
            },
        );
        if (response.success) {
            searchResults.value = response.students;
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Error al buscar estudiantes");
    } finally {
        searchLoading.value = false;
    }
};

const selectSecondStudent = (student: Student) => {
    secondStudent.value = student;
    searchTerm.value = "";
    searchResults.value = [];
};

const removeSecondStudent = () => {
    secondStudent.value = null;
};

defineExpose({
    openModal,
});

// Detectar si el plan seleccionado es dupla basándose en el campo format_credit
const isDuplaPlan = computed(() => {
    if (!selectedPlanData.value) return false;
    // Verificar si el format_credit es "Dupla"
    return selectedPlanData.value.format_credit === 'Dupla';
});

// Filtrar estudiantes para excluir al estudiante actual
const filteredStudents = computed(() => {
    return searchResults.value.filter(
        student => student.user_id !== props.student?.user_id
    ).slice(0, 5);
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
            },
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
    // Validar que si es plan dupla, debe haber un segundo estudiante
    if (isDuplaPlan.value && !secondStudent.value) {
        toast.error("Debes seleccionar un segundo estudiante para el plan dupla");
        return;
    }

    addPlanLoading.value = true;

    try {
        // Construir el array de user_id según si es dupla o no
        const userIds = isDuplaPlan.value && secondStudent.value
            ? [props.student?.user_id, secondStudent.value.user_id]
            : [props.student?.user_id];

        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/credits`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userIds,
                    plan_id: selectedPlan.value,
                }),
            },
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
        // Actualizar los datos del plan seleccionado
        selectedPlanData.value = plans.value.find((plan) => plan.plan_id === newSelectedPlan);
        
        // Resetear el segundo estudiante cuando cambia el plan
        secondStudent.value = null;
        searchTerm.value = "";
        searchResults.value = [];
    },
    { immediate: true },
);

watch(
    () => props.student,
    async (newStudent) => {
        if (newStudent) {
            await getPlans();
        }
    },
);
</script>
