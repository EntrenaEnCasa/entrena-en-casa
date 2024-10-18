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
            <div v-else-if="futureSessions?.data" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div
                    v-for="session in futureSessions.data"
                    :key="session.session_id"
                    class="rounded-2xl bg-white shadow-lg"
                >
                    <div class="space-y-4 px-6 py-4">
                        <div class="flex justify-between text-sm text-gray-400">
                            <p>{{ formatDate(session.date) }}</p>
                            <p>{{ session.time }}hrs</p>
                        </div>
                        <div class="space-y-2 text-center">
                            <h4 class="text-2xl font-semibold">{{ session.format }}</h4>
                            <p class="text-xl font-medium text-secondary">
                                {{ getLocation(session) }}
                            </p>
                            <p class="text-gray-600">
                                {{ session.actual_assistant }} Participante(s)
                            </p>
                        </div>
                        <div class="text-center">
                            <button
                                class="rounded-md bg-primary px-4 py-2 font-medium text-white"
                                @click="viewSessionDetails(session)"
                            >
                                Ver detalles
                            </button>
                        </div>
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
            <div
                v-else-if="pastSessions?.data"
                class="grid grid-cols-1 gap-6 opacity-60 lg:grid-cols-2"
            >
                <div
                    v-for="session in pastSessions.data"
                    :key="session.session_id"
                    class="space-y-4 rounded-2xl bg-white px-6 py-4 shadow-lg"
                >
                    <div class="flex justify-between text-sm text-gray-400">
                        <p>{{ formatDate(session.date) }}</p>
                        <p>{{ session.time }}hrs</p>
                    </div>
                    <div class="space-y-2 text-center">
                        <h4 class="text-xl font-medium">{{ session.format }}</h4>
                        <p class="text-lg font-medium text-secondary">
                            {{ getLocation(session) }}
                        </p>
                        <p class="text-gray-600">{{ session.actual_assistant }} Participante(s)</p>
                    </div>
                    <div class="text-center">
                        <CommonButton
                            class="rounded-md px-4 py-2 font-medium text-white"
                            @click="viewSessionDetails(session)"
                        >
                            Ver detalles
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <CommonModal ref="detailsModal">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Detalles de la Sesión
            </h3>
            <div class="mt-2">
                <p class="text-sm text-gray-500">
                    <strong>Fecha:</strong>
                    {{ formatDate(selectedSession?.date ?? "") }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Hora:</strong> {{ selectedSession?.time }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Formato:</strong> {{ selectedSession?.format }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Modalidad:</strong> {{ selectedSession?.modality }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Ubicación:</strong> {{ getLocation(selectedSession) }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Participantes:</strong>
                    {{ selectedSession?.actual_assistant }}
                </p>
            </div>
        </div>
    </CommonModal>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

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

const getLocation = (session: Session | null) => {
    if (!session) return "";
    return session.modality.toLowerCase() === "online"
        ? "Online"
        : session.coordinates || "Presencial";
};

const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
};

const detailsModal = ref<Modal | null>(null);
const selectedSession = ref<Session | null>(null);

const viewSessionDetails = (session: Session) => {
    selectedSession.value = session;
    detailsModal.value?.openModal();
};

const closeModal = () => {
    detailsModal.value?.closeModal();
    selectedSession.value = null;
};
</script>
