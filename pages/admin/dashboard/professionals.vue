<template>
    <div class="p-6 sm:p-8">
        <div class="relative">
            <div name="content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-medium">Profesionales</h3>
                    <form novalidate>
                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <icon class="text-md text-slate-400" name="fa6-solid:magnifying-glass"></icon>
                            </div>
                            <input type="search" id="search"
                                class="w-full p-2 pl-10 text-sm border border-xl rounded-2xl border-slate-400 placeholder:text-slate-400 focus:ring-secondary-500 focus:border-secondary-500"
                                placeholder="Buscar..." required />
                        </div>
                    </form>
                </div>
                <CommonLoading v-if="professionalsDataPending" />
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="bg-white w-full table-auto text-sm text-left text-gray-500" v-if="professionalsData">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" class="p-6">Nombre</th>
                                <th scope="col" class="p-6">Apellido</th>
                                <th scope="col" class="p-6">Correo</th>
                                <th scope="col" class="p-6">Título</th>
                                <th scope="col" class="p-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="professional in professionalsData.professionals" class="border-b"
                                :key="professional.user_id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    <div v-if="professional.first_name">
                                        {{ professional.first_name }}
                                    </div>
                                    <div v-else>
                                        Sin datos
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    <div v-if="professional.last_name">
                                        {{ professional.last_name }}
                                    </div>
                                    <div v-else>
                                        Sin datos
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ professional.email }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.title }}
                                </td>
                                <td class="px-6 py-4">
                                    <button class="px-4 py-2 bg-primary text-white rounded-md font-medium"
                                        @click="openProfessionalModal(professional)">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <AdminDashboardProfessionalsProfessionalInfoModal :professional="currentProfessional"
                    :pastSessions="pastSessions" :futureSessions="futureSessions"
                    :futureSessionsLoading="futureSessionsLoading" :pastSessionsLoading="pastSessionsLoading
                    " ref="professionalModal" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig();
const currentProfessional = ref<Professional | null>(null);

interface FutureSessionsResponse extends APIResponse {
    sessions: Session[];
}
interface PastSessionsResponse extends APIResponse {
    sessions: Session[];
}

interface ProfessionalsDataResponse extends APIResponse {
    professionals: Professional[];
}

interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
    email: string;
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

const professionalModal = ref<Modal | null>(null);

const futureSessions = ref<Session[]>([]);
const pastSessions = ref<Session[]>([]);
const futureSessionsLoading = ref<boolean>(false);
const pastSessionsLoading = ref<boolean>(false);

const { data: professionalsData, pending: professionalsDataPending, error } = await useFetch<ProfessionalsDataResponse>(`${runtimeConfig.public.apiBase}/admin/professionals`, {
    method: "GET",
    credentials: "include",
});

const getPastSessions = async (professional: Professional) => {
    pastSessionsLoading.value = true;
    console.log(professional.user_id);
    try {
        const response = await $fetch<PastSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/professional/sessions/past/${professional.user_id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (response.success) {
            if (response.sessions) {
                pastSessions.value = response.sessions;
            } else {
                pastSessions.value = [];
            }
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        pastSessionsLoading.value = false;
    }
};

const getFutureSessions = async (professional: Professional) => {
    futureSessionsLoading.value = true;
    console.log(professional.user_id)
    try {
        const response = await $fetch<FutureSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/professional/sessions/future/${professional.user_id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (response.success) {
            if (response.sessions) {
                futureSessions.value = response.sessions;
            } else {
                futureSessions.value = [];
            }
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        futureSessionsLoading.value = false;
    }
};

const openProfessionalModal = (professional: Professional) => {
    professionalModal.value?.openModal();
    currentProfessional.value = professional;
    getFutureSessions(professional);
    getPastSessions(professional);
};
</script>

<style lang="scss"></style>
