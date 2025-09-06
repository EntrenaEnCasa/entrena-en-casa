<template>
  <div class="w-full max-w-6xl mx-auto p-4">
    <!-- Day Navigation Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-semibold text-gray-800">Mi Calendario</h2>
        <div class="flex items-center space-x-2">
          <button 
            @click="goToToday"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              isToday(selectedDate) 
                ? 'bg-blue-100 text-secondary hover:bg-blue-200' 
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            Hoy
          </button>
        </div>
      </div>
      
      <button 
        @click="showNewEventModal = true"
        class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors lg:px-6 lg:py-3 flex items-center"
      >
        <Icon name="mdi:plus" class="w-4 h-4 lg:mr-2" />
        <span class="hidden lg:inline">Nueva Sesión</span>
      </button>
    </div>

    <!-- Dynamic Day Navigation -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <!-- Navigation Buttons -->
        <div class="flex items-center space-x-2">
          <NuxtLink 
            @click="viewMode === 'day' ? goToPreviousDay() : viewMode === 'week' ? goToPreviousWeek() : goToPreviousMonth()"

            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="mdi:chevron-left" class="w-5 h-5 text-black" />
          </NuxtLink>
          
          <NuxtLink 
            @click="viewMode === 'day' ? goToNextDay() : viewMode === 'week' ? goToNextWeek() : goToNextMonth()"

            class="p-2 hover:bg-gray-100 rounded-full transition-colors "
          >
            <Icon name="mdi:chevron-right" class="w-5 h-5 text-black" />
          </NuxtLink>
        </div>

        <!-- Current Date Display -->
        <div class="flex items-center space-x-3">
            
          <h3 class="text-lg font-medium text-gray-800 capitalize">
            {{ formatDayOfWeek(selectedDate) }}
            {{ formatCurrentDate(selectedDate) }}
          </h3>
        </div>
      </div>

      <!-- View Toggle (Desktop only) -->
      <div class="hidden md:flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
          @click="viewMode = 'day'"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            viewMode === 'day' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          Día
        </button>
        <button
          @click="viewMode = 'week'"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            viewMode === 'week' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          Semana
        </button>
        <button
          @click="viewMode = 'month'"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            viewMode === 'month' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          Mes
        </button>
      </div>
    </div>

    <!-- Quick Date Selector (Mobile) -->
    <div class="md:hidden mb-4">
      <div class="flex items-center space-x-2 overflow-x-auto pb-2">
        <div
          v-for="quickDate in quickDates"
          :key="quickDate.dateString"
          @click="selectQuickDate(quickDate.date)"
          :class="[
            'flex-shrink-0 flex flex-col items-center p-3 rounded-xl cursor-pointer transition-colors min-w-[60px]',
            isSameDay(quickDate.date, selectedDate)
              ? 'bg-blue-500 text-white'
              : quickDate.hasEvents
              ? 'bg-blue-50 text-blue-600 border border-blue-200'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          ]"
        >
          <span class="text-xs font-medium uppercase">{{ quickDate.dayName }}</span>
          <span class="text-lg font-semibold">{{ quickDate.day }}</span>
          <div v-if="quickDate.hasEvents && !isSameDay(quickDate.date, selectedDate)" 
               class="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
        </div>
      </div>
    </div>

    <!-- Calendar Content based on view mode -->
    <div class="grid grid-cols-1 gap-6">
      
      <!-- Day View Content -->
      <div v-if="viewMode === 'day'" class="l">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
          <!-- Day Schedule -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-medium text-gray-800">
                Agenda del {{ formatCurrentDate(selectedDate) }}
              </h4>
              <!-- <span class="text-sm text-gray-500">
                {{ selectedDateEvents.value.length }} evento{{ selectedDateEvents.value.length !== 1 ? 's' : '' }}
              </span> -->
            </div>

            <!-- Time Slots for Day View -->
            <div class="space-y-2">
              <div
                v-for="timeSlot in dayTimeSlots"
                :key="timeSlot.time"
                class="flex items-center border-b border-gray-100 last:border-b-0 py-3"
              >
                <div class="w-20 text-sm font-medium text-gray-500">
                  {{ timeSlot.time }}
                </div>
                <div class="flex items-center w-full ml-4">
                  <div
                    v-if="timeSlot.event"
                    class="flex  justify-around w-full p-3 rounded-xl border-l-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    :class="getEventBorderColor(timeSlot.event.type)"
                    @click="editEvent(timeSlot.event)"
                  >
                    <div class="flex-1">
                    <p class="font-medium text-gray-800">{{ timeSlot.event.title }}</p>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ timeSlot.event.start_time }} - {{ timeSlot.event.end_time }}
                    </p>
                    <p v-if="timeSlot.event.session_info" class="text-sm text-gray-600 mt-1">
                      {{ timeSlot.event.session_info.format  }} {{ timeSlot.event.session_info.modality }}
                    </p>
                    <p v-if="timeSlot.event.info" class="text-sm text-gray-600 mt-1">
                      {{ timeSlot.event.info }}
                    </p>
                </div>
                    <button
                      v-if="timeSlot.event.session_info"
                      @click="editEvent(timeSlot.event)"
                      class="mt-2 text-sm p-4 bg-secondary-50/50 rounded-full hover:bg-secondary-50"
                    >
                     <Icon name="mdi:pencil" class="text-secondary  w-4 h-4 inline" />
                        <p
                          class="inline text-sm text-secondary font-medium ml-2"
                        >
                          Editar sesión
                        </p>
                    </button>
                  </div>
                  <button
                    v-else
                    @click="createEventAtTime(timeSlot.time)"
                    class="w-full p-3 text-left text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border-2 border-dashed border-gray-200 hover:border-gray-300"
                  >
                    <Icon name="mdi:plus" class="w-4 h-4 mr-2 inline" />
                    Agregar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Month View Content -->
      <div v-else-if="viewMode === 'month'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Month Calendar Grid (similar to your EventGrid.vue structure) -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Days Header -->
          <div class="grid grid-cols-7 bg-gray-50">
            <div 
              v-for="day in dayHeaders" 
              :key="day"
              class="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {{ day }}
            </div>
          </div>
          
          <!-- Calendar Days -->
          <div class="grid grid-cols-7">
            <div
              v-for="date in calendarDays"
              :key="date.dateString"
              @click="selectDate(date.date)"
              :class="[
                'min-h-[80px] p-2 border-r border-b border-gray-200 last:border-r-0 cursor-pointer transition-colors hover:bg-secondary-300',
                {
                  'bg-gray-50 text-gray-400': !date.isCurrentMonth,
                  'bg-blue-50 text-blue-600': date.isToday,
                  'bg-secondary text-white': isSameDay(date.date, selectedDate),
                  'ring-2 ring-blue-200': date.events.length > 0
                }
              ]"
            >
              <div class="flex flex-col h-full">
                <span class="text-sm font-medium mb-1">{{ date.day }}</span>
                <div class="flex-1 space-y-1">
                  <div
                    v-for="event in date.events.slice(0, 3)"
                    :key="event.id"
                    :class="[
                      'w-full h-1 rounded-full',
                      getEventColor(event.type)
                    ]"
                  ></div>
                  <div
                    v-if="date.events.length > 3"
                    class="text-xs text-gray-500"
                  >
                    +{{ date.events.length - 3 }} más
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">
            {{ formatSelectedDate(selectedDate) }}
          </h4>
          
          <!-- Events List -->
          <div class="space-y-3">
            <div
              v-for="event in selectedDateEvents"
              :key="event.event_id"
              class="p-4 rounded-xl bg-gray-50 border-l-4 transition-colors hover:bg-gray-100 cursor-pointer"
              :class="getEventBorderColor(event.type)"
              @click="editEvent(event)"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <p class="font-medium text-gray-800">{{ event.title }}</p>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ event.start_time }} - {{ event.end_time }}
                  </p>
                  <p v-if="event.session_info" class="text-sm text-gray-600 mt-1">
                      {{ event.session_info.format  }} {{ event.session_info.modality }}
                    </p>
                    <p v-if="event.info" class="text-sm text-gray-600 mt-1">
                    {{ event.info }}
                    </p>

                </div>
                <Icon name="mdi:pencil" class="w-4 h-4 text-gray-500" />
              </div>
            </div>
            
            <!-- No events -->
            <div v-if="selectedDateEvents.length === 0" class="text-center py-8">
              <Icon name="mdi:calendar" class="w-12 h-12 text-secondary mx-auto mb-2" />
              <p class="text-gray-500">Sin actividades para este día.</p>
              <button
                @click="createEventAtTime('09:00')"
                class="mt-3 bg-secondary-50/50 py-2 px-4 rounded-lg text-secondary-600 hover:text-secondary-700 font-medium text-sm"
              >
                Crear nueva sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Week View -->
      <div v-else class="flex flex-col">
        <!-- Week Calendar Grid -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Days Header -->
          <div class="grid grid-cols-7 bg-gray-50">
            <div 
              v-for="day in dayHeaders" 
              :key="day"
              class="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {{ day }}
            </div>
          </div>
          
          <!-- Week Days -->
          <div class="grid grid-cols-7">
            <div
              v-for="date in weekDays"
              :key="date.dateString"
              @click="selectDate(date.date)"
              :class="[
            'min-h-[80px] p-2 border-r border-b border-gray-200 last:border-r-0 cursor-pointer transition-colors hover:bg-secondary-300',
            {
              'bg-gray-50 text-gray-400': !date.isCurrentMonth,
              'bg-blue-50 text-blue-600': date.isToday,
              'bg-secondary text-white': isSameDay(date.date, selectedDate),
              'ring-2 ring-blue-200': date.events.length > 0
            }
              ]"
            >
              <div class="flex flex-col h-full">
            <span class="text-sm font-medium mb-1">{{ date.day }}</span>
            <div class="flex-1 space-y-1">
              <div
                v-for="(event, index) in date.events.slice(0, 3)"
                :key="event.id"
                :class="[
                  'w-full h-1 rounded-full',
                  getEventColor(event.type)
                ]"
              ></div>
              <div
                v-if="date.events.length > 3"
                class="text-xs text-gray-500"
              >
                +{{ date.events.length - 3 }} más
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">
            {{ formatSelectedDate(selectedDate) }}
          </h4>
          
          <!-- Events List -->
          <div class="space-y-3">
            <div
              v-for="event in selectedDateEvents"
              :key="event.id"
              class="flex p-4 rounded-xl bg-gray-50 border-l-4 transition-colors hover:bg-gray-100 cursor-pointer"
              :class="getEventBorderColor(event.type)"
              
            >
              <div class="flex justify-between items-start">
                <div class="flex">
                  <p class="font-medium text-gray-800">{{ event.title }}</p>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ event.start_time }} - {{ event.end_time }}
                  </p>
                  <p v-if="event.info" class="text-sm text-gray-600 mt-1">
                    {{ event.info }}
                  </p>
                </div>
                <Icon name="mdi:pencil" @click="editEvent(event)" class="w-4 h-4 text-secondary" />
              </div>
            </div>
            
            <!-- No events -->
            <div v-if="selectedDateEvents.length === 0" class="text-center py-8">
              <Icon name="mdi:calendar" class="w-12 h-12 text-secondary mx-auto mb-2" />
              <p class="text-gray-500">Sin actividades para este día.</p>
              <button
                @click="createEventAtTime('09:00')"
                class="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Crear nueva sesión
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
const props = defineProps({
    calendar: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    }

})
// Props & Emits
const emit = defineEmits([
  'date-changed', 
  'event-selected', 
  'new-event', 
  'edit-event',
  'create-event-at-time'
])

