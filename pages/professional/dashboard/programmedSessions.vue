<template>
    <div class="space-y-6">
        <div>
            <h3 class="mb-5 text-xl font-medium">Sesiones próximas</h3>
            <div v-if="futureSessionsStatus === 'pending'" class="text-center">
                <CommonLoading text="Cargando sesiones proximas..." />
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
                <CommonCard v-for="session in futureSessions.data" :key="session.session_id">
                    <div class="flex justify-between text-gray-400">
                        <p>{{ formatDateToFullLongFormat(session.date) }}</p>
                        <p>{{ session.time }}hrs</p>
                    </div>

                    <div class="space-y-2 text-center">
                        <h4 class="text-2xl font-semibold">{{ session.format }}</h4>
                        <p class="text-xl font-medium text-secondary">{{ session.modality }}</p>
                        <p class="text-gray-600">
                            {{ session.actual_assistant }}
                            {{ session.actual_assistant === 1 ? "Participante" : "Participantes" }}
                        </p>
                    </div>

                    <div class="text-center">
                        <button
                            class="rounded-md bg-primary px-5 py-2 font-medium text-white"
                            @click="viewSessionDetails(session)"
                        >
                            Ver detalles
                        </button>
                    </div>
                </CommonCard>
            </div>
        </div>

        <div>
            <h3 class="mb-5 text-xl font-medium">Sesiones pasadas (Últimas 10)</h3>
            <div v-if="pastSessionsStatus === 'pending'" class="text-center">
                <CommonLoading text="Cargando sesiones pasadas..." />
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
                    <div class="flex justify-between text-gray-400">
                        <p>{{ formatDateToFullLongFormat(session.date) }}</p>
                        <p>{{ session.time }}hrs</p>
                    </div>
                    <div class="space-y-2 text-center">
                        <h4 class="text-xl font-medium">{{ session.format }}</h4>
                        <p class="text-lg font-medium text-secondary">
                            {{ session.modality }}
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
        <div v-if="selectedSession" class="bg-white p-4">
            <h3 class="mb-4 text-center text-2xl font-semibold text-gray-900" id="modal-title">
                Detalles de la Sesión
            </h3>
            <div class="mt-2 space-y-2">
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Fecha:</h4>
                    <p class="font-semibold">
                        {{ formatDateToFullLongFormat(selectedSession.date) }}
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Hora:</h4>
                    <p class="font-semibold">{{ selectedSession.time }}</p>
                </div>
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Formato:</h4>
                    <p class="font-semibold">{{ selectedSession.format }}</p>
                </div>
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Modalidad:</h4>
                    <p class="font-semibold">{{ selectedSession.modality }}</p>
                </div>
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Participantes:</h4>
                    <p class="font-semibold">
                        {{ selectedSession.actual_assistant }}
                        {{
                            selectedSession.actual_assistant == 1 ? "Participante" : "Participantes"
                        }}
                    </p>
                </div>
            </div>
        </div>
    </CommonModal>
</template>

<script setup lang="ts">
import { useFormatter } from "~/composables/time/useFormatter";

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const formatter = useFormatter();

const { formatDateToFullLongFormat } = formatter;

interface SessionsResponse extends APIResponse {
    data: Session[];
}

const { data: futureSessions, status: futureSessionsStatus } = useFetch<SessionsResponse>(
    `${runtimeConfig.public.apiBase}/professional/future-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
    },
);

const { data: pastSessions, status: pastSessionsStatus } = useFetch<SessionsResponse>(
    `${runtimeConfig.public.apiBase}/professional/past-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
    },
);

const detailsModal = ref<Modal | null>(null);
const selectedSession = ref<Session | null>(null);

const viewSessionDetails = (session: Session) => {
    selectedSession.value = session;
    detailsModal.value?.openModal();
};
</script>
