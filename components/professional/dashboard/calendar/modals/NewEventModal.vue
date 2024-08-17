<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <label class="w-full">
                            <select
                                class="mb-6 border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5"
                                v-model="modal.data.selectedEventType">
                                <option value="Nuevo entrenamiento">
                                    Nuevo entrenamiento
                                </option>
                                <option value="Evento personal">
                                    Evento personal
                                </option>
                            </select>
                        </label>
                        <div
                            v-show="
                                modal.data.selectedEventType ==
                                'Evento personal'
                            "
                            class="grid gap-6 mb-6 md:grid-cols-2">
                            <label
                                class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2"
                                    >Horario</span
                                >
                                <ProfessionalDashboardCalendarTimeRange
                                    :isManual="true" />
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2"
                                        >Clientes (opcional)</span
                                    >
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:clients="
                                            modal.data.personalEvent.clients
                                        "
                                        :selectedFormat="
                                            modal.data.personalEvent
                                                .selectedFormat
                                        " />
                                </label>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2"
                                    >Información adicional (opcional)</span
                                >
                                <textarea
                                    v-model="
                                        modal.data.personalEvent.additionalInfo
                                    "
                                    placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                                    rows="4"></textarea>
                            </label>
                        </div>
                        <div
                            v-show="
                                modal.data.selectedEventType ==
                                'Nuevo entrenamiento'
                            "
                            class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label
                                class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2"
                                    >Horario</span
                                >
                                <ProfessionalDashboardCalendarTimeRange
                                    :isManual="false" />
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2"
                                    >Clientes</span
                                >
                                <ProfessionalDashboardCalendarClientSearchInput
                                    v-model:clients="
                                        modal.data.manualSession.clients
                                    "
                                    :selectedFormat="
                                        modal.data.manualSession.selectedFormat
                                    " />
                            </label>

                            <div class="grid gap-6 md:grid-cols-2 col-span-2">
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2"
                                        >Formato</span
                                    >
                                    <select
                                        v-model="
                                            modal.data.manualSession
                                                .selectedFormat
                                        "
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Personalizado">
                                            Personalizado
                                        </option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2"
                                        >Modalidad</span
                                    >
                                    <select
                                        v-model="
                                            modal.data.manualSession
                                                .selectedModality
                                        "
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Online">Online</option>
                                        <option value="Presencial">
                                            Presencial
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <label
                                v-show="
                                    modal.data.manualSession
                                        .selectedModality === 'Online'
                                "
                                class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2"
                                    >Link</span
                                >
                                <input
                                    v-model="modal.data.manualSession.link"
                                    type="text"
                                    placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary" />
                            </label>
                            <div
                                v-show="
                                    modal.data.manualSession
                                        .selectedModality === 'Presencial'
                                "
                                class="flex flex-col col-span-full">
                                <span class="font-medium text-sm mb-2"
                                    >Ubicación</span
                                >
                                <MapsMapboxGeocoder
                                    ref="geocoderRef"
                                    @locationSelected="flyToLocation" />
                                <div
                                    class="relative flex justify-center w-full h-full min-h-[250px] lg:min-w-[400px] mt-5">
                                    <MapboxMap
                                        :map-id="mapID"
                                        class="w-full h-full rounded-xl"
                                        :options="{
                                            style: 'mapbox://styles/mapbox/streets-v12',
                                            center: DEFAULT_COORDINATES,
                                            zoom: DEFAULT_ZOOM,
                                        }">
                                        <MapboxDefaultMarker
                                            :marker-id="markerID"
                                            :options="{
                                                draggable: isDraggable,
                                            }"
                                            :lnglat="markerCoordinates"
                                            @dragend="onMarkerDragEnd">
                                        </MapboxDefaultMarker>
                                        <MapboxNavigationControl />
                                    </MapboxMap>
                                </div>
                                <div
                                    v-show="!isDraggable"
                                    class="flex flex-col items-center text-secondary mt-3">
                                    <p>¿El pin no coincide con la ubicación?</p>
                                    <button
                                        class="underline font-medium"
                                        @click.prevent="isDraggable = true">
                                        Ajustar ubicación
                                    </button>
                                </div>
                                <div
                                    v-show="isDraggable"
                                    class="flex flex-col items-center text-secondary mt-3">
                                    <button
                                        class="underline font-medium"
                                        @click.prevent="isDraggable = false">
                                        Dejar de ajustar ubicación
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- 
                        <div class="flex items-center my-10">
                            <input id="checkbox" type="checkbox" class="w-4 h-4 accent-primary-600 rounded">
                            <label for="checkbox" class="ms-2 text-sm text-gray-500">Enviar
                                notificación del evento</label>
                        </div> -->
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <CommonButton
                                @click="modal.closeModal"
                                class="px-4 py-2 bg-tertiary text-white">
                                Cancelar
                            </CommonButton>
                            <CommonButton
                                @click="modal.addNewEvent"
                                class="px-4 py-2"
                                :loading="modal?.data.loading">
                                Crear evento
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";

