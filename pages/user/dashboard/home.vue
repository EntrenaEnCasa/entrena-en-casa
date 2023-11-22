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
                <CommonLoading v-if="futureSessions.loading" />
                <div v-else-if="futureSessions.success">
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
                <CommonLoading v-if="pastSessions.loading" />
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

<style scoped lang="scss">
.userInicio {
    background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
}
</style>

<script setup>
import { reactive, onMounted } from "vue";
import { useUserStore } from '~/stores/UserStore'

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const futureSessions = ref({
    success: false,
    loading: false,
    message: '',
    sessions: [],
});

const pastSessions = ref({
    success: false,
    loading: false,
    message: '',
    sessions: [],
});

onMounted(async () => {
    await getFutureSessions();
    await getPastSessions();
});

const getFutureSessions = async () => {

    futureSessions.value.loading = true;

    await useFetch(`${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/soon`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken(),
        },
        onResponse({ request, response, options }) {
            futureSessions.value = response._data;
            futureSessions.value.loading = false;
        },
    });
}

const getPastSessions = async () => {

    pastSessions.value.loading = true;

    await useFetch(`${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/last`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken(),
        },
        onResponse({ request, response, options }) {
            pastSessions.value = response._data;
            pastSessions.value.loading = false;
        },
    });
}
</script>