<template>
    <div class="h-full">
        <div class="relative">
            <div name="content">
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-xl font-medium">Sesiones futuras</h3>
                </div>
                <CommonLoading v-if="futureSessionsLoading" />
                <div v-else class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full table-auto bg-white text-left text-sm text-gray-500">
                        <thead class="bg-gray-200 text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" class="p-6">Fecha</th>
                                <th scope="col" class="p-6">Hora</th>
                                <th scope="col" class="p-6">Modalidad</th>
                                <th scope="col" class="p-6">Formato</th>
                                <th scope="col" class="p-6">Profesional</th>
                                <th scope="col" class="p-6">Alumnos</th>
                                <th scope="col" class="p-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="session in futureSessionsData?.sessions" class="border-b"
                                :key="session.session_id">
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ session.date }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ session.time }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ session.modality }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ session.format }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ session.professional.first_name }}
                                    {{ session.professional.last_name }}
                                    <br />
                                    {{ session.professional.title }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 md:whitespace-normal">
                                    <div class="flex items-center justify-center">
                                        {{ session.actual_assistant }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button class="rounded-md bg-primary px-4 py-2 font-medium text-white"
                                        @click="openModalModifySession(session.session_id)">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <AdminDashboardHomeModifySessionModal @refresh-data="refreshData" :loading="sessionInfoLoading"
            :sessionInfo="sessionInfo" ref="modifySessionModal" />
    </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const sessionInfo = ref<SessionInfo | null>(null);
const modifySessionModal = ref<Modal | null>(null);
const sessionInfoLoading = ref<boolean>(false);

interface SessionInfoResponse extends APIResponse {
    session: SessionInfo;
}

interface SessionsResponse extends APIResponse {
    sessions: Session[];
}

interface SessionInfo {
    session_id: number;
    date: string;
    time: string;
    available: number;
    format: string;
    modality: string;
    link: string;
    actual_assistant: number;
    type: string;
    coordinates: string | null;
    students: Student[];
    professional: Professional;
}

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
}
interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
}

interface Session {
    session_id: number;
    date: string;
    time: string;
    modality: string;
    format: string;
    professional: Professional;
    actual_assistant: number;
}

const {
    data: futureSessionsData,
    pending: futureSessionsLoading,
    error,
    refresh: getFutureSessions,
} = await useFetch<SessionsResponse>(`${runtimeConfig.public.apiBase}/admin/sessions/future`, {
    method: "GET",
    credentials: "include",
    lazy: true,
});

const refreshData = () => {
    getFutureSessions();
};


const getSessionInfo = async (session_id: number) => {
    sessionInfoLoading.value = true;

    try {
        const response = await $fetch<SessionInfoResponse>(
            `${runtimeConfig.public.apiBase}/admin/session/${session_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (response.success) {
            sessionInfo.value = response.session;
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        sessionInfoLoading.value = false;
    }
};

const openModalModifySession = (session_id: number) => {
    getSessionInfo(session_id);
    modifySessionModal.value?.openModal();
};
</script>
