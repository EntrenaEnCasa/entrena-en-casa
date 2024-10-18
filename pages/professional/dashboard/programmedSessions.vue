<template>
    <div class="space-y-6">
        <div>
            <h3 class="mb-5 text-xl font-medium">Sesiones próximas</h3>
            <div v-if="futureSessionsStatus === 'pending'" class="text-center">
                <p>Cargando sesiones próximas...</p>
            </div>
            <div v-else-if="futureSessionsStatus === 'error'" class="text-center text-red-500">
                <p>Error al cargar las sesiones próximas. Por favor, intente de nuevo más tarde.</p>
            </div>
            <div
                v-else-if="futureSessions?.data && futureSessions.data.length === 0"
                class="text-center"
            >
                <p>No hay sesiones próximas programadas.</p>
            </div>
            <div v-else-if="futureSessions?.data" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div
                    v-for="session in futureSessions.data"
                    :key="session.session_id"
                    class="space-y-4 rounded-md border bg-white px-6 py-3 shadow"
                >
                    <div class="flex justify-between text-sm text-gray-400">
                        <p>{{ session.date }}</p>
                        <p>{{ session.time }}hrs</p>
                    </div>
                    <div class="space-y-2 text-center">
                        <h4 class="text-xl font-medium">{{ session.format }}</h4>
                        <a href="#" class="text-lg font-medium text-secondary underline">{{
                            getLocation(session)
                        }}</a>
                        <p class="text-gray-400">{{ session.actual_assistant }} Participantes</p>
                    </div>
                    <div class="text-center">
                        <button class="rounded-md bg-primary px-2 py-1 font-medium text-white">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3 class="mb-5 text-xl font-medium">Sesiones pasadas (Últimas 10)</h3>
            <div v-if="pastSessionsStatus === 'pending'" class="text-center">
                <p>Cargando sesiones pasadas...</p>
            </div>
            <div v-else-if="pastSessionsStatus === 'error'" class="text-center text-red-500">
                <p>Error al cargar las sesiones pasadas. Por favor, intente de nuevo más tarde.</p>
            </div>
            <div
                v-else-if="pastSessions?.data && pastSessions.data.length === 0"
                class="text-center"
            >
                <p>No hay sesiones pasadas para mostrar.</p>
            </div>
            <div v-else-if="pastSessions?.data" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div
                    v-for="session in pastSessions.data"
                    :key="session.session_id"
                    class="space-y-4 rounded-md border bg-white px-6 py-3 opacity-60 shadow"
                >
                    <div class="flex justify-between text-sm text-gray-400">
                        <p>{{ session.date }}</p>
                        <p>{{ session.time }}hrs</p>
                    </div>
                    <div class="space-y-2 text-center">
                        <h4 class="text-xl font-medium">{{ session.format }}</h4>
                        <a href="#" class="text-lg font-medium text-secondary underline">{{
                            getLocation(session)
                        }}</a>
                        <p class="text-gray-400">{{ session.actual_assistant }} Participantes</p>
                    </div>
                    <div class="text-center">
                        <button class="rounded-md bg-primary px-2 py-1 font-medium text-white">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

interface APIResponse {
    success: boolean;
    message: string;
}

interface SessionsResponse extends APIResponse {
    data: Session[];
}

const { data: futureSessions, status: futureSessionsStatus } = await useFetch<SessionsResponse>(
    `${runtimeConfig.public.apiBase}/professional/future-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
    },
);

const { data: pastSessions, status: pastSessionsStatus } = await useFetch<SessionsResponse>(
    `${runtimeConfig.public.apiBase}/professional/past-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
    },
);

const getLocation = (session: Session) => {
    return session.modality.toLowerCase() === "online"
        ? "Online"
        : session.coordinates || "Presencial";
};
</script>