// Reactive data
const selectedDate = ref(new Date())
const currentDate = ref(new Date())
const viewMode = ref('month') // 'day', 'week', 'month'
const loading = ref(false)
const showNewEventModal = ref(false)

// Day headers
const dayHeaders = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']

// Time slots for day view
const dayTimeSlots = computed(() => {
  const slots = []
  for (let hour = 6; hour <= 22; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    const event = selectedDateEvents.value.find(e => e.start_time === time)
    slots.push({ time, event })
  }
  return slots
})

// Quick dates for mobile (next 7 days)
const quickDates = computed(() => {
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const hasEvents = events.value.some(event => event.date === dateString)
    
    dates.push({
      date: new Date(date),
      dateString,
      day: date.getDate(),
      dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      hasEvents
    })
  }
  
  return dates
})

// Eliminar datos de demostración y agregar función para obtener eventos desde el endpoint
const events = ref(props.data)


// Calendar computation
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = events.value.filter(event => event.date === dateString)
    
    days.push({
      date: new Date(date),
      day: date.getDate(),
      dateString,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      events: dayEvents
    })
  }
  
  return days
})

// Compute days for the current week (Sunday to Saturday)
const weekDays = computed(() => {
  const selected = selectedDate.value
  const startOfWeek = new Date(selected)
  startOfWeek.setDate(selected.getDate() - selected.getDay())
  const days = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = events.value.filter(event => event.date === dateString)
    days.push({
      date: new Date(date),
      day: date.getDate(),
      dateString,
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: date.toDateString() === today.toDateString(),
      events: dayEvents
    })
  }
  return days
})

