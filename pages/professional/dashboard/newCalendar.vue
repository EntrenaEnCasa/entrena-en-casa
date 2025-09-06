<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Mi Calendario</h1>
            <div class="ml-4 text-sm text-gray-500">
              Hoy es {{ formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
          </div>
          
          <!-- Current selected date indicator -->
          <div class="text-sm text-gray-600">
            <span class="font-medium">Día seleccionado:</span> 
            {{ calendar.selectedDateString }}
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dynamic Calendar Component -->
      <DynamicCalendar
        ref="calendarRef"
        :calendar="calendar"
        :data="events"
        @date-changed="onDateChanged"
        @event-selected="onEventSelected"
        @edit-event="onEditEvent"
        @new-event="onNewEvent"
        @create-event-at-time="onCreateEventAtTime"
      />

      <!-- Debug Info (remove in production) -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
        <h3 class="font-medium mb-2">Debug Info:</h3>
        <p><strong>Selected Date:</strong> {{ calendar.selectedDateString }}</p>
        <p><strong>Current Month:</strong> {{ formatDate(calendar.currentDate, { month: 'long', year: 'numeric' }) }}</p>
        <p><strong>Events for selected date:</strong> {{ calendar.selectedDateEvents.length }}</p>
        <p><strong>View Mode:</strong> {{ calendar.viewMode }}</p>
        <p><strong>Device:</strong> 
          {{ calendar.isMobileView ? 'Mobile' : calendar.isTabletView ? 'Tablet' : 'Desktop' }}
        </p>
      </div>
    </main>

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

    
    <!-- Loading Overlay -->
    <!-- <div 
      v-if="calendar.loading" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span class="text-gray-700">Cargando...</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useDynamicCalendar } from '~/composables/useDynamicCalendar'
import { useUserStore } from "~/stores/UserStore";
import { useToast } from "vue-toastification";

const initialEvents = ref([]) // Start with empty events array
// Initialize calendar
const calendar = useDynamicCalendar(initialEvents.value, {
  startHour: 6,
  endHour: 22,
  slotDuration: 30, // 30-minute slots
  locale: 'es-ES'
})

// Component refs
const calendarRef = ref()
const editModalRef = ref()
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


// Declarar la variable currentDate
const currentDate = ref(new Date());

const updateCurrentlySelectedDate = (date, timeString) => {
  updateSelectedDate(date);
  updateSelectedStartTimeFromString(timeString);
};

// Event handlers
const onDateChanged = (newDate) => {
  console.log('Date changed to:', newDate)
  currentDate.value = newDate
}

const onEventSelected = (event) => {
  console.log('Event selected:', event)
}

const onEditEvent = (event) => {
  console.log('Edit event:', event);

  if (!event) {
    console.error('Event is undefined or null');
    return;
  }

  // Populate modal with event data
  editModal.value.data.event = event;
  editModal.value.data.clients = event.clients || [];
  editModal.value.data.selectedFormat = event.format || 'Personalizado';
  editModal.value.data.selectedModality = event.modality || 'Online';
  editModal.value.data.link = event.link || '';
  editModal.value.data.locationCoordinates = event.locationCoordinates || [];

  // Open modal
  editModal.value.openModal();
}

const onNewEvent = () => {
  console.log('New event requested')
  // Reset modal data
  editModal.value.data.event = null
  editModal.value.data.clients = []
  editModal.value.data.selectedFormat = 'Personalizado'
  editModal.value.data.selectedModality = 'Online'
  editModal.value.data.link = ''
  editModal.value.data.locationCoordinates = []
  
  editModal.value.openModal()
}

const onCreateEventAtTime = ({ date, time }) => {
  console.log('Create event at:', date, time)
  
  // Create new event with pre-filled time
  const newEvent = {
    date: date.toISOString().split('T')[0],
    start_time: time,
    end_time: addMinutesToTime(time, 60), // 1 hour duration
    title: 'Nueva Sesión',
    description: '',
    type: 'manual_session'
  }
  
  editModal.value.data.event = newEvent
  editModal.value.data.clients = []
  editModal.value.data.selectedFormat = 'Personalizado'
  editModal.value.data.selectedModality = 'Online'
  editModal.value.data.link = ''
  
  editModal.value.openModal()
}

// Utility functions
const formatDate = (date, options = {}) => {
  return calendar.formatDate(date, options)
}

const addMinutesToTime = (timeString, minutes) => {
  const [hours, mins] = timeString.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + minutes
  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMins = totalMinutes % 60
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
}

// Import necessary utilities
const userStore = useUserStore();
const toast = useToast();
const runtimeConfig = useRuntimeConfig();

// Reactive data
const events = ref([]);
const fetchingEvents = ref(false);

// Initialize calendar data
const initializeCalendarData = () => {
    calendar.events = []; // Clear existing events
};



onMounted(() => {
initializeCalendarData();
  getEvents();
})
// Fetch events from API
const getEvents = async () => {
    fetchingEvents.value = true;

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
            console.log("events fetched: ");
            console.log(events.value);
            events.value = response.events;
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

// Fetch events on component mount
onMounted(() => {
  calendar.initialize();
  getEvents();
})

onBeforeUnmount(() => {
  calendar.cleanup()
})

// Assign editModal to a specific modal object
const editModal = ref(editManualSessionModal);

// Expose methods for external access
defineExpose({
  calendar,
  selectDate: calendar.selectDate,
  goToToday: calendar.goToToday,
  addEvent: calendar.addEvent
})

// Utility function to format a date as YYYY-MM-DD
const getFormattedDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
</script>