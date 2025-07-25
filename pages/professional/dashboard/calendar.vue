<template>
    <div>
        <div class="mt-4 grid w-full grid-cols-1 items-center gap-5 md:grid-cols-3">
            <ProfessionalDashboardCalendarWeekNavigation
                :currentMonth="currentMonth"
                :isFetchingData="fetchingEvents"
                :currentYear="currentYear"
                :isStartWeek="isStartWeek"
                @go-to-previous-week="handleGoToPreviousWeek"
                @go-to-next-week="handleGoToNextWeek"
            />

            <div class="justify-self-center rounded-lg bg-gray-200 px-16 py-1">
                <p class="font-semibold">Semanal</p>
            </div>

            <div class="flex items-center gap-2 justify-self-center md:justify-self-end">
                <button
                    v-show="!editMode"
                    :disabled="events.length == 0"
                    @click="toggleEditState"
                    class="rounded bg-primary px-4 py-1 font-semibold text-white disabled:cursor-not-allowed disabled:bg-primary-100"
                >
                    Editar
                </button>
                <button
                    v-show="editMode"
                    @click="toggleEditState"
                    class="rounded bg-secondary px-4 py-1 font-semibold text-white"
                >
                    <div class="flex items-center gap-x-1">
                        <Icon name="fa6-solid:pen-to-square"></Icon>
                        <p>Modo edición</p>
                    </div>
                </button>
                <div v-show="!editMode" class="relative">
                    <button
                        @click.stop="newDropdown.toggle()"
                        class="flex items-center gap-1 rounded bg-primary px-4 py-1 font-semibold text-white"
                    >
                        <span> Nuevo </span>
                        <Icon name="fa6-solid:chevron-down"></Icon>
                    </button>
                    <div
                        class="absolute right-0 top-6 z-50 my-4 min-w-max list-none rounded border text-base font-semibold text-white shadow-md"
                        :class="{ hidden: !newDropdown.active }"
                    >
                        <ul class="divide-y divide-gray-200">
                            <li>
                                <button
                                    @click="newEmptySessionModal.handleClickFromButton"
                                    class="w-full rounded-t bg-primary px-4 py-2 text-sm hover:bg-primary-600"
                                    role="menuitem"
                                >
                                    Disponibilidad
                                </button>
                            </li>
                            <li>
                                <button
                                    @click="newEventModal.handleClick"
                                    class="rounded-b bg-primary px-4 py-2 text-sm hover:bg-primary-600"
                                    role="menuitem"
                                >
                                    Evento Manual
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-6 flex items-center">
            <Icon name="ic:outline-access-time" class="mr-2 text-2xl text-gray-600" />
            <CommonSelect
                v-model="slotDurationInMinutes"
                name="duration"
                id="duration"
                :options="slotDurationInMinutesOptions"
                class="w-max"
            />
        </div>
        <ProfessionalDashboardCalendarEventGrid
            :fetchingEvents="fetchingEvents"
            :calendarData="calendarData"
            :editMode="editMode"
            :emptySlotModal="emptySlotModal"
            :editEventHandler="editEventHandler"
            :infoEventHandler="infoEventHandler"
            :slotDurationInMinutes="slotDurationInMinutes"
        />

        <div class="mb-4 mt-10 flex justify-center">
            <div
                class="flex flex-col items-start gap-10 font-semibold lg:flex-row lg:justify-center"
            >
                <div class="flex items-center justify-center gap-3">
                    <div class="h-12 w-14 rounded-md bg-primary"></div>
                    <span> Bloque disponible para sesión </span>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <div class="h-12 w-14 rounded-md bg-secondary"></div>
                    <span> Sesión con al menos 1 cliente </span>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <div class="h-12 w-14 rounded-md bg-quaternary"></div>
                    <span> Evento personal </span>
                </div>
            </div>
        </div>

        <!-- Modals -->

        <ProfessionalDashboardCalendarModalsEmptySlotModal
            ref="emptySlotModalRef"
            :modal="emptySlotModal"
        />
        <ProfessionalDashboardCalendarModalsEmptySessionModal
            ref="newEmptySessionModalRef"
            :modal="newEmptySessionModal"
        />
        <ProfessionalDashboardCalendarModalsNewEventModal
            ref="newEventModalRef"
            :modal="newEventModal"
        />
        <ProfessionalDashboardCalendarModalsEditEmptySessionModal
            ref="editEmptySessionModalRef"
            :modal="editEmptySessionModal"
        />
        <ProfessionalDashboardCalendarModalsEditManualSessionModal
            ref="editManualSessionModalRef"
            :modal="editManualSessionModal"
        />
        <ProfessionalDashboardCalendarModalsEditPersonalEventModal
            ref="editPersonalEventModalRef"
            :modal="editPersonalEventModal"
        />
        <ProfessionalDashboardCalendarModalsSessionDetailsModal
            ref="sessionDetailsModalRef"
            :modal="sessionDetailsModal"
        />
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
const { createDate, formatDateToAbbreviatedWeekdayAndDay } = useFormatter();
const { isStartWeek, goToPreviousWeek, goToNextWeek, currentYear, currentMonth, currentDate } =
    useWeekNavigation();
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
const { formattedStartTime, formattedEndTime } = storeToRefs(timeRangeStore);

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
    calendarData.value = [];
    const today = new Date().setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const slotsPerDay = 24 * (60 / slotDurationInMinutes.value);
    const daysToShow = 7;

    try {
        for (let i = 0; i < daysToShow; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);

            const day = {
                date: currentDate,
                formattedDate: formatDateToAbbreviatedWeekdayAndDay(currentDate),
                timeSlots: Array.from({ length: slotsPerDay }, (_, j) => {
                    const totalMinutes = j * slotDurationInMinutes.value;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return {
                        time: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
                        events: [],
                    };
                }),
            };

            calendarData.value.push(day);
        }

        console.log("Calendar data initialized: ", calendarData.value);
    } catch (error) {
        console.error("Error initializing calendar data:", error);
    }
};