interface ModalData {
    data: {
        selectedEventType: string;
        loading: boolean;
        manualSession: {
            clients: any[];
            selectedFormat: "Personalizado" | "Grupal";
            selectedModality: "Online" | "Presencial";
            link: string;
            locationCoordinates: number[];
        };
        personalEvent: {
            clients: any[];
            selectedFormat: "Personalizado" | "Grupal";
            additionalInfo: string;
        };
    };
    openModal: () => void;
    closeModal: () => void;
    resetModalData: () => void;
    handleClick: () => void;
    addNewEvent: () => void;
}

interface CustomGeocoder {
    updateSearchTerm: (term: string) => void;
}

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref(DEFAULT_COORDINATES);
const isDraggable = ref(false);

const mapID = "newEventMap";
const mapRef = useMapboxRef(mapID);

const markerID = "newEventMarker";
const markerRef = useMapboxMarkerRef(markerID);

const currentZoom = computed(() => mapRef.value?.getZoom());
const getMarkerCoordinates = () => markerCoordinates.value;

const modalRef = ref<Modal | null>(null);
const geocoderRef = ref<CustomGeocoder | null>(null);

const { getReverseGeocodingData } = useGeocoding();
const { flyTo, calculateDistance, calculateDurationBasedOnDistance } =
    useMapInteraction(mapRef);

const onMarkerDragEnd = () => {
    const coordinates = markerRef.value.getLngLat().toArray();
    setMarkerCoordinates(coordinates);
    flyToCenter();
    updateInputValue();
};

const setMarkerCoordinates = (coordinates: number[]) => {
    markerCoordinates.value = coordinates;
};

const flyToCenter = () => {
    const zoom = currentZoom.value;
    const coordinates = getMarkerCoordinates();
    flyTo(coordinates, zoom, {
        speed: 0.5,
    });
};

const updateInputValue = async () => {
    const geocodingData = await getReverseGeocodingData(getMarkerCoordinates());
    const address = geocodingData.place_name;
    geocoderRef.value?.updateSearchTerm(address);
};

const flyToLocation = (location: any) => {
    const newCoordinates = location.center;
    const currentLocation = mapRef.value?.getCenter().toArray();
    const distance = calculateDistance(currentLocation, newCoordinates);
    const duration = calculateDurationBasedOnDistance(distance);
    const zoom = DEFAULT_ZOOM;

    flyTo(newCoordinates, zoom, { duration });

    setMarkerCoordinates(newCoordinates);
};

const props = defineProps<{
    modal: ModalData;
}>();

watch(
    () => props.modal.data.manualSession.selectedModality,
    (newModality) => {
        if (newModality === "Presencial") {
            modalRef.value?.scrollToBottom();
        }
    }
);

watch(markerCoordinates, (newCoordinates) => {
    props.modal.data.manualSession.locationCoordinates = newCoordinates;
});

const handleOpenModal = () => {
    modalRef.value?.openModal();
};

const handleCloseModal = () => {
    modalRef.value?.closeModal();
};

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});

onMounted(() => {
    updateInputValue();
    props.modal.data.manualSession.locationCoordinates =
        markerCoordinates.value;
});
</script>
