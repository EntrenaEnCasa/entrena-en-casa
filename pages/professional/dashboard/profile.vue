<template>
    <div class="h-full">
        <div class="grid h-full grid-cols-1 gap-5 lg:grid-cols-2">
            <div class="mt-32">
                <div
                    class="flex h-full flex-col items-center rounded-lg border bg-white p-6 shadow-lg"
                >
                    <!-- Circle image container -->
                    <div class="-mt-40 mb-4 h-52 w-52 rounded-full bg-white p-4">
                        <NuxtImg src="/icons/dumbbell.png" class="h-full w-full object-cover" />
                    </div>
                    <!-- Content container -->
                    <div class="flex flex-col gap-4 text-center">
                        <div v-if="userStore.user.first_name">
                            <p class="text-sm text-gray-500">Nombre profesional</p>
                            <p class="text-2xl font-semibold">
                                {{ userStore.user.first_name }}
                                {{ userStore.user.last_name }}
                            </p>
                        </div>
                        <div v-if="userStore.user.title">
                            <p class="text-sm text-gray-500">Título</p>
                            <p class="text-lg font-medium">
                                {{ userStore.user.title }}
                            </p>
                        </div>
                        <div v-if="userStore.user.email">
                            <p class="text-sm text-gray-500">Correo contacto</p>
                            <p class="text-lg font-medium">
                                {{ userStore.user.email }}
                            </p>
                        </div>
                        <div v-if="userStore.user.phone">
                            <p class="text-sm text-gray-500">Número de teléfono de contacto</p>
                            <p class="text-lg font-medium">
                                {{ userStore.user.phone }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex h-full flex-col items-center justify-between gap-6 rounded-lg border bg-white p-8 shadow-lg"
            >
                <h3 class="text-2xl font-semibold">Tus rangos de cobertura</h3>
                <CommonLoading
                    v-if="getCoverageRangesLoading"
                    text="cargando rangos de cobertura"
                />
                <div v-else-if="getCoverageRangesError">
                    <p class="text-red-500">Hubo un error al cargar los rangos de cobertura</p>
                </div>
                <div v-else-if="!coverageRanges.success">
                    No hay rangos de cobertura actualmente
                </div>
                <div v-else class="flex flex-col items-center gap-y-2">
                    <div
                        v-for="(range, index) in coverageRanges.data"
                        class="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-6 py-1.5"
                    >
                        <p class="font-semibold">{{ range.range_name }}</p>
                        <p class="font-light">{{ range.radius }} km</p>
                        <button @click="openEditModal(index)">
                            <Icon name="fa6-solid:pen-to-square" class="text-primary" />
                        </button>
                    </div>
                </div>
                <CommonButton
                    class="bg-secondary px-5 py-2"
                    @click="
                        resetModal();
                        openModal();
                    "
                >
                    Añadir rango de cobertura
                </CommonButton>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="mapModal">
                <div class="mb-10 mt-2 text-center">
                    <h2 class="text-2xl font-bold">
                        {{ !editMode ? "Nuevo rango de cobertura" : "Edita un rango de cobertura" }}
                    </h2>
                    <p v-show="!editMode" class="text-sm text-gray-500">
                        Selecciona tu ubicación para que los clientes puedan encontrarte más
                        fácilmente.
                    </p>
                </div>
                <div class="grid grid-cols-1 p-5 lg:grid-cols-2">
                    <div class="relative space-y-7 lg:pr-6">
                        <label class="flex w-full flex-col">
                            <span class="mb-2 font-medium">Nombre del rango</span>
                            <input
                                v-model="rangeName"
                                type="text"
                                placeholder="Escribe un nombre intuitivo..."
                                class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                            />
                        </label>
                        <MapsMapboxGeocoder
                            ref="geocoderComponent"
                            @locationSelected="flyToLocation"
                        />
                        <label class="flex w-full flex-col">
                            <span class="text font-medium">Radio de cobertura</span>
                            <p class="mb-3 text-sm text-gray-500">
                                Selecciona el radio de cobertura que deseas tener.
                            </p>
                            <ProfessionalDashboardProfileRangeInput
                                :inputMinValue="inputRadiusMinValue"
                                :inputMaxValue="inputRadiusMaxValue"
                                v-model:sliderValue="inputRadius"
                            />
                        </label>
                    </div>
                    <div
                        class="relative flex h-full min-h-[300px] w-full justify-center lg:min-w-[400px]"
                    >
                        <MapboxMap
                            :map-id="mapID"
                            class="h-full w-full rounded-xl"
                            :options="{
                                style: 'mapbox://styles/mapbox/streets-v12',
                                center: DEFAULT_COORDINATES,
                                zoom: 13,
                            }"
                        >
                            <MapboxSource
                                source-id="circleSource"
                                :source="{
                                    type: 'geojson',
                                    data: circleGeoJSON,
                                }"
                            />
                            <MapboxLayer
                                v-if="circleData.enabled"
                                :layer="{
                                    id: 'circleLayer',
                                    type: 'fill', // or 'line' depending on how you want to style it
                                    source: 'circleSource',
                                    paint: {
                                        'fill-color': circleData.fillColor,
                                        'fill-opacity': circleData.opacity,
                                    },
                                }"
                            />
                            <MapboxDefaultMarker
                                @dragstart="onMarkerDragStart"
                                :marker-id="markerID"
                                :options="{ draggable: true }"
                                :lnglat="markerCoordinates"
                                @dragend="onMarkerDragEnd"
                            >
                            </MapboxDefaultMarker>
                            <MapboxNavigationControl />
                        </MapboxMap>
                    </div>
                </div>
                <div v-show="editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton
                        @click="deleteCoverage"
                        class="bg-tertiary px-5 py-2"
                        :loading="deleteCoverageRangeLoading"
                    >
                        Eliminar rango
                    </CommonButton>
                    <CommonButton
                        @click="saveEditChanges"
                        class="mr-2 px-5 py-2"
                        :loading="updateCoverageRangeLoading"
                    >
                        Guardar cambios
                    </CommonButton>
                </div>
                <div v-show="!editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton @click="closeModal" class="bg-tertiary px-5 py-2">
                        Cancelar
                    </CommonButton>
                    <CommonButton
                        @click="addCoverage"
                        class="px-5 py-2"
                        :loading="addCoverageRangeLoading"
                    >
                        Añadir rango
                    </CommonButton>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
