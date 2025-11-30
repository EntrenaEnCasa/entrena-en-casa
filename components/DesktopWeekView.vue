<template>
  <div class="desktop-week-view">
    <!-- Week Navigation Header -->
    <div class="flex items-center justify-between mb-6">
      <button 
        @click="goToPreviousWeek"
        :disabled="!canGoToPreviousWeek"
        :class="[
          'p-2 rounded-full transition-colors',
          canGoToPreviousWeek 
            ? 'hover:bg-gray-100 text-gray-600' 
            : 'text-gray-300 cursor-not-allowed'
        ]"
      >
        <Icon name="mdi:chevron-left" class="w-6 h-6" />
      </button>
      
      <div class="text-center">
        <h3 class="text-xl font-bold text-gray-900">
          {{ weekTitle }}
        </h3>
      </div>
      
      <button 
        @click="goToNextWeek"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Icon name="mdi:chevron-right" class="w-6 h-6 text-gray-600" />
      </button>
    </div>

    <!-- Week Grid -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <!-- Header with days -->
      <div class="grid gap-px bg-gray-200" :style="gridCols">
        <!-- Time column header -->
        <div class="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
          Hora
        </div>
        
        <!-- Day headers -->
        <div 
          v-for="day in weekDays" 
          :key="day.dateString"
          @click="canSelectDate(day.date) ? selectDate(day.date) : null"
          :class="[
            'bg-white p-3 text-center transition-all min-h-[80px] flex flex-col justify-center',
            day.isToday ? 'bg-primary-50 border-primary-200' : '',
            day.isSelected ? 'ring-2 ring-primary-500' : '',
            canSelectDate(day.date) ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-60'
          ]"
        >
          <div class="text-sm font-medium text-gray-700">
            {{ day.dayName }}
          </div>
          <div :class="[
            'text-lg font-bold mt-1',
            day.isToday ? 'text-primary-600' : 'text-gray-900'
          ]">
            {{ day.day }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ formatDate(day.date, { month: 'short' }) }}
          </div>
          <!-- Events indicator -->
          <div v-if="day.hasEvents" class="mt-2 flex justify-center">
            <div :class="[
              'w-2 h-2 rounded-full',
              day.isToday ? 'bg-white' : 'bg-primary-500'
            ]"></div>
          </div>
        </div>
      </div>

      <!-- Time slots grid -->
      <div class="bg-gray-200">
        <div 
          v-for="hour in timeHours" 
          :key="hour"
          class="grid gap-px"
          :style="gridCols"
        >
          <!-- Time label -->
          <div class="bg-gray-50 p-3 text-sm font-medium text-gray-600 text-center border-r">
            {{ formatHour(hour) }}
          </div>
          
          <!-- Day slots for this hour -->
          <div 
            v-for="day in weekDays" 
            :key="`${day.dateString}-${hour}`"
            @click="handleSlotClick(day.date, hour)"
            :class="[
              'bg-white min-h-[60px] p-2 transition-all border-b border-gray-100 overflow-hidden',
              isPastTimeSlot(day.date, hour) 
                ? 'bg-gray-200 opacity-60 cursor-not-allowed' 
                : canAddEventAtTime(day.date, hour) 
                  ? 'cursor-pointer hover:bg-gray-50' 
                  : 'cursor-not-allowed bg-gray-50 opacity-50'
            ]"
            style="box-sizing: border-box; width: 100%;"
          >
            <!-- Events for this time slot -->
            <div 
              v-for="event in getEventsForDayHour(day.date, hour)" 
              :key="event.id || event.session_id"
              @click.stop="handleEventClick(event)"
              :class="[
                'text-xs p-2 rounded mb-1 transition-colors border-l-4 cursor-pointer hover:shadow-sm overflow-hidden',
                getEventColorClass(event)
              ]"
              style="word-wrap: break-word; max-width: 100%; box-sizing: border-box;"
            >
              <div class="font-medium text-xs leading-tight break-words">{{ formatTime(event.start_time) }} - {{ formatTime(getEndTime(event)) }}</div>
              <div class="font-normal text-xs leading-tight break-words">{{ getEventTitle(event) }}</div>
              <div v-if="getEventSubtitle(event)" class="text-xs leading-tight break-words opacity-75">
                {{ getEventSubtitle(event) }}
              </div>
              <div v-if="editMode" class="flex items-center justify-between mt-1">
                <span class="text-xs opacity-75">{{ isPastEvent(event) ? 'Ver' : 'Editar' }}</span>
                <Icon 
                  :name="isPastEvent(event) ? 'mdi:eye' : 'mdi:pencil'" 
                  class="w-3 h-3 opacity-75" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-6 flex flex-wrap justify-center gap-6 text-sm">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-primary-100 border-l-4 border-primary-400 rounded"></div>
        <span class="text-gray-600">Disponible</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-secondary-100 border-l-4 border-secondary-400 rounded"></div>
        <span class="text-gray-600">Entrenamiento</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-orange-100 border-l-4 border-orange-400 rounded"></div>
        <span class="text-gray-600">Evento Personal</span>
      </div>
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