const selectedDateEvents = computed(() => {
  const dateString = selectedDate.value.toISOString().split('T')[0];
  return events.value
    .filter(event => {
      // Ensure event exists and has the required properties
      return (
        event &&
        event.date === dateString &&
        typeof event.start_time === 'string'
      );
    })
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
})

// Navigation methods
const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate.value)
    prevDay.setDate(prevDay.getDate() - 1)
    const today = new Date()
    if (prevDay < today) return today.setHours(0, 0, 0, 0)
    selectDate(prevDay)
}

const goToPreviousWeek = () => {
    const prevWeek = new Date(selectedDate.value)
    prevWeek.setDate(prevWeek.getDate() - 7)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (prevWeek < today) return today.setHours(0, 0, 0, 0)
    selectDate(prevWeek)
}

const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate.value)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    const firstOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (firstOfPrevMonth < today) return today.setHours(0, 0, 0, 0)
    currentDate.value = firstOfPrevMonth
    // Adjust selected date to the first of the new month
    selectDate(firstOfPrevMonth)
}

const goToNextDay = () => {
  const nextDay = new Date(selectedDate.value)
  nextDay.setDate(nextDay.getDate() + 1)
  selectDate(nextDay)
}

const goToNextWeek = () => {
  const nextWeek = new Date(selectedDate.value)
  nextWeek.setDate(nextWeek.getDate() + 7)
  selectDate(nextWeek)
}

