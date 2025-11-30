<template>
  <div class="tablet-week-view">
    <!-- Week Navigation -->
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
        <h3 class="text-lg font-semibold text-gray-900">
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

    <!-- Week Days Grid -->
    <div class="grid grid-cols-7 gap-2 mb-4">
      <div 
        v-for="day in weekDays" 
        :key="day.dateString"
        @click="selectDate(day.date)"
        :class="[
          'p-3 rounded-lg cursor-pointer transition-all text-center',
          day.isToday ? 'bg-secondary-500 text-white' :
          day.isSelected ? 'bg-primary-100 text-primary-600' :
          canSelectDate(day.date) ? 'hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
        ]"
      >
        <div class="text-xs font-medium text-gray-500 mb-1" :class="{ 'text-white': day.isToday }">
          {{ day.dayName }}
        </div>
        <div class="text-lg font-semibold" :class="{ 'text-white': day.isToday }">
          {{ day.day }}
        </div>
        <div v-if="day.hasEvents" class="mt-1">
          <div :class="[
            'w-2 h-2 rounded-full mx-auto',
            day.isToday ? 'bg-white' : 'bg-primary-500'
          ]"></div>
        </div>
      </div>
    </div>

    <!-- Selected Day Events -->
    <div class="mt-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-base font-semibold text-gray-900">
          {{ formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long' }) }}
        </h4>
        <button 
          v-if="!editMode"
          @click="$emit('slot-click', { date: selectedDate, time: '09:00' })"
          class="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
        >
          + Agregar sesión
        </button>
      </div>

      <!-- Time Slots Grid -->
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <div v-if="selectedDayEvents.length === 0" class="text-center py-8">
          <Icon name="mdi:calendar-blank" class="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500 text-sm">Sin actividades para este día</p>
        </div>

        <div 
          v-for="slot in timeSlots" 
          :key="slot.time"
          @click="handleSlotClick(slot)"
          :class="[
            'p-3 rounded-lg border transition-all',
            slot.event ? 'border-l-4 cursor-pointer' : 
            isPastTimeSlot(selectedDate, slot.time) ? 
            'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60' :
            'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
          ]"
        >
          <div v-if="slot.event" :class="['border-l-4', getEventColorClass(slot.event)]">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h5 class="font-medium text-gray-900 text-sm">
                  {{ formatTime(slot.event.start_time) }} - {{ getEndTime(slot.event) }}
                </h5>
                <p class="text-xs text-gray-600">
                  {{ getEventTitle(slot.event) }}
                </p>
                <p v-if="getEventSubtitle(slot.event)" class="text-xs text-gray-500 mt-1">
                  {{ getEventSubtitle(slot.event) }}
                </p>
              </div>
              <Icon name="mdi:chevron-right" class="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div v-else class="flex items-center justify-between">
            <span class="text-sm text-gray-600">{{ slot.time }}</span>
            <Icon name="mdi:plus" class="w-4 h-4 text-gray-400" />
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

const canGoToPreviousWeek = computed(() => {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedStart = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), props.selectedDate.getDate())
  
  return selectedStart > todayStart
})

// Computed properties
const weekDays = computed(() => {
  const days = []
  const startOfWeek = getStartOfWeek(props.selectedDate)
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const dayEvents = props.events.filter(event => event.date === dateString)
    
    days.push({
      date: new Date(date),
      dateString,
      day: date.getDate(),
      dayName: date.toLocaleDateString('es-CL', { weekday: 'short' }),
      hasEvents: dayEvents.length > 0,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === props.selectedDate.toDateString()
    })
  }
  
  return days
})

const weekTitle = computed(() => {
  const startOfWeek = getStartOfWeek(props.selectedDate)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
    return `${startOfWeek.getDate()} al ${endOfWeek.getDate()} de ${formatDate(startOfWeek, { month: 'long', year: 'numeric' })}`
  } else {
    return `${formatDate(startOfWeek, { day: 'numeric', month: 'short' })} al ${formatDate(endOfWeek, { day: 'numeric', month: 'short', year: 'numeric' })}`
  }
})

const selectedDayEvents = computed(() => {
  const dateString = props.selectedDate.toISOString().split('T')[0]
  return props.events
    .filter(event => event.date === dateString)
    .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''))
})

const timeSlots = computed(() => {
  const slots = []
  const startHour = 6
  const endHour = 22
  
  for (let hour = startHour; hour <= endHour; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    const event = selectedDayEvents.value.find(e => e.start_time === time)
    
    slots.push({
      time,
      event,
      available: !event
    })
  }
  
  return slots
})

// Methods
const formatDate = (date, options = {}) => {
  return date.toLocaleDateString('es-CL', options)
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.substring(0, 5)
}

const getStartOfWeek = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday = 1
  return new Date(d.setDate(diff))
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

const canEditEvent = (event) => {
  const now = new Date()
  const eventDate = new Date(event.date || event.start_time)
  
  if (eventDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    return false
  }
  
  if (eventDate.toDateString() === now.toDateString() && event.start_time) {
    const [hours, minutes] = event.start_time.split(':').map(Number)
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
    return eventTime > now
  }
  
  return true
}

const canAddEventAtTime = (date, time) => {
  const now = new Date()
  const eventDate = new Date(date)
  
  if (eventDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    return false
  }
  
  if (eventDate.toDateString() === now.toDateString()) {
    const [hours, minutes] = time.split(':').map(Number)
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
    return eventTime > now
  }
  
  return true
}

const isPastTimeSlot = (date, timeString) => {
  const now = new Date()
  const slotDate = new Date(date)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Si es un día anterior, está en el pasado
  if (slotDate < today) {
    return true
  }
  
  // Si es hoy, verificar si la hora ya pasó
  if (slotDate.toDateString() === now.toDateString()) {
    const [hours] = timeString.split(':').map(Number)
    const currentHour = now.getHours()
    return hours < currentHour
  }
  
  return false
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

const handleSlotClick = (slot) => {
  if (slot.event) {
    // Siempre emitir event-click para que se abra el modal correcto (info o edición)
    emit('event-click', slot.event)
  } else {
    // No permitir clicks en slots pasados
    if (isPastTimeSlot(props.selectedDate, slot.time)) {
      return
    }
    
    // En modo edición, no permitir clicks en espacios vacíos
    if (props.editMode) {
      return
    }
    
    if (canAddEventAtTime(props.selectedDate, slot.time)) {
      emit('slot-click', { date: props.selectedDate, time: slot.time })
    }
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
    return 'border-primary-400 bg-primary-50'
  } else if (event.type === 'manual_session') {
    return 'border-secondary-400 bg-secondary-50'
  } else if (event.type === 'personal') {
    return 'border-orange-400 bg-orange-50'
  }
  return 'border-gray-400 bg-gray-50'
}
</script>