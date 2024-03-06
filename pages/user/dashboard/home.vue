<template >
    <div class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <!-- <div class="grid grid-rows-2"> -->
            <div class="bg-white py-6 px-10 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div class="mb-5 flex justify-between items-center">
                    <h5 class="text-lg text-[#949494]">Últimas sesiones</h5>
                    <p class="text-right text-sm font-medium text-gray-800">Ver todas</p>
                </div>
                <CommonLoading v-if="futureSessionsLoading" />
                <div v-else-if="futureSessions && futureSessions.success">
                    <div v-for="session in futureSessions.sessions" :key="session.session_id">
                        <hr class="my-5">
                        <div class="grid grid-cols-3 items-center">
                            <div>{{ session.time }}hrs</div>
                            <div class="text-sm"> {{ session.format + ' - ' + session.modality }} </div>
                            <button class="text-secondary font-semibold place-self-end flex items-center">
                                <p class="hidden md:block mr-1">Ver más</p>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="  text-[#949494]">No tienes ninguna sesión a futuro.</div>
                </div>

            </div>
            <!-- </div> -->
            <div class="bg-white py-6 px-10 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div class="mb-5 flex justify-between items-center">
                    <h5 class="text-lg text-[#949494]">Próximas sesiones</h5>
                    <p class="text-right text-sm font-medium text-gray-800">Ver todas</p>
                </div>
                <CommonLoading v-if="pastSessionsLoading" />
                <div v-else-if="pastSessions.success">
                    <div v-for="session in pastSessions.sessions" :key="session.session_id">
                        <hr class="my-5">
                        <div class="grid grid-cols-3 items-center">
                            <div>{{ session.time }}hrs</div>
                            <div class="text-sm"> {{ session.format + ' - ' + session.modality }} </div>
                            <button class="text-secondary font-semibold place-self-end flex items-center">
                                <p class="hidden md:block mr-1">Ver más</p>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class=" text-[#949494]">No has participado de ninguna sesión.</div>
                </div>
            </div>

        </div>
        <div>
            <div class="bg-white h-72 py-4 px-6 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg text-[#949494]">Estadísticas</h5>
                </div>
                <div class="mt-5">
                    <p class=" text-[#949494]">No hay estadísticas disponibles actualmente.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/UserStore';

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const userId = userStore.user.user_id;
const headers = useRequestHeaders(['cookie']);

// Fetch future sessions
const { data: futureSessions, pending: futureSessionsLoading } = useFetch(
    `${runtimeConfig.public.apiBase}/student/${userId}/sessions/soon`,
    {
        method: 'GET',
        credentials: 'include'
    }
);

// Fetch past sessions
const { data: pastSessions, pending: pastSessionsLoading } = useFetch(
    `${runtimeConfig.public.apiBase}/student/${userId}/sessions/last`,
    {
        method: 'GET',
        credentials: 'include'
    }
);

</script>
