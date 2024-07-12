<template>
    <div>
        <div
            class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 items-center w-full">
            <ProfessionalDashboardCalendarWeekNavigation
                :currentMonth="currentMonth"
                :isFetchingData="fetchingEvents"
                :currentYear="currentYear"
                :isStartWeek="isStartWeek"
                @go-to-previous-week="handleGoToPreviousWeek"
                @go-to-next-week="handleGoToNextWeek" />

            <div class="justify-self-center bg-gray-200 rounded-lg px-16 py-1">
                <p class="font-semibold">Semanal</p>
            </div>

            <div
                class="flex gap-2 items-center justify-self-center md:justify-self-end">
                <button
                    v-show="!editMode"
                    :disabled="events.length == 0"
                    @click="toggleEditState"
                    class="bg-primary rounded text-white font-semibold px-4 py-1 disabled:bg-primary-100 disabled:cursor-not-allowed">
                    Editar
                </button>
                <button
                    v-show="editMode"
                    @click="toggleEditState"
                    class="bg-secondary rounded text-white font-semibold px-4 py-1">
                    <div class="flex items-center gap-x-1">
                        <Icon name="fa6-solid:pen-to-square"></Icon>
                        <p>Modo edición</p>
                    </div>
                </button>
                <div v-show="!editMode" class="relative">
                    <button
                        @click.stop="newDropdown.toggle()"
                        class="bg-primary rounded text-white font-semibold px-4 py-1 flex items-center gap-1">
                        <span> Nuevo </span>
                        <Icon name="fa6-solid:chevron-down"></Icon>
                    </button>
                    <div
                        class="min-w-max absolute top-6 border right-0 z-50 my-4 text-base list-none text-white shadow-md font-semibold rounded"
                        :class="{ hidden: !newDropdown.active }">
                        <ul class="divide-y divide-gray-200">
                            <li>
                                <button
                                    @click="
                                        newEmptySessionModal.handleClickFromButton
                                    "
                                    class="w-full px-4 py-2 rounded-t text-sm bg-primary hover:bg-primary-600"
                                    role="menuitem">
                                    Disponibilidad
                                </button>
                            </li>
                            <li>
                                <button
                                    @click="newEventModal.handleClick"
                                    class="px-4 py-2 text-sm rounded-b bg-primary hover:bg-primary-600"
                                    role="menuitem">
                                    Evento Manual
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-6 flex items-center">
            <Icon
                name="ic:outline-access-time"
                class="text-2xl text-gray-600 mr-2" />
            <CommonSelect
                v-model="slotDurationInMinutes"
                name="duration"
                id="duration"
                :options="slotDurationInMinutesOptions"
                class="w-max" />
        </div>
        <ProfessionalDashboardCalendarEventGrid
            :fetchingEvents="fetchingEvents"
            :calendarData="calendarData"
            :editMode="editMode"
            :emptySlotModal="emptySlotModal"
            :editEventHandler="editEventHandler"
            :slotDurationInMinutes="slotDurationInMinutes" />

        <div class="mt-10 mb-4 flex justify-center">
            <div
                class="flex flex-col items-start lg:flex-row lg:justify-center gap-10 font-semibold">
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-primary rounded-md"></div>
                    <span> Bloque disponible para sesión </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-secondary rounded-md"></div>
                    <span> Sesión con al menos 1 cliente </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-quaternary rounded-md"></div>
                    <span> Evento personal </span>
                </div>
            </div>
        </div>

        <!-- Modals -->

        <ProfessionalDashboardCalendarModalsEmptySlotModal
            ref="emptySlotModalRef"
            :modal="emptySlotModal" />
        <ProfessionalDashboardCalendarModalsEmptySessionModal
            ref="newEmptySessionModalRef"
            :modal="newEmptySessionModal" />
        <ProfessionalDashboardCalendarModalsNewEventModal
            ref="newEventModalRef"
            :modal="newEventModal" />
        <ProfessionalDashboardCalendarModalsEditEmptySessionModal
            ref="editEmptySessionModalRef"
            :modal="editEmptySessionModal" />
        <ProfessionalDashboardCalendarModalsEditManualSessionModal
            ref="editManualSessionModalRef"
            :modal="editManualSessionModal" />
        <ProfessionalDashboardCalendarModalsEditPersonalEventModal
            ref="editPersonalEventModalRef"
            :modal="editPersonalEventModal" />
    </div>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";
