<template>
    <div>
        <div class="mt-4 mb-10">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center w-full">

                <ProfessionalDashboardCalendarWeekNavigation :currentMonth="currentMonth"
                    :isFetchingData="fetchingEvents" :currentYear="currentYear" :isStartWeek="isStartWeek"
                    @go-to-previous-week="handleGoToPreviousWeek" @go-to-next-week="handleGoToNextWeek" />

                <div class="justify-self-center bg-gray-200 rounded-lg px-16 py-1">
                    <p class="font-semibold">Semanal</p>
                </div>

                <div class="flex gap-2 items-center justify-self-center md:justify-self-end">
                    <button v-show="!editMode" :disabled="events.length == 0" @click="toggleEditState"
                        class="bg-primary rounded text-white font-semibold px-4 py-1 disabled:bg-primary-100 disabled:cursor-not-allowed">
                        Editar
                    </button>
                    <button v-show="editMode" @click="toggleEditState"
                        class="bg-secondary rounded text-white font-semibold px-4 py-1">
                        <div class="flex items-center gap-x-1">
                            <Icon name="fa6-solid:pen-to-square"></Icon>
                            <p>
                                Modo edición
                            </p>
                        </div>
                    </button>
                    <div v-show="!editMode" class="relative">
                        <button @click.stop="newDropdown.toggle()"
                            class=" bg-primary rounded text-white font-semibold px-4 py-1 flex items-center gap-1">
                            <span>
                                Nuevo
                            </span>
                            <Icon name="fa6-solid:chevron-down"></Icon>
                        </button>
                        <div class="min-w-max absolute top-6 border right-0 z-50 my-4 text-base list-none text-white shadow-md font-semibold rounded"
                            :class="{ hidden: !newDropdown.active }">
                            <ul class="divide-y divide-gray-200">
                                <li>
                                    <button @click="newEmptySessionModal.handleClickFromButton"
                                        class="w-full px-4 py-2 rounded-t text-sm bg-primary hover:bg-primary-600"
                                        role="menuitem">
                                        Disponibilidad
                                    </button>
                                </li>
                                <li>
                                    <button @click="newEventModal.handleClick"
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
        </div>
        <ProfessionalDashboardCalendarEventGrid :fetchingEvents="fetchingEvents" :eventMatrix="eventMatrix"
            :editMode="editMode" :emptySlotModal="emptySlotModal" :editEventHandler="editEventHandler" />

        <div class="mt-10 mb-4 flex justify-center">
            <div class="flex flex-col items-start lg:flex-row lg:justify-center gap-10 font-semibold">
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-primary rounded-md">
                    </div>
                    <span>
                        Bloque disponible para sesión
                    </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-secondary rounded-md">
                    </div>
                    <span>
                        Sesión con al menos 1 cliente
                    </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-quaternary rounded-md">
                    </div>
                    <span>
                        Evento personal
                    </span>
                </div>
            </div>

        </div>

        <!-- Modals -->

        <ProfessionalDashboardCalendarModalsEmptySlotModal ref="emptySlotModalRef" :modal="emptySlotModal" />
        <ProfessionalDashboardCalendarModalsEmptySessionModal ref="newEmptySessionModalRef"
            :modal="newEmptySessionModal" />
        <ProfessionalDashboardCalendarModalsNewEventModal ref="newEventModalRef" :modal="newEventModal" />
        <ProfessionalDashboardCalendarModalsEditEmptySessionModal ref="editEmptySessionModalRef"
            :modal="editEmptySessionModal" />
        <ProfessionalDashboardCalendarModalsEditManualSessionModal ref="editManualSessionModalRef"
            :modal="editManualSessionModal" />
        <ProfessionalDashboardCalendarModalsEditPersonalEventModal ref="editPersonalEventModalRef"
            :modal="editPersonalEventModal" />
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/UserStore';
import { useDayNavigationStore } from '~/stores/professional/dashboard/calendar/DayNavigationStore';
import { useTimeRangeStore } from '~/stores/professional/dashboard/calendar/TimeRangeStore'
import { useFormatter } from '~/composables/time/useFormatter';
import { useWeekNavigation } from '~/composables/time/useWeekNavigation';
import { useGeocoding } from '~/composables/maps/useGeocoding';

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const { formatDateToWeekdayAndDay, formatHourToTimeString } = useFormatter();
const { isStartWeek, goToPreviousWeek, goToNextWeek, currentYear, currentMonth, currentDate } = useWeekNavigation();
const { getReverseGeocodingData } = useGeocoding();

const dayNavigationStore = useDayNavigationStore();
const { updateSelectedDate, goToStartOfWeek } = dayNavigationStore;
const { selectedDate } = storeToRefs(dayNavigationStore);

