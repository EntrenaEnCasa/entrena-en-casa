<template>
    <div class="space-y-6">
        <!-- Future Sessions Section -->
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
                <CommonCard v-for="session in futureSessions.data" :key="getSessionKey(session)">
                    <div class="flex justify-between text-gray-400">
                        <p>{{ formatDateToFullLongFormat(session.date) }}</p>
                        <p>{{ session.start_time }}hrs</p>
                    </div>

                    <div class="space-y-2 text-center">
                        <h4 class="text-2xl font-semibold">
                            {{ getSessionFormat(session) }}
                        </h4>
                        <p class="text-xl font-medium text-secondary">
                            {{ getSessionModality(session) }}
                        </p>
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

        <!-- Past Sessions Section -->
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
                    :key="getSessionKey(session)"
                    class="space-y-4 rounded-2xl bg-white px-6 py-4 shadow-lg"
                >
                    <div class="flex justify-between text-gray-400">
                        <p>{{ formatDateToFullLongFormat(session.date) }}</p>
                        <p>{{ session.start_time }}hrs</p>
                    </div>
                    <div class="space-y-2 text-center">
                        <h4 class="text-xl font-medium">
                            {{ getSessionFormat(session) }}
                        </h4>
                        <p class="text-lg font-medium text-secondary">
                            {{ getSessionModality(session) }}
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
                {{ getModalTitle(selectedSession) }}
            </h3>
            <div class="mt-2 space-y-4">
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Fecha:</h4>
                    <p class="font-semibold">
                        {{ formatDateToFullLongFormat(selectedSession.date) }}
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-x-4">
                    <h4 class="place-self-end">Hora:</h4>
                    <p class="font-semibold">
                        {{ selectedSession.start_time }} - {{ selectedSession.end_time }}
                    </p>
                </div>

                <!-- Format and Modality (not for personal events) -->
                <template v-if="selectedSession.type !== 'personal'">
                    <div class="grid grid-cols-2 gap-x-4">
                        <h4 class="place-self-end">Formato:</h4>
                        <p class="font-semibold">
                            {{ getSessionFormat(selectedSession) }}
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-x-4">
                        <h4 class="place-self-end">Modalidad:</h4>
                        <p class="font-semibold">
                            {{ getSessionModality(selectedSession) }}
                        </p>
                    </div>
                </template>

                <!-- Personal event info -->
                <template v-if="selectedSession.type === 'personal' && selectedSession.info">
                    <div class="col-span-2">
                        <h4 class="mb-2 text-center font-medium">Detalles</h4>
                        <p class="text-center">{{ selectedSession.info }}</p>
                    </div>
                </template>

                <!-- Online session link -->
                <template v-if="isOnlineSession && hasSessionLink">
                    <div class="grid grid-cols-2 gap-x-4">
                        <h4 class="place-self-end">Link de acceso:</h4>
                        <a
                            :href="getSessionLink(selectedSession)"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-600 underline hover:text-blue-800"
                        >
                            {{ getSessionLink(selectedSession) }}
                        </a>
                    </div>
                </template>

                <!-- In-person session location -->
                <template v-if="isInPersonSession && hasSessionLocation">
                    <div class="col-span-2">
                        <h4 class="mb-2 text-center font-medium">Ubicación</h4>
                        <div
                            class="relative mb-4 mt-2 flex h-full min-h-[250px] w-full justify-center lg:min-w-[400px]"
                        >
                            <MapboxMap
                                :map-id="mapID"
                                class="h-full w-full rounded-xl"
                                :options="{
                                    style: 'mapbox://styles/mapbox/streets-v12',
                                    center: coordinates,
                                    zoom: DEFAULT_ZOOM,
                                    interactive: false,
                                }"
                            >
                                <MapboxDefaultMarker
                                    :marker-id="markerID"
                                    :options="{
                                        draggable: false,
                                    }"
                                    :lnglat="coordinates"
                                >
                                </MapboxDefaultMarker>
                            </MapboxMap>
                        </div>
                        <p v-if="locationAddress" class="mt-2 text-center text-gray-600">
                            {{ locationAddress }}
                        </p>
                    </div>
                </template>

                <!-- Clients list -->
                <div class="col-span-2">
                    <h4 class="mb-2 text-center font-medium">Participantes</h4>
                    <div
                        v-if="selectedSession.clients.length === 0"
                        class="text-center text-gray-600"
                    >
                        No hay participantes registrados
                    </div>
                    <div v-else class="space-y-2">
                        <div
                            v-for="client in selectedSession.clients"
                            :key="client.user_id"
                            class="text-center"
                        >
                            <p>{{ client.first_name }} {{ client.last_name }}</p>
                            <p class="text-gray-600">{{ client.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CommonModal>
</template>

<script setup lang="ts">
import { useFormatter } from "~/composables/time/useFormatter";
import { useGeocoding } from "~/composables/maps/useGeocoding";

type Client = {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
};

type SessionInfo = {
    session_id: number;
    available: number;
    format: string;
    modality: string;
    link: string;
    coordinates: string | null;
};

// Base type with all possible fields
type SessionEvent = {
    event_id?: number;
    session_id?: number;
    date: string;
    start_time: string;
    end_time: string;
    type: "personal" | "manual_session" | "session";
    info?: string;
    clients: Client[];
    actual_assistant: number;
    session_info?: SessionInfo;
    format?: string;
    modality?: string;
};

interface APIResponse {
    success: boolean;
    message: string;
    data: SessionEvent[];
}

// Component setup
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const formatter = useFormatter();
const { getReverseGeocodingData } = useGeocoding();

const { formatDateToFullLongFormat } = formatter;

// Constants
const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;
const mapID = "viewSessionMap";
const markerID = "viewSessionMarker";
const locationAddress = ref("");

// Fetch data
const { data: futureSessions, status: futureSessionsStatus } = useFetch<APIResponse>(
    `${runtimeConfig.public.apiBase}/professional/future-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const { data: pastSessions, status: pastSessionsStatus } = useFetch<APIResponse>(
    `${runtimeConfig.public.apiBase}/professional/past-sessions/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const detailsModal = ref<Modal | null>(null);
const selectedSession = ref<SessionEvent | null>(null);

// Helper functions with null checks and fallbacks
const getSessionKey = (session: SessionEvent): number => {
    if (session.event_id) return session.event_id;
    if (session.session_info?.session_id) return session.session_info.session_id;
    if (session.session_id) return session.session_id;
    // Fallback to a combination of date and time if no ID is available
    return parseInt(session.date.replace(/-/g, "") + session.start_time.replace(":", ""));
};

const getSessionFormat = (session: SessionEvent): string => {
    if (session.type === "personal") return "Evento personal";
    return session.session_info?.format || session.format || "Formato no especificado";
};

const getSessionModality = (session: SessionEvent): string => {
    if (session.type === "personal") return "";
    return session.session_info?.modality || session.modality || "Modalidad no especificada";
};

const getSessionLink = (session: SessionEvent): string => {
    if (session.type === "personal") return "";
    return session.session_info?.link || "";
};

const getModalTitle = (session: SessionEvent): string => {
    switch (session.type) {
        case "personal":
            return "Evento Personal";
        case "manual_session":
            return "Sesión Manual";
        case "session":
            return session.session_info?.available || session.format
                ? "Hora Disponible"
                : "Sesión Agendada";
        default:
            return "Detalles de la Sesión";
    }
};

// Computed properties with null checks
const coordinates = computed(() => {
    if (!selectedSession.value) return DEFAULT_COORDINATES;
    const coords = selectedSession.value.session_info?.coordinates;
    if (!coords) return DEFAULT_COORDINATES;
    try {
        return JSON.parse(coords);
    } catch (e) {
        console.error("Error parsing coordinates:", e);
        return DEFAULT_COORDINATES;
    }
});

const isOnlineSession = computed(() => {
    if (!selectedSession.value) return false;
    const modality = selectedSession.value.session_info?.modality || selectedSession.value.modality;
    return modality === "Online";
});

const isInPersonSession = computed(() => {
    if (!selectedSession.value) return false;
    const modality = selectedSession.value.session_info?.modality || selectedSession.value.modality;
    return modality === "Presencial";
});

const hasSessionLink = computed(() => {
    if (!selectedSession.value) return false;
    const link = getSessionLink(selectedSession.value);
    return !!link && link.trim() !== "";
});

const hasSessionLocation = computed(() => {
    if (!selectedSession.value) return false;
    return !!selectedSession.value.session_info?.coordinates;
});

// Methods
const updateLocationAddress = async () => {
    if (isInPersonSession.value && hasSessionLocation.value) {
        try {
            const geocodingData = await getReverseGeocodingData(coordinates.value);
            locationAddress.value = geocodingData.place_name;
        } catch (e) {
            console.error("Error getting address:", e);
            locationAddress.value = "No se pudo cargar la dirección";
        }
    }
};

const viewSessionDetails = async (session: SessionEvent) => {
    console.log("Session details:", session);
    selectedSession.value = session;
    detailsModal.value?.openModal();
    if (isInPersonSession.value && hasSessionLocation.value) {
        await updateLocationAddress();
    }
};

// Reset address when modal closes
watch(
    detailsModal,
    () => {
        locationAddress.value = "";
    },
    { deep: true },
);
</script>