const gridCols = computed(() => ({
  gridTemplateColumns: `120px repeat(7, 1fr)` // Always 7 days
}))

const weekDays = computed(() => {
  const days = []
  const today = new Date()
  const baseDate = new Date(props.selectedDate)
  
  // If the selected date is before today, start from today
  if (baseDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    baseDate.setTime(today.getTime())
  }
  
  // Always show 7 consecutive days
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = props.events.filter(event => event.date === dateString)
    
    days.push({
      date: new Date(date),
      dateString,
      day: date.getDate(),
      dayName: date.toLocaleDateString('es-CL', { weekday: 'short' }),
      hasEvents: dayEvents.length > 0,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === props.selectedDate.toDateString(),
      events: dayEvents
    })
  }
  
  return days
})

const weekTitle = computed(() => {
  if (weekDays.value.length === 0) return 'Semana'
  
  const firstDay = weekDays.value[0]?.date
  const lastDay = weekDays.value[6]?.date // Always 7 days, so last is index 6
  
  if (!firstDay || !lastDay) return 'Semana'
  
  if (firstDay.getMonth() === lastDay.getMonth()) {
    return `${firstDay.getDate()} al ${lastDay.getDate()} de ${formatDate(firstDay, { month: 'long', year: 'numeric' })}`
  } else {
    return `${formatDate(firstDay, { day: 'numeric', month: 'short' })} al ${formatDate(lastDay, { day: 'numeric', month: 'short', year: 'numeric' })}`
  }
})

const timeHours = computed(() => {
  const hours = []
  for (let hour = 6; hour <= 22; hour++) {
    hours.push(hour)
  }
  return hours
})

const canGoToPreviousWeek = computed(() => {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedStart = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), props.selectedDate.getDate())
  
  // Can't go to previous week if it would show days before today
  return selectedStart > todayStart
})

// Methods
const formatDate = (date, options = {}) => {
  return date.toLocaleDateString('es-CL', options)
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.substring(0, 5)
}

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

const selectDate = (date) => {
  emit('date-changed', date)
}

const canSelectDate = (date) => {
  const today = new Date()
  return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
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

const isPastTimeSlot = (date, hour) => {
  const now = new Date()
  const slotDate = new Date(date)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Si es un día anterior, está en el pasado
  if (slotDate < today) {
    return true
  }
  
  // Si es hoy, verificar si la hora ya pasó
  if (slotDate.toDateString() === now.toDateString()) {
    const currentHour = now.getHours()
    return hour < currentHour
  }
  
  return false
}

const canAddEventAtTime = (date, hour) => {
  const now = new Date()
  const eventDate = new Date(date)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Solo bloquear días completamente pasados
  return eventDate >= today
}

const goToPreviousWeek = () => {
  if (!canGoToPreviousWeek.value) return
  
  const prevWeek = new Date(props.selectedDate)
  prevWeek.setDate(prevWeek.getDate() - 7)
  emit('date-changed', prevWeek)
}

const goToNextWeek = () => {
  const nextWeek = new Date(props.selectedDate)
  nextWeek.setDate(nextWeek.getDate() + 7)
  emit('date-changed', nextWeek)
}

const handleSlotClick = (date, hour) => {
  // No permitir clicks en slots pasados
  if (isPastTimeSlot(date, hour)) {
    return
  }
  
  // En modo edición, no permitir clicks en espacios vacíos
  if (props.editMode) {
    return
  }
  
  if (canAddEventAtTime(date, hour)) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    emit('slot-click', { date, time })
  }
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const getEventsForDayHour = (date, hour) => {
  const dateString = date.toISOString().split('T')[0]
  const timeString = `${hour.toString().padStart(2, '0')}:00`
  
  return props.events.filter(event => 
    event.date === dateString && 
    event.start_time === timeString
  )
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
  return ''
}

const getEventTime = (event) => {
  const start = event.start_time ? event.start_time.substring(0, 5) : ''
  const end = getEndTime(event)
  return end ? `${start}-${end}` : start
}

const getEndTime = (event) => {
  if (event.end_time) return event.end_time.substring(0, 5)
  if (event.start_time) {
    const [hours, minutes] = event.start_time.split(':').map(Number)
    const endHours = (hours + 1) % 24
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
  return ''
}

const getEventColorClass = (event) => {
  if (event.type === 'session') {
    return 'bg-primary-100 border-primary-400 text-primary-800' // Verde para sesiones disponibles
  } else if (event.type === 'manual_session') {
    return 'bg-secondary-100 border-secondary-400 text-secondary-800' // Azul para entrenamientos
  } else if (event.type === 'personal') {
    return 'bg-orange-100 border-orange-400 text-orange-800' // Naranja para eventos personales
  }
  return 'bg-gray-100 border-gray-400 text-gray-800'
}
</script>

<style scoped>
/* Responsive grid adjustments */
@media (max-width: 1200px) {
  .desktop-week-view .bg-white {
    min-height: 50px;
  }
}

@media (min-width: 1400px) {
  .desktop-week-view .bg-white {
    min-height: 70px;
  }
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>