const timeRangeStore = useTimeRangeStore();
const { updateSelectedStartTimeFromNumber, updateSelectedEndTimeFromString, setSelectedStartTimeToFirstAvailableTime } = timeRangeStore;
const { selectedStartTime, automaticallySelectedEndTime, selectedEndTime } = storeToRefs(timeRangeStore);

const events = ref([]); // Array of events
const fetchingEvents = ref(false); // Loading state of the events

const eventMatrix = ref([]); // Matrix of events
const startHour = 9; // Starting hour of the day
const endHour = 20; // Ending hour of the day

// Edit mode state
const editMode = ref(false);

const toggleEditState = () => {
    editMode.value = !editMode.value;
}

// Returns current week days, starting from today to the same day of the next week
const daysList = computed(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate.value);
        date.setDate(date.getDate() + i);
        days.push(date);
    }
    return days;
});

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
    toggle: () => newDropdown.active = !newDropdown.active,
    close: () => newDropdown.active = false,
});

/* Matrix logic */

const initializeEventMatrix = () => {
    // Reset the matrix
    eventMatrix.value = [];

    // Populate the matrix with placeholders for each time slot
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        eventMatrix.value[dayIndex] = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            let hourIndex = hour - startHour;
            eventMatrix.value[dayIndex][hourIndex] = {
                day: dayIndex + 1,
                time: hour,
                formattedDay: formatDateToWeekdayAndDay(daysList.value[dayIndex]),
                formattedTime: formatHourToTimeString(hour),
                event: null
            };
        }
    }
};

const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/* API calls */

const getEvents = async () => {

    fetchingEvents.value = true;

    const localDateString = getLocalDateString(currentDate.value);
    const body = {
        user_id: userStore.user.user_id,
        start_date: localDateString, // fecha en formato YYYY-MM-DD
    }

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/calendar`, {
        method: 'POST',
        credentials: 'include',
        body: body
    });

    if (error.value) {
        console.log("Fetch error:", error.value);
        fetchingEvents.value = false;
        return;
    }

    fetchingEvents.value = false;
    initializeEventMatrix(); // Reset the matrix before populating

    if (data.value.success) {
        populateEventMatrix(data.value.events); // Fill the matrix with the fetched events
        events.value = data.value.events;
    }
    else {
        fetchingEvents.value = false;
        events.value = [];
        console.log(data.value.message);
    }
};

const populateEventMatrix = (events) => {
    const timeZone = "UTC"; // Change this to the target time zone
    events.forEach(event => {
        // Convert UTC date to the target time zone
        const startDateTime = new Date(`${event.date.split('T')[0]}T${event.start_time}:00Z`);
        const startDate = convertUtcDateToLocalDate(startDateTime, timeZone);

        let durationHours = 1; // Default duration for events without an end time

        if (event.type === 'personal' && event.end_time) {
            const endDateTime = new Date(`${event.date.split('T')[0]}T${event.end_time}:00Z`);
            const endDate = convertUtcDateToLocalDate(endDateTime, timeZone);
            durationHours = (endDate - startDate) / (1000 * 60 * 60);
        }

        for (let i = 0; i < durationHours; i++) {
            const eventHour = startDate.getHours() + i;
            const eventHourIndex = eventHour - startHour;

            const eventDayIndex = daysList.value.findIndex(day =>
                day.getFullYear() === startDate.getFullYear() &&
                day.getMonth() === startDate.getMonth() &&
                day.getDate() === startDate.getDate()
            );

            if (eventDayIndex >= 0 && eventHourIndex >= 0 && eventHourIndex < 12) {
                eventMatrix.value[eventDayIndex][eventHourIndex].event = event;
            }
        }
    });
};

// Helper function to convert UTC date to a date in the target time zone
function convertUtcDateToLocalDate(utcDate, timeZone) {
    return new Date(utcDate.toLocaleString('en-US', { timeZone }));
}

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
    }
});

// Add new empty session modal

const newEmptySessionModal = reactive({
    data: {
        selectedFormat: 'Personalizado',
        selectedModality: 'Online',
        link: '',
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
        newEmptySessionModal.data.selectedFormat = 'Personalizado';
        newEmptySessionModal.data.selectedModality = 'Online';
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

        if (newEmptySessionModal.data.selectedFormat === 'Grupal' && newEmptySessionModal.data.selectedModality === 'Presencial') {
            link = await createGoogleMapsLink(newEmptySessionModal.data.locationCoordinates);
            coordinates = JSON.stringify(newEmptySessionModal.data.locationCoordinates);
        }
        else if (newEmptySessionModal.data.selectedFormat === 'Personalizado' && newEmptySessionModal.data.selectedModality === 'Presencial') {
            link = '';
            coordinates = null;
        }
        else {
            link = newEmptySessionModal.data.link;
            coordinates = null;
        }

        const body = {
            "user_id": userStore.user.user_id,
            "date": localDateString, // fecha en formato YYYY-MM-DD
            "time": selectedStartTime.value,
            "available": true,
            "format": newEmptySessionModal.data.selectedFormat,
            "modality": newEmptySessionModal.data.selectedModality,
            "link": link,
            "coordinates": coordinates,
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session`, {
            method: 'POST',
            credentials: 'include',
            body: body
        });

        newEmptySessionModal.loading = false;
        newEmptySessionModal.closeModal();

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            console.log(data.value.message);
            getEvents();
        }
        else {
            console.log(data.value.message);
        }

    }
});

