<template>
    <div class="relative">
        <div>
            <div class="mb-4 flex flex-col items-center justify-between gap-5 lg:flex-row">
                <h3 class="text-xl font-medium">Agendar sesión</h3>
                <div class="flex flex-col items-center">
                    <button
                        @click="openLocationModal"
                        class="flex gap-x-2 rounded-md bg-gray-200 px-4 py-2 text-gray-500"
                        :class="{ invisible: isOnline }"
                    >
                        <Icon name="heroicons:map-pin" class="flex-shrink-0 text-2xl" />
                        <div class="max-w-xs">
                            <p v-show="!selectedLocation">Ubicación</p>
                            <p v-show="selectedLocation" class="line-clamp-1">
                                {{ selectedLocation?.place_name }}
                            </p>
                        </div>
                    </button>

                    <div
                        class="mt-2 flex items-center gap-x-1 text-secondary"
                        :class="{ invisible: isOnline }"
                    >
                        <p class="text-sm font-semibold">¿Por qué necesitan mi ubicación?</p>
                        <Icon name="ion:information-circle-outline" class="text-xl" />
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span :class="{ 'text-gray-400': isOnline }">Presencial</span>
                    <!-- Toggle container -->
                    <button
                        class="relative h-8 w-14 rounded-full p-1"
                        :class="[isOnline ? 'bg-secondary' : 'bg-primary']"
                        @click="isOnline = !isOnline"
                    >
                        <!-- Toggle thumb -->
                        <div
                            class="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform"
                            :class="{ 'translate-x-6': isOnline }"
                        ></div>
                    </button>
                    <span :class="{ 'text-gray-400': !isOnline }">Online</span>
                </div>
            </div>
            <div class="mt-14 flex items-center justify-between">
                <button
                    @click="goToPreviousWeekAndUpdateSelectedDate"
                    :disabled="isStartWeek"
                    class="group"
                >
                    <Icon
                        class="text-5xl text-secondary group-disabled:cursor-not-allowed group-disabled:text-secondary-100"
                        name="heroicons:chevron-left-20-solid"
                    />
                </button>
                <div
                    v-show="!sessionsLoading"
                    class="flex flex-nowrap gap-2 overflow-x-auto py-2 md:flex-wrap md:overflow-visible"
                >
                    <span
                        v-for="(day, index) in weekDays"
                        @click="selectDate(day)"
                        :key="index"
                        class="flex min-w-32 cursor-pointer flex-col items-center rounded-md px-4 py-2 text-gray-700 outline"
                        :class="{
                            'bg-secondary text-white opacity-100 outline-secondary':
                                day.toISOString() === selectedDate.toISOString(),
                            'bg-gray-200 opacity-50 outline-dashed outline-gray-500':
                                !hasSessionsOnDay(day) &&
                                ((!isOnline && selectedLocation !== null) || isOnline),
                            'bg-gray-200 outline-transparent':
                                (!isOnline && selectedLocation == null) ||
                                (!isOnline && selectedLocation != null && hasSessionsOnDay(day)) ||
                                (isOnline && hasSessionsOnDay(day)),
                        }"
                    >
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
                <div
                    v-show="(!selectedLocation && !isOnline) || filteredProfessionals.length === 0"
                    class="mt-10 w-full rounded-xl border p-10 text-center shadow-md"
                >
                    <div v-show="!selectedLocation && !isOnline">
                        <h2 class="mb-5 text-3xl font-semibold text-primary">
                            No se ha ingresado ubicación
                        </h2>
                        <p class="mx-auto max-w-2xl text-gray-700">
                            No podemos mostrarte sesiones presenciales si no ingresas la
                            <span class="font-bold"> ubicación aproximada </span>
                            , ya que no sabemos si el profesional tendrá cobertura. Puedes ingresar
                            <span class="font-bold"> “Online” </span>
                            como opción si no deseas que sea presencial.
                        </p>
                    </div>
                    <div
                        v-show="selectedLocation && !isOnline && filteredProfessionals.length === 0"
                    >
                        <h2 class="mb-5 text-3xl font-semibold text-primary">
                            No hay profesionales
                        </h2>
                        <p class="mx-auto max-w-2xl text-gray-700">
                            No encontramos ninguna hora con nuestros profesionales para la ubicación
                            y fecha ingresada. Prueba otra fecha o prueba otra ubicación.
                        </p>
                    </div>
                    <div v-show="isOnline && filteredProfessionals.length === 0">
                        <h2 class="mb-5 text-3xl font-semibold text-primary">
                            No hay profesionales
                        </h2>
                        <p class="mx-auto max-w-2xl text-gray-700">
                            No encontramos ninguna hora con nuestros profesionales para la fecha
                            ingresada. Prueba otra fecha.
                        </p>
                    </div>
                </div>
                <div
                    v-show="
                        ((selectedLocation && !isOnline) || isOnline) &&
                        filteredProfessionals.length === 0
                    "
                    class="inline-flex w-full flex-col items-center text-center"
                >
                    <p class="mx-auto mb-3 mt-6 max-w-xl text-gray-700">
                        Puedes ponerte en contacto directamente con el administrador para coordinar
                        una sesión a través de whatsapp
                    </p>
                    <NuxtLink
                        to="https://wa.me/56971370313?text=Hola%20Entrena%20En%20Casa,%20tengo%20una%20duda."
                        target="_blank"
                        class="space-x-1 rounded px-4 py-1.5 text-primary"
                    >
                        <Icon name="logos:whatsapp-icon" class="text-4xl" />
                        <span class="underline underline-offset-4">Contactar</span>
                    </NuxtLink>
                </div>
                <div
                    v-show="filteredProfessionals.length > 0"
                    class="grid grid-cols-1 gap-4 xl:grid-cols-2"
                >
                    <div
                        v-for="(professional, index) in filteredProfessionals"
                        :key="index"
                        class="grid grid-cols-1 place-items-center gap-4 rounded-xl border bg-white px-8 py-10 xl:grid-cols-3"
                    >
                        <div class="col-span-1 text-center">
                            <h3 class="text-2xl font-semibold">
                                {{ professional.first_name + " " + professional.last_name }}
                            </h3>
                            <p class="text-sm">{{ professional.title }}</p>
                        </div>
                        <div class="col-span-1 px-5 text-center xl:col-span-2 xl:text-left">
                            <div class="space-y-5">
                                <div v-if="professional.customSessions.length > 0">
                                    <h3 class="mb-2 font-medium">Personalizada</h3>
                                    <div
                                        class="flex flex-wrap items-center justify-center gap-2 xl:justify-start"
                                    >
                                        <button
                                            v-for="session in professional.customSessions"
                                            :key="session.session_info.session_id"
                                            @click="openConfirmationModal(professional, session)"
                                            class="rounded-full border bg-secondary px-4 py-1.5 text-white"
                                        >
                                            <p class="text">{{ session.start_time }}hrs</p>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="professional.groupSessions.length > 0">
                                    <h3 class="mb-2 font-medium">Grupal</h3>
                                    <div
                                        class="flex flex-wrap items-center justify-center xl:justify-start"
                                        :class="[isOnline ? 'gap-2' : 'gap-4']"
                                    >
                                        <div
                                            class="flex flex-col gap-2"
                                            v-for="session in professional.groupSessions"
                                        >
                                            <a
                                                v-if="!isOnline"
                                                target="__blank"
                                                :href="session.session_info.link"
                                                class="text-secondary"
                                            >
                                                <Icon
                                                    name="fa6-solid:location-dot"
                                                    class="mr-1 text-xl"
                                                />
                                                <span
                                                    class="text-sm font-medium underline underline-offset-4"
                                                    >Ver ubicación</span
                                                >
                                            </a>
                                            <button
                                                @click="
                                                    openConfirmationModal(professional, session)
                                                "
                                                class="rounded-full border bg-secondary px-4 py-1.5 text-center text-white"
                                            >
                                                <p class="text">{{ session.start_time }}hrs</p>
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
                    <h2 class="mb-6 text-center text-xl font-semibold">Ingresa tu dirección</h2>
                    <MapsMapboxGeocoder ref="geocoderRef" @locationSelected="flyToLocation" />
                    <div>
                        <div
                            class="relative mt-5 flex h-full min-h-[300px] w-full justify-center lg:min-w-[400px]"
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
                    </div>
                    <div
                        v-show="!isDraggable"
                        class="mt-3 flex flex-col items-center text-secondary"
                    >
                        <p>¿El pin no coincide con la ubicación?</p>
                        <button class="font-medium underline" @click="isDraggable = true">
                            Ajustar ubicación
                        </button>
                    </div>
                    <div
                        v-show="isDraggable"
                        class="mt-3 flex flex-col items-center text-secondary"
                    >
                        <button class="font-medium underline" @click="isDraggable = false">
                            Dejar de ajustar ubicación
                        </button>
                    </div>
                    <div class="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                        <CommonButton @click="closeLocationModal" class="bg-tertiary px-5 py-2">
                            Cancelar
                        </CommonButton>
                        <CommonButton @click="confirmLocation" class="bg-primary px-5 py-2">
                            Confirmar ubicación
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="confirmationModal">
                <div class="px-2 py-4">
                    <h3 class="mb-10 text-center text-2xl font-semibold">Confirmación de datos</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <p class="justify-self-end">Profesional:</p>
                        <p class="font-semibold">
                            {{ selectedSession?.professional.name }}
                        </p>
                        <p class="justify-self-end">Fecha:</p>
                        <p class="font-semibold">
                            {{ selectedSession?.session.date }}
                        </p>
                        <p class="justify-self-end">Hora:</p>
                        <p class="font-semibold">
                            {{ selectedSession?.session.start_time }}
                        </p>
                        <p class="justify-self-end">Modalidad:</p>
                        <p class="font-semibold">
                            {{ selectedSession?.session.modality }}
                        </p>
                        <template v-if="selectedSession?.session.location">
                            <p class="justify-self-end">Ubicación de la sesión:</p>
                            <p v-if="!selectedSession?.isGroup" class="max-w-60 font-semibold">
                                {{ selectedSession?.session.location }}
                            </p>
                            <a
                                v-else
                                :href="selectedSession?.session.location"
                                target="__blank"
                                class="flex max-w-60 items-center font-medium text-secondary"
                            >
                                <Icon name="fa6-solid:location-dot" class="mr-1 text-xl" />
                                <span class="underline underline-offset-4">Ver ubicación</span>
                            </a>
                        </template>
                    </div>
                    <div class="mt-6 flex flex-col-reverse gap-2 md:flex-row md:justify-between">
                        <CommonButton @click="closeLocationModal" class="bg-tertiary px-5 py-2">
                            Cancelar
                        </CommonButton>
                        <CommonButton
                            @click="confirmSession"
                            class="bg-primary px-5 py-2"
                            :loading="confirmSessionLoading"
                        >
                            Confirmar sesión
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";
import { useWeekNavigation } from "~/composables/time/useWeekNavigation";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useToast } from "vue-toastification";