const getTimeSlotInfo = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const slotIndex = Math.floor(totalMinutes / slotDurationInMinutes.value);
    const offset = totalMinutes % slotDurationInMinutes.value;
    return { slotIndex, offset };
};

const populateCalendar = (events) => {
    const startOfWeek = new Date(calendarData.value[0].date);

    events.forEach((event) => {
        // we use createDate to create a Date object from the string date to avoid timezone issues
        const eventDate = createDate(event.date);

        const dayIndex = Math.floor((eventDate - startOfWeek) / (1000 * 60 * 60 * 24));

        const { slotIndex: startSlotIndex, offset: startOffset } = getTimeSlotInfo(
            event.start_time,
        );
        const { slotIndex: endSlotIndex, offset: endOffset } = getTimeSlotInfo(event.end_time);

        const lastSlotIndex = endOffset === 0 ? endSlotIndex - 1 : endSlotIndex;

        for (let i = startSlotIndex; i <= lastSlotIndex; i++) {
            const timeSlot = calendarData.value[dayIndex].timeSlots[i];
            const isStartSlot = i === startSlotIndex;
            const isEndSlot = i === lastSlotIndex;
            const isSecondSlot = i === startSlotIndex + 1;

            timeSlot.events.push({
                event,
                isStartEvent: isStartSlot,
                isSecondEvent: isSecondSlot,
                isEndEvent: isEndSlot,
                startOffset: isStartSlot ? startOffset : 0,
                endOffset: isEndSlot
                    ? endOffset === 0
                        ? 0
                        : slotDurationInMinutes.value - endOffset
                    : 0,
            });
        }
    });

    console.log("Calendar population complete");
    console.log(calendarData.value);
};

const getFormattedDateString = (date) => {
    return date.toISOString().split("T")[0];
};

/* API calls */

