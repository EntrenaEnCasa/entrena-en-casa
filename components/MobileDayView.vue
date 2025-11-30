<template>
  <div class="mobile-day-view">
    <!-- Date Navigation -->
    <div class="flex items-center justify-between mb-4">
      <button 
        @click="goToPreviousDay"
        :disabled="!canGoToPreviousDay"
        :class="[
          'p-2 rounded-full transition-colors',
          canGoToPreviousDay
            ? 'hover:bg-gray-100 text-gray-600'
            : 'text-gray-300 cursor-not-allowed'
        ]"
      >
        <Icon name="mdi:chevron-left" class="w-6 h-6" />
      </button>
      
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ formatDayName(selectedDate) }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ formatDate(selectedDate, { day: 'numeric', month: 'long' }) }}
        </p>
      </div>
      
      <button 
        @click="goToNextDay"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Icon name="mdi:chevron-right" class="w-6 h-6 text-gray-600" />
      </button>
    </div>

    <!-- Mini Calendar -->
    <div class="mb-6 bg-gray-50 rounded-lg p-4">
      <div class="text-center mb-3">
        <h4 class="text-sm font-medium text-gray-700">
          {{ formatDate(selectedDate, { month: 'long', year: 'numeric' }) }}
        </h4>
      </div>
      
      <!-- Quick date selector -->
      <div class="grid grid-cols-7 gap-1">
        <div 
          v-for="day in quickDates" 
          :key="day.dateString"
          @click="canSelectDate(day.date) ? selectDate(day.date) : null"
          :class="[
            'aspect-square flex items-center justify-center text-sm rounded-md transition-all',
            !canSelectDate(day.date) ? 'text-gray-300 cursor-not-allowed' :
            day.isToday ? 'bg-secondary-500 text-white font-semibold cursor-pointer' :
            day.isSelected ? 'bg-primary-100 text-primary-600 font-medium cursor-pointer' :
            day.hasEvents ? 'bg-primary-100 text-primary-600 cursor-pointer' :
            'text-gray-600 hover:bg-gray-100 cursor-pointer'
          ]"
        >
          {{ day.day }}
        </div>
      </div>
    </div>

    <!-- Events List -->
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Actividades del día</h4>
      
      <div v-if="dayEvents.length === 0" class="text-center py-8">
        <Icon name="mdi:calendar-blank" class="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p class="text-gray-500 text-sm">Sin actividades para este día</p>
        <button 
          v-if="canAddEventToday"
          @click="$emit('slot-click', { date: selectedDate, time: getCurrentTimeSlot() })"
          class="mt-3 text-primary-600 text-sm font-medium hover:text-primary-700"
        >
          Agregar sesión
        </button>
      </div>

      <div 
        v-for="event in dayEvents" 
        :key="event.id || event.session_id"
        @click="$emit('event-click', event)"
        :class="[
          'p-4 rounded-lg border-l-4 transition-all cursor-pointer hover:shadow-md bg-white',
          getEventColorClass(event)
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="font-medium text-sm text-gray-700 mb-1">
              {{ formatTime(event.start_time) }} - {{ formatTime(event.end_time || addHour(event.start_time)) }}
            </div>
            <div class="font-medium text-gray-900 text-base mb-1">
              {{ getEventTitle(event) }}
            </div>
            <div v-if="getEventSubtitle(event)" class="text-sm text-gray-600">
              {{ getEventSubtitle(event) }}
            </div>
          </div>
          <div v-if="editMode" class="flex items-center gap-1 ml-2">
            <Icon 
              :name="isPastEvent(event) ? 'mdi:eye' : 'mdi:pencil'" 
              class="w-4 h-4"
              :class="isPastEvent(event) ? 'text-blue-500' : 'text-green-500'"
            />
            <span class="text-xs font-medium"
                  :class="isPastEvent(event) ? 'text-blue-500' : 'text-green-500'"
            >
              {{ isPastEvent(event) ? 'Ver' : 'Editar' }}
            </span>
          </div>
          <Icon 
            v-else
            name="mdi:chevron-right" 
            class="w-4 h-4 text-gray-400" 
          />
        </div>
      </div>
    </div>

    <!-- Add Session Button -->
    <button 
      v-if="canAddEventToday"
      @click="$emit('slot-click', { date: selectedDate, time: getCurrentTimeSlot() })"
      class="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
    >
      <Icon name="mdi:plus" class="w-4 h-4" />
      Nueva Sesión
    </button>
    
    <div v-else class="mt-6 w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed">
      <Icon name="mdi:lock" class="w-5 h-5" />
      No disponible para fechas pasadas
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  calendar: {
    type: Object,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['date-changed', 'event-click', 'slot-click'])