const DEFAULT_COORDINATES = [-70.6506, -33.4372];
const DEFAULT_ZOOM = 13;

const mapID = "studentMap";
const mapRef = useMapboxRef(mapID);

const markerID = "studentMarker";
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
const toast = useToast();

const isOnline = ref(false);
const professionals = ref([]);

const filteredProfessionals = computed(() => {
    const selectedDateString = selectedDate.value.toISOString().split("T")[0];

    const filteredData = professionals.value
        .map((professional) => {
            const filteredSessions = professional.sessions.filter((session) => {
                return session.date.startsWith(selectedDateString);
            });

            const customSessions = filteredSessions.filter(
                (session) => session.session_info.format === "Personalizado",
            );
            const groupSessions = filteredSessions.filter(
                (session) => session.session_info.format === "Grupal",
            );

            return {
                ...professional,
                customSessions: customSessions,
                groupSessions,
            };
        })
        .filter(
            (professional) =>
                professional.customSessions.length > 0 || professional.groupSessions.length > 0,
        );

    return filteredData;
});

const hasSessionsOnDay = (day) => {
    // Convert the day to a YYYY-MM-DD string format
    const dayString = day.toISOString().split("T")[0];

    // Check if there are professionals with sessions on this day
    return professionals.value.some((professional) =>
        professional.sessions.some((session) => {
            // Extract the date part of the session.date and compare
            const sessionDate = session.date.split("T")[0];
            return sessionDate === dayString;
        }),
    );
};

