<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select
                                    v-model="modal.data.selectedFormat"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Personalizado">Personalizado</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="flex flex-col">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select
                                    v-model="modal.data.selectedModality"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Online">Online</option>
                                    <option>Presencial</option>
                                </select>
                            </label>
                            <label
                                v-show="modal.data.selectedModality === 'Online'"
                                class="flex flex-col col-span-full">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input
                                    v-model="modal.data.link"
                                    type="text"
                                    placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary" />
                            </label>
                            <div
                                v-show="
                                    modal.data.selectedFormat === 'Grupal' &&
                                    modal.data.selectedModality === 'Presencial'
                                "
                                class="flex flex-col col-span-full">
                                <span class="font-medium text-sm mb-2">Ubicación</span>
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
                    </form>
                    <div>
                        <p class="text-sm text-gray-500 mb-4 text-center max-w-xl">
                            * Para sesiones presenciales personalizadas se aplicarán los rangos de
                            cobertura propuestos en la sección "Mi perfil"
                        </p>
                        <div
                            class="flex flex-col-reverse sm:flex-row gap-y-2 gap-x-4 justify-between">
                            <CommonButton @click="modal.closeModal" class="px-4 py-2 bg-tertiary">
                                Cancelar
                            </CommonButton>
                            <CommonButton
                                @click="modal.addNewEmptySession"
                                class="px-4 py-2"
                                :loading="modal.loading">
                                Crear sesión
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
        selectedModality: string;
        selectedFormat: string;
        link: string;
        locationCoordinates: number[];
    };
    loading: boolean;
    openModal: () => void;
    closeModal: () => void;
    addNewEmptySession: () => void;
    resetModalData: () => void;
    handleClickFromButton: () => void;
}

interface CustomGeocoder {
    updateSearchTerm: (term: string) => void;
}

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref(DEFAULT_COORDINATES);
const isDraggable = ref(false);

const mapID = "emptySessionMap";
const mapRef = useMapboxRef(mapID);

const markerID = "emptySessionMarker";
const markerRef = useMapboxMarkerRef(markerID);

const currentZoom = computed(() => mapRef.value?.getZoom());
const getMarkerCoordinates = () => markerCoordinates.value;

const modalRef = ref<Modal | null>(null);
const geocoderRef = ref<CustomGeocoder | null>(null);

const { getReverseGeocodingData } = useGeocoding();
const { flyTo, calculateDistance, calculateDurationBasedOnDistance } = useMapInteraction(mapRef);

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
    [() => props.modal.data.selectedModality, () => props.modal.data.selectedFormat],
    ([newModality, newFormat]) => {
        if (newModality === "Presencial" && newFormat === "Grupal") {
            modalRef.value?.scrollToBottom();
        }
    }
);

watch(markerCoordinates, (newCoordinates) => {
    props.modal.data.locationCoordinates = newCoordinates;
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
    props.modal.data.locationCoordinates = markerCoordinates.value;
});
</script>
