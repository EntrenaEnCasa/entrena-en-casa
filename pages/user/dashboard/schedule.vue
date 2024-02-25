<template>
    <div class="relative">
        <div>
            <div class="flex flex-col lg:flex-row justify-between items-center mb-4 gap-5">
                <h3 class="text-xl font-medium">Agendar sesión</h3>
                <div class="flex flex-col items-center">
                    <button @click="openLocationModal" class="rounded-md px-4 py-2 flex bg-gray-200 text-gray-500 gap-x-2"
                        :class="{ 'invisible': isOnline }">
                        <Icon name="heroicons:map-pin" class="text-2xl flex-shrink-0" />
                        <div class="max-w-xs">
                            <p v-show="!selectedLocation">Ubicación</p>
                            <p v-show="selectedLocation" class="line-clamp-1">{{
                                selectedLocation?.place_name }}</p>
                        </div>
                    </button>

                    <div class="flex items-center gap-x-1 text-secondary mt-2" :class="{ 'invisible': isOnline }">
                        <p class="text-sm font-semibold">¿Por qué necesitan mi ubicación?</p>
                        <Icon name="ion:information-circle-outline" class="text-xl" />
                    </div>
                </div>
                <div class="flex items-center gap-2">
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
            <div class="mt-14 flex items-center justify-between">
                <button @click="goToPreviousWeekAndUpdateSelectedDate" :disabled="isStartWeek" class="group">
                    <Icon
                        class="text-5xl text-secondary group-disabled:text-secondary-100 group-disabled:cursor-not-allowed"
                        name="heroicons:chevron-left-20-solid" />
                </button>
                <div v-show="!sessionsLoading"
                    class="py-2 flex gap-2 overflow-x-auto flex-nowrap md:overflow-visible md:flex-wrap">
                    <span v-for="(day, index) in weekDays" @click="selectDate(day)" :key="index"
                        class="rounded-md py-2 px-4 flex flex-col items-center text-gray-700 min-w-32 outline cursor-pointer"
                        :class="{
                            'bg-secondary text-white outline-secondary opacity-100': day.toISOString() === selectedDate.toISOString(),
                            'outline-gray-500 outline-dashed bg-gray-200 opacity-50': !hasSessionsOnDay(day) && ((!isOnline && selectedLocation !== null) || isOnline),
                            'outline-transparent bg-gray-200': (!isOnline && selectedLocation == null) || ((!isOnline && selectedLocation != null && hasSessionsOnDay(day)) || (isOnline && hasSessionsOnDay(day))),
                        }">
                        <span class="text-2xl font-semibold">{{ formatDate(day).day }}</span>
                        <span class="capitalize">{{ formatDate(day).month }}</span>
                    </span>
                </div>

                <div v-show="sessionsLoading">
                    <CommonLoading text="Cargando sesiones" />
                </div>

                <button @click="goToNextWeekAndUpdateSelectedDate">
                    <Icon class="text-5xl text-secondary" name="heroicons:chevron-right-20-solid" />
                </button>
            </div>
            <div v-show="!sessionsLoading" class="my-10">
                <div v-if="!selectedLocation && !isOnline"
                    class="shadow-md rounded-xl p-10 w-full text-center mt-10 border">
                    <h2 class="text-3xl font-semibold text-primary mb-5">No se ha ingresado ubicación</h2>
                    <p class="max-w-2xl mx-auto text-gray-700">
                        No podemos mostrarte sesiones presenciales si no ingresas la
                        <span class="font-bold">
                            ubicación aproximada
                        </span>
                        , ya que no sabemos si el profesional tendrá cobertura.
                        Puedes ingresar
                        <span class="font-bold">
                            “Online”
                        </span>
                        como opción si no deseas que sea presencial.
                    </p>
                </div>
                <div v-show="(selectedLocation && !isOnline) && filteredProfessionals.length == 0"
                    class="shadow-md rounded-xl p-10 w-full text-center mt-10 border">
                    <h2 class="text-3xl font-semibold text-primary mb-5">No hay profesionales</h2>
                    <p class="max-w-2xl mx-auto text-gray-700">
                        No encontramos ninguna hora con nuestros profesionales para la ubicación y fecha
                        ingresada.
                        Prueba otra fecha o prueba otra ubicación.
                    </p>
                </div>
                <div v-show="isOnline && filteredProfessionals.length == 0"
                    class="shadow-md rounded-xl p-10 w-full text-center mt-10 border">
                    <h2 class="text-3xl font-semibold text-primary mb-5">No hay profesionales</h2>
                    <p class="max-w-2xl mx-auto text-gray-700">
                        No encontramos ninguna hora con nuestros profesionales para la fecha
                        ingresada.
                        Prueba otra fecha.
                    </p>
                </div>
                <div v-show="filteredProfessionals.length > 0" class="grid grid-cols-1 xl:grid-cols-2">
                    <div v-for="professional, index in filteredProfessionals" :key="index"
                        class="border rounded-xl bg-white py-10 px-8 grid grid-cols-1 xl:grid-cols-3 gap-4 place-items-center">
                        <div class="col-span-1 text-center">
                            <h3 class="text-2xl font-semibold">{{ professional.first_name + ' ' + professional.last_name }}
                            </h3>
                            <p class="text-sm">{{ professional.title }}</p>
                        </div>
                        <div class="col-span-1 xl:col-span-2 px-5 text-center xl:text-left">
                            <div class="space-y-5">
                                <div v-if="professional.individualSessions.length > 0">
                                    <h3 class="font-medium mb-2">Personalizada</h3>
                                    <div class="flex flex-wrap justify-center xl:justify-start gap-2 items-center">
                                        <button v-for="session in professional.individualSessions"
                                            :key="session.session_info.session_id"
                                            @click="openConfirmationModal(professional, session)"
                                            class="border rounded-full px-4 py-1.5 bg-secondary text-white">
                                            <p class="text">
                                                {{ session.start_time }}hrs
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="professional.groupSessions.length > 0">
                                    <h3 class="font-medium mb-2">Grupal</h3>
                                    <div class="flex flex-wrap justify-center xl:justify-start items-center"
                                        :class="[isOnline ? 'gap-2' : 'gap-4']">
                                        <div class="flex flex-col gap-2" v-for="session in professional.groupSessions">
                                            <a v-if="!isOnline" target="__blank" :href="session.session_info.link"
                                                class="text-secondary">
                                                <Icon name="fa6-solid:location-dot" class="text-xl mr-1" />
                                                <span class="text-sm font-medium underline underline-offset-4">Ver
                                                    ubicación</span>
                                            </a>
                                            <button @click="openConfirmationModal(professional, session)"
                                                class="border rounded-full px-4 py-1.5 bg-secondary text-white text-center">
                                                <p class="text">
                                                    {{ session.start_time }}hrs
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Teleport to="body">
            <CommonModal ref="locationModal">
                <div class="px-2 py-4">
                    <h2 class="text-xl font-semibold text-center mb-6">Ingresa tu dirección</h2>
                    <MapsMapboxGeocoder ref="geocoderRef" @locationSelected="flyToLocation" />
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
                        <button class="underline font-medium" @click="isDraggable = true">Ajustar ubicación</button>
                    </div>
                    <div v-show="isDraggable" class="flex flex-col items-center text-secondary mt-3">
                        <button class="underline font-medium" @click="isDraggable = false">Dejar de ajustar
                            ubicación</button>
                    </div>
                    <div class="flex justify-between mt-5">
                        <CommonButton @click="closeLocationModal" class="px-5 py-2 bg-tertiary">
                            Cancelar
                        </CommonButton>
                        <CommonButton @click="confirmLocation" class="px-5 py-2 bg-primary">
                            Confirmar ubicación
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="confirmationModal">
                <div class="px-2 py-4">
                    <h3 class="text-center text-2xl font-semibold mb-10">Confirmación de datos</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <p class="justify-self-end">Profesional: </p>
                        <p class="font-semibold">{{ selectedSession?.professional.name }}</p>
                        <p class="justify-self-end">Hora:</p>
                        <p class="font-semibold">{{ selectedSession?.session.start_time }}</p>
                        <p class="justify-self-end">Modalidad:</p>
                        <p class="font-semibold">
                            {{ selectedSession?.session.modality }}
                        </p>
                        <template v-if="selectedSession?.session.location">
                            <p class="justify-self-end">
                                Ubicación de la
                                sesión:
                            </p>
                            <p v-if="!selectedSession?.isGroup" class="font-semibold max-w-60">
                                {{ selectedSession?.session.location }}
                            </p>
                            <a v-else :href="selectedSession?.session.location" target="__blank"
                                class="font-medium max-w-60 text-secondary flex items-center">
                                <Icon name="fa6-solid:location-dot" class="text-xl mr-1" />
                                <span class="underline underline-offset-4">Ver ubicación</span>
                            </a>
                        </template>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2 justify-between mt-6">
                        <CommonButton @click="closeLocationModal" class="px-5 py-2 bg-tertiary">
                            Cancelar
                        </CommonButton>
                        <CommonButton @click="confirmSession" class="px-5 py-2 bg-primary" :loading="confirmSessionLoading">
                            Confirmar sesión
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/UserStore';
import { useWeekNavigation } from '~/composables/time/useWeekNavigation';
import { useMapInteraction } from '~/composables/maps/useMapInteraction';
import { useGeocoding } from '~/composables/maps/useGeocoding';

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const mapID = "studentMap";
const mapRef = useMapboxRef(mapID);