const getEvents = async () => {
    fetchingEvents.value = true;
    initializeCalendarData();

    const localDateString = getFormattedDateString(currentDate.value);

    console.log("get events local date string: ", localDateString);
    const body = {
        user_id: userStore.user.user_id,
        start_date: localDateString, // fecha en formato YYYY-MM-DD
    };

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/calendar`, {
            method: "POST",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            populateCalendar(response.events);
            events.value = response.events;
            console.log("events fetched: ");
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
const sessionDetailsModalRef = ref(null);

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
        const localDateString = getFormattedDateString(selectedDate.value);
        newEmptySessionModal.loading = true;

        let link;
        let coordinates;

        if (
            newEmptySessionModal.data.selectedFormat === "Grupal" &&
            newEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = await createGoogleMapsLink(newEmptySessionModal.data.locationCoordinates);
            coordinates = JSON.stringify(newEmptySessionModal.data.locationCoordinates);
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
            time: formattedStartTime.value,
            available: true,
            format: newEmptySessionModal.data.selectedFormat,
            modality: newEmptySessionModal.data.selectedModality,
            link: link,
            coordinates: coordinates,
        };

        console.log("create new empty session body: ", body);

        try {
            const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/session`, {
                method: "POST",
                credentials: "include",
                body: body,
            });

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
        const localDateString = getFormattedDateString(selectedDate.value);

        if (newEventModal.data.selectedEventType == "Nuevo entrenamiento") {
            const clientsIDs = newEventModal.data.manualSession.clients.map(
                (client) => client.user_id,
            );

            let link;
            let coordinates;

            if (
                newEventModal.data.manualSession.selectedFormat === "Grupal" &&
                newEventModal.data.manualSession.selectedModality === "Presencial"
            ) {
                link = await createGoogleMapsLink(
                    newEventModal.data.manualSession.locationCoordinates,
                );
                coordinates = JSON.stringify(newEventModal.data.manualSession.locationCoordinates);
            } else if (
                newEventModal.data.manualSession.selectedFormat === "Personalizado" &&
                newEventModal.data.manualSession.selectedModality === "Presencial"
            ) {
                link = "";
                coordinates = JSON.stringify(newEventModal.data.manualSession.locationCoordinates);
            } else {
                link = newEventModal.data.manualSession.link;
                coordinates = null;
            }

            const body = {
                user_id: userStore.user.user_id,
                date: localDateString, // fecha en formato YYYY-MM-DD
                start_time: formattedStartTime.value, // hora en formato HH:MM
                end_time: formattedEndTime.value, // hora en formato HH:MM
                format: newEventModal.data.manualSession.selectedFormat, // "Personalizado" o "Grupal"
                modality: newEventModal.data.manualSession.selectedModality, // "Online" o "Presencial"
                link: link, // link de la sesión, se pasa como text
                clients: clientsIDs, // array de ids de clientes
                type: "manual_session", // "manual session en caso de Nuevo entrenamiento"
                coordinates: coordinates,
            };

            console.log("create new manual session body: ", body);

            try {
                const response = await $fetch(
                    `${runtimeConfig.public.apiBase}/professional/session/manual`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: body,
                    },
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
                (client) => client.user_id,
            );

            const body = {
                user_id: userStore.user.user_id,
                date: localDateString, // fecha en formato YYYY-MM-DD
                start_time: formattedStartTime.value, // hora en formato HH:MM
                end_time: formattedEndTime.value, // hora en formato HH:MM
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
                    },
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

const infoEventHandler = reactive({
    handleClick: (event) => {
        sessionDetailsModal.handleClick(event);
    },
});

const editEventHandler = reactive({
    handleClick: (day, event) => {
        console.log("event from edit event handler: ", event);
        if (event.type === "session") {
            editEmptySessionModal.handleClick(day, event);
        } else if (event.type === "manual_session") {
            editManualSessionModal.handleClick(day, event);
        } else if (event.type === "personal") {
            editPersonalEventModal.handleClick(day, event);
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
    handleClick: (day, event) => {
        editEmptySessionModal.data.selectedFormat = event.session_info.format;
        editEmptySessionModal.data.selectedModality = event.session_info.modality;
        editEmptySessionModal.data.link = event.session_info.link;
        editEmptySessionModal.data.event = event;
        editEmptySessionModal.data.clients = [...event.clients];
        updateCurrentlySelectedDate(day, event.start_time);
        editEmptySessionModal.openModal();
    },
    updateSession: async () => {
        editEmptySessionModal.data.updateSessionLoading = true;
        const event = editEmptySessionModal.data.event;
        const clientsIDs = editEmptySessionModal.data.clients.map((client) => client.user_id);

        let link;
        let coordinates;

        if (
            editEmptySessionModal.data.selectedFormat === "Grupal" &&
            editEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = await createGoogleMapsLink(editEmptySessionModal.data.locationCoordinates);
            coordinates = JSON.stringify(editEmptySessionModal.data.locationCoordinates);
        } else if (
            editEmptySessionModal.data.selectedFormat === "Personalizado" &&
            editEmptySessionModal.data.selectedModality === "Presencial"
        ) {
            link = "";
            coordinates = JSON.stringify(newEventModal.data.manualSession.locationCoordinates);
        } else {
            link = newEmptySessionModal.data.link;
            coordinates = null;
        }

        const body = {
            user_id: userStore.user.user_id,
            session_id: event.session_info.session_id,
            date: getFormattedDateString(selectedDate.value),
            time: formattedStartTime.value,
            format: editEmptySessionModal.data.selectedFormat,
            modality: editEmptySessionModal.data.selectedModality,
            clients: clientsIDs,
            link: link,
            coordinates: coordinates,
        };

        try {
            const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/session`, {
                method: "PUT",
                credentials: "include",
                body: body,
            });

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
                },
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
    handleClick: (day, event) => {
        editManualSessionModal.data.selectedEventType = event.type;
        editManualSessionModal.data.clients = [...event.clients]; // Create a new array
        editManualSessionModal.data.selectedFormat = event.session_info.format;
        editManualSessionModal.data.selectedModality = event.session_info.modality;
        editManualSessionModal.data.link = event.session_info.link;
        editManualSessionModal.data.event = event;
        updateCurrentlySelectedDate(day, event.start_time);
        editManualSessionModal.openModal();
    },
    updateSession: async () => {
        editManualSessionModal.data.updateSessionLoading = true;
        const event = editManualSessionModal.data.event;
        const body = {
            user_id: userStore.user.user_id,
            event_id: event.event_id,
            session_id: event.session_info.session_id,
            date: getFormattedDateString(selectedDate.value),
            start_time: formattedStartTime.value,
            end_time: formattedEndTime.value,
            format: editManualSessionModal.data.selectedFormat,
            modality: editManualSessionModal.data.selectedModality,
            link: editManualSessionModal.data.link,
            clients: editManualSessionModal.data.clients.map((client) => client.user_id),
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session/manual`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: body,
                },
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
                },
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
    handleClick: (day, event) => {
        editPersonalEventModal.data.clients = [...event.clients]; // Create a new array
        editPersonalEventModal.data.additionalInfo = event.info;
        editPersonalEventModal.data.event = event;
        updateCurrentlySelectedDate(day, event.start_time);
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
            start_time: formattedStartTime.value,
            end_time: formattedEndTime.value,
            info: editPersonalEventModal.data.additionalInfo,
            clients: editPersonalEventModal.data.clients.map((client) => client.user_id),
            type: "personal",
        };

        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/professional/session/personal`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: body,
                },
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
                },
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

const sessionDetailsModal = reactive({
    data: {
        event: null,
    },
    openModal: (event) => {
        if (sessionDetailsModalRef.value) {
            sessionDetailsModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (sessionDetailsModalRef.value) {
            sessionDetailsModalRef.value.closeModal();
        }
    },
    handleClick: (event) => {
        sessionDetailsModal.data.event = event;
        sessionDetailsModal.openModal();
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
const { setSEO } = useSEO();
setSEO({
  title: 'Gestiona tu calendario de clases como profesional - Entrena en Casa',
  description: 'Configura tu disponibilidad horaria como personal trainer online o a domicilio. Gestiona tu agenda semanal y clases desde un solo calendario integrado.',
  keywords: [
    "calendario personal trainer", "sesiones programadas entrenador", "clases online programadas", "organización sesiones semanal",
    "planificación mensual personal trainer", "cronograma de entrenamientos", "disponibilidad horaria entrenador", "agenda de sesiones fitness",
    "planificación de clases a domicilio", "agenda semanal de entrenamientos", "calendario de rutinas personalizadas", "Personal Trainer a domicilio"
  ],
  image: '/SEO/professional/dashboard/calendar.png',
  type: 'website'
})


</script>
