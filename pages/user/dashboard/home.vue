<template>
    <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <!-- <div class="grid grid-rows-2"> -->
            <div
                class="rounded-2xl border border-zinc-200 bg-white px-10 py-6"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg text-[#949494]">Últimas sesiones</h5>
                    <button
                        @click="goToScheduledSessions()"
                        class="text-right text-sm font-medium text-gray-800"
                    >
                        Ver todas
                    </button>
                </div>
                <CommonLoading v-if="pastSessionsLoading" />
                <div v-else-if="pastSessions && pastSessions.success">
                    <div v-for="session in pastSessions.sessions" :key="session.session_id">
                        <hr class="my-5" />
                        <div class="grid grid-cols-3 items-center">
                            <div>
                                <div class="text-xs">
                                    {{ formatDate(session.date) }}
                                </div>
                                <div>{{ session.time }}hrs</div>
                            </div>
                            <div class="text-sm">
                                {{ session.format + " - " + session.modality }}
                            </div>
                            <button
                                @click="openSessionModal(session)"
                                class="flex items-center place-self-end font-semibold text-secondary"
                            >
                                <p class="mr-1 hidden md:block">Ver más</p>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="text-[#949494]">No tienes ninguna sesión a futuro.</div>
                </div>
            </div>
            <!-- </div> -->
            <div
                class="rounded-2xl border border-zinc-200 bg-white px-10 py-6"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg text-[#949494]">Próximas sesiones</h5>
                    <button
                        @click="goToScheduledSessions()"
                        class="text-right text-sm font-medium text-gray-800"
                    >
                        Ver todas
                    </button>
                </div>
                <CommonLoading v-if="futureSessionsLoading" />
                <div v-else-if="futureSessions && futureSessions.success">
                    <div v-for="session in futureSessions.sessions" :key="session.session_id">
                        <hr class="my-5" />
                        <div class="grid grid-cols-3 items-center">
                            <div>{{ formatDate(session.date) }} {{ session.time }}hrs</div>
                            <div class="text-sm">
                                {{ session.format + " - " + session.modality }}
                            </div>
                            <button
                                @click="openSessionModal(session)"
                                class="flex items-center place-self-end font-semibold text-secondary"
                            >
                                <p class="mr-1 hidden md:block">Ver más</p>
                                <Icon name="fa6-solid:chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="text-[#949494]">No has participado de ninguna sesión.</div>
                </div>
            </div>
        </div>
        <!-- <div>
            <div
                class="bg-white h-72 py-4 px-6 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)">
                <div>
                    <h5 class="text-lg text-[#949494]">Estadísticas</h5>
                </div>
                <div class="mt-5">
                    <p class="text-[#949494]">No hay estadísticas disponibles actualmente.</p>
                </div>
            </div>
        </div> -->
        <StudentDashboardSessionInfoModal ref="sessionInfoModal" :session="actualSession" />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/UserStore";
const router = useRouter();

interface Session {
    session_id: number;
    date: string;
    time: string;
    available: boolean;
    modality: string;
    format: string;
    link: string;
    coordinates: string | null;
    professional: Professional;
}

interface FutureSessionsResponse extends APIResponse {
    sessions: Session[];
}

interface PastSessionsResponse extends APIResponse {
    sessions: Session[];
}

const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const goToScheduledSessions = () => {
    //route push to sessions.vue
    router.push("/user/dashboard/sessions");
};

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const actualSession = ref<Session | null>(null);

const userId = userStore.user?.user_id;
const headers = useRequestHeaders(["cookie"]);
const sessionInfoModal = ref<Modal | null>(null);

const openSessionModal = (session: Session) => {
    actualSession.value = session;
    sessionInfoModal.value?.openModal();
};

// Fetch future sessions
const { data: futureSessions, pending: futureSessionsLoading } =
    await useFetch<FutureSessionsResponse>(
        `${runtimeConfig.public.apiBase}/student/${userId}/sessions/soon`,
        {
            method: "GET",
            credentials: "include",
            lazy: true,
        },
    );

// Fetch past sessions
const { data: pastSessions, pending: pastSessionsLoading } = await useFetch<PastSessionsResponse>(
    `${runtimeConfig.public.apiBase}/student/${userId}/sessions/last`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

onMounted(() => {
    console.log(runtimeConfig.public.apiBase);
});
</script>
