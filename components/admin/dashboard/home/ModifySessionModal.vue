<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full p-5 text-center">
                    <CommonLoading v-if="props.loading" />
                    <form class="grid gap-y-5" v-if="sessionInfo">
                        <div>
                            <h2 class="mb-2 text-2xl font-medium">Modificar sesión</h2>
                        </div>
                        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label class="flex w-full flex-col">
                                    <span class="mb-2 text-sm font-medium">Fecha</span>
                                    <input
                                        v-model="sessionInfo.date"
                                        type="date"
                                        class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                    />
                                </label>
                            </div>
                            <div>
                                <label class="flex w-full flex-col">
                                    <span class="mb-2 text-sm font-medium">Hora</span>
                                    <input
                                        v-model="sessionInfo.time"
                                        type="time"
                                        class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                    />
                                </label>
                            </div>
                        </div>
                        <div class="">
                            <label class="flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium">Profesional</span>
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
                        <div class=" ">
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
                    <div class="mt-5 flex justify-between gap-4">
                        <CommonButton
                            @click="openModalDeleteSession"
                            bg-color="tertiary"
                            class="rounded-lg px-4 py-2 font-medium text-white outline"
                            >Borrar sesión</CommonButton
                        >
                        <CommonButton
                            @click="updateSession"
                            bg-color="primary"
                            class="rounded-lg px-4 py-2 font-medium text-white outline"
                            >Modificar sesión
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <AdminDashboardHomeDeleteSessionModal ref="modalDeleteSession" :sessionInfo="sessionInfo" />
    </div>
</template>
<script lang="ts" setup>
import { useGeocoding } from "@/composables/maps/useGeocoding";
import { useMapInteraction } from "@/composables/maps/useMapInteraction";

import { useToast } from "vue-toastification";

const toast = useToast();

interface CustomGeocoder {
    updateSearchTerm: (term: string) => void;
}

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref(DEFAULT_COORDINATES);
const isDraggable = ref(false);

const mapID = "editEmptySessionMap";
const mapRef = useMapboxRef(mapID);

const markerID = "editEmptySessionMarker";
const markerRef = useMapboxMarkerRef(markerID);

const currentZoom = computed(() => mapRef.value?.getZoom());
const getMarkerCoordinates = () => markerCoordinates.value;

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

const setMarkerCoordinates = (coordinates: number[]) => {
    markerCoordinates.value = coordinates;
    if (props.sessionInfo) {
        props.sessionInfo.coordinates = JSON.stringify(coordinates);
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

const modal = ref<Modal | null>(null);
const modalDeleteSession = ref<Modal | null>(null);
const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
    sessionInfo: SessionInfo | null;
    loading: boolean;
}>();

onMounted(() => {
    if (props.sessionInfo && props.sessionInfo.coordinates) {
        let defaultCoordinates = JSON.parse(props.sessionInfo.coordinates);
        setMarkerCoordinates(defaultCoordinates);
        updateInputValue();
        flyToCenter();
    }
});

const resetModal = () => {
    if (props.sessionInfo) {
        props.sessionInfo.session_id = null;
        props.sessionInfo.format = "";
        props.sessionInfo.modality = "";
        props.sessionInfo.link = "";
        props.sessionInfo.students = [];
        props.sessionInfo.professional = {} as SessionProfessional;
    }
};
const openModal = () => {
    modal.value?.openModal();
    resetModal();
};

const openModalDeleteSession = () => {
    modal.value?.closeModal();
    modalDeleteSession.value?.openModal();
};

const updateSession = async () => {
    if (!props.sessionInfo) return;

    const dataSession = {
        user_id: professionals.value[0]?.user_id,
        session_id: props.sessionInfo.session_id,
        date: props.sessionInfo.date,
        time: props.sessionInfo.time,
        format: props.sessionInfo.format,
        modality: props.sessionInfo.modality,
        link: props.sessionInfo.link,
        clients: props.sessionInfo.students.map((student) => student.user_id),
        coordinates: JSON.stringify(markerCoordinates.value),
        type: "session",
    };

    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/session/`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: dataSession,
            },
        );

        if (response.success) {
            toast.success(response.message);
            closeModal();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    }
};

const closeModal = () => {
    modal.value?.closeModal();
};
const professionals = computed(() => [props.sessionInfo?.professional]);

defineExpose({
    openModal,
    closeModal,
});
</script>