const goToNextMonth = () => {
  const nextMonth = new Date(currentDate.value)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  currentDate.value = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1)
  // Adjust selected date to the first of the new month
  selectDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1))
}

const goToToday = () => {
  const today = new Date()
  selectDate(today)
  currentDate.value = new Date(today.getFullYear(), today.getMonth(), 1)
}

const selectDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)

    // No permitir seleccionar una fecha anterior a hoy
    if (newDate < today) {
        // No cambiar la fecha seleccionada
        return
    }

    selectedDate.value = newDate

    // Update current date if selecting a date from different month
    if (
        newDate.getMonth() !== currentDate.value.getMonth() ||
        newDate.getFullYear() !== currentDate.value.getFullYear()
    ) {
        currentDate.value = new Date(newDate.getFullYear(), newDate.getMonth(), 1)
    }

    emit('date-changed', newDate)
}

const selectQuickDate = (date) => {
  selectDate(date)
}

// Utility methods
const formatCurrentDate = (date) => {
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatSelectedDate = (date) => {
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric',
    month: 'long'
  })
}

const formatDayOfWeek = (date) => {
  return date.toLocaleDateString('es-ES', { weekday: 'long' })
}

const isToday = (date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString()
}

// Actualizar colores de eventos con las nuevas opciones
const getEventColor = (type) => {
  const colors = {
    'session': 'bg-blue-400',
    'manual_session': 'bg-lime-400',
    'personal': 'bg-orange-400'
  };
  return colors[type] || 'bg-gray-400';
};

const getEventBorderColor = (type) => {
  const colors = {
    'session': 'border-blue-400',
    'manual_session': 'border-lime-400',
    'personal': 'border-orange-400'
  };
  return colors[type] || 'border-gray-400'
}

const editEvent = (event) => {
  emit('edit-event', event)
}

const createEventAtTime = (time) => {
  emit('create-event-at-time', {
    date: selectedDate.value,
    time: time
  })
}

// Watchers
watch(selectedDate, (newDate) => {
  emit('date-changed', newDate)
})

// Initialize
onMounted(() => {
  // Set to today by default
  goToToday()

  events.value = props.data

  // Depuración: Verificar si los eventos llegan correctamente
  console.log('DynamicCalendar mounted. Events:', props.data);
});

watch(() => props.data, (newEvents) => {
    events.value = newEvents
  console.log('DynamicCalendar events updated:', newEvents);
});

watch(() => selectedDateEvents, (newSelectedEvents) => {
  console.log('DynamicCalendar selectedDateEvents updated:', newSelectedEvents);
});
</script>