const markerID = "studentMarker"
const markerRef = useMapboxMarkerRef(markerID);
const isDraggable = ref(false);

const currentZoom = computed(() => mapRef.value?.getZoom());

const geocoderRef = ref(null);
const markerCoordinates = ref(DEFAULT_COORDINATES);
const getMarkerCoordinates = () => markerCoordinates.value;

const { getReverseGeocodingData } = useGeocoding();
const { weekDays, isStartWeek, goToPreviousWeek, goToNextWeek, formatDate } = useWeekNavigation();
const { flyTo, calculateDurationBasedOnDistance, calculateDistance } = useMapInteraction(mapRef);
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();

const isOnline = ref(false);
const professionals = ref([]);

const filteredProfessionals = computed(() => {
    const selectedDateString = selectedDate.value.toISOString().split('T')[0];

    const filteredData = professionals.value.map(professional => {
        const filteredSessions = professional.sessions.filter(session => {
            return session.date.startsWith(selectedDateString);
        });

        const individualSessions = filteredSessions.filter(session => session.session_info.format === 'Individual');
        const groupSessions = filteredSessions.filter(session => session.session_info.format === 'Grupal');

        return { ...professional, individualSessions, groupSessions };
    }).filter(professional => professional.individualSessions.length > 0 || professional.groupSessions.length > 0);

    return filteredData;
});

