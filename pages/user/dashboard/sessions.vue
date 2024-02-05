<template>
    <div>
        <div class="space-y-4">
            <div>
                <h3 class="text-xl font-medium">Sesiones en curso</h3>
            </div>
            <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div class="text-md text-center"><b>No hay sesiones registradas</b></div>
            </div>
            <h3 class="text-xl font-medium">Sesiones reservadas</h3>
            <CommonLoading v-if="futureSessionsLoading" />
            <div v-else-if="futureSessions?.success">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div v-for="session in futureSessions.sessions" :key="session.session_id"
                        class="bg-secondary rounded-2xl items-center shadow-lg">
                        <div class="bg-white rounded-2xl px-6 py-4">
                            <div class="flex justify-between gap-1">
                                <div class="text-gray-400">
                                    <p>{{ formatDate(session.date) }}</p>
                                </div>
                                <div class="text-gray-400 text-right">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-2 py-2">
                                <h3 class="text-2xl font-semibold">{{ session.professional.first_name + ' ' +
                                    session.professional.last_name }}</h3>
                                <p class="font-light text-gray-700">{{ session.professional.title }}</p>
                                <a v-if="session.modality === 'Online'" :href="session.link || ''" target="_blank"
                                    class="flex items-center gap-1 text-xl font-medium text-secondary decoration-secondary underline-offset-2">
                                    <Icon name="icon-park-outline:new-computer" />
                                    <p>
                                        Online
                                    </p>
                                </a>
                                <a v-else :href="session.link || ''" target="_blank"
                                    class="flex items-center gap-1 text-xl font-medium text-secondary decoration-secondary underline-offset-2">
                                    <Icon name="heroicons:map-pin" />
                                    <p>Lugar</p>
                                </a>
                            </div>
                        </div>
                        <div class="py-2 px-5 text-white flex justify-between items-center">
                            <button class="" @click="viewSessionDetails(session)">
                                Editar/eliminar
                            </button>
                            <button>
                                Confirmar asistencia
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!futureSessionsLoading && !futureSessions?.success">
                <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-md  text-center"><b>{{ futureSessions?.message }}</b></div>
                </div>
            </div>
            <div>
                <h3 class="text-xl font-medium">Sesiones pasadas</h3>
            </div>
            <CommonLoading v-if="pastSessionsLoading" />
            <div v-else-if="pastSessions?.success">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div v-for="session in pastSessions.sessions                  " :key="session.session_id"
                        class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60 hover:opacity-100 transition-opacity"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>{{ formatDate(session.date) }}</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-y-2">
                                <b class="text-[#000000] text-lg font-medium ">{{ session.format + ' - ' +
                                    session.modality }}</b>
                                <a :href="session.link || ''" target="_blank"
                                    ss="text-xl font-medium underline text-secondary decoration-secondary underline-offset-2">Link</a>
                                <p class="text-[#949494]">{{ session.professional.first_name + ' ' +
                                    session.professional.last_name + ' - ' + session.professional.title }}</p>
                            </div>
                            <div class="text-[#949494] text-base text-center gap-2">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>26 de Junio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#0EB3E0] text-2xl font-medium text-center"><a href="#">Online</a></div>
                            <div class="text-[#949494] text-base text-center gap-2">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div v-else>
                <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-md  text-center"><b>{{ pastSessions?.message }}</b></div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="detailsModal">
                test
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '~/stores/UserStore';

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

interface APIResponseType {
    success: boolean;
    message: string;
    sessions: Session[];
}

// Utility function to format date
const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleString('es-ES', { day: '2-digit', month: 'long' });
}

const detailsModal = ref<Modal | null>(null);

// Function to handle session details view
const viewSessionDetails = (session: Session) => {
    console.log(session);
    detailsModal.value?.openModal();

}

// Fetch future sessions
const { data: futureSessions, pending: futureSessionsLoading, refresh: refreshFutureSessions, error: futureSessionsError } = useFetch<APIResponseType>(
    `${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/future`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "x-access-token": userStore.getUserToken() || '',
    },
}
);

// Fetch past sessions
const { data: pastSessions, pending: pastSessionsLoading, refresh: refreshPastSessions, error: pastSessionsError } = useFetch<APIResponseType>(
    `${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/past`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "x-access-token": userStore.getUserToken() || '',
    },
}
);

const route = useRoute();
watchEffect(() => {
    route.path;
    refreshFutureSessions();
});

</script>