// Computed properties
const dayEvents = computed(() => {
  const dateString = props.selectedDate.toISOString().split('T')[0]
  return props.events
    .filter(event => event.date === dateString || event.start_time)
    .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''))
})

const quickDates = computed(() => {
  const dates = []
  const today = new Date()
  const baseDate = props.selectedDate
  
  // For mobile, start with today on the left and show next 6 days
  const startDate = props.selectedDate.toDateString() === today.toDateString() 
    ? today  // If selected date is today, start with today
    : baseDate  // Otherwise start with selected date
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = props.events.filter(event => event.date === dateString)
    
    dates.push({
      date: new Date(date),
      dateString,
      day: date.getDate(),
      hasEvents: dayEvents.length > 0,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === props.selectedDate.toDateString()
    })
  }
  
  return dates
})

const canGoToPreviousDay = computed(() => {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedStart = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), props.selectedDate.getDate())
  return selectedStart > todayStart
})

const canAddEventToday = computed(() => {
  const today = new Date()
  return props.selectedDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
})

// Methods
const formatDate = (date, options = {}) => {
  return date.toLocaleDateString('es-CL', options)
}

const formatDayName = (date) => {
  return date.toLocaleDateString('es-CL', { weekday: 'long' })
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.substring(0, 5) // HH:MM
}

const isPastEvent = (event) => {
  const now = new Date()
  const eventDate = new Date(event.date)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Solo considerar pasado si es de un día anterior
  if (eventDate < today) {
    return true
  }
  
  // Para el día actual, considerar pasado solo si ya pasó la hora
  if (eventDate.toDateString() === now.toDateString() && event.start_time) {
    const [hours, minutes] = event.start_time.split(':').map(Number)
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
    return eventTime < now
  }
  
  return false
}

const addHour = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':').map(Number)
  const newHours = (hours + 1) % 24
  return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const selectDate = (date) => {
  emit('date-changed', date)
}

const canSelectDate = (date) => {
  const today = new Date()
  return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

const getCurrentTimeSlot = () => {
  const now = new Date()
  const currentHour = now.getHours()
  const nextHour = currentHour + 1
  return `${nextHour.toString().padStart(2, '0')}:00`
}

const goToPreviousDay = () => {
  if (!canGoToPreviousDay.value) return
  
  const prevDay = new Date(props.selectedDate)
  prevDay.setDate(prevDay.getDate() - 1)
  emit('date-changed', prevDay)
}

const goToNextDay = () => {
  const nextDay = new Date(props.selectedDate)
  nextDay.setDate(nextDay.getDate() + 1)
  emit('date-changed', nextDay)
}

const getEventTitle = (event) => {
  if (event.type === 'session') {
    return `${event.session_info?.modality || 'Online'} ${event.session_info?.format || 'Personalizado'}`
  } else if (event.type === 'manual_session') {
    return `${event.session_info?.modality || 'Online'} ${event.session_info?.format || 'Personalizado'}`
  } else if (event.type === 'personal') {
    return 'Evento Personal'
  }
  return event.title || 'Evento'
}

const getEventSubtitle = (event) => {
  if (event.type === 'session') {
    return 'Disponible'
  } else if (event.type === 'manual_session') {
    if (event.clients && event.clients.length > 0) {
      return `${event.clients[0]?.name || event.clients[0]?.user_name || 'Cliente'} ${event.clients.length > 1 ? `+${event.clients.length - 1}` : ''}`
    }
    return 'Entrenamiento'
  } else if (event.type === 'personal') {
    return 'Horario Personal'
  }
  return event.description || ''
}

const getEventColorClass = (event) => {
  if (event.type === 'session') {
    return 'bg-primary-50 border-primary-400' // Verde para sesiones disponibles
  } else if (event.type === 'manual_session') {
    return 'bg-secondary-50 border-secondary-400' // Azul para entrenamientos
  } else if (event.type === 'personal') {
    return 'bg-orange-50 border-orange-400' // Naranja para eventos personales
  }
  return 'bg-gray-50 border-gray-400'
}
</script>