const hasSessionsOnDay = (day) => {
    // Convert the day to a YYYY-MM-DD string format
    const dayString = day.toISOString().split('T')[0];

    // Check if there are professionals with sessions on this day
    return professionals.value.some(professional => professional.sessions.some(session => {
        // Extract the date part of the session.date and compare
        const sessionDate = session.date.split('T')[0];
        return sessionDate === dayString;
    }));
};

const sessionsLoading = ref(false);

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
    geocoderRef.value.updateSearchTerm(address);
};

const selectedDate = ref(weekDays.value[0]);
const startOfWeek = computed(() => weekDays.value[0]);

const goToNextWeekAndUpdateSelectedDate = () => {
    goToNextWeek();
    selectDate(weekDays.value[0]);
    getSessions();
};

const goToPreviousWeekAndUpdateSelectedDate = () => {
    goToPreviousWeek();
    selectDate(weekDays.value[0]);
    getSessions();
};

const selectDate = (day) => {
    selectedDate.value = day;
}

const locationModal = ref(null);
const selectedLocation = ref(null);

const openLocationModal = () => {
    locationModal.value.openModal();
};

const closeLocationModal = () => {
    locationModal.value.closeModal();
}

const confirmLocation = async () => {
    await updateSelectedLocationToCurrentLocation();
    saveLocation();
    closeLocationModal();
    getSessions();
}

