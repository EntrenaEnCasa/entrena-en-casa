<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-4 py-4 sm:px-6">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <label class="w-full">
                            <select
                                class="mb-6 w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800"
                                v-model="modal.data.selectedEventType"
                            >
                                <option value="Nuevo entrenamiento">Nuevo entrenamiento</option>
                                <option value="Evento personal">Evento personal</option>
                            </select>
                        </label>
                        <div
                            v-show="modal.data.selectedEventType == 'Evento personal'"
                            class="mb-6 grid gap-6 md:grid-cols-2"
                        >
                            <label class="col-span-2 flex flex-col items-center">
                                <span class="mb-2 text-sm font-medium">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="true" />
                            </label>
                            <label class="col-span-2 flex w-full flex-col">
                                <label class="flex w-full flex-col">
                                    <span class="mb-2 text-sm font-medium"
                                        >Clientes (opcional)</span
                                    >
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:clients="modal.data.personalEvent.clients"
                                        :selectedFormat="modal.data.personalEvent.selectedFormat"
                                    />
                                </label>
                            </label>

                            <label class="col-span-2 flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium"
                                    >Información adicional (opcional)</span
                                >
                                <textarea
                                    v-model="modal.data.personalEvent.additionalInfo"
                                    placeholder="Ingresar detalles del cliente"
                                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                    rows="4"
                                ></textarea>
                            </label>
                        </div>
                        <div
                            v-show="modal.data.selectedEventType == 'Nuevo entrenamiento'"
                            class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            <label class="col-span-2 flex flex-col items-center">
                                <span class="mb-2 text-sm font-medium">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                            </label>

                            <label class="col-span-2 flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium">Clientes</span>
                                <ProfessionalDashboardCalendarClientSearchInput
                                    v-model:clients="modal.data.manualSession.clients"
                                    :selectedFormat="modal.data.manualSession.selectedFormat"
                                />
                            </label>

                            <div class="col-span-2 grid gap-6 md:grid-cols-2">
                                <label class="flex flex-col">
                                    <span class="mb-2 text-sm font-medium">Formato</span>
                                    <select
                                        v-model="modal.data.manualSession.selectedFormat"
                                        class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                                    >
                                        <option value="Personalizado">Personalizado</option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="mb-2 text-sm font-medium">Modalidad</span>
                                    <select
                                        v-model="modal.data.manualSession.selectedModality"
                                        class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Presencial">Presencial</option>
                                    </select>
                                </label>
                            </div>
                            <label
                                v-show="modal.data.manualSession.selectedModality === 'Online'"
                                class="col-span-2 flex w-full flex-col"
                            >
                                <span class="mb-2 text-sm font-medium">Link</span>
                                <input
                                    v-model="modal.data.manualSession.link"
                                    type="text"
                                    placeholder="https://"
                                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                />
                            </label>
                            <div
                                v-show="modal.data.manualSession.selectedModality === 'Presencial'"
                                class="col-span-full flex flex-col"
                            >
                                <span class="mb-2 text-sm font-medium">Ubicación</span>
                                <MapsMapboxGeocoder
                                    ref="geocoderRef"
                                    @locationSelected="flyToLocation"
                                />
                                <div
                                    class="relative mt-5 flex h-full min-h-[250px] w-full justify-center lg:min-w-[400px]"
                                >
                                    <MapboxMap
                                        :map-id="mapID"
                                        class="h-full w-full rounded-xl"
                                        :options="{
                                            style: 'mapbox://styles/mapbox/streets-v12',
                                            center: DEFAULT_COORDINATES,
                                            zoom: DEFAULT_ZOOM,
                                        }"
                                    >
                                        <MapboxDefaultMarker
                                            :marker-id="markerID"
                                            :options="{
                                                draggable: isDraggable,
                                            }"
                                            :lnglat="markerCoordinates"
                                            @dragend="onMarkerDragEnd"
                                        >
                                        </MapboxDefaultMarker>
                                        <MapboxNavigationControl />
                                    </MapboxMap>
                                </div>
                                <div
                                    v-show="!isDraggable"
                                    class="mt-3 flex flex-col items-center text-secondary"
                                >
                                    <p>¿El pin no coincide con la ubicación?</p>
                                    <button
                                        class="font-medium underline"
                                        @click.prevent="isDraggable = true"
                                    >
                                        Ajustar ubicación
                                    </button>
                                </div>
                                <div
                                    v-show="isDraggable"
                                    class="mt-3 flex flex-col items-center text-secondary"
                                >
                                    <button
                                        class="font-medium underline"
                                        @click.prevent="isDraggable = false"
                                    >
                                        Dejar de ajustar ubicación
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div
                            class="flex flex-col-reverse justify-between gap-x-4 gap-y-2 sm:flex-row"
                        >
                            <CommonButton
                                @click="modal.closeModal"
                                class="bg-tertiary px-4 py-2 text-white"
                            >
                                Cancelar
                            </CommonButton>
                            <CommonButton
                                @click="modal.addNewEvent"
                                class="px-4 py-2"
                                :loading="modal?.data.loading"
                            >
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

const DEFAULT_COORDINATES: TupleCoordinate = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref<TupleCoordinate>(DEFAULT_COORDINATES);
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
const { flyTo, calculateDistance, calculateDurationBasedOnDistance } = useMapInteraction(mapRef);

const onMarkerDragEnd = () => {
    if (!markerRef.value) return;
    const coordinates = markerRef.value.getLngLat().toArray();
    setMarkerCoordinates(coordinates);
    flyToCenter();
    updateInputValue();
};

const setMarkerCoordinates = (coordinates: TupleCoordinate) => {
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
    },
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
    props.modal.data.manualSession.locationCoordinates = markerCoordinates.value;
});
</script>
