<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full mt-3">
                    <CommonLoading v-if="!student || futureSessionsLoading || pastSessionsLoading" />
                    <div v-else>
                        <h2 class="text-2xl text-center mb-5 font-semibold">Estudiante</h2>
                        <div class="text-center space-y-5 mb-10 w-10/12 mx-auto">
                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p class="text-2xl font-medium text-gray-700" v-if="student && student?.first_name">{{
                                    student?.first_name }} {{ student?.last_name }}</p>
                                <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                            </div>

                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="text-2xl font-medium text-gray-700 break-all">{{ student?.email }}</p>
                            </div>
                            <CommonButton @click="disableUser()" bg-color="tertiary"
                                class="py-2 px-3 text-white  mx-auto mb-5" v-if="student && student.enabled">
                                Deshabilitar usuario</CommonButton>
                            <CommonButton @click="enableUser()" bg-color="primary"
                                class="py-2 px-3 text-white  mx-auto mb-5" v-else-if="student && !student.enabled">
                                Habilitar usuario</CommonButton>
                        </div>

                        <div class="space-y-6 mb-6">
                            <div class="flex items-center justify-between">
                                <div class="px-5 py-3 rounded-lg border flex items-center justify-between w-full">
                                    <p class="text-lg">Planes comprados</p>
                                    <CommonButton bg-color="secondary" text-size="sm" class="px-4 py-2"
                                        @click="openModalPlans">
                                        Ver planes
                                    </CommonButton>
                                </div>
                            </div>
                            <div class="px-5 py-3 rounded-lg border flex items-center justify-between"
                                id="futureSessionsToggle" @click="toggleFutureSessions">
                                <!-- //toggle de sesiones próximas -->
                                <p class="text-lg">Sesiones próximas</p>
                                <Icon
                                    :name="isFutureSessionsVisible ? 'fa6-solid:chevron-down' : 'fa6-solid:chevron-right'" />
                            </div>
                            <div class="overflow-x-auto" id="futureSessions" v-show="isFutureSessionsVisible">
                                <div v-if="futureSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="futureSessions.length > 0"
                                    class="bg-white table-auto text-sm text-left text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">
                                                Fecha
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Hora
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Modalidad
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Formato
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Profesional
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b " v-for="session in futureSessions">
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.date }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.format }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.modality }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <p>
                                                    {{ session.professional?.first_name }} {{
                                                        session.professional?.last_name }}
                                                </p>
                                                <p class="text-sm text-gray-400">{{ session.professional?.title }}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones próximas</p>
                                </div>
                            </div>
                            <div class="px-5 py-3 rounded-lg border flex items-center justify-between"
                                id="pastSessionsToggle" @click="togglePastSessions">
                                <!-- //toggle de sesiones pasadas -->
                                <p class="text-lg">Sesiones pasadas</p>
                                <Icon
                                    :name="isPastSessionsVisible ? 'fa6-solid:chevron-down' : 'fa6-solid:chevron-right'" />
                            </div>
                            <div class="overflow-x-auto" id="pastSessions" v-show="isPastSessionsVisible">
                                <div v-if="pastSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="pastSessions.length > 0"
                                    class="bg-white table-auto text-sm text-left text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">
                                                Fecha
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Hora
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Modalidad
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Formato
                                            </th>
                                            <th scope="col" class="p-6 font-medium">
                                                Profesional
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr class="border-b " v-for="session in pastSessions">
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.date }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.format }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.modality }}
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <p>{{ session.professional.first_name }} {{
                                                    session.professional.last_name
                                                    }}
                                                </p>
                                                <p class="text-sm text-gray-400">{{ session.professional.title }}</p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones pasadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <AdminDashboardStudentsPlanStudentInfoModal :plansLoading="plansLoading" :student="student" :plans="plans"
            ref="planInfoModal" />
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
const toast = useToast();

const runtimeConfig = useRuntimeConfig();
interface PlansResponse extends APIResponse {
    credits: Plan[];
}


interface Plan {
    transaction_id: number;
    credit_type: string;
    format_credit: string;
    used_credits: number;
    available_credits: number;
    expiration_date: string;
}

const planInfoModal = ref<Modal | null>(null);

const isPastSessionsVisible = ref(false);
const isFutureSessionsVisible = ref(false);
const plansLoading = ref(false);
const plans = ref<Plan[]>([]);

const toggleFutureSessions = () => {
    isFutureSessionsVisible.value = !isFutureSessionsVisible.value;
}
const togglePastSessions = () => {
    isPastSessionsVisible.value = !isPastSessionsVisible.value;
}


interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    enabled: boolean;
}

interface Session {
    session_id: number;
    date: string;
    time: string;
    available: boolean;
    modality: string;
    format: string;
    link: string;
    actual_assistant: number;
    type: string;
    coordinates: string | null;
    professional: Professional;
}
interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
}

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
}

const props = defineProps<{
    student: Student | null;
    futureSessions: Session[];
    pastSessions: Session[];
    futureSessionsLoading: boolean;
    pastSessionsLoading: boolean;
}>();

defineExpose({
    openModal
})

const getStudentPlans = async (student: Student) => {

    plansLoading.value = true;

    try {
        const response = await $fetch<PlansResponse>(`${runtimeConfig.public.apiBase}/admin/students/credits/${student.user_id}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.success) {
            plans.value = response.credits;
        }
        else {
            console.error(response.message);
        }

    }
    catch (error) {
        console.error(error);
    }
    finally {
        plansLoading.value = false;
    }

};

const openModalPlans = () => {
    planInfoModal.value?.openModal();
    getStudentPlans(props.student!);
    modal.value?.closeModal();

}
const disableUser = async () => {
    if (!props.student) return;
    const response = await $fetch<APIResponse>(`${runtimeConfig.public.apiBase}/admin/disable-account`, {
        method: 'POST',
        credentials: 'include',
        body: {
            user_id: props.student.user_id
        }
    });
    if (response.success) {
        toast.success('Usuario deshabilitado');
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error('Error al deshabilitar usuario');
    }
}
const enableUser = async () => {
    if (!props.student) return;
    const response = await $fetch<APIResponse>(`${runtimeConfig.public.apiBase}/admin/enable-account`, {
        method: 'POST',
        credentials: 'include',
        body: {
            user_id: props.student.user_id
        }
    });
    if (response.success) {
        toast.success('Usuario habilitado');
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error('Error al habilitar usuario');
    }
}

</script>