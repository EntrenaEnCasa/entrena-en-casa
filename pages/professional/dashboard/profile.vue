<template>
    <div class="">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="mt-16">
                <div class="bg-white rounded-lg p-6 shadow-lg border flex flex-col items-center">
                    <!-- Circle image container -->
                    <div class="w-36 h-36 rounded-full bg-blue-100 mb-4 -mt-20">
                        <NuxtImg src="/icons/woman.png" class="w-full h-full object-cover" />
                    </div>
                    <!-- Content container -->
                    <div class="text-center flex flex-col gap-4">
                        <div v-if="userStore.getUser().first_name">
                            <p class="text-sm text-gray-500">Nombre profesional</p>
                            <p class="font-semibold text-2xl">{{ userStore.getUser().first_name }} {{
                                userStore.getUser().last_name }}</p>
                        </div>
                        <div v-if="userStore.getUser().title">
                            <p class="text-sm text-gray-500">Título</p>
                            <p class="text-lg font-medium">{{ userStore.getUser().title }}</p>
                        </div>
                        <div v-if="userStore.getUser().email">
                            <p class="text-sm text-gray-500">Correo contacto</p>
                            <p class="text-lg font-medium">{{ userStore.getUser().email }}</p>
                        </div>
                        <div v-if="userStore.getUser().phone">
                            <p class="text-sm text-gray-500">Número de teléfono de contacto</p>
                            <p class="text-lg font-medium">{{ userStore.getUser().phone }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg border flex flex-col items-center justify-center gap-6">
                <h3 class="font-semibold text-2xl">Tus rangos de cobertura</h3>
                <div v-if="rangosCobertura.length == 0">
                    No hay rangos de cobertura actualmente
                </div>
                <div v-else class="flex flex-col gap-y-2">
                    <div v-for="rangoCobertura, index in rangosCobertura"
                        class="flex items-center gap-x-2 rounded-full bg-gray-200 px-5 py-1">
                        <p class="font-semibold">{{ rangoCobertura.name }}</p>
                        <p>{{ rangoCobertura.radius }} km</p>
                        <button @click="openEditModal(index)">
                            <Icon name="fa6-solid:pen-to-square" />
                        </button>
                    </div>
                </div>
                <CommonButton text="+ Crear nuevo" class="px-5 py-2 bg-secondary" @click="openModal" />
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
                                class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                        </label>
                        <label class="w-full flex flex-col max-w-96">
                            <span class="font-medium mb-2">Ubicación seleccionada</span>
                            <div v-show="address != ''" class="rounded border px-4 py-3 text-sm">
                                {{ address }}
                            </div>
                            <div v-show="address == ''" class="rounded border px-4 py-3 text-sm">
                                No hay ubicación seleccionada
                            </div>
                        </label>
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
                            center: defaultCoordinates,
                            zoom: 13,
                        }">
                            <MapboxSource source-id="circleSource" :source="{
                                type: 'geojson',
                                data: circleGeoJSON
                            }" />
                            <MapboxLayer v-if="circleEnabled" :layer="{
                                id: 'circleLayer',
                                type: 'fill', // or 'line' depending on how you want to style it
                                source: 'circleSource',
                                paint: {
                                    'fill-color': '#007cbf',
                                    'fill-opacity': circleOpacity
                                }
                            }" />
                            <MapboxDefaultMarker @dragstart="onMarkerDragStart" :marker-id="markerID"
                                :options="{ draggable: true }" v-model:lnglat="markerCoordinates"
                                @dragend="onMarkerDragEnd">
                            </MapboxDefaultMarker>
                            <MapboxGeocoder ref="geocoderRef" position="top-left"
                                @result="(result) => flyToLocation(result)"
                                :options="{ placeholder: 'Buscar', marker: false, language: 'es', countries: 'cl' }" />
                            <MapboxFullscreenControl />
                            <MapboxNavigationControl />

                        </MapboxMap>
                    </div>
                </div>
                <div class="flex">
                    <CommonButton v-show="editMode" @click="saveEditChanges" text="Confirmar cambios"
                        class="px-5 py-2 mr-2" />
                    <CommonButton v-show="!editMode" @click="addCoverage" text="Añadir rango" class="px-5 py-2" />
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

const editMode = ref(false);
const editIndex = ref(-1);

const rangosCobertura = ref([
    {
        name: "Valparaíso centro",
        radius: "5",
        lng: -71.593916,
        lat: -33.040681
    },
    {
        name: "Santiago centro",
        radius: "5",
        lng: -70.650449,
        lat: -33.437830
    }
]);

const rangeName = ref("");

const getCoverage = (index) => rangosCobertura.value[index];

const setCoverage = (index, coverage) => {
    rangosCobertura.value = [
        ...rangosCobertura.value.slice(0, index),
        coverage,
        ...rangosCobertura.value.slice(index + 1),
    ];
};

