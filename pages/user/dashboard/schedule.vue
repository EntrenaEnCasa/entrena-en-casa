<template>
    <div class="relative">
        <div>
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-medium">Agendar sesión</h3>
                <button @click="openLocationModal"
                    class="place-self-center rounded-md px-4 py-2 flex bg-gray-200 text-gray-500 gap-x-2"
                    :class="{ 'invisible': isOnline }">
                    <Icon name="heroicons:map-pin" class="text-2xl" />
                    <div class="flex-grow max-w-xs">
                        <p v-show="!selectedLocation" class="truncate overflow-hidden whitespace-nowrap">Ubicación</p>
                        <p v-show="selectedLocation" class="truncate overflow-hidden whitespace-nowrap">{{ selectedLocation
                        }}</p>
                    </div>
                </button>
                <div class="flex items-center gap-2 place-self-end">
                    <span :class="{ 'text-gray-400': isOnline }">Presencial</span>
                    <!-- Toggle container -->
                    <button class="relative w-14 h-8 rounded-full p-1" :class="[isOnline ? 'bg-secondary' : 'bg-primary']"
                        @click="isOnline = !isOnline">
                        <!-- Toggle thumb -->
                        <div class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"
                            :class="{ 'translate-x-6': isOnline }"></div>
                    </button>
                    <span :class="{ 'text-gray-400': !isOnline }">Online</span>
                </div>
            </div>
            <div class="mt-16 flex items-center justify-between">
                <button @click="goToPreviousWeekAndUpdateSelectedDate" :disabled="isStartWeek" class="group">
                    <Icon
                        class="text-5xl text-secondary group-disabled:text-secondary-200 group-disabled:cursor-not-allowed"
                        name="heroicons:chevron-left-20-solid" />
                </button>
                <div class="flex gap-x-2">
                    <span v-for="(day, index) in weekDays" @click="selectedDate = day" :key="index"
                        class="rounded-md bg-gray-200 py-2 px-4 flex flex-col items-center text-gray-700 min-w-32 outline"
                        :class="[day.toISOString() === selectedDate.toISOString() ? 'outline-secondary' : 'cursor-pointer outline-transparent']">
                        <span class="text-2xl font-semibold">{{ formatDate(day).day + ' ' }}</span>
                        <span class="capitalize">{{ formatDate(day).month }}</span>
                    </span>
                </div>
                <button @click="goToNextWeekAndUpdateSelectedDate">
                    <Icon class="text-5xl text-secondary" name="heroicons:chevron-right-20-solid" />
                </button>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="locationModal">
                <div class="px-2 py-4">
                    <h2 class="text-xl font-semibold text-center mb-6">Ingresa tu dirección</h2>
                    <MapsMapboxGeocoder ref="geocoderComponent" @locationSelected="flyToLocation" />
                    <div>
                        <div class="relative flex justify-center w-full h-full min-h-[300px] lg:min-w-[400px] mt-5">
                            <MapboxMap :map-id="mapID" class="w-full h-full rounded-xl" :options="{
                                style: 'mapbox://styles/mapbox/streets-v12',
                                center: DEFAULT_COORDINATES,
                                zoom: DEFAULT_ZOOM,
                            }">
                                <MapboxDefaultMarker :marker-id="markerID" :options="{ draggable: isDraggable }"
                                    :lnglat="markerCoordinates" @dragend="onMarkerDragEnd">
                                </MapboxDefaultMarker>
                                <MapboxNavigationControl />
                            </MapboxMap>
                        </div>
                    </div>
                    <div v-show="!isDraggable" class="flex flex-col items-center text-secondary mt-3">
                        <p>¿El pin no coincide con la ubicación?</p>
                        <button class="underline font-medium" @click="isDraggable = true">Ajustar</button>
                    </div>
                    <div v-show="isDraggable" class="flex flex-col items-center text-secondary mt-3">
                        <button class="underline font-medium" @click="isDraggable = false">Dejar de ajustar</button>

                    </div>
                    <div class="flex justify-between mt-5">
                        <CommonButton text="Cancelar" @click="closeLocationModal" class="px-5 py-2 bg-tertiary" />
                        <CommonButton text="Confirmar ubicación" @click="confirmLocation" class="px-5 py-2 bg-primary" />
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/UserStore';
import { useTimeNavigation } from '~/composables/time/useTimeNavigation';
import { useMapInteraction } from '~/composables/maps/useMapInteraction';
import { useGeocoding } from '~/composables/maps/useGeocoding';
import { ref, onMounted } from "vue";

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const mapID = "studentMap";
const mapRef = useMapboxRef(mapID);

const markerID = "studentMarker"
const markerRef = useMapboxMarkerRef(markerID);
const isDraggable = ref(false);

const currentZoom = computed(() => mapRef.value?.getZoom());

const geocoderComponent = ref(null);
const markerCoordinates = ref(DEFAULT_COORDINATES);
const getMarkerCoordinates = () => markerCoordinates.value;

const { getReverseGeocodingData } = useGeocoding();
const { weekDays, isStartWeek, goToPreviousWeek, goToNextWeek, formatDate } = useTimeNavigation();
const { flyTo, calculateDurationBasedOnDistance, calculateDistance } = useMapInteraction(mapRef);
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();
const router = useRouter();

const isOnline = ref(false);

// Mapbox map methods

const onMarkerDragEnd = () => {
    const coordinates = markerRef.value.getLngLat().toArray();
    setMarkerCoordinates(coordinates);
    flyToCenter();
    updateInputValue();
};

const flyToCenter = () => {
    const zoom = currentZoom.value;
    const coordinates = getMarkerCoordinates();
    flyTo(coordinates, zoom, {
        speed: 0.5
    });
};

const flyToLocation = (location) => {

    const newCoordinates = location.center;
    const currentLocation = mapRef.value?.getCenter().toArray();
    const distance = calculateDistance(currentLocation, newCoordinates);
    const duration = calculateDurationBasedOnDistance(distance);
    const zoom = DEFAULT_ZOOM;

    flyTo(newCoordinates, zoom, { duration });

    setMarkerCoordinates(newCoordinates);
};

const setMarkerCoordinates = (coordinates) => {
    markerCoordinates.value = coordinates;
    // markerRef.value.setLngLat(coordinates);
};

const updateInputValue = async () => {
    const geocodingData = await getReverseGeocodingData(getMarkerCoordinates());
    const address = geocodingData.place_name;
    geocoderComponent.value.updateSearchTerm(address);
};

// const filterSidebarOpen = ref(false);
// const toggleFilterSidebar = () => filterSidebarOpen.value = !filterSidebarOpen.value;

const selectedDate = ref(weekDays.value[0]);

const goToNextWeekAndUpdateSelectedDate = () => {
    goToNextWeek();
    selectedDate.value = weekDays.value[0];
};

const goToPreviousWeekAndUpdateSelectedDate = () => {
    goToPreviousWeek();
    selectedDate.value = weekDays.value[0];
};

const locationModal = ref(null);
const selectedLocation = ref(null);

const openLocationModal = () => {
    locationModal.value.openModal();
};

const closeLocationModal = () => {
    locationModal.value.closeModal();
}

const confirmLocation = async () => {
    const location = await getReverseGeocodingData(getMarkerCoordinates());
    selectedLocation.value = location.place_name
    closeLocationModal();
}

onMounted(() => {
    updateInputValue();
});

const filter = () => {
    toggleFilterSidebar();
}

</script>