const sessionsLoading = ref(false);

// Mapbox map methods

const onMarkerDragEnd = () => {
    if (!markerRef.value) return;
    const coordinates = markerRef.value.getLngLat().toArray();
    setMarkerCoordinates(coordinates);
    flyToCenter();
    updateInputValue();
};

const flyToCenter = () => {
    const zoom = currentZoom.value;
    const coordinates = getMarkerCoordinates();
    flyTo(coordinates, zoom, {
        speed: 0.5,
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
};

const goToPreviousWeekAndUpdateSelectedDate = () => {
    goToPreviousWeek();
    selectDate(weekDays.value[0]);
};

const selectDate = (day) => {
    selectedDate.value = day;
};

const locationModal = ref(null);
const selectedLocation = ref(null);

const openLocationModal = () => {
    locationModal.value.openModal();
};

const closeLocationModal = () => {
    locationModal.value.closeModal();
};

const confirmLocation = async () => {
    await updateSelectedLocationToCurrentLocation();
    saveLocation();
    closeLocationModal();
    getSessions();
};

const saveLocation = async () => {
    const user = userStore.user;
    const newUser = {
        ...user,
        location: {
            lng: markerCoordinates.value[0],
            lat: markerCoordinates.value[1],
        },
    };
    userStore.setUser(newUser);
};

const confirmationModal = ref(null);
const selectedSession = ref(null);
const confirmSessionLoading = ref(false);

const openConfirmationModal = (professionalData, sessionData) => {
    let location;
    if (!isOnline.value && sessionData.session_info.format === "Personalizado") {
        location = selectedLocation.value.place_name;
    } else if (!isOnline.value && sessionData.session_info.format === "Grupal") {
        location = sessionData.session_info.link;
    } else {
        location = null;
    }

    const newSession = {
        professional: {
            name: professionalData.first_name + " " + professionalData.last_name,
            title: professionalData.title,
        },
        session: {
            id: sessionData.session_info.session_id,
            date: sessionData.date,
            start_time: sessionData.start_time,
            modality: sessionData.session_info.modality,
            location: location,
        },
        isGroup: sessionData.session_info.format === "Grupal",
    };
    selectedSession.value = newSession;
    confirmationModal.value.openModal();
};

const confirmSession = async () => {
    confirmSessionLoading.value = true;

    const body = {
        session_id: selectedSession.value.session.id,
        user_id: userStore.user.user_id,
    };

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/student/session`, {
            method: "POST",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            toast.success(response.message);
            getSessions();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Ocurrió un error al confirmar la sesión");
    } finally {
        confirmSessionLoading.value = false;
        confirmationModal.value.closeModal();
    }
};

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
        start_date: startOfWeek.value.toISOString().split("T")[0],
        user_id: userStore.user.user_id,
    };

    try {
        const response = await $fetch(
            `${runtimeConfig.public.apiBase}/student/sessions/in-person`,
            {
                method: "POST",
                credentials: "include",
                body: body,
            },
        );

        if (response.success) {
            professionals.value = response.professionals;
        } else {
            professionals.value = [];
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        professionals.value = [];
        toast.error("Ocurrió un error al cargar las sesiones");
    } finally {
        sessionsLoading.value = false;
    }
};

const getOnlineSessions = async () => {
    sessionsLoading.value = true;

    const body = {
        start_date: startOfWeek.value.toISOString().split("T")[0],
        user_id: userStore.user.user_id,
    };

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/student/sessions/online`, {
            method: "POST",
            credentials: "include",
            body: body,
        });

        console.log(response);

        if (response.success) {
            professionals.value = response.professionals;
        } else {
            professionals.value = [];
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        professionals.value = [];
        toast.error("Ocurrió un error al cargar las sesiones");
    } finally {
        sessionsLoading.value = false;
    }
};

const getSessions = () => {
    if (isOnline.value) {
        getOnlineSessions();
    } else {
        getInPersonSessions();
    }
};

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
};
</script>