const createGoogleMapsLink = async (coordinates) => {
    const address = await getReverseGeocodingData(coordinates);
    if (address) {
        const encodedAddress = encodeURIComponent(address.place_name);
        return `https://www.google.com/maps?q=${encodedAddress}`
    }
    else {
        const [lng, lat] = coordinates;
        return `https://www.google.com/maps?q=${lat},${lng}`;
    }
}


const newEventModal = reactive({
    data: {
        selectedEventType: 'Nuevo entrenamiento',
        loading: false,
        manualSession: {
            clients: [],
            selectedFormat: 'Personalizado',
            selectedModality: 'Online',
            link: '',
            locationCoordinates: [],
        },
        personalEvent: {
            clients: [],
            selectedFormat: 'Grupal',
            additionalInfo: '',
        }
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
        newEventModal.data.selectedEventType = 'Nuevo entrenamiento';
        newEventModal.data.manualSession.clients = [];
        newEventModal.data.manualSession.selectedFormat = 'Personalizado';
        newEventModal.data.manualSession.selectedModality = 'Online';
        newEventModal.data.manualSession.link = '';
        newEventModal.data.personalEvent.clients = [];
        newEventModal.data.personalEvent.selectedFormat = 'Grupal';
        newEventModal.data.personalEvent.additionalInfo = '';
    },
    handleClick: () => {
        goToStartOfWeek();
        setSelectedStartTimeToFirstAvailableTime();
        newEventModal.openModal();
    },
    addNewEvent: async () => {
        newEventModal.data.loading = true;
        const localDateString = getLocalDateString(selectedDate.value);

        if (newEventModal.data.selectedEventType == 'Nuevo entrenamiento') {

            const clientsIDs = newEventModal.data.manualSession.clients.map(client => client.user_id);

            let link;
            let coordinates;

            if (newEventModal.data.manualSession.selectedFormat === 'Grupal' && newEventModal.data.manualSession.selectedModality === 'Presencial') {
                link = await createGoogleMapsLink(newEventModal.data.manualSession.locationCoordinates);
                coordinates = JSON.stringify(newEventModal.data.manualSession.locationCoordinates);
            }
            else if (newEventModal.data.manualSession.selectedFormat === 'Personalizado' && newEventModal.data.manualSession.selectedModality === 'Presencial') {
                link = '';
                coordinates = null;
            }
            else {
                link = newEventModal.data.manualSession.link;
                coordinates = null;
            }

            const body = {
                "user_id": userStore.user.user_id,
                "date": localDateString, // fecha en formato YYYY-MM-DD
                "start_time": selectedStartTime.value, // hora en formato HH:MM
                "end_time": automaticallySelectedEndTime.value, // hora en formato HH:MM
                "format": newEventModal.data.manualSession.selectedFormat, // "Personalizado" o "Grupal"
                "modality": newEventModal.data.manualSession.selectedModality, // "Online" o "Presencial"
                "text": link, // link de la sesión, se pasa como text
                "clients": clientsIDs, // array de ids de clientes
                "type": "manual_session", // "manual session en caso de Nuevo entrenamiento"
                "coordinates": coordinates,
            };

            const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/manual`, {
                method: 'POST',
                credentials: 'include',
                body: body
            });

            if (error.value) {
                console.log("Fetch error:", error.value);
                newEventModal.data.loading = false;
                return;
            }

            newEventModal.data.loading = false;
            newEventModal.closeModal();

            if (data.value.success) {
                getEvents();
                console.log(data.value.message);
            }
            else {
                console.log(data.value.message);
            }

        }
        else if (newEventModal.data.selectedEventType == 'Evento personal') {

            const clientsIDs = newEventModal.data.personalEvent.clients.map(client => client.user_id);

            const body = {
                "user_id": userStore.user.user_id,
                "date": localDateString, // fecha en formato YYYY-MM-DD
                "start_time": selectedStartTime.value, // hora en formato HH:MM
                "end_time": selectedEndTime.value, // hora en formato HH:MM
                "info": newEventModal.data.personalEvent.additionalInfo, // información adicional
                "clients": clientsIDs, // array de ids de clientes
                "type": "personal", // "Nuevo entrenamiento" o "Evento personal"
            };

            const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/personal`, {
                method: 'POST',
                credentials: 'include',
                body: body
            });

            if (error.value) {
                console.log("Fetch error:", error.value);
                newEventModal.data.loading = false;
                return;
            }

            newEventModal.data.loading = false;
            newEventModal.closeModal();

            if (data.value.success) {
                console.log(data.value.message);
                getEvents();
            }
            else {
                console.log(data.value.message);
            }
        }
    },
});

