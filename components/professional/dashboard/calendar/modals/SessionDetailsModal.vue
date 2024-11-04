<template>
    <CommonModal ref="modalRef">
        <div class="px-4 py-4 text-center sm:px-6">
            <h2 class="mb-4 text-2xl font-semibold">Información de la sesión</h2>
            <p class="text-lg font-medium">
                {{ eventTypeText }}
            </p>
            <p class="mb-4">{{ event?.start_time }} - {{ event?.end_time }}</p>

            <template v-if="event">
                <template v-if="['session', 'manual_session'].includes(event.type)">
                    <h5 class="text-lg font-medium">Formato</h5>
                    <p class="mb-4">{{ event.session_info.format }}</p>
                    <h5 class="text-lg font-medium">Modalidad</h5>
                    <p class="mb-4">{{ event.session_info.modality }}</p>

                    <!-- Link section -->
                    <template v-if="event.session_info.modality === 'Online'">
                        <h5 class="text-lg font-medium">Link de acceso</h5>
                        <a
                            v-if="event.session_info.link"
                            :href="event.session_info.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="mb-4 inline-block text-blue-600 underline hover:text-blue-800"
                        >
                            {{ event.session_info.link }}
                        </a>
                        <div v-else class="mb-4">
                            <p class="text-gray-600">Aún no has proporcionado un link de acceso</p>
                            <p class="text-xs text-gray-500">
                                Recuerda añadirlo para que el estudiante pueda acceder a la sesión.
                            </p>
                        </div>
                    </template>

                    <!-- Map section -->
                    <template
                        v-if="
                            event.session_info.modality === 'Presencial' &&
                            event.session_info.coordinates
                        "
                    >
                        <h5 class="mb-2 text-lg font-medium">Ubicación</h5>
                        <p class="mb-4 text-gray-600">
                            {{ locationAddress || "Cargando dirección..." }}
                        </p>
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
                    </template>
                </template>

                <template v-if="event.type === 'personal'">
                    <h5 class="text-lg font-medium">Detalles</h5>
                    <p class="mb-4">{{ event.info }}</p>
                </template>

                <h5 class="text-lg font-medium">Clientes</h5>
                <p v-if="event.clients.length === 0">Aún no hay clientes agendados</p>
                <ul v-else class="mb-4">
                    <li v-for="client in event.clients" :key="client.id">
                        <p>
                            {{ client.first_name }} {{ client.last_name }} -
                            {{ client.email }}
                        </p>
                    </li>
                </ul>
            </template>
        </div>
    </CommonModal>
</template>

<script setup>
import { useGeocoding } from "~/composables/maps/useGeocoding";

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const props = defineProps({
    modal: Object,
});

const event = computed(() => props.modal.data.event);
const mapID = "viewSessionMap";
const markerID = "viewSessionMarker";
const locationAddress = ref("");

const { getReverseGeocodingData } = useGeocoding();

const coordinates = computed(() => {
    if (event.value?.session_info?.coordinates) {
        try {
            return JSON.parse(event.value.session_info.coordinates);
        } catch (e) {
            console.error("Error parsing coordinates:", e);
            return DEFAULT_COORDINATES;
        }
    }
    return DEFAULT_COORDINATES;
});

const eventTypeText = computed(() => {
    switch (event.value?.type) {
        case "personal":
            return "Evento personal";
        case "session":
            return event.value.clients.length === 0 ? "Hora disponible" : "Hora agendada";
        case "manual_session":
            return "Sesión manual";
        default:
            return "";
    }
});

const updateLocationAddress = async () => {
    if (event.value?.session_info?.coordinates) {
        try {
            const geocodingData = await getReverseGeocodingData(coordinates.value);
            locationAddress.value = geocodingData.place_name;
        } catch (e) {
            console.error("Error getting address:", e);
            locationAddress.value = "No se pudo cargar la dirección";
        }
    }
};

const modalRef = ref(null);

const openModal = async () => {
    console.log(props.modal.data.event);
    modalRef.value?.openModal();
    if (
        event.value?.session_info?.modality === "Presencial" &&
        event.value?.session_info?.coordinates
    ) {
        await updateLocationAddress();
    }
};

const closeModal = () => {
    modalRef.value?.closeModal();
    locationAddress.value = ""; // Reset address when closing
};

// Update address when event changes
watch(
    () => event.value?.session_info?.coordinates,
    async (newCoordinates) => {
        if (newCoordinates && event.value?.session_info?.modality === "Presencial") {
            await updateLocationAddress();
        }
    },
);

defineExpose({ openModal, closeModal });
</script>
