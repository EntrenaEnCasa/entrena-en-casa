<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-4 py-4 sm:px-6">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <div class="mx-auto flex max-w-max flex-col py-2">
                            <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                        </div>
                        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <label class="flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium">Formato</span>
                                <select
                                    v-model="modal.data.selectedFormat"
                                    class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                                >
                                    <option value="Personalizado">Personalizado</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium">Modalidad</span>
                                <select
                                    v-model="modal.data.selectedModality"
                                    class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                                >
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </label>
                            <label
                                v-show="modal.data.selectedModality === 'Online'"
                                class="col-span-full flex flex-col"
                            >
                                <span class="mb-2 text-sm font-medium">Link</span>
                                <input
                                    v-model="modal.data.link"
                                    type="text"
                                    placeholder="https://"
                                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                />
                            </label>
                            <div v-if="modal.data?.event?.clients.length > 0" class="col-span-2">
                                <label class="flex w-full flex-col">
                                    <span class="mb-2 text-sm font-medium">Clientes</span>
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:clients="modal.data.clients"
                                        :selectedFormat="modal.data.selectedFormat"
                                    />
                                </label>
                            </div>
                        </div>
                        <div
                            v-show="
                                modal.data.selectedFormat === 'Grupal' &&
                                modal.data.selectedModality === 'Presencial'
                            "
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
                                        :options="{ draggable: isDraggable }"
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
                    </form>
                    <div>
                        <div
                            class="flex flex-col-reverse justify-between gap-x-4 gap-y-2 sm:flex-row"
                        >
                            <CommonButton
                                @click="modal.removeSession"
                                :loading="modal.data.removeSessionLoading"
                                class="bg-tertiary px-4 py-2"
                            >
                                Eliminar sesión
                            </CommonButton>

                            <CommonButton
                                @click="modal.updateSession"
                                :loading="modal.data.updateSessionLoading"
                                class="px-4 py-2"
                            >
                                Guardar cambios
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";

interface ModalData {
    data: {
        selectedModality: string;
        selectedFormat: string;
        link: string;
        clients: any[];
        event: any;
        locationCoordinates: number[];
        removeSessionLoading: boolean;
        updateSessionLoading: boolean;
    };
    openModal: () => void;
    closeModal: () => void;
    handleClick: () => void;
    updateSession: () => void;
    removeSession: () => void;
}

interface CustomGeocoder {
    updateSearchTerm: (term: string) => void;
}

const DEFAULT_COORDINATES: TupleCoordinate = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref<TupleCoordinate>(DEFAULT_COORDINATES);
const isDraggable = ref(false);

const mapID = "editEmptySessionMap";
const mapRef = useMapboxRef(mapID);

const markerID = "editEmptySessionMarker";
const markerRef = useMapboxMarkerRef(markerID);

const currentZoom = computed(() => mapRef.value?.getZoom());
const getMarkerCoordinates = () => markerCoordinates.value;

const modalRef = ref<Modal | null>(null);
const geocoderRef = ref<CustomGeocoder | null>(null);

const { getReverseGeocodingData } = useGeocoding();
const { flyTo, teleportTo, calculateDistance, calculateDurationBasedOnDistance } =
    useMapInteraction(mapRef);

const onMarkerDragEnd = () => {
    if (!markerRef.value) return;
    const coordinates = markerRef.value.getLngLat().toArray();
    setMarkerCoordinates(coordinates);
    flyToCenter();
    updateInputValue();
};

const setMarkerCoordinates = (coordinates: TupleCoordinate) => {
    markerCoordinates.value = coordinates;
    props.modal.data.locationCoordinates = coordinates;
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
    [() => props.modal.data.selectedModality, () => props.modal.data.selectedFormat],
    ([newModality, newFormat]) => {
        if (newModality === "Presencial" && newFormat === "Grupal") {
            modalRef.value?.scrollToBottom();
        }
    },
);

const handleOpenModal = () => {
    modalRef.value?.openModal();
};

const handleCloseModal = () => {
    modalRef.value?.closeModal();
};

watch(
    () => props.modal.data.event,
    (newEvent) => {
        console.log(newEvent);
        if (newEvent === null || !newEvent.session_info.coordinates) return;
        const coordinates = JSON.parse(newEvent.session_info.coordinates);
        setMarkerCoordinates(coordinates);
        updateInputValue();
        teleportTo(coordinates);
    },
);

watch(markerCoordinates, (newCoordinates) => {
    props.modal.data.locationCoordinates = newCoordinates;
});

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});
</script>
