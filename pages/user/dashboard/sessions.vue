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
            <!-- <div>
                <div class="bg-white lg:h-15 py-4 px-6 rounded-2xl border border-zinc-200 lg:flex gap-6 items-center justify-evenly"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-[#949494] text-sm">16:00hrs</div>
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
            <div>
                <h3 class="text-xl font-medium">Sesiones próximas</h3>
            </div>
            <CommonLoading v-if="futureSessions.loading" />
            <div v-else-if="futureSessions.success">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- <div
                        class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>25 de Julio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#000000] text-2xl font-medium text-center">Lugar</div>
                        </div>
                    </div> -->
                    <div v-for="session in futureSessions.sessions" :key="session.session_id"
                        class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-5"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm">
                                    <p>{{ session.date }}</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-y-2">
                                <b class="text-[#000000] text-lg font-medium ">{{ session.format + ' - ' +
                                    session.modality }}</b>
                                <a :href="session.link" target="_blank"
                                    class="text-xl font-medium underline text-secondary decoration-secondary underline-offset-2">Link</a>
                                <p class="text-[#949494]">{{ session.professional.first_name + ' ' +
                                    session.professional.last_name + ' - ' + session.professional.title }}</p>
                            </div>
                            <div class=" text-center"></div>
                            <div class=" text-center"></div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-md  text-center"><b>{{ futureSessions.message }}</b></div>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-medium">Sesiones pasadas</h3>
            </div>
            <CommonLoading v-if="pastSessions.loading" />
            <div v-else-if="pastSessions.success">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div v-for="session in pastSessions.sessions" :key="session.session_id"
                        class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60 hover:opacity-100 transition-opacity"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>{{ session.date }}</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-y-2">
                                <b class="text-[#000000] text-lg font-medium ">{{ session.format + ' - ' +
                                    session.modality }}</b>
                                <a :href="session.link" target="_blank"
                                    class="text-xl font-medium underline text-secondary decoration-secondary underline-offset-2">Link</a>
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
                    <div class="text-md  text-center"><b>{{ pastSessions.message }}</b></div>
                </div>
            </div>
        </div>
    </div>
</template>
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

    await useFetch(`${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/future`, {
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
    await useFetch(`${runtimeConfig.public.apiBase}/student/${userStore.user.user_id}/sessions/past`, {
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