const addCoverage = () => {
    rangosCobertura.value.push({
        name: rangeName.value,
        radius: inputRadius.value,
        lng: markerCoordinates.value[0],
        lat: markerCoordinates.value[1]
    });
    closeModal();
};

const openEditModal = (index) => {
    rangeName.value = rangosCobertura.value[index].name;
    inputRadius.value = rangosCobertura.value[index].radius;
    setMarkerCoordinates([rangosCobertura.value[index].lng, rangosCobertura.value[index].lat]);
    editIndex.value = index;
    editMode.value = true;
    openModal();
}

const saveEditChanges = () => {
    const index = editIndex.value;
    const newCoverage = {
        ...getCoverage(index),
        name: rangeName.value,
        radius: inputRadius.value,
        lng: markerCoordinates.value[0],
        lat: markerCoordinates.value[1],
    };
    setCoverage(index, newCoverage);
    editMode.value = false;
    closeModal();
};

// IDs
const markerID = ref("draggableMarker");
const mapID = ref("map");

// Refs
const mapRef = useMapboxRef(mapID.value);
const marker = useMapboxMarkerRef(markerID.value);
const geocoderRef = ref(null);
const geocoder = computed(() => geocoderRef.value?.geocoder);

// Data
const defaultCoordinates = ref([-71.593916, -33.040681]);
const mapZoom = computed(() => {
    return mapRef.value?.getZoom();
});

// Radius Input
const inputRadiusMinValue = ref(1);
const inputRadiusMaxValue = ref(30);
const inputRadius = ref("1"); // Default radius in kilometers (km)

// Radius circle
const circleEnabled = ref(false);
const circleOpacity = ref(0.5);
const markerCoordinates = ref([-71.593916, -33.040681]);
const circleCenter = computed(() => {
    return markerCoordinates.value;
})

// Composables
const userStore = useUserStore();
const { flyTo, prepareFlyTo, calculateZoomLevel } = useMapInteraction(mapRef, inputRadius);
const { address, getReverseGeocodingData } = useGeocoding();

const createGeojsonCircle = (center, radiusInKm) => {
    if (!center || center.length !== 2 || !radiusInKm) {
        console.error('Invalid inputs for creating a circle:', center, radiusInKm);
        return null; // Handle this error appropriately
    }
    return turf.circle(center, radiusInKm, { steps: 80, units: 'kilometers' });
};

const circleGeoJSON = computed(() => {
    return createGeojsonCircle(circleCenter.value, inputRadius.value);
});

watch(inputRadius, () => {
    flyToCenter();
});

const flyToCenter = () => {
    const zoom = calculateZoomLevel(inputRadius.value);
    const currentZoom = mapZoom.value;
    const zoomDifference = calculateZoomDifference(currentZoom, zoom);
    const transitionSpeed = zoomDifference <= 1 ? 0.5 : 1.2;

    flyTo(circleCenter.value, zoom, {
        speed: transitionSpeed
    });
};

const calculateZoomDifference = (currentZoom, newZoom) => {
    return Math.abs(currentZoom - newZoom);
};

const flyToLocation = (location) => {
    circleOpacity.value = 0;
    const newCoordinates = location.result.center;
    getReverseGeocodingData(newCoordinates);

    const currentLocation = mapRef.value?.getCenter().toArray();
    const { duration, zoom } = prepareFlyTo(currentLocation, newCoordinates);

    flyTo(newCoordinates, zoom, { duration });

    const addMarker = () => {
        setMarkerCoordinates(newCoordinates);
        circleOpacity.value = 0.5;
        mapRef.value.off('moveend', addMarker);
    };

    mapRef.value.on('moveend', addMarker);
};

const setMarkerCoordinates = (coordinates) => {
    const currentCoordinates = marker.value.getLngLat().toArray();
    const { duration, zoom } = prepareFlyTo(currentCoordinates, coordinates);
    markerCoordinates.value = coordinates;
    flyTo(coordinates, zoom, { duration });
    getReverseGeocodingData(coordinates);
    updateInputValue();
};

//updates geocoder input value
const updateInputValue = async () => {
    const address = await getReverseGeocodingData(markerCoordinates.value);
    geocoder.value._inputEl.value = address;
};


const onMarkerDragStart = () => {
    circleOpacity.value = 0;
};

const onMarkerDragEnd = () => {
    const newCoordinates = marker.value.getLngLat().toArray();
    circleOpacity.value = 0.5;
    getReverseGeocodingData(newCoordinates);
    updateInputValue();
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
});

const setupMap = () => {
    if (mapRef.value) {
        // const initialZoom = calculateZoomLevel(inputRadius.value);
        // mapRef.value.setZoom(initialZoom);
        circleEnabled.value = true;
    }
}

onUpdated(() => {
    circleEnabled.value = true;
});

</script>