<template>
    <div class="p-6 sm:p-8 space-y-4">
        <!-- <div class="relative">
            <div name="content">
                <div class="mb-4">
                    <h3 class="text-xl font-medium ">Sesiones en curso</h3>
                </div>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="bg-white w-full table-auto text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" class="p-6">
                                    Fecha
                                </th>
                                <th scope="col" class="p-6">
                                    Hora
                                </th>
                                <th scope="col" class="p-6">
                                    Modalidad
                                </th>
                                <th scope="col" class="p-6">
                                    Formato
                                </th>
                                <th scope="col" class="p-6">
                                    Profesional
                                </th>
                                <th scope="col" class="p-6">
                                    Alumnos
                                </th>
                                <th scope="col" class="p-6">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="session in sessions" class="border-b" :key="session.id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.date }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.time }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.modality }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.format }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ session.professional.name }}
                                    <br>
                                    {{ session.professional.profession }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal">
                                    <div class="flex items-center gap-x-1">
                                        {{ session.alumnos.taken }}/{{ session.alumnos.max }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button class="px-4 py-2 bg-primary text-white rounded-md font-medium ">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> -->


        <div class="relative">
            <div name="content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-medium ">Sesiones futuras</h3>
                    <button @click="toggleFilterSidebar"
                        class="bg-secondary text-white px-5 py-2 inline-flex items-center gap-1 rounded-lg">
                        <span class="sr-only">Open filter sidebar</span>
                        <Icon class="text-2xl" name="ic:round-filter-list" />
                        <span>
                            Filtros
                        </span>
                    </button>
                </div>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="bg-white w-full table-auto text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" class="p-6">
                                    Fecha
                                </th>
                                <th scope="col" class="p-6">
                                    Hora
                                </th>
                                <th scope="col" class="p-6">
                                    Modalidad
                                </th>
                                <th scope="col" class="p-6">
                                    Formato
                                </th>
                                <th scope="col" class="p-6">
                                    Profesional
                                </th>
                                <th scope="col" class="p-6">
                                    Alumnos
                                </th>
                                <th scope="col" class="p-6">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="session in futureSessions" class="border-b" :key="session.session_id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.date }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.time }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.modality }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.format }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ session.professional.first_name }} {{ session.professional.last_name }}
                                    <br>
                                    {{ session.professional.title }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal">
                                    <div class="flex items-center justify-center">
                                        {{ session.actual_assistant }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button class="px-4 py-2 bg-primary text-white rounded-md font-medium "
                                        @click="openModalModifySession(session.session_id)">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full min-h-[calc(100vh_-_4.5rem)] bg-black/10 backdrop-blur-[3px] transition-all"
                :class="{ 'hidden': !filterSidebarOpen }">
            </div>
        </div>
        <aside id="logo-sidebar"
            class="fixed top-0 right-0 z-40 w-80 h-screen pt-20 transition-transform bg-white border-l border-gray-200"
            :class="filterSidebarOpen ? 'translate-x-0' : 'translate-x-full'" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
                <div class="flex justify-end items-center text-secondary ">
                    <button @click="filterSidebarOpen = false">
                        <span>Cerrar</span>
                        <Icon class="text-4xl" name="heroicons:x-mark-20-solid" />
                    </button>
                </div>
                <form @submit.prevent="filter" class="mx-auto mt-5">
                    <div class="flex flex-col justify-center gap-y-2">
                        <select id="selectProfesional" class="text-center py-2 rounded-md bg-[#ededed]">
                            <option selected>Seleccionar Profesional</option>
                            <option>Entrenador Físico</option>
                            <option>Nutricionista</option>
                        </select>
                        <select id="selectModality" class="text-center py-2 rounded-md bg-[#ededed]">
                            <option selected>Seleccionar Modalidad</option>
                            <option>Online</option>
                            <option>Presencial</option>
                        </select>
                        <select id="selectFormat" class="text-center py-2 rounded-md bg-[#ededed]">
                            <option selected>Seleccionar Formato</option>
                            <option>Individual</option>
                            <option>Grupal</option>
                        </select>
                        <div>
                            <div class="text-center flex justify-center gap-2 py-2 px-5 rounded-md bg-[#ededed]">
                                <span class="input-group-text" id="basic-addon2">Desde</span>
                                <input type="date" class="bg-[#ededed] " aria-describedby="basic-addon2" id="desde">
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-center gap-2 py-2 px-5 rounded-md bg-[#ededed]">
                                <span class="input-group-text" id="basic-addon2">Hasta</span>
                                <input type="date" class="bg-[#ededed]" aria-describedby="basic-addon2" id="hasta">
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="w-full px-5 py-2 rounded-md bg-secondary text-white">
                                <Icon class="text-2xl" name="ic:round-filter-list" />
                                Filtrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </aside>
        <AdminDashboardHomeModifySessionModal :loading="sessionInfoLoading" :sessionInfo="sessionInfo"
            ref="modifySessionModal" />
    </div>
</template>


<script lang="ts" setup>

const filterSidebarOpen = ref(false);
const toggleFilterSidebar = () => filterSidebarOpen.value = !filterSidebarOpen.value;


const runtimeConfig = useRuntimeConfig();
const sessionInfo = ref<SessionInfo | null>(null);
const modifySessionModal = ref<Modal | null>(null);
const sessionInfoLoading = ref<boolean>(false);


const futureSessions = ref<Session[]>([]);
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
    link: string
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



const { data, pending: futureSessionsLoading, error, refresh: getFutureSessions } = await useFetch<SessionsResponse>(`${runtimeConfig.public.apiBase}/admin/sessions/future`, {
    method: 'GET',
    credentials: 'include',
});
futureSessions.value = data.value?.sessions || [];


const filter = () => {
    console.log("filter");
}

const getSessionInfo = async (session_id: number) => {
    sessionInfoLoading.value = true;

    try {
        const response = await $fetch<SessionInfoResponse>(`${runtimeConfig.public.apiBase}/admin/session/${session_id}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.success) {
            sessionInfo.value = response.session;

        }
        else {
            console.error(response.message);
        }

    }
    catch (error) {
        console.error(error);
    }
    finally {
        sessionInfoLoading.value = false;
    }
}

const openModalModifySession = (session_id: number) => {
    getSessionInfo(session_id);
    modifySessionModal.value?.openModal();
}

</script>


<style lang="scss"></style>