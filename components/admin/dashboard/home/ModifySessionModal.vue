type: Object,
<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full p-5 text-center">
                    <CommonLoading v-if="props.loading" />
                    <form class="grid gap-y-5 " v-if="sessionInfo">
                        <div>
                            <h2 class="text-2xl font-medium mb-2">Modificar sesión</h2>
                        </div>
                        <div class=" grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <div>
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Fecha</span>
                                    <input v-model="sessionInfo.date" type="date"
                                        class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                                </label>
                            </div>
                            <div>
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Hora</span>
                                    <input v-model="sessionInfo.time" type="time"
                                        class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                                </label>
                            </div>
                        </div>
                        <div class="">
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Profesional</span>
                                <AdminDashboardProfessionalSearchInput v-model:professionals="professionals" />
                            </label>
                        </div>
                        <div class=" grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select v-model="sessionInfo.format"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Personalizado">Personalizado</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select v-model="sessionInfo.modality"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </label>
                        </div>
                        <div class="">
                            <label class="w-full flex flex-col ">
                                <span class="font-medium text-sm mb-2">Clientes</span>
                                <AdminDashboardStudentSearchInput v-model:clients="sessionInfo.students"
                                    :selectedFormat="sessionInfo.format" />
                            </label>
                        </div>
                        <div class=" ">
                            <div v-show="sessionInfo.modality === 'Online'" class="flex flex-col col-span-full">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input v-model="sessionInfo.link" type="text" placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                            </div>
                            <div v-show="sessionInfo.modality === 'Presencial'" class="flex flex-col col-span-full ">
                                <span class="font-medium text-sm mb-2">Ubicación</span>
                                <MapsMapboxGeocoder ref="geocoderRef" @locationSelected="flyToLocation" />
                                <div
                                    class="relative flex justify-center w-full h-full min-h-[250px] lg:min-w-[400px] mt-5">
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
                                <div v-show="!isDraggable" class="flex flex-col items-center text-secondary mt-3">
                                    <p>¿El pin no coincide con la ubicación?</p>
                                    <button class="underline font-medium" @click.prevent="isDraggable = true">Ajustar
                                        ubicación</button>
                                </div>
                                <div v-show="isDraggable" class="flex flex-col items-center text-secondary mt-3">
                                    <button class="underline font-medium" @click.prevent="isDraggable = false">Dejar de
                                        ajustar
                                        ubicación</button>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div class="flex justify-between gap-4 mt-5">
                        <CommonButton @click="closeModal" bg-color="tertiary"
                            class="px-4 py-2 rounded-lg text-white font-medium outline">Volver</CommonButton>
                        <CommonButton @click="updateSession" bg-color="secondary"
                            class="px-4 py-2 rounded-lg text-white font-medium outline">Modificar sesión
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script lang="ts" setup>

import { useGeocoding } from '~/composables/maps/useGeocoding';
import { useMapInteraction } from '~/composables/maps/useMapInteraction';



interface CustomGeocoder {
    updateSearchTerm: (term: string) => void;
}

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const markerCoordinates = ref(DEFAULT_COORDINATES);
const isDraggable = ref(false);

const mapID = "editEmptySessionMap";
const mapRef = useMapboxRef(mapID);

const markerID = "editEmptySessionMarker"
const markerRef = useMapboxMarkerRef(markerID);

const currentZoom = computed(() => mapRef.value?.getZoom());
const getMarkerCoordinates = () => markerCoordinates.value;

const modalRef = ref<Modal | null>(null);
const geocoderRef = ref<CustomGeocoder | null>(null);

const { getReverseGeocodingData } = useGeocoding();
const { flyTo, teleportTo, calculateDistance, calculateDurationBasedOnDistance } = useMapInteraction(mapRef);

const onMarkerDragEnd = () => {
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
        speed: 1
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
const runtimeConfig = useRuntimeConfig();
interface sessionUpdateResponse extends APIResponse { }


interface SessionInfo {
    session_id: number;
    date: string;
    time: string;
    available: number;
    format: string;
    modality: string;
    link: string
    actual_assistant: number;
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
        props.sessionInfo.format = '';
        props.sessionInfo.modality = '';
        props.sessionInfo.link = '';
        props.sessionInfo.students = [];
        props.sessionInfo.professional = {} as Professional;
    }
}
const openModal = () => {
    modal.value?.openModal();
    resetModal();
}

const updateSession = async () => {
    if (!props.sessionInfo) return;

    const dataSession = {
        user_id: props.sessionInfo.professional.user_id,
        session_id: props.sessionInfo.session_id,
        date: props.sessionInfo.date,
        time: props.sessionInfo.time,
        format: props.sessionInfo.format,
        modality: props.sessionInfo.modality,
        link: props.sessionInfo.link,
        clients: props.sessionInfo.students.map(student => student.user_id),
        coordinates: '[' + markerCoordinates.value[0] + ',' + markerCoordinates.value[1] + ']',
        type: "session"
    }
    console.log(dataSession)
    try {
        const response = await $fetch<sessionUpdateResponse>(`${runtimeConfig.public.apiBase}/admin/session/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataSession
        });

        if (response.success) {
            console.log(response.message);
            closeModal();
        }
        else {
            console.error(response.message);
        }

    }
    catch (error) {
        console.error(error);
    }

}



const closeModal = () => {
    modal.value?.closeModal();
}
const professionals = computed(() => [props.sessionInfo?.professional]);

defineExpose({
    openModal,
    closeModal
})

</script>