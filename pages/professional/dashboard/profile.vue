<template>
    <div class="h-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">
            <div class="mt-16">
                <div class="bg-white rounded-lg p-6 shadow-lg border flex flex-col items-center h-full">
                    <!-- Circle image container -->
                    <div class="w-36 h-36 rounded-full bg-blue-100 mb-4 -mt-20">
                        <NuxtImg src="/icons/woman.png" class="w-full h-full object-cover" />
                    </div>
                    <!-- Content container -->
                    <div class="text-center flex flex-col gap-4">
                        <div v-if="userStore.user.first_name">
                            <p class="text-sm text-gray-500">Nombre profesional</p>
                            <p class="font-semibold text-2xl">{{ userStore.user.first_name }} {{
                                userStore.user.last_name }}</p>
                        </div>
                        <div v-if="userStore.user.title">
                            <p class="text-sm text-gray-500">Título</p>
                            <p class="text-lg font-medium">{{ userStore.user.title }}</p>
                        </div>
                        <div v-if="userStore.user.email">
                            <p class="text-sm text-gray-500">Correo contacto</p>
                            <p class="text-lg font-medium">{{ userStore.user.email }}</p>
                        </div>
                        <div v-if="userStore.user.phone">
                            <p class="text-sm text-gray-500">Número de teléfono de contacto</p>
                            <p class="text-lg font-medium">{{ userStore.user.phone }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg border flex flex-col items-center justify-between gap-6 h-full">
                <h3 class="font-semibold text-2xl">Tus rangos de cobertura</h3>
                <CommonLoading v-show="getCoverageRangesLoading" text="cargando rangos de cobertura" />
                <div v-show="!getCoverageRangesLoading">
                    <div v-if="coverageRanges.length == 0">
                        No hay rangos de cobertura actualmente
                    </div>
                    <div v-else class="flex flex-col items-center gap-y-2">
                        <div v-for="range, index in coverageRanges"
                            class="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-6 py-1.5">
                            <p class="font-semibold">{{ range.range_name }}</p>
                            <p class="font-light">{{ range.radius }} km</p>
                            <button @click="openEditModal(index)">
                                <Icon name="fa6-solid:pen-to-square" class="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
                <CommonButton text="+ Crear nuevo" class="px-5 py-2 bg-secondary" @click="resetModal(); openModal()" />
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="mapModal">
                <div class="text-center mt-2 mb-10">
                    <h2 class="text-2xl font-bold">
                        {{ !editMode ? 'Nuevo rango de cobertura' : 'Edita un rango de cobertura' }}
                    </h2>
                    <p v-show="!editMode" class="text-sm text-gray-500">
                        Selecciona tu ubicación para que los clientes puedan encontrarte
                        más fácilmente.
                    </p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 p-5">
                    <div class="lg:pr-6 relative space-y-7">
                        <label class="w-full flex flex-col">
                            <span class="font-medium mb-2">Nombre del rango</span>
                            <input v-model="rangeName" type="text" placeholder="Escribe un nombre intuitivo..."
                                class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary" />
                        </label>
                        <MapsMapboxGeocoder ref="geocoderComponent" @locationSelected="flyToLocation" />
                        <label class="w-full flex flex-col">
                            <span class="font-medium text">Radio de cobertura</span>
                            <p class="text-sm text-gray-500 mb-3">Selecciona el radio de cobertura que deseas tener.</p>
                            <ProfessionalDashboardProfileRangeInput :inputMinValue="inputRadiusMinValue"
                                :inputMaxValue="inputRadiusMaxValue" v-model:sliderValue="inputRadius" />
                        </label>
                    </div>
                    <div class="relative flex justify-center w-full h-full min-h-[300px] lg:min-w-[400px]">
                        <MapboxMap :map-id="mapID" class="w-full h-full rounded-xl" :options="{
                            style: 'mapbox://styles/mapbox/streets-v12',
                            center: DEFAULT_COORDINATES,
                            zoom: 13,
                        }">
                            <MapboxSource source-id="circleSource" :source="{
                                type: 'geojson',
                                data: circleGeoJSON
                            }" />
                            <MapboxLayer v-if="circleData.enabled" :layer="{
                                id: 'circleLayer',
                                type: 'fill', // or 'line' depending on how you want to style it
                                source: 'circleSource',
                                paint: {
                                    'fill-color': circleData.fillColor,
                                    'fill-opacity': circleData.opacity
                                }
                            }" />
                            <MapboxDefaultMarker @dragstart="onMarkerDragStart" :marker-id="markerID"
                                :options="{ draggable: true }" :lnglat="markerCoordinates" @dragend="onMarkerDragEnd">
                            </MapboxDefaultMarker>
                            <MapboxNavigationControl />
                        </MapboxMap>
                    </div>
                </div>
                <div v-show="editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton @click="deleteCoverage" text="Eliminar" class="px-5 py-2 bg-tertiary"
                        :loading="deleteCoverageRangeLoading" />
                    <CommonButton @click="saveEditChanges" text="Confirmar cambios" class="px-5 py-2 mr-2"
                        :loading="updateCoverageRangeLoading" />
                </div>
                <div v-show="!editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton @click="closeModal" text="Cancelar" class="px-5 py-2 bg-tertiary" />
                    <CommonButton @click="addCoverage" text="Añadir rango" class="px-5 py-2"
                        :loading="addCoverageRangeLoading" />
                </div>
            </CommonModal>
        </Teleport>

    </div>
