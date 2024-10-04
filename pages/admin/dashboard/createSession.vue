<template class="p-4">
    <div>
        <div class="mb-4 flex items-center justify-start gap-5">
            <h3 class="text-xl font-medium">Nueva sesión</h3>
        </div>
        <form v-if="sessionInfo" class="mx-auto px-5">
            <div class="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                    <span class="mb-2 text-sm font-medium">Fecha</span>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        v-model="sessionInfo.date"
                        :min="getTodayFormatted()"
                        class="mt-2 block rounded-md border border-gray-200 px-4 py-3 text-sm shadow"
                    />
                </div>
                <div>
                    <span class="mb-2 text-sm font-medium">Horario</span>
                    <ProfessionalDashboardCalendarTimeRange class="min-w-max" :isManual="false" />
                </div>
            </div>
            <div class="grid space-y-5">
                <div class="">
                    <label class="flex w-full flex-col">
                        <span class="text-sm font-medium">Profesional</span>
                        <AdminDashboardProfessionalSearchInput
                            v-model:professionals="professionals"
                        />
                    </label>
                </div>
                <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label class="flex w-full flex-col">
                        <span class="mb-2 text-sm font-medium">Formato</span>
                        <select
                            v-model="sessionInfo.format"
                            class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                        >
                            <option value="Personalizado">Personalizado</option>
                            <option value="Grupal">Grupal</option>
                        </select>
                    </label>
                    <label class="flex w-full flex-col">
                        <span class="mb-2 text-sm font-medium">Modalidad</span>
                        <select
                            v-model="sessionInfo.modality"
                            class="w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800 outline-primary"
                        >
                            <option value="Online">Online</option>
                            <option value="Presencial">Presencial</option>
                        </select>
                    </label>
                </div>
                <div class="">
                    <label class="flex w-full flex-col">
                        <span class="mb-2 text-sm font-medium">Clientes</span>
                        <AdminDashboardStudentSearchInput
                            v-model:clients="sessionInfo.students"
                            :selectedFormat="sessionInfo.format"
                        />
                    </label>
                </div>
                <div class="min-w-full">
                    <div
                        v-show="sessionInfo.modality === 'Online'"
                        class="col-span-full flex flex-col"
                    >
                        <span class="mb-2 text-sm font-medium">Link</span>
                        <input
                            v-model="sessionInfo.link"
                            type="text"
                            placeholder="https://"
                            class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                        />
                    </div>
                    <div
                        v-show="sessionInfo.modality === 'Presencial'"
                        class="col-span-full flex w-full flex-col"
                    >
                        <span class="mb-2 text-sm font-medium">Ubicación</span>
                        <MapsMapboxGeocoder ref="geocoderRef" @locationSelected="flyToLocation" />
                        <div
                            class="lg:min-w-100 relative mt-5 flex h-full min-h-[250px] w-full justify-center"
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
                </div>
            </div>
            <div class="my-8 flex justify-between">
                <CommonButton @click="resetForm" bg-color="secondary" class="px-4 py-2">
                    Reiniciar
                </CommonButton>

                <CommonButton @click="createSession" :loading="loadingResponse" class="px-4 py-2">
                    Crear sesión
                </CommonButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useTimeRangeStore } from "~/stores/professional/dashboard/calendar/TimeRangeStore";
const { formattedStartTime } = storeToRefs(useTimeRangeStore());

import { useToast } from "vue-toastification";
const toast = useToast();

import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";

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

const geocoderRef = ref<CustomGeocoder | null>(null);

const getTodayFormatted = (): string => {
    return new Date().toISOString().split("T")[0];
};

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
    if (sessionInfo && sessionInfo.value) {
        sessionInfo.value.coordinates = JSON.stringify(coordinates);
    }
};

const flyToCenter = () => {
    const zoom = currentZoom.value;
    const coordinates = getMarkerCoordinates();
    flyTo(coordinates, zoom, {
        speed: 1,
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

const runtimeConfig = useRuntimeConfig();
const loadingResponse = ref(false);
const professionals = ref([] as Professional[]);

interface SessionInfo {
    date: string;
    time: string;
    available: number;
    format: string;
    modality: string;
    link: string;
    type: string;
    coordinates: string | null;
    students: Student[];
    professional: Professional;
}

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
}
interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
}

const sessionInfo = ref<SessionInfo>({
    date: "",
    time: "",
    available: 0,
    format: "Personalizado",
    modality: "Online",
    link: "",
    type: "",
    coordinates: "",
    students: [],
    professional: {} as Professional,
});

onMounted(() => {
    setMarkerCoordinates(DEFAULT_COORDINATES);
    updateInputValue();
    flyToCenter();
});

const resetForm = () => {
    reloadNuxtApp();
};

const validateForm = () => {
    if (!sessionInfo || !sessionInfo.value) return false;
    const requiredFields: (keyof SessionInfo)[] = ["date", "format", "modality"];
    for (const field of requiredFields) {
        if (!sessionInfo.value[field]) {
            return false;
        }
    }

    if (professionals.value.length < 1 || !professionals.value[0].user_id) return false;
    return true;
};

const createSession = async () => {
    if (!sessionInfo || !sessionInfo.value) return;
    if (!validateForm()) {
        toast.error("Formulario incompleto");
        return;
    }
    setLinkCoordinates();
    const dataSession = {
        user_id: professionals.value[0].user_id,
        date: sessionInfo.value.date,
        time: formattedStartTime.value,
        format: sessionInfo.value.format,
        modality: sessionInfo.value.modality,
        link: sessionInfo.value.link,
        clients: sessionInfo.value.students.map((student) => student.user_id),
        coordinates: sessionInfo.value.coordinates,
        type: "session",
    };
    try {
        loadingResponse.value = true;
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/session/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: dataSession,
            },
        );

        if (response.success) {
            toast.success(response.message);
            reloadNuxtApp();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        loadingResponse.value = false;
    }
};

const setLinkCoordinates = async () => {
    if (sessionInfo && sessionInfo.value !== null && sessionInfo.value.modality === "Presencial") {
        sessionInfo.value.coordinates =
            "[" + markerCoordinates.value[0] + "," + markerCoordinates.value[1] + "]";
        const link = createGoogleMapsLink(markerCoordinates.value);
        sessionInfo.value.link = link;
    } else {
        sessionInfo.value.coordinates = "";
    }
};

const createGoogleMapsLink = (coordinates: number[]) => {
    const [lng, lat] = coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
};
</script>