import { useDayNavigationStore } from "~/stores/professional/dashboard/calendar/DayNavigationStore";
import { useTimeRangeStore } from "~/stores/professional/dashboard/calendar/TimeRangeStore";
import { useFormatter } from "~/composables/time/useFormatter";
import { useWeekNavigation } from "~/composables/time/useWeekNavigation";
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const { formatDateToWeekdayAndDay } = useFormatter();
const {
    isStartWeek,
    goToPreviousWeek,
    goToNextWeek,
    currentYear,
    currentMonth,
    currentDate,
} = useWeekNavigation();
const { getReverseGeocodingData } = useGeocoding();

const dayNavigationStore = useDayNavigationStore();
const { updateSelectedDate, goToStartOfWeek } = dayNavigationStore;
const { selectedDate } = storeToRefs(dayNavigationStore);

const timeRangeStore = useTimeRangeStore();
const {
    updateSelectedStartTimeFromString,
    updateSelectedEndTimeFromString,
    setSelectedStartTimeToFirstAvailableTime,
} = timeRangeStore;
const { selectedStartTime, automaticallySelectedEndTime, selectedEndTime } =
    storeToRefs(timeRangeStore);

const events = ref([]); // Array of events
const fetchingEvents = ref(false); // Loading state of the events

const slotDurationInMinutes = ref(60); // Duration of each time slot in minutes
const slotDurationInMinutesOptions = ref([
    {
        value: 15,
        label: "15 minutos",
    },
    {
        value: 30,
        label: "30 minutos",
    },
    {
        value: 45,
        label: "45 minutos",
    },
    {
        value: 60,
        label: "1 hora",
    },
]);

watch(slotDurationInMinutes, () => {
    getEvents();
});

// if the events array is empty, set editMode to false
watch(events, () => {
    console.log("events changed!");
    if (events.value.length == 0) {
        editMode.value = false;
    }
});

const calendarData = ref([]);

// Edit mode state
const editMode = ref(false);

const toggleEditState = () => {
    editMode.value = !editMode.value;
};

const handleGoToNextWeek = () => {
    goToNextWeek();
    getEvents();
};

const handleGoToPreviousWeek = () => {
    goToPreviousWeek();
    getEvents();
};

const newDropdown = reactive({
    active: false,
    toggle: () => (newDropdown.active = !newDropdown.active),
    close: () => (newDropdown.active = false),
});

const initializeCalendarData = () => {
    // Reset the array
    calendarData.value = [];

    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00

    // Calculate the start and end of the week
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get the end of the week

    // Calculate the number of slots per day
    const slotsPerDay = 24 * (60 / slotDurationInMinutes.value);

    // Populate the array with placeholders for each time slot
    for (
        let date = startOfWeek;
        date <= endOfWeek;
        date.setDate(date.getDate() + 1)
    ) {
        const day = {
            date: new Date(date), // Create a new Date object to avoid mutation
            formattedDate: formatDateToWeekdayAndDay(date),
            timeSlots: Array.from({ length: slotsPerDay }, (_, i) => {
                const hours = Math.floor(
                    (i * slotDurationInMinutes.value) / 60
                );
                const minutes = (i * slotDurationInMinutes.value) % 60;
                return {
                    time: `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}`,
                    events: [], // Initialize with an empty array
                };
            }),
        };

        calendarData.value.push(day);
    }

    console.log("Calendar initalized");
    console.log(calendarData.value);
};

const getTimeSlotIndex = (time) => {
    const [hours, minutes] = time.split(":");
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const slotIndex = Math.floor(totalMinutes / slotDurationInMinutes.value);
    const slotOffset = totalMinutes % slotDurationInMinutes.value;
    return { slotIndex, slotOffset };
};

