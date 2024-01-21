<template>
    <div class="">
        <div>
            <input type="range" :min="inputMinValue" :max="inputMaxValue" v-model="inputRadius" />
        </div>
        <div class="relative">
            <MapboxMap @load="onMapLoad" @move="onMapMove" @zoom="updateMapZoom" :map-id="mapID"
                style="position: absolute; top: 0; bottom: 0; left: 250px; width: 500px; height: 500px;" :options="{
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
                <MapboxDefaultMarker @dragstart="onMarkerDragStart" :marker-id="markerID" :options="{ draggable: true }"
                    :lnglat="markerCoordinates" @dragend="onMarkerDragEnd">
                </MapboxDefaultMarker>
                <MapboxGeocoder position="top-left" @result="(result) => flyToLocation(result)"
                    :options="{ placeholder: 'Buscar', marker: false, language: 'es', countries: 'cl' }" />
                <MapboxFullscreenControl />
                <MapboxNavigationControl />

            </MapboxMap>
        </div>


    </div>
</template>
<script setup>

import * as turf from '@turf/turf';

const markerID = ref("draggableMarker");
const mapID = ref("map");

// Refs
const mapRef = useMapboxRef(mapID.value);
const marker = useMapboxMarkerRef(markerID.value);

// Marker
// const showMarker = ref(true);

// Data
const defaultCoordinates = ref([-71.593916, -33.040681]);
const mapCenter = ref([...defaultCoordinates.value]);
const mapZoom = ref(13); // Default zoom level

// Radius Input
const inputMinValue = ref(1);
const inputMaxValue = ref(20);
const inputRadius = ref(1); // Default radius in kilometers (km)

// Radius circle
const circleCenter = ref([...defaultCoordinates.value]);
const circleEnabled = ref(false);
const markerCoordinates = ref([-71.593916, -33.040681]);
const circleOpacity = ref(0.5);

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
    { maxRadius: 4, zoom: 12 },
    { maxRadius: 7, zoom: 11 },
    { maxRadius: 10, zoom: 10 },
    { maxRadius: 15, zoom: 9 },
    { maxRadius: Infinity, zoom: 8 } // For radius larger than 15
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
    mapRef.value?.flyTo({
        center: arrayCoordinates,
        zoom: calculateZoomLevel(inputRadius.value),
        duration: 4000,
    });
    const addMarker = () => {
        marker.value.setLngLat(arrayCoordinates);
        updateCirclePosition(arrayCoordinates);

        // Remove event listener after update
        mapRef.value.off('moveend', addMarker);
    };

    mapRef.value.on('moveend', addMarker);
};

const onMarkerDragStart = () => {
    circleOpacity.value = 0;
    console.log(marker.value.getLngLat().toArray());
};

const onMarkerDragEnd = () => {
    console.log(marker.value.getLngLat().toArray());
    const newCoordinates = marker.value.getLngLat().toArray();
    updateCirclePosition(newCoordinates);
};

const updateCirclePosition = (coordinates) => {
    circleOpacity.value = 0.5;
    circleCenter.value = coordinates;
    circleGeoJSON.value = createGeojsonCircle(coordinates, inputRadius.value);
}

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