</template>

<script setup>

import * as turf from '@turf/turf';
import { useUserStore } from '~/stores/UserStore';
import { useMapInteraction } from '~/composables/maps/useMapInteraction';
import { useGeocoding } from '~/composables/maps/useGeocoding';

const DEFAULT_COORDINATES = [-71.593916, -33.040681];
const DEFAULT_RADIUS = "1";
const MIN_RADIUS = 1;
const MAX_RADIUS = 30;
const CIRCLE_OPACITY = 0.5;

const editMode = ref(false);
const editIndex = ref(null);

const coverageRanges = ref([]);
const getCoverageRangesLoading = ref(false);
const addCoverageRangeLoading = ref(false);
const updateCoverageRangeLoading = ref(false);
const deleteCoverageRangeLoading = ref(false);
const rangeName = ref("");

// IDs
const markerID = ref("draggableMarker");
const mapID = ref("map");

// Refs
const mapRef = useMapboxRef(mapID.value);
const marker = useMapboxMarkerRef(markerID.value);
const geocoderComponent = ref(null);

// Data
const mapZoom = computed(() => {
    return mapRef.value?.getZoom();
});

// Radius Input
const inputRadiusMinValue = ref(MIN_RADIUS);
const inputRadiusMaxValue = ref(MAX_RADIUS);
const inputRadius = ref(DEFAULT_RADIUS); // Default radius in kilometers (km)

// Radius circle
const markerCoordinates = ref(DEFAULT_COORDINATES);

const circleData = reactive({
    enabled: false,
    opacity: 0.5,
    fillColor: '#007cbf',
    center: computed(() => {
        return markerCoordinates.value;
    })
});

// Composables
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig()
const { prepareFlyTo, calculateZoomLevel, calculateTransitionSpeedBasedOnZoomDifference, debounceFlyTo } = useMapInteraction(mapRef);
const { getReverseGeocodingData } = useGeocoding();

// Methods

const getCoverageRanges = async () => {
    getCoverageRangesLoading.value = true;
    const user_id = userStore.user.user_id;

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/range/user/${user_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": userStore.userToken || ''
            },
        });

    getCoverageRangesLoading.value = false;

    if (error.value) {
        console.error('An error occurred:', error.value);
        return;
    }

    if (data.value.success) {
        console.log(data.value.message);
        coverageRanges.value = data.value.data;
    }
    else {
        console.log(data.value.message);
    }
};

const addCoverage = async () => {
    addCoverageRangeLoading.value = true;
    const geoData = await getReverseGeocodingData(markerCoordinates.value);
    const short_code = geoData.context[3].short_code;

    const body = {
        user_id: userStore.user.user_id,
        range_name: rangeName.value,
        radius: inputRadius.value,
        lng: markerCoordinates.value[0],
        lat: markerCoordinates.value[1],
        short_code: short_code
    };

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/range`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": userStore.userToken || ''
            },
            body: body
        });

    addCoverageRangeLoading.value = false;

    if (error.value) {
        console.error('An error occurred:', error.value);
        return;
    }

    if (data.value.success) {
        console.log(data.value.message);
        getCoverageRanges();
    }
    else {
        console.log(data.value.message);
    }

    closeModal();
};

const saveEditChanges = async () => {

    updateCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value[editIndex.value].range_id;

    // Prepare the request body
    const body = {
        range_id: rangeID,
        updatedColumns: {
            range_name: rangeName.value,
            radius: inputRadius.value
        }
    };

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/range`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": userStore.userToken || ''
        },
        body: body
    });

    updateCoverageRangeLoading.value = false;

    if (error.value) {
        console.error('An error occurred:', error.value);
        editMode.value = false;
        closeModal();
        return;
    }

    if (data.value) {
        console.log(data.value.message);
        getCoverageRanges();
    }
    else {
        console.log(data.value.message);
    }

    closeModal();
    editMode.value = false;
};