const populateCalendar = (events) => {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00

    // Calculate the start of the week
    const startOfWeek = new Date(today);

    // Populate events in the appropriate time slots
    events.forEach((event) => {
        const eventDate = new Date(event.date);
        const dayDiff =
            (eventDate.getTime() - startOfWeek.getTime()) /
            (1000 * 60 * 60 * 24);
        const dayIndex = Math.floor(dayDiff);

        const startTime = getTimeSlotIndex(event.start_time);
        const endTime = getTimeSlotIndex(event.end_time);

        for (let i = startTime.slotIndex; i < endTime.slotIndex; i++) {
            const timeSlot = calendarData.value[dayIndex].timeSlots[i];
            if (!timeSlot.events) {
                timeSlot.events = [];
            }
            timeSlot.events.push({
                event,
                isStartEvent: i === startTime.slotIndex,
                isEndEvent: i === endTime.slotIndex,
                startOffset:
                    i === startTime.slotIndex ? startTime.slotOffset : 0,
                endOffset: i === endTime.slotIndex ? endTime.slotOffset : 0,
            });
        }
    });

    console.log("Calendar population complete");
    console.log(calendarData.value);
};

const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

/* API calls */

const getEvents = async () => {
    fetchingEvents.value = true;
    initializeCalendarData();

    const localDateString = getLocalDateString(currentDate.value);
    const body = {
        user_id: userStore.user.user_id,
        start_date: localDateString, // fecha en formato YYYY-MM-DD
    };

    try {
        const response = await $fetch(
            `${runtimeConfig.public.apiBase}/professional/calendar`,
            {
                method: "POST",
                credentials: "include",
                body: body,
            }
        );

        if (response.success) {
            // populateCalendarData(response.events)
            populateCalendar(response.events);
            events.value = response.events;
            console.log(events.value);
        } else {
            events.value = [];
            toast.error(response.message);
        }
    } catch (error) {
        console.log("Fetch error:", error);
        events.value = [];
        toast.error("Error al obtener los eventos");
    } finally {
        fetchingEvents.value = false;
    }
};

/* Modals */

// Empty slot modal
const emptySlotModalRef = ref(null);
const newEmptySessionModalRef = ref(null);
const newEventModalRef = ref(null);
const editEmptySessionModalRef = ref(null);
const editManualSessionModalRef = ref(null);
const editPersonalEventModalRef = ref(null);