const saveLocation = async () => {
    const user = userStore.user;
    const newUser = {
        ...user, location: {
            lng: markerCoordinates.value[0],
            lat: markerCoordinates.value[1],
        }
    };
    userStore.setUser(newUser);
}

const confirmationModal = ref(null);
const selectedSession = ref(null);
const confirmSessionLoading = ref(false);

const openConfirmationModal = (professionalData, sessionData) => {
    let location;
    if (!isOnline.value && sessionData.session_info.format === 'Individual') {
        location = selectedLocation.value.place_name;
    }
    else if (!isOnline.value && sessionData.session_info.format === 'Grupal') {
        location = sessionData.session_info.link;
    }
    else {
        location = null;
    }

    const newSession = {
        professional: {
            name: professionalData.first_name + ' ' + professionalData.last_name,
            title: professionalData.title,
        },
        session: {
            id: sessionData.session_info.session_id,
            date: sessionData.date,
            start_time: sessionData.start_time,
            modality: sessionData.session_info.modality,
            location: location,
        },
        isGroup: sessionData.session_info.format === 'Grupal'
    }
    selectedSession.value = newSession;
    confirmationModal.value.openModal();
};

const confirmSession = async () => {

    confirmSessionLoading.value = true;

    const body = {
        session_id: selectedSession.value.session.id,
        user_id: userStore.user.user_id,
    }

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/student/session`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.userToken || ''
        },
        body: body
    });

    confirmSessionLoading.value = false;

    if (error.value) {
        console.log("Fetch error:", error.value);
        return;
    }

    if (data.value.success) {
        console.log(data.value.message);
        getSessions();
    }
    else {
        console.log(data.value.message);
    }

    confirmationModal.value.closeModal();
}

const getInPersonSessions = async () => {

    sessionsLoading.value = true;
    if (!selectedLocation.value) {
        professionals.value = [];
        sessionsLoading.value = false;
        return;
    }

    const body = {
        lng: markerCoordinates.value[0],
        lat: markerCoordinates.value[1],
        short_code: selectedLocation.value.context[3].short_code,
        start_date: startOfWeek.value.toISOString().split('T')[0],
        user_id: userStore.user.user_id,
    }

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/student/sessions/in-person`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.userToken || ''
        },
        body: body
    });

    sessionsLoading.value = false;

    if (error.value) {
        console.log("Fetch error:", error.value);
        return;
    }

    if (data.value.success) {
        professionals.value = data.value.professionals;
    }
    else {
        professionals.value = [];
        console.log(data.value.message);
    }
}

const getOnlineSessions = async () => {

    sessionsLoading.value = true;

    const body = {
        start_date: startOfWeek.value.toISOString().split('T')[0],
        user_id: userStore.user.user_id,
    }

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/student/sessions/online`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.userToken || ''
        },
        body: body
    });

    sessionsLoading.value = false;

    if (error.value) {
        console.log("Fetch error:", error.value);
        return;
    }

    if (data.value.success) {
        professionals.value = data.value.professionals;
    }
    else {
        professionals.value = [];
        console.log(data.value.message);
    }
}

const getSessions = () => {
    if (isOnline.value) {
        getOnlineSessions();
    }
    else {
        getInPersonSessions();
    }
}

watch(isOnline, () => {
    getSessions();
});

watch(startOfWeek, () => {
    getSessions();
});

onMounted(async () => {
    if (userStore.user.location != undefined) {
        sessionsLoading.value = true;
        const location = userStore.user.location;
        setMarkerCoordinates([location.lng, location.lat]);
        await updateSelectedLocationToCurrentLocation();
    }
    updateInputValue();
    getSessions();
});

const updateSelectedLocationToCurrentLocation = async () => {
    const location = await getReverseGeocodingData(getMarkerCoordinates());
    selectedLocation.value = location;
}

</script>