const editEventHandler = reactive({
    handleClick: (day, time, event) => {
        if (event.type === 'session') {
            editEmptySessionModal.handleClick(day, time, event);
        }
        else if (event.type === 'manual_session') {
            editManualSessionModal.handleClick(day, time, event);
        }
        else if (event.type === 'personal') {
            editPersonalEventModal.handleClick(day, time, event);
        }
    }
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
        editEmptySessionModal.data.selectedModality = event.session_info.modality;
        editEmptySessionModal.data.link = event.session_info.link;
        editEmptySessionModal.data.event = event;
        editEmptySessionModal.data.clients = [...event.clients];
        updateCurrentlySelectedDate(day, time);
        editEmptySessionModal.openModal();
    },
    updateSession: async () => {

        editEmptySessionModal.data.updateSessionLoading = true;
        const event = editEmptySessionModal.data.event;
        const clientsIDs = editEmptySessionModal.data.clients.map(client => client.user_id);

        let link;
        let coordinates;

        if (editEmptySessionModal.data.selectedFormat === 'Grupal' && editEmptySessionModal.data.selectedModality === 'Presencial') {
            link = await createGoogleMapsLink(editEmptySessionModal.data.locationCoordinates);
            coordinates = JSON.stringify(editEmptySessionModal.data.locationCoordinates);
        }
        else if (editEmptySessionModal.data.selectedFormat === 'Personalizado' && editEmptySessionModal.data.selectedModality === 'Presencial') {
            link = '';
            coordinates = null;
        }
        else {
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
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session`, {
            method: 'PUT',
            credentials: 'include',
            body: body
        });

        editEmptySessionModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editEmptySessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editEmptySessionModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-session/${editEmptySessionModal.data.event.session_info.session_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        editEmptySessionModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            console.log(data.value.message);
            editEmptySessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

const editManualSessionModal = reactive({
    data: {
        selectedEventType: 'Nuevo entrenamiento',
        clients: [],
        selectedFormat: 'Personalizado',
        selectedModality: 'Online',
        link: '',
        event: null,
        locationCoordinates: [],
        removeSessionLoading: false,
        updateSessionLoading: false
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
        editManualSessionModal.data.selectedModality = event.session_info.modality;
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
            text: editManualSessionModal.data.link,
            clients: editManualSessionModal.data.clients.map(client => client.user_id),
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/manual`, {
            method: 'PUT',
            credentials: 'include',
            body: body
        });

        editManualSessionModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editManualSessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editManualSessionModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-event/${editManualSessionModal.data.event.event_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        editManualSessionModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            console.log(data.value.message);
            editManualSessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

const editPersonalEventModal = reactive({
    data: {
        clients: [],
        selectedFormat: 'Grupal',
        additionalInfo: '',
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
        editPersonalEventModal.data.additionalInfo = event.text;
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
            text: editPersonalEventModal.data.additionalInfo,
            clients: editPersonalEventModal.data.clients.map(client => client.user_id),
            type: "personal",
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/personal`, {
            method: 'PUT',
            credentials: 'include',
            body: body
        });

        editPersonalEventModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editPersonalEventModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editPersonalEventModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-event/${editPersonalEventModal.data.event.event_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        editPersonalEventModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editPersonalEventModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

const updateCurrentlySelectedDate = (day, time) => {

    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + day - 1);
    updateSelectedDate(newDate);
    updateSelectedStartTimeFromNumber(time);
};

/* Lifecycle hooks */

onMounted(() => {
    // Get the events when the component is mounted
    initializeEventMatrix();
    getEvents();
    //allows for closing the dropdown when clicking outside of it
    document.addEventListener('click', newDropdown.close);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', newDropdown.close);
});

</script>