const emptySlotModal = reactive({
    openModal: () => {
        if (emptySlotModalRef.value) {
            emptySlotModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (emptySlotModalRef.value) {
            emptySlotModalRef.value.closeModal();
        }
    },
    handleClick: (day, time) => {
        updateCurrentlySelectedDate(day, time);
        emptySlotModalRef.value.openModal();
    },
    addNewSession: () => {
        emptySlotModalRef.value.closeModal();
        newEmptySessionModal.openModal();
    },
    addNewEvent: () => {
        emptySlotModalRef.value.closeModal();
        newEventModal.openModal();
    },
});

// Add new empty session modal

const newEmptySessionModal = reactive({
    data: {
        selectedFormat: "Personalizado",
        selectedModality: "Online",
        link: "",
        locationCoordinates: [],
    },
    loading: false,
    openModal: () => {
        newEmptySessionModal.resetModalData();
        if (newEmptySessionModalRef.value) {
            newEmptySessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (newEmptySessionModalRef.value) {
            newEmptySessionModalRef.value.closeModal();
        }
    },
    resetModalData: () => {
        newEmptySessionModal.data.selectedFormat = "Personalizado";
        newEmptySessionModal.data.selectedModality = "Online";
    },
    handleClickFromButton: () => {
        goToStartOfWeek();
        setSelectedStartTimeToFirstAvailableTime();
        newEmptySessionModal.openModal();
    },
    addNewEmptySession: async () => {
        const localDateString = getLocalDateString(selectedDate.value);
        newEmptySessionModal.loading = true;

        let link;
        let coordinates;

        if (
            newEmptySessionModal.data.selectedFormat === "Grupal" &&
            newEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = await createGoogleMapsLink(
                newEmptySessionModal.data.locationCoordinates
            );
            coordinates = JSON.stringify(
                newEmptySessionModal.data.locationCoordinates
            );
        } else if (
            newEmptySessionModal.data.selectedFormat === "Personalizado" &&
            newEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = "";
            coordinates = null;
        } else {
            link = newEmptySessionModal.data.link;
            coordinates = null;
        }

        const body = {
            user_id: userStore.user.user_id,
            date: localDateString, // fecha en formato YYYY-MM-DD
            time: selectedStartTime.value,
            available: true,
            format: newEmptySessionModal.data.selectedFormat,
            modality: newEmptySessionModal.data.selectedModality,
            link: link,
            coordinates: coordinates,
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session`,
                {
                    method: "POST",
                    credentials: "include",
                    body: body,
                }
            );

            if (response.success) {
                getEvents();
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al crear la sesión");
        } finally {
            newEmptySessionModal.loading = false;
            newEmptySessionModal.closeModal();
        }
    },
});

const createGoogleMapsLink = async (coordinates) => {
    const address = await getReverseGeocodingData(coordinates);
    if (address) {
        const encodedAddress = encodeURIComponent(address.place_name);
        return `https://www.google.com/maps?q=${encodedAddress}`;
    } else {
        const [lng, lat] = coordinates;
        return `https://www.google.com/maps?q=${lat},${lng}`;
    }
};

const newEventModal = reactive({
    data: {
        selectedEventType: "Nuevo entrenamiento",
        loading: false,
        manualSession: {
            clients: [],
            selectedFormat: "Personalizado",
            selectedModality: "Online",
            link: "",
            locationCoordinates: [],
        },
        personalEvent: {
            clients: [],
            selectedFormat: "Grupal",
            additionalInfo: "",
        },
    },
    openModal: () => {
        newEventModal.resetModalData();
        if (newEventModalRef.value) {
            newEventModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (newEventModalRef.value) {
            newEventModalRef.value.closeModal();
        }
    },
    resetModalData: () => {
        newEventModal.data.selectedEventType = "Nuevo entrenamiento";
        newEventModal.data.manualSession.clients = [];
        newEventModal.data.manualSession.selectedFormat = "Personalizado";
        newEventModal.data.manualSession.selectedModality = "Online";
        newEventModal.data.manualSession.link = "";
        newEventModal.data.personalEvent.clients = [];
        newEventModal.data.personalEvent.selectedFormat = "Grupal";
        newEventModal.data.personalEvent.additionalInfo = "";
    },
    handleClick: () => {
        goToStartOfWeek();
        setSelectedStartTimeToFirstAvailableTime();
        newEventModal.openModal();
    },
    addNewEvent: async () => {
        newEventModal.data.loading = true;
        const localDateString = getLocalDateString(selectedDate.value);

        if (newEventModal.data.selectedEventType == "Nuevo entrenamiento") {
            const clientsIDs = newEventModal.data.manualSession.clients.map(
                (client) => client.user_id
            );

            let link;
            let coordinates;

            if (
                newEventModal.data.manualSession.selectedFormat === "Grupal" &&
                newEventModal.data.manualSession.selectedModality ===
                    "Presencial"
            ) {
                link = await createGoogleMapsLink(
                    newEventModal.data.manualSession.locationCoordinates
                );
                coordinates = JSON.stringify(
                    newEventModal.data.manualSession.locationCoordinates
                );
            } else if (
                newEventModal.data.manualSession.selectedFormat ===
                    "Personalizado" &&
                newEventModal.data.manualSession.selectedModality ===
                    "Presencial"
            ) {
                link = "";
                coordinates = null;
            } else {
                link = newEventModal.data.manualSession.link;
                coordinates = null;
            }

            const body = {
                user_id: userStore.user.user_id,
                date: localDateString, // fecha en formato YYYY-MM-DD
                start_time: selectedStartTime.value, // hora en formato HH:MM
                end_time: automaticallySelectedEndTime.value, // hora en formato HH:MM
                format: newEventModal.data.manualSession.selectedFormat, // "Personalizado" o "Grupal"
                modality: newEventModal.data.manualSession.selectedModality, // "Online" o "Presencial"
                link: link, // link de la sesión, se pasa como text
                clients: clientsIDs, // array de ids de clientes
                type: "manual_session", // "manual session en caso de Nuevo entrenamiento"
                coordinates: coordinates,
            };

            try {
                const response = await $fetch(
                    `${runtimeConfig.public.apiBase}/professional/session/manual`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: body,
                    }
                );

                if (response.success) {
                    getEvents();
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.log("Fetch error:", error);
                toast.error("Error al crear la sesión");
            } finally {
                newEventModal.data.loading = false;
                newEventModal.closeModal();
            }
        } else if (newEventModal.data.selectedEventType == "Evento personal") {
            const clientsIDs = newEventModal.data.personalEvent.clients.map(
                (client) => client.user_id
            );

            const body = {
                user_id: userStore.user.user_id,
                date: localDateString, // fecha en formato YYYY-MM-DD
                start_time: selectedStartTime.value, // hora en formato HH:MM
                end_time: selectedEndTime.value, // hora en formato HH:MM
                info: newEventModal.data.personalEvent.additionalInfo, // información adicional
                clients: clientsIDs, // array de ids de clientes
                type: "personal", // "Nuevo entrenamiento" o "Evento personal"
            };

            try {
                const response = await $fetch(
                    `${runtimeConfig.public.apiBase}/professional/session/personal`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: body,
                    }
                );

                if (response.success) {
                    getEvents();
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.log("Fetch error:", error);
                toast.error("Error al crear el evento personal");
            } finally {
                newEventModal.data.loading = false;
                newEventModal.closeModal();
            }
        }
    },
});

const editEventHandler = reactive({
    handleClick: (day, time, event) => {
        if (event.type === "session") {
            editEmptySessionModal.handleClick(day, time, event);
        } else if (event.type === "manual_session") {
            editManualSessionModal.handleClick(day, time, event);
        } else if (event.type === "personal") {
            editPersonalEventModal.handleClick(day, time, event);
        }
    },
});

// Edit empty session modal
const editEmptySessionModal = reactive({
    data: {
        selectedFormat: null,
        selectedModality: null,
        link: null,
        clients: [],
        event: null,
        locationCoordinates: [],
        removeSessionLoading: false,
        updateSessionLoading: false,
    },
    openModal: () => {
        if (editEmptySessionModalRef.value) {
            editEmptySessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editEmptySessionModalRef.value) {
            editEmptySessionModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editEmptySessionModal.data.selectedFormat = event.session_info.format;
        editEmptySessionModal.data.selectedModality =
            event.session_info.modality;
        editEmptySessionModal.data.link = event.session_info.link;
        editEmptySessionModal.data.event = event;
        editEmptySessionModal.data.clients = [...event.clients];
        updateCurrentlySelectedDate(day, time);
        editEmptySessionModal.openModal();
    },
    updateSession: async () => {
        editEmptySessionModal.data.updateSessionLoading = true;
        const event = editEmptySessionModal.data.event;
        const clientsIDs = editEmptySessionModal.data.clients.map(
            (client) => client.user_id
        );

        let link;
        let coordinates;

        if (
            editEmptySessionModal.data.selectedFormat === "Grupal" &&
            editEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = await createGoogleMapsLink(
                editEmptySessionModal.data.locationCoordinates
            );
            coordinates = JSON.stringify(
                editEmptySessionModal.data.locationCoordinates
            );
        } else if (
            editEmptySessionModal.data.selectedFormat === "Personalizado" &&
            editEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = "";
            coordinates = null;
        } else {
            link = newEmptySessionModal.data.link;
            coordinates = null;
        }

        const body = {
            user_id: userStore.user.user_id,
            session_id: event.session_info.session_id,
            date: getLocalDateString(selectedDate.value),
            time: selectedStartTime.value,
            format: editEmptySessionModal.data.selectedFormat,
            modality: editEmptySessionModal.data.selectedModality,
            clients: clientsIDs,
            link: link,
            coordinates: coordinates,
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: body,
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al actualizar la sesión");
        } finally {
            editEmptySessionModal.data.updateSessionLoading = false;
            editEmptySessionModal.closeModal();
        }
    },
    removeSession: async () => {
        editEmptySessionModal.data.removeSessionLoading = true;

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/delete-session/${editEmptySessionModal.data.event.session_info.session_id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al eliminar la sesión");
        } finally {
            editEmptySessionModal.data.removeSessionLoading = false;
            editEmptySessionModal.closeModal();
        }
    },
});

const editManualSessionModal = reactive({
    data: {
        selectedEventType: "Nuevo entrenamiento",
        clients: [],
        selectedFormat: "Personalizado",
        selectedModality: "Online",
        link: "",
        event: null,
        locationCoordinates: [],
        removeSessionLoading: false,
        updateSessionLoading: false,
    },
    openModal: () => {
        if (editManualSessionModalRef.value) {
            editManualSessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editManualSessionModalRef.value) {
            editManualSessionModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editManualSessionModal.data.selectedEventType = event.type;
        editManualSessionModal.data.clients = [...event.clients]; // Create a new array
        editManualSessionModal.data.selectedFormat = event.session_info.format;
        editManualSessionModal.data.selectedModality =
            event.session_info.modality;
        editManualSessionModal.data.link = event.session_info.link;
        editManualSessionModal.data.event = event;
        updateCurrentlySelectedDate(day, time);
        editManualSessionModal.openModal();
    },
    updateSession: async () => {
        editManualSessionModal.data.updateSessionLoading = true;
        const event = editManualSessionModal.data.event;
        const body = {
            user_id: userStore.user.user_id,
            event_id: event.event_id,
            session_id: event.session_info.session_id,
            date: getLocalDateString(selectedDate.value),
            start_time: selectedStartTime.value,
            end_time: automaticallySelectedEndTime.value,
            format: editManualSessionModal.data.selectedFormat,
            modality: editManualSessionModal.data.selectedModality,
            link: editManualSessionModal.data.link,
            clients: editManualSessionModal.data.clients.map(
                (client) => client.user_id
            ),
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session/manual`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: body,
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al actualizar la sesión");
        } finally {
            editManualSessionModal.data.updateSessionLoading = false;
            editManualSessionModal.closeModal();
        }
    },
    removeSession: async () => {
        editManualSessionModal.data.removeSessionLoading = true;

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/delete-event/${editManualSessionModal.data.event.event_id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al eliminar la sesión");
        } finally {
            editManualSessionModal.data.removeSessionLoading = false;
            editManualSessionModal.closeModal();
        }
    },
});

const editPersonalEventModal = reactive({
    data: {
        clients: [],
        selectedFormat: "Grupal",
        additionalInfo: "",
        removeSessionLoading: false,
        updateSessionLoading: false,
        event: null,
    },
    openModal: () => {
        if (editPersonalEventModalRef.value) {
            editPersonalEventModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editPersonalEventModalRef.value) {
            editPersonalEventModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editPersonalEventModal.data.clients = [...event.clients]; // Create a new array
        editPersonalEventModal.data.additionalInfo = event.info;
        editPersonalEventModal.data.event = event;
        updateCurrentlySelectedDate(day, time);
        updateSelectedEndTimeFromString(event.end_time);
        editPersonalEventModal.openModal();
    },
    updateSession: async () => {
        editPersonalEventModal.data.updateSessionLoading = true;
        const event = editPersonalEventModal.data.event;
        const body = {
            user_id: userStore.user.user_id,
            event_id: event.event_id,
            date: getLocalDateString(selectedDate.value),
            start_time: selectedStartTime.value,
            end_time: selectedEndTime.value,
            info: editPersonalEventModal.data.additionalInfo,
            clients: editPersonalEventModal.data.clients.map(
                (client) => client.user_id
            ),
            type: "personal",
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session/personal`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: body,
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al actualizar el evento personal");
        } finally {
            editPersonalEventModal.data.updateSessionLoading = false;
            editPersonalEventModal.closeModal();
        }
    },
    removeSession: async () => {
        editPersonalEventModal.data.removeSessionLoading = true;

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/delete-event/${editPersonalEventModal.data.event.event_id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.success) {
                toast.success(response.message);
                getEvents();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Error al eliminar el evento personal");
        } finally {
            editPersonalEventModal.data.removeSessionLoading = false;
            editPersonalEventModal.closeModal();
        }
    },
});

const updateCurrentlySelectedDate = (date, timeString) => {
    updateSelectedDate(date);
    updateSelectedStartTimeFromString(timeString);
};

/* Lifecycle hooks */

onMounted(() => {
    getEvents();
    //allows for closing the dropdown when clicking outside of it
    document.addEventListener("click", newDropdown.close);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", newDropdown.close);
});
</script>
