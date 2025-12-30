<template>
  <div class="desktop-calendar-view">
    <!-- Calendar Grid Header -->
    <div class="grid grid-cols-7 gap-px mb-4 bg-gray-200 rounded-lg overflow-hidden">
      <div 
        v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" 
        :key="day"
        class="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700"
      >
        {{ day }}
      </div>
    </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        <div 
          v-for="day in calendarDays" 
          :key="day.dateString"
          @click="canSelectDate(day.date) ? selectDate(day.date) : null"
          :class="[
            'bg-white min-h-[120px] p-3 transition-all',
            !day.isCurrentMonth && 'bg-gray-50 text-gray-400',
            day.isToday && 'bg-primary-50 border-primary-200',
            day.isSelected && 'ring-2 ring-primary-500',
            canSelectDate(day.date) ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-60'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <span :class="[
              'text-sm font-medium',
              day.isToday ? 'text-secondary-600' : 'text-gray-900'
            ]">
              {{ day.day }}
            </span>
            <div v-if="day.hasEvents" class="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
          
          <!-- Events in day -->
          <div class="space-y-1">
            <div 
              v-for="event in day.events.slice(0, 3)" 
              :key="event.id || event.session_id"
              @click.stop="$emit('event-click', event)"
              :class="[
                'text-xs p-2 rounded transition-colors cursor-pointer hover:shadow-sm border-l-3',
                getEventColorClass(event)
              ]"
              style="word-wrap: break-word; box-sizing: border-box;"
            >
              <div class="font-medium text-xs leading-tight break-words">{{ formatTime(event.start_time) }} - {{ getEndTime(event) }}</div>
              <div class="font-normal text-xs leading-tight break-words">{{ getEventTitle(event) }}</div>
              <div v-if="getEventSubtitle(event)" class="text-xs leading-tight break-words opacity-75">
                {{ getEventSubtitle(event) }}
              </div>
            </div>
            <div v-if="day.events.length > 3" class="text-xs text-gray-500">
              +{{ day.events.length - 3 }} más
            </div>
          </div>
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

// Computed properties
const calendarDays = computed(() => {
  const days = []
  const today = new Date()
  const currentMonth = props.selectedDate.getMonth()
  const currentYear = props.selectedDate.getFullYear()
  
  // Get first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1)
  // Get the start of the week for the first day (Monday = 1)
  const startDate = new Date(firstDay)
  const dayOfWeek = firstDay.getDay()
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Monday = 0
  startDate.setDate(firstDay.getDate() - daysToSubtract)
  
  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = props.events.filter(event => event.date === dateString)
    
    days.push({
      date: new Date(date),
      day: date.getDate(),
      dateString,
      isCurrentMonth: date.getMonth() === currentMonth,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === props.selectedDate.toDateString(),
      events: dayEvents,
      hasEvents: dayEvents.length > 0
    })
  }
  
  return days
})

// Methods
const formatDate = (date, options = {}) => {
  return date.toLocaleDateString('es-CL', options)
}

const selectDate = (date) => {
  if (canSelectDate(date)) {
    emit('date-changed', date)
  }
}

const canSelectDate = (date) => {
  const today = new Date()
  return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

const canAddEventAtTime = (date, timeOrHour) => {
  const now = new Date()
  const eventDate = new Date(date)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Solo bloquear días completamente pasados
  return eventDate >= today
}

const handleSlotClick = (date, timeOrHour) => {
  const time = typeof timeOrHour === 'number' 
    ? `${timeOrHour.toString().padStart(2, '0')}:00`
    : timeOrHour
  
  if (canAddEventAtTime(date, time)) {
    emit('slot-click', { date, time })
  }
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

const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.substring(0, 5)
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
    return 'bg-primary-100 border-primary-400 text-primary-800'
  } else if (event.type === 'manual_session') {
    return 'bg-secondary-100 border-secondary-400 text-secondary-800'
  } else if (event.type === 'personal') {
    return 'bg-orange-100 border-orange-400 text-orange-800'
  }
  return 'bg-gray-100 border-gray-400 text-gray-800'
}
</script>