const deleteCoverage = async () => {

    deleteCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value[editIndex.value].range_id;

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-range/${rangeID}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": userStore.userToken || ''
            },
        });

    deleteCoverageRangeLoading.value = false;

    if (error.value) {
        console.error('An error occurred:', error.value);
        return;
    }

    if (data.value.success) {
        console.log(data.value.message);
        getCoverageRanges();
    }
    else {
        console.log(data.value.message);
    }

    closeModal();
};

const resetModal = () => {
    rangeName.value = "";
    inputRadius.value = DEFAULT_RADIUS;
    setMarkerCoordinates(DEFAULT_COORDINATES);
};

const openEditModal = (index) => {
    rangeName.value = coverageRanges.value[index].range_name;
    inputRadius.value = coverageRanges.value[index].radius;
    const coordinates = [coverageRanges.value[index].lng, coverageRanges.value[index].lat];
    setMarkerCoordinates(coordinates);
    editIndex.value = index;
    editMode.value = true;
    openModal();
}

const createGeojsonCircle = (center, radiusInKm) => {
    if (!center || center.length !== 2 || !radiusInKm) {
        throw new Error('Invalid inputs for creating a circle:', center, radiusInKm);
    }
    return turf.circle(center, radiusInKm, { steps: 80, units: 'kilometers' });
};

const circleGeoJSON = computed(() => {
    return createGeojsonCircle(circleData.center, inputRadius.value);
});

const flyToCenter = () => {
    const zoom = calculateZoomLevel(inputRadius.value);
    const currentZoom = mapZoom.value;
    const transitionSpeed = calculateTransitionSpeedBasedOnZoomDifference(currentZoom, zoom);

    debounceFlyTo(circleData.center, zoom, {
        speed: transitionSpeed
    });
};

watch(inputRadius, () => {
    flyToCenter();
}, { immediate: true });

const flyToLocation = (location) => {
    setCircleOpacity(0);
    const newCoordinates = location.center;
    const currentLocation = mapRef.value?.getCenter().toArray();
    const { duration, zoom } = prepareFlyTo(currentLocation, newCoordinates, inputRadius.value);

    debounceFlyTo(newCoordinates, zoom, { duration });

    mapRef.value.once('moveend', () => {
        setMarkerCoordinates(newCoordinates);
        setCircleOpacity(CIRCLE_OPACITY);
        mapRef.value.off('moveend', addMarker);
    });
};


const setMarkerCoordinates = (coordinates) => {
    const currentCoordinates = marker.value.getLngLat().toArray();
    const { duration, zoom } = prepareFlyTo(currentCoordinates, coordinates, inputRadius.value);
    markerCoordinates.value = coordinates;
    updateInputValue();
    debounceFlyTo(coordinates, zoom, { duration });
};

const onMarkerDragStart = () => {
    setCircleOpacity(0);
};

const onMarkerDragEnd = () => {
    const newCoordinates = marker.value.getLngLat().toArray();
    markerCoordinates.value = newCoordinates;
    setCircleOpacity(CIRCLE_OPACITY);
    flyToCenter();
    updateInputValue();
};

const setCircleOpacity = (opacity) => {
    circleData.opacity = opacity;
};

//updates geocoder input value
const updateInputValue = async () => {
    const geocodingData = await getReverseGeocodingData(markerCoordinates.value);
    const address = geocodingData.place_name
    geocoderComponent.value.updateSearchTerm(address);
};

// Modal
const mapModal = ref(null);

const openModal = () => {
    mapModal.value.openModal();
};

const closeModal = () => {
    mapModal.value.closeModal();
}

onMounted(() => {
    setupMap();
    getCoverageRanges();
});

const setupMap = () => {
    if (mapRef.value) {
        circleData.enabled = true;
    }
    updateInputValue();
}

onUpdated(() => {
    circleData.enabled = true;
});

</script>