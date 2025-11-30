<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex flex-col justify-between items-start sm:items-center py-3 sm:py-4 gap-3 sm:gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900">Mi Calendario</h1>
            <div class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-4 sm:hidden lg:block">
              Hoy es {{ formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
          </div>
          
          <!-- View Controls -->
          <div class="flex flex-col sm:flex-row items-center justify-between w-full sm:w-auto gap-3 sm:gap-4">
            <!-- View Mode Selector -->
            <div class="bg-gray-100 rounded-lg p-1 flex flex-row">
              <button 
                v-for="mode in ['day', 'week', 'month']" 
                :key="mode"
                @click="setViewMode(mode)"
                :class="[
                  'px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-all',
                  viewMode === mode 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                {{ mode === 'day' ? 'Día' : mode === 'week' ? 'Semana' : 'Mes' }}
              </button>
            </div>
            
            <!-- Navigation -->
            <div class="flex items-center gap-1 sm:gap-2">
              <button 
                @click="goToPrevious"
                :disabled="!canGoBack"
                :class="[
                  'p-1.5 sm:p-2 rounded-full transition-colors',
                  canGoBack 
                    ? 'hover:bg-gray-100 text-gray-600' 
                    : 'text-gray-300 cursor-not-allowed'
                ]"
              >
                <Icon name="mdi:chevron-left" class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button 
                @click="calendar.goToToday()"
                :class="[
                  'px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors',
                  isToday ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Hoy
              </button>
              
              <button 
                @click="goToNext"
                class="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icon name="mdi:chevron-right" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
            
            <!-- Edit Mode and Add Event Buttons -->
            <div class="flex items-center gap-2">
              <!-- Edit Mode Toggle -->
              <button
                v-if="!editMode && events.length > 0"
                @click="toggleEditState"
                class="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Icon name="mdi:pencil" class="w-6 h-6" />
                <span>Modo edición</span>
              </button>
              
              <button
                v-if="editMode"
                @click="toggleEditState"
                class="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Icon name="mdi:pencil-off" class="w-6 h-6" />
                <span>Desactivar modo edición</span>
              </button>
            
              <!-- Add Event Button -->
              <button 
                v-if="!editMode"
                @click="newEventModal.openModal()"
                class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Icon name="mdi:plus" class="w-6 h-6" />
                <span>Nueva Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <!-- Calendar Header with Date Info -->
      <div class="mb-4 sm:mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {{ currentPeriodTitle }}
        </h2>
        <div class="text-sm text-gray-600" v-if="viewMode === 'day'">
          {{ formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
        </div>
      </div>

      <!-- Responsive Calendar Views -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <!-- Calendar Content Based on View Mode -->
        <div class="p-4 md:p-6">
          <!-- Day View -->
          <div v-if="viewMode === 'day'" key="day-view">
            <MobileDayView 
              :selected-date="selectedDate"
              :events="events"
              :calendar="calendar"
              :edit-mode="editMode"
              @date-changed="onDateChanged"
              @event-click="onEventClick"
              @slot-click="onSlotClick"
            />
          </div>
          
          <!-- Week View -->
          <div v-else-if="viewMode === 'week'" key="week-view">
            <DesktopWeekView 
              :selected-date="selectedDate"
              :events="events"
              :calendar="calendar"
              :edit-mode="editMode"
              @date-changed="onDateChanged"
              @event-click="onEventClick"
              @slot-click="onSlotClick"
            />
          </div>
          
          <!-- Month View -->
          <div v-else-if="viewMode === 'month'" key="month-view">
            <DesktopCalendarView 
              :selected-date="selectedDate"
              :events="events"
              :calendar="calendar"
              :edit-mode="editMode"
              @date-changed="onDateChanged"
              @event-click="onEventClick"
              @slot-click="onSlotClick"
            />
          </div>
        </div>
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
    <div 
      v-if="fetchingEvents" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span class="text-gray-700">Cargando eventos...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, watch, computed, nextTick } from 'vue'
import { useDynamicCalendar } from '~/composables/useDynamicCalendar'
import { useUserStore } from "~/stores/UserStore";
import { useTimeRangeStore } from "~/stores/professional/dashboard/calendar/TimeRangeStore";
import { useToast } from "vue-toastification";
import { useGeocoding } from "~/composables/maps/useGeocoding";

// Stores and utilities
const userStore = useUserStore();
const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const { getReverseGeocodingData } = useGeocoding();

// Reactive data
const events = ref([]);
const fetchingEvents = ref(false);
const selectedDate = ref(new Date());
const formattedStartTime = ref('06:00');
const formattedEndTime = ref('07:00');
const viewMode = ref('week'); // Local reactive viewMode

// Edit mode state
const editMode = ref(false);

// Cache and performance optimization
const eventsCache = ref(new Map());
const lastFetchDate = ref(null);
let getEventsTimeout = null;

// Initialize calendar with empty events array
const initialEvents = [];

const calendar = useDynamicCalendar(initialEvents, {
  startHour: 6,
  endHour: 22,
  slotDuration: 30, // 30-minute slots
  locale: 'es-CL', // Chile locale
  weekStartsOn: 1 // Monday = 1 (Chile standard)
});

// Component refs
const calendarRef = ref();
const editModalRef = ref();
// Empty slot modal
const emptySlotModalRef = ref(null);
const newEmptySessionModalRef = ref(null);
const newEventModalRef = ref(null);
const editEmptySessionModalRef = ref(null);
const editManualSessionModalRef = ref(null);
const editPersonalEventModalRef = ref(null);
const sessionDetailsModalRef = ref(null);

// Utility functions
const formatDate = (date, options = {}) => {
  return calendar.formatDate(date, options);
};

const addMinutesToTime = (timeString, minutes) => {
  const [hours, mins] = timeString.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
};

// Date and time management functions
const updateSelectedDate = (date) => {
  const dateObj = new Date(date);
  selectedDate.value = dateObj;
  calendar.selectDate(dateObj);
};

const updateSelectedStartTimeFromString = (timeString) => {
  console.log('🕐 updateSelectedStartTimeFromString called with:', timeString);
  if (timeString && typeof timeString === 'string') {
    console.log('✅ Setting formattedStartTime to:', timeString);
    formattedStartTime.value = timeString;
    // También actualizar el end time sumando 1 hora por defecto
    const [hours, minutes] = timeString.split(':').map(Number);
    const endHours = hours + 1;
    formattedEndTime.value = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log('✅ Setting formattedEndTime to:', formattedEndTime.value);
  } else {
    console.log('❌ Invalid timeString:', timeString);
  }
};

const updateSelectedEndTimeFromString = (timeString) => {
  if (timeString && typeof timeString === 'string') {
    formattedEndTime.value = timeString;
  }
};

const goToStartOfWeek = () => {
  const startOfWeek = new Date(selectedDate.value);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);
  updateSelectedDate(startOfWeek);
};

const setSelectedStartTimeToFirstAvailableTime = () => {
  formattedStartTime.value = '06:00';
  formattedEndTime.value = '07:00';
};

const getLocalDateString = (date) => {
  return date.toISOString().split('T')[0];
};

const getFormattedDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const updateCurrentlySelectedDate = (date, timeString) => {
  console.log('📝 updateCurrentlySelectedDate called with:', { date, timeString });
  updateSelectedDate(date);
  updateSelectedStartTimeFromString(timeString);
  console.log('✅ After update - formattedStartTime:', formattedStartTime.value);
};

// Computed properties for UI
const currentPeriodTitle = computed(() => {
  const date = selectedDate.value;
  const mode = viewMode.value;
  const today = new Date();
  
  if (mode === 'day') {
    return formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' });
  } else if (mode === 'week') {
    // For week view, show 7 days starting from the selected date (or today if selected is in the past)
    let startDate = new Date(date);
    if (startDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${formatDate(startDate, { day: 'numeric' })} al ${formatDate(endDate, { day: 'numeric', month: 'long', year: 'numeric' })}`;
    } else {
      return `${formatDate(startDate, { day: 'numeric', month: 'short' })} al ${formatDate(endDate, { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
  } else {
    // For month view, show the range starting from selected date (or today)
    let startDate = new Date(date);
    if (startDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 34); // 5 weeks = 35 days
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${formatDate(startDate, { month: 'long', year: 'numeric' })}`;
    } else {
      return `${formatDate(startDate, { month: 'short' })} - ${formatDate(endDate, { month: 'short', year: 'numeric' })}`;
    }
  }
});

const isToday = computed(() => {
  const today = new Date();
  return selectedDate.value.toDateString() === today.toDateString();
});

const canGoBack = computed(() => {
  const today = new Date();
  const mode = viewMode.value;
  
  if (mode === 'day') {
    return selectedDate.value > today;
  } else if (mode === 'week') {
    const startOfWeek = getStartOfWeek(selectedDate.value);
    const todayStartOfWeek = getStartOfWeek(today);
    return startOfWeek >= todayStartOfWeek;
  } else {
    const selectedMonth = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return selectedMonth >= todayMonth;
  }
});

const canAddEventAtTime = (date, time) => {
  const now = new Date();
  const eventDate = new Date(date);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Solo bloquear días completamente pasados
  if (eventDate < today) {
    return false;
  }
  
  // Permitir todo en el día actual y días futuros
  return true;
};

const canEditEvent = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date || event.start_time);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Solo bloquear eventos de días completamente pasados
  if (eventDate < today) {
    return false;
  }
  
  // Permitir editar todo en el día actual y días futuros
  return true;
};

// Helper function to get start of week (Monday in Chile)
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday = 1
  return new Date(d.setDate(diff));
};

// Navigation functions
const setViewMode = (mode) => {
  // Mobile devices can only use day view
  if (calendar.isMobileView.value && mode !== 'day') {
    viewMode.value = 'day';
    toast.info('En móviles solo está disponible la vista diaria');
    return;
  }
  
  viewMode.value = mode;
};

// Edit mode functions
const toggleEditState = () => {
  editMode.value = !editMode.value;
  console.log("🔧 Edit mode:", editMode.value);
};

// Watch events to disable edit mode when no events
watch(events, () => {
  if (events.value.length === 0) {
    editMode.value = false;
  }
});

// Helper function to check if an event is in the past (for display purposes only)
const isPastEvent = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Solo considerar pasado si es de un día anterior
  if (eventDate < today) {
    return true;
  }
  
  // Para el día actual, considerar pasado solo si ya pasó la hora
  if (eventDate.toDateString() === now.toDateString() && event.start_time) {
    const [hours, minutes] = event.start_time.split(':').map(Number);
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return eventTime < now;
  }
  
  return false;
};

const goToPrevious = async () => {
  if (!canGoBack.value) return;
  
  const mode = viewMode.value;
  if (mode === 'day') {
    calendar.goToPreviousDay();
  } else if (mode === 'week') {
    calendar.goToPreviousWeek();
  } else {
    calendar.goToPreviousMonth();
  }
  selectedDate.value = new Date(calendar.selectedDate.value);
  await getEvents();
};

const goToNext = async () => {
  const mode = viewMode.value;
  if (mode === 'day') {
    calendar.goToNextDay();
  } else if (mode === 'week') {
    calendar.goToNextWeek();
  } else {
    calendar.goToNextMonth();
  }
  selectedDate.value = new Date(calendar.selectedDate.value);
  await getEvents();
};

// Event handlers for calendar interactions
const onEventClick = (event) => {
  console.log("🖱️", editMode.value ? "Edit mode" : "Info mode");
  
  if (editMode.value) {
    const eventDateString = event.date || formatDateForAPI(selectedDate.value);
    editEventHandler.handleClick(eventDateString, event);
  } else {
    infoEventHandler.handleClick(event);
  }
};

const onSlotClick = ({ date, time }) => {
  console.log('🎯 Slot clicked - Date:', date, 'Time:', time);
  
  // En modo edición, no permitir agregar nuevos eventos en espacios vacíos
  if (editMode.value) {
    console.log('⚠️ Edit mode active - slot clicks disabled for creating new events');
    return;
  }
  
  if (!canAddEventAtTime(date, time)) {
    toast.error('No se pueden agregar eventos en días pasados');
    return;
  }
  
  console.log('✅ Updating selected date and time:', date, time);
  updateCurrentlySelectedDate(date, time);
  console.log('📋 formattedStartTime after update:', formattedStartTime.value);
  emptySlotModal.handleClick(date, time);
};

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

// Empty slot modal
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
    // Actualizar el store TimeRange con la hora seleccionada
    const { updateSelectedStartTimeFromString } = useTimeRangeStore();
    updateSelectedStartTimeFromString(time);
    
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

    console.log("create new empty session body: ", JSON.stringify(body, null, 2));

    try {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/session`, {
        method: "POST",
        credentials: "include",
        body: body,
      });

      if (response.success) {
        await getEvents(true); // Force refresh after update
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
    console.log("🔧 Edit handler - Event type:", event.type);
    if (event.type === "session") {
      editEmptySessionModal.handleClick(day, event);
    } else if (event.type === "manual_session") {
      editManualSessionModal.handleClick(day, event);
    } else if (event.type === "personal") {
      editPersonalEventModal.handleClick(day, event);
    } else {
      console.log("❓ Unknown type, defaulting to session details");
      sessionDetailsModal.handleClick(event);
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
    console.log('🔍 editEmptySessionModal.openModal called');
    console.log('🔍 editEmptySessionModalRef.value:', editEmptySessionModalRef.value);
    if (editEmptySessionModalRef.value) {
      console.log('✅ Opening EditEmptySessionModal');
      editEmptySessionModalRef.value.openModal();
    } else {
      console.error('❌ editEmptySessionModalRef.value is null');
    }
  },
  closeModal: () => {
    if (editEmptySessionModalRef.value) {
      editEmptySessionModalRef.value.closeModal();
    }
  },
  handleClick: (day, event) => {
    console.log('🔧 editEmptySessionModal.handleClick called with:', { day, event });
    editEmptySessionModal.data.selectedFormat = event.session_info.format;
    editEmptySessionModal.data.selectedModality = event.session_info.modality;
    editEmptySessionModal.data.link = event.session_info.link;
    editEmptySessionModal.data.event = event;
    editEmptySessionModal.data.clients = event.clients ? [...event.clients] : [];
    
    // Actualizar el store TimeRange con las horas del evento
    const { updateSelectedStartTimeFromString, updateSelectedEndTimeFromString } = useTimeRangeStore();
    updateSelectedStartTimeFromString(event.start_time);
    if (event.end_time) {
      updateSelectedEndTimeFromString(event.end_time);
    }
    
    updateCurrentlySelectedDate(day, event.start_time);
    console.log('📞 Calling editEmptySessionModal.openModal()');
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
    editManualSessionModal.data.clients = event.clients ? [...event.clients] : []; // Create a new array
    editManualSessionModal.data.selectedFormat = event.session_info.format;
    editManualSessionModal.data.selectedModality = event.session_info.modality;
    editManualSessionModal.data.link = event.session_info.link;
    editManualSessionModal.data.event = event;
    
    // Actualizar el store TimeRange con las horas del evento
    const { updateSelectedStartTimeFromString, updateSelectedEndTimeFromString } = useTimeRangeStore();
    updateSelectedStartTimeFromString(event.start_time);
    if (event.end_time) {
      updateSelectedEndTimeFromString(event.end_time);
    }
    
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
    editPersonalEventModal.data.clients = event.clients ? [...event.clients] : []; // Create a new array
    editPersonalEventModal.data.additionalInfo = event.info;
    editPersonalEventModal.data.event = event;
    
    // Actualizar el store TimeRange con las horas del evento
    const { updateSelectedStartTimeFromString, updateSelectedEndTimeFromString } = useTimeRangeStore();
    updateSelectedStartTimeFromString(event.start_time);
    if (event.end_time) {
      updateSelectedEndTimeFromString(event.end_time);
    }
    
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

// Event handlers
const onDateChanged = async (newDate) => {
  const currentDateStr = getFormattedDateString(selectedDate.value);
  const newDateStr = getFormattedDateString(new Date(newDate));
  
  // Only reload events if the date actually changed to a different day/month
  if (currentDateStr !== newDateStr) {
    updateSelectedDate(newDate);
    // Use debounced version to prevent excessive calls
    await getEvents();
  }
};

const onEventSelected = (event) => {
  console.log('Event selected:', event);
};

const onEditEvent = (event) => {
  console.log('Edit event:', event);

  if (!event) {
    console.error('Event is undefined or null');
    return;
  }

  editEventHandler.handleClick(event.date, event);
};

const onNewEvent = () => {
  console.log('New event requested');
  newEventModal.handleClick();
};

const onCreateEventAtTime = ({ date, time }) => {
  console.log('Create event at:', date, time);
  
  updateCurrentlySelectedDate(date, time);
  newEventModal.openModal();
};

// Initialize calendar data
const initializeCalendarData = () => {
  // Actualizar eventos cuando se reciban nuevos datos
  watch(events, (newEvents) => {
    if (calendar && calendar.updateEvents && newEvents) {
      calendar.updateEvents([...newEvents]);
    }
  }, { immediate: true });
  
  // Sincronizar viewMode entre la variable local y el composable
  watch(viewMode, (newMode) => {
    if (calendar) {
      calendar.viewMode = newMode;
    }
  }, { immediate: true });
  
  // Watch for device changes and adjust view accordingly
  watch(() => calendar.isMobileView.value, (isMobile) => {
    if (isMobile && viewMode.value !== 'day') {
      viewMode.value = 'day';
    }
  }, { immediate: false });
};

// Fetch events from API with caching and debouncing
const getEvents = async (forceRefresh = false) => {
  if (fetchingEvents.value) return;
  
  const localDateString = getFormattedDateString(selectedDate.value);
  
  // Check cache first unless forcing refresh
  if (!forceRefresh && eventsCache.value.has(localDateString)) {
    const cachedData = eventsCache.value.get(localDateString);
    const now = Date.now();
    // Cache valid for 2 minutes
    if (now - cachedData.timestamp < 120000) {
      events.value = cachedData.events;
      if (calendar && calendar.events) {
        calendar.events.value = events.value;
      }
      return;
    }
  }
  
  fetchingEvents.value = true;

  const body = {
    user_id: userStore.user.user_id,
    start_date: localDateString,
  };

  try {
    const response = await $fetch(`${runtimeConfig.public.apiBase}/professional/calendar`, {
      method: "POST",
      credentials: "include",
      body: body,
    });

    if (response.success) {
      const eventsData = response.events || [];
      events.value = [...eventsData];
      
      // Cache the result
      eventsCache.value.set(localDateString, {
        events: eventsData,
        timestamp: Date.now()
      });
      
      // Update calendar with events
      if (calendar && calendar.updateEvents) {
        calendar.updateEvents([...eventsData]);
      } else if (calendar && calendar.events) {
        // Fallback: crear nuevo ref en lugar de mutar
        calendar.events = ref([...eventsData]);
      }
    } else {
      events.value = [];
      if (calendar && calendar.updateEvents) {
        calendar.updateEvents([]);
      } else if (calendar && calendar.events) {
        calendar.events = ref([]);
      }
      toast.error(response.message || 'Error al cargar eventos');
    }
  } catch (error) {
    console.error("Calendar fetch error:", error);
    events.value = [];
    toast.error("Error al obtener los eventos");
  } finally {
    fetchingEvents.value = false;
  }
};

// Fetch events on component mount
onMounted(async () => {
  try {
    initializeCalendarData();
    calendar.initialize();
    
    // Force viewport detection update
    await nextTick();
    
    // Ensure we start from today, not before
    const today = new Date();
    if (selectedDate.value < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      selectedDate.value = today;
      calendar.selectDate(today);
    }
    
    // Wait a bit more for viewport detection to complete
    setTimeout(() => {
      // Set initial view mode based on device
      if (calendar.isMobileView.value) {
        viewMode.value = 'day';
      } else {
        // Both tablet and desktop default to week view
        viewMode.value = 'week';
      }
    }, 100);
    
    // Load events after setup is complete
    await getEvents();
  } catch (error) {
    console.error('Error initializing calendar:', error);
    toast.error('Error al inicializar el calendario');
  }
});

onBeforeUnmount(() => {
  calendar.cleanup();
});

// Assign editModal to a specific modal object
const editModal = ref(editManualSessionModal);

// Expose methods for external access
defineExpose({
  calendar,
  selectDate: calendar.selectDate,
  goToToday: calendar.goToToday,
  addEvent: calendar.addEvent
});
</script>

<style scoped>
/* Mobile-first responsive styles */
@media (max-width: 767px) {
  .max-w-7xl {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  header .flex {
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  .bg-gray-100.rounded-lg.p-1 {
    width: 100%;
    justify-content: center;
  }
}

/* Tablet styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid-cols-7 {
    gap: 0.5rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .desktop-calendar-view .bg-white {
    min-height: 140px;
  }
  
  .week-view .bg-white {
    min-height: 80px;
  }
}

/* Common utility classes */
.calendar-event {
  transition: all 0.2s ease-in-out;
}

.calendar-event:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.view-transition {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Scrollbar styling for time slots */
.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>