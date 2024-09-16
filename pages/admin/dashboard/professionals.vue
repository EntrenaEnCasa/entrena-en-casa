<template>
    <div>
        <div class="mb-4">
            <h3 class="text-xl font-medium">Profesionales</h3>
        </div>
        <CommonLoading v-if="professionalsDataPending" />
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full table-auto bg-white text-left text-sm text-gray-500" v-if="professionalsData">
                <thead class="bg-gray-200 text-xs uppercase text-gray-700">
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
                        <td class="whitespace-nowrap px-6 py-4">
                            <div v-if="professional.first_name">
                                {{ professional.first_name }}
                            </div>
                            <div v-else>Sin datos</div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            <div v-if="professional.last_name">
                                {{ professional.last_name }}
                            </div>
                            <div v-else>Sin datos</div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            {{ professional.email }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            {{ professional.title }}
                        </td>
                        <td class="px-6 py-4">
                            <button class="rounded-md bg-primary px-4 py-2 font-medium text-white"
                                @click="openProfessionalModal(professional)">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <AdminDashboardProfessionalsProfessionalInfoModal :professional="currentProfessional"
            :pastSessions="pastSessions" :futureSessions="futureSessions" :futureSessionsLoading="futureSessionsLoading"
            :pastSessionsLoading="pastSessionsLoading" ref="professionalModal" />
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

const professionalModal = ref<Modal | null>(null);

const futureSessions = ref<Session[]>([]);
const pastSessions = ref<Session[]>([]);
const futureSessionsLoading = ref<boolean>(false);
const pastSessionsLoading = ref<boolean>(false);

const {
    data: professionalsData,
    pending: professionalsDataPending,
    error,
} = await useFetch<ProfessionalsDataResponse>(
    `${runtimeConfig.public.apiBase}/admin/professionals`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const getPastSessions = async (professional: Professional) => {
    pastSessionsLoading.value = true;
    try {
        const response = await $fetch<PastSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/professional/sessions/past/${professional.user_id}`,
            {
                method: "GET",
                credentials: "include",
            },
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
    try {
        const response = await $fetch<FutureSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/professional/sessions/future/${professional.user_id}`,
            {
                method: "GET",
                credentials: "include",
            },
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