import * as turf from "@turf/turf";
import { useUserStore } from "~/stores/UserStore";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useToast } from "vue-toastification";

const DEFAULT_COORDINATES = [-71.593916, -33.040681];
const DEFAULT_RADIUS = "1";
const MIN_RADIUS = 1;
const MAX_RADIUS = 30;
const CIRCLE_OPACITY = 0.5;

const editMode = ref(false);
const editIndex = ref(null);

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
    fillColor: "#007cbf",
    center: computed(() => {
        return markerCoordinates.value;
    }),
});

// Composables
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const {
    prepareFlyTo,
    calculateZoomLevel,
    calculateTransitionSpeedBasedOnZoomDifference,
    debounceFlyTo,
} = useMapInteraction(mapRef);
const { getReverseGeocodingData } = useGeocoding();
const toast = useToast();

// Methods

const {
    data: coverageRanges,
    error: getCoverageRangesError,
    pending: getCoverageRangesLoading,
    refresh: getCoverageRanges,
} = await useFetch(
    `${runtimeConfig.public.apiBase}/professional/range/user/${userStore.user.user_id}`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

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
        short_code: short_code,
    };

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/range`, {
            method: "POST",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            toast.success(response.message);
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        addCoverageRangeLoading.value = false;
        closeModal();
    }
};

const saveEditChanges = async () => {
    updateCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value.data[editIndex.value].range_id;

    // Prepare the request body
    const body = {
        range_id: rangeID,
        updatedColumns: {
            range_name: rangeName.value,
            radius: inputRadius.value,
        },
    };

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/range`, {
            method: "PUT",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            toast.success("Rango de cobertura actualizado exitosamente");
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        updateCoverageRangeLoading.value = false;
        closeModal();
        editMode.value = false;
    }
};

const deleteCoverage = async () => {
    deleteCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value.data[editIndex.value].range_id;

    try {
        const response = await $fetch(
            `${runtimeConfig.public.apiBase}/professional/delete-range/${rangeID}`,
            {
                method: "DELETE",
                credentials: "include",
            },
        );

        if (response.success) {
            toast.success("Rango de cobertura eliminado exitosamente");
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        deleteCoverageRangeLoading.value = false;
        closeModal();
    }
};

const resetModal = () => {
    rangeName.value = "";
    inputRadius.value = DEFAULT_RADIUS;
    setMarkerCoordinates(DEFAULT_COORDINATES);
};

const openEditModal = (index) => {
    rangeName.value = coverageRanges.value.data[index].range_name;
    inputRadius.value = coverageRanges.value.data[index].radius;
    const coordinates = [
        coverageRanges.value.data[index].lng,
        coverageRanges.value.data[index].lat,
    ];
    setMarkerCoordinates(coordinates);
    editIndex.value = index;
    editMode.value = true;
    openModal();
};

const createGeojsonCircle = (center, radiusInKm) => {
    if (!center || center.length !== 2 || !radiusInKm) {
        throw new Error("Invalid inputs for creating a circle:", center, radiusInKm);
    }
    return turf.circle(center, radiusInKm, { steps: 80, units: "kilometers" });
};

const circleGeoJSON = computed(() => {
    return createGeojsonCircle(circleData.center, inputRadius.value);
});

const flyToCenter = () => {
    const zoom = calculateZoomLevel(inputRadius.value);
    const currentZoom = mapZoom.value;
    const transitionSpeed = calculateTransitionSpeedBasedOnZoomDifference(currentZoom, zoom);

    debounceFlyTo(circleData.center, zoom, {
        speed: transitionSpeed,
    });
};

watch(
    inputRadius,
    () => {
        flyToCenter();
    },
    { immediate: true },
);

const flyToLocation = (location) => {
    setCircleOpacity(0);
    const newCoordinates = location.center;
    const currentLocation = mapRef.value?.getCenter().toArray();
    const { duration, zoom } = prepareFlyTo(currentLocation, newCoordinates, inputRadius.value);

    debounceFlyTo(newCoordinates, zoom, { duration });

    mapRef.value.once("moveend", () => {
        setMarkerCoordinates(newCoordinates);
        setCircleOpacity(CIRCLE_OPACITY);
        mapRef.value.off("moveend", addMarker);
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
    if (!marker.value) return;
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
    const address = geocodingData.place_name;
    geocoderComponent.value.updateSearchTerm(address);
};

// Modal
const mapModal = ref(null);

const openModal = () => {
    mapModal.value.openModal();
};

const closeModal = () => {
    mapModal.value.closeModal();
};

onMounted(() => {
    setupMap();
});

const setupMap = () => {
    if (mapRef.value) {
        circleData.enabled = true;
    }
    updateInputValue();
};

onUpdated(() => {
    circleData.enabled = true;
});
</script>
