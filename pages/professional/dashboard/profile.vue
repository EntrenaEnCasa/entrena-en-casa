<template>
    <div class="">
        <CommonButton class="px-4 py-2" text="Abrir mapa" @click="openModal" />
        <Teleport to="body">
            <CommonModal ref="mapModal">
                <div class="text-center mt-2 mb-10">
                    <h2 class="text-2xl font-bold">Nuevo rango de cobertura</h2>
                    <p class="text-sm text-gray-500">Selecciona tu ubicación para que los clientes puedan encontrarte
                        más fácilmente.</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 p-5">
                    <div class="lg:pr-6 relative space-y-7">
                        <label class="w-full flex flex-col">
                            <span class="font-medium mb-2">Nombre del rango</span>
                            <input type="text" placeholder="Escribe un nombre intuitivo..."
                                class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                        </label>
                        <label v-show="address != ''" class="w-full flex flex-col max-w-96">
                            <span class="font-medium mb-2">Ubicación seleccionada</span>
                            <div class="rounded border px-4 py-3">
                                {{ address }}
                            </div>
                        </label>
                        <label class="w-full flex flex-col">
                            <span class="font-medium text">Radio de cobertura</span>
                            <p class="text-sm text-gray-500 mb-3">Selecciona el radio de cobertura que deseas tener.</p>
                            <ProfessionalDashboardProfileRangeInput :inputMinValue="inputMinValue"
                                :inputMaxValue="inputMaxValue" v-model:sliderValue="inputRadius" />
                        </label>
                    </div>
                    <div class="relative flex justify-center w-full h-full min-h-[300px] lg:min-w-[400px]">
                        <MapboxMap @load="onMapLoad" @move="onMapMove" @zoom="updateMapZoom" :map-id="mapID"
                            class="w-full h-full rounded-xl" :options="{
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
                            <MapboxGeocoder v-model="geocoderResult" position="top-left"
                                @result="(result) => flyToLocation(result)"
                                :options="{ placeholder: 'Buscar', marker: false, language: 'es', countries: 'cl' }" />
                            <MapboxFullscreenControl />
                            <MapboxNavigationControl />

                        </MapboxMap>
                    </div>
                </div>
            </CommonModal>
        </Teleport>


    </div>
</template>

<script setup>

import * as turf from '@turf/turf';

const markerID = ref("draggableMarker");
const mapID = ref("map");

// Refs
const mapRef = useMapboxRef(mapID.value);
const marker = useMapboxMarkerRef(markerID.value);
const geocoderRef = ref(null);
const geocoder = computed(() => geocoderRef.value?.geocoder);

// Data
const defaultCoordinates = ref([-71.593916, -33.040681]);
const mapCenter = ref([...defaultCoordinates.value]);
const mapZoom = ref(13); // Default zoom level

// Radius Input
const inputMinValue = ref(1);
const inputMaxValue = ref(30);
const inputRadius = ref(1); // Default radius in kilometers (km)

// Radius circle
const circleCenter = ref([...defaultCoordinates.value]);
const circleEnabled = ref(false);
const markerCoordinates = ref([-71.593916, -33.040681]);
const circleOpacity = ref(0.5);

const address = ref("");
const geocoderResult = ref("");

const getReverseGeocodingData = async (coordinates) => {
    const lng = coordinates[0];
    const lat = coordinates[1];
    const { data, error, fetch } = await useFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZ29uemFsby1icnVuYSIsImEiOiJjbHJqcGlkcDgwMWZiMmtwOWliMHJsOGkxIn0.waguLODGXsYqrv8Ol0lwoQ`);
    address.value = data.value.features[0].place_name;
    geocoderResult.value = data.value.features[0].place_name;
    console.log(geocoderResult.value);
};


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

const onMapMove = () => {
    mapCenter.value = mapRef.value?.getCenter();
}

const onMapLoad = () => {
    mapCenter.value = mapRef.value?.getCenter();
};

const zoomLevels = [
    { maxRadius: 1, zoom: 13 },
    { maxRadius: 2, zoom: 12 },
    { maxRadius: 5, zoom: 11 },
    { maxRadius: 9, zoom: 10 },
    { maxRadius: 19, zoom: 9 },
    { maxRadius: Infinity, zoom: 8 }
];

const calculateZoomLevel = (radiusInKm) => {
    for (let i = 0; i < zoomLevels.length; i++) {
        if (radiusInKm <= zoomLevels[i].maxRadius) {
            return zoomLevels[i].zoom;
        }
    }
};

watch(inputRadius, (newRadius) => {
    const newZoom = calculateZoomLevel(newRadius);

    if (mapRef.value) {
        const zoomDifference = calculateZoomDifference(mapZoom.value, newZoom);
        const transitionSpeed = zoomDifference <= 1 ? 0.5 : 1.2; // Slower for small changes

        mapRef.value.flyTo({
            center: circleCenter.value,
            zoom: newZoom,
            essential: true,
            speed: transitionSpeed,
            curve: 1,
            easing: easeInOutCubic
        });
    }
});

const updateMapZoom = () => {
    mapZoom.value = mapRef.value.getZoom();
};

const calculateZoomDifference = (currentZoom, newZoom) => {
    return Math.abs(currentZoom - newZoom);
};

const easeInOutCubic = (t) => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const flyToLocation = (location) => {
    const arrayCoordinates = location.result.center;
    circleOpacity.value = 0;
    getReverseGeocodingData(arrayCoordinates);
    mapRef.value?.flyTo({
        center: arrayCoordinates,
        zoom: calculateZoomLevel(inputRadius.value),
        duration: 4000,
    });
    const addMarker = () => {
        markerCoordinates.value = arrayCoordinates;
        console.log(arrayCoordinates)
        updateCirclePosition(arrayCoordinates);
        mapRef.value.off('moveend', addMarker);
    };

    mapRef.value.on('moveend', addMarker);
};

const onMarkerDragStart = () => {
    circleOpacity.value = 0;
};

const onMarkerDragEnd = () => {
    const newCoordinates = marker.value.getLngLat().toArray();
    updateCirclePosition(newCoordinates);
    getReverseGeocodingData(newCoordinates);
};

const updateCirclePosition = (coordinates) => {
    circleOpacity.value = 0.5;
    circleCenter.value = coordinates;
}

// Modal
const mapModal = ref(null);

const openModal = () => {
    mapModal.value.openModal();
    onModalOpened();
};

const onModalOpened = () => {
    nextTick(() => {

    });
};

onMounted(() => {
    if (mapRef.value) {
        const initialZoom = calculateZoomLevel(inputRadius.value);
        mapZoom.value = initialZoom;
        mapRef.value.setZoom(initialZoom);
        circleEnabled.value = true;
    }
});

onUpdated(() => {
    circleEnabled.value = true;
});

</script>