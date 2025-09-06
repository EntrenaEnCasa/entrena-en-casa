// composables/useDynamicCalendar.js
import { ref, computed, watch, nextTick } from 'vue'

export const useDynamicCalendar = (initialEvents = [], options = {}) => {
  // Default options
  const defaultOptions = {
    startHour: 6,
    endHour: 22,
    slotDuration: 60, // minutes
    locale: 'es-ES',
    weekStartsOn: 0, // 0 = Sunday, 1 = Monday
    ...options
  }

  // State
  const selectedDate = ref(new Date())
  const currentDate = ref(new Date())
  const viewMode = ref('month') // 'day', 'week', 'month'
  const events = ref([...initialEvents])
  const loading = ref(false)
  const error = ref(null)

  // Computed properties
  const today = computed(() => new Date())
  
  const selectedDateString = computed(() => {
    return selectedDate.value.toISOString().split('T')[0]
  })

  const currentDateString = computed(() => {
    return currentDate.value.toISOString().split('T')[0]
  })

  // Get events for selected date
  const selectedDateEvents = computed(() => {
    return events.value
      .filter(event => event.date === selectedDateString.value)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  })

  // Get events for current month
  const currentMonthEvents = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    return events.value.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  })

  // Generate time slots for day view
  const dayTimeSlots = computed(() => {
    const slots = []
    const { startHour, endHour, slotDuration } = defaultOptions
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += slotDuration) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        const event = selectedDateEvents.value.find(e => e.startTime === time)
        slots.push({ time, event, available: !event })
      }
    }
    
    return slots
  })

  // Generate calendar days for month view
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    
    // Adjust start date based on week start preference
    const dayOfWeek = firstDay.getDay()
    const diff = (dayOfWeek - defaultOptions.weekStartsOn + 7) % 7
    startDate.setDate(firstDay.getDate() - diff)
    
    const days = []
    const todayDate = today.value
    
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
        isToday: date.toDateString() === todayDate.toDateString(),
        isSelected: date.toDateString() === selectedDate.value.toDateString(),
        events: dayEvents,
        hasEvents: dayEvents.length > 0
      })
    }
    
    return days
  })

  // Generate quick dates (for mobile view)
  const quickDates = computed(() => {
    const dates = []
    const baseDate = selectedDate.value
    
    // Get 3 days before, today, and 3 days after
    for (let i = -3; i <= 3; i++) {
      const date = new Date(baseDate)
      date.setDate(baseDate.getDate() + i)
      
      const dateString = date.toISOString().split('T')[0]
      const dayEvents = events.value.filter(event => event.date === dateString)
      
      dates.push({
        date: new Date(date),
        dateString,
        day: date.getDate(),
        dayName: (date instanceof Date && !isNaN(date)) ? date.toLocaleDateString(defaultOptions.locale, { weekday: 'short' }) : '',
        hasEvents: dayEvents.length > 0,
        eventCount: dayEvents.length,
        isToday: date.toDateString() === today.value.toDateString(),
        isSelected: date.toDateString() === selectedDate.value.toDateString()
      })
    }
    
    return dates
  })

  // Week dates (for week view)
  const weekDates = computed(() => {
    const dates = []
    const startOfWeek = new Date(selectedDate.value)
    const dayOfWeek = startOfWeek.getDay()
    const diff = (dayOfWeek - defaultOptions.weekStartsOn + 7) % 7
    startOfWeek.setDate(startOfWeek.getDate() - diff)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      
      const dateString = date.toISOString().split('T')[0]
      const dayEvents = events.value.filter(event => event.date === dateString)
      
      dates.push({
        date: new Date(date),
        dateString,
        day: date.getDate(),
        dayName: (date instanceof Date && !isNaN(date.getTime())) ? date.toLocaleDateString(defaultOptions.locale, { weekday: 'short' }) : '',
        fullDayName: (date instanceof Date && !isNaN(date.getTime())) ? date.toLocaleDateString(defaultOptions.locale, { weekday: 'long' }) : '',
        events: dayEvents,
        hasEvents: dayEvents.length > 0,
        isToday: date.toDateString() === today.value.toDateString(),
        isSelected: date.toDateString() === selectedDate.value.toDateString()
      })
    }
    
    return dates
  })

  // Navigation methods
  const selectDate = (date) => {
    selectedDate.value = new Date(date)
    
    // Update current date if selecting a date from different month
    if (date.getMonth() !== currentDate.value.getMonth() || 
        date.getFullYear() !== currentDate.value.getFullYear()) {
      currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
    }
  }

  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate.value)
    prevDay.setDate(prevDay.getDate() - 1)
    selectDate(prevDay)
  }

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate.value)
    nextDay.setDate(nextDay.getDate() + 1)
    selectDate(nextDay)
  }

  const goToPreviousWeek = () => {
    const prevWeek = new Date(selectedDate.value)
    prevWeek.setDate(prevWeek.getDate() - 7)
    selectDate(prevWeek)
  }

  const goToNextWeek = () => {
    const nextWeek = new Date(selectedDate.value)
    nextWeek.setDate(nextWeek.getDate() + 7)
    selectDate(nextWeek)
  }

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate.value)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    currentDate.value = prevMonth
  }

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate.value)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    currentDate.value = nextMonth
  }

  const goToToday = () => {
    const todayDate = new Date()
    selectDate(todayDate)
  }

  const goToDate = (date) => {
    selectDate(date)
  }

  // Event management methods
  const addEvent = async (eventData) => {
    loading.value = true
    error.value = null
    
    try {
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      events.value.push(newEvent)
      return newEvent
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEvent = async (eventId, eventData) => {
    loading.value = true
    error.value = null
    
    try {
      const index = events.value.findIndex(event => event.id === eventId)
      if (index !== -1) {
        events.value[index] = {
          ...events.value[index],
          ...eventData,
          updatedAt: new Date().toISOString()
        }
        return events.value[index]
      }
      throw new Error('Event not found')
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEvent = async (eventId) => {
    loading.value = true
    error.value = null
    
    try {
      const index = events.value.findIndex(event => event.id === eventId)
      if (index !== -1) {
        const deletedEvent = events.value[index]
        events.value.splice(index, 1)
        return deletedEvent
      }
      throw new Error('Event not found')
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility methods
  const formatDate = (date, options = {}) => {
    const defaultFormatOptions = {
      locale: defaultOptions.locale,
      ...options
    }
    const dateObj = (date instanceof Date) ? date : new Date(date)
    return dateObj.toLocaleDateString(defaultFormatOptions.locale, options)
  }

  const formatTime = (timeString) => {
    return timeString // Already in HH:MM format
  }

  const formatDateTime = (date, time) => {
    return `${formatDate(date)} ${formatTime(time)}`
  }

  const isToday = (date) => {
    return date.toDateString() === today.value.toDateString()
  }

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString()
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const getDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate
  }

  // Event filtering and searching
  const getEventsForDate = (date) => {
    const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0]
    return events.value.filter(event => event.date === dateString)
  }

  const getEventsForDateRange = (startDate, endDate) => {
    const start = typeof startDate === 'string' ? startDate : startDate.toISOString().split('T')[0]
    const end = typeof endDate === 'string' ? endDate : endDate.toISOString().split('T')[0]
    
    return events.value.filter(event => {
      return event.date >= start && event.date <= end
    })
  }

  const hasEventsOnDate = (date) => {
    return getEventsForDate(date).length > 0
  }

  const getEventCountForDate = (date) => {
    return getEventsForDate(date).length
  }

  const searchEvents = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return events.value.filter(event => 
      event.title.toLowerCase().includes(lowercaseQuery) ||
      (event.description && event.description.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Event type management
  const eventTypes = {
    online_personalizado: {
      label: 'Online Personalizado',
      color: 'bg-blue-400',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    online_disponible: {
      label: 'Online Disponible', 
      color: 'bg-lime-400',
      borderColor: 'border-lime-400',
      textColor: 'text-lime-600',
      bgColor: 'bg-lime-50'
    },
    horario_personal: {
      label: 'Horario Personal',
      color: 'bg-orange-400',
      borderColor: 'border-orange-400', 
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  }

  const getEventTypeConfig = (type) => {
    return eventTypes[type] || {
      label: 'Evento',
      color: 'bg-gray-400',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  }

  // Responsive utilities
  const isMobileView = ref(false)
  const isTabletView = ref(false)
  const isDesktopView = ref(false)

  const updateViewportInfo = () => {
    if (process.client) {
      const width = window.innerWidth
      isMobileView.value = width < 768
      isTabletView.value = width >= 768 && width < 1024
      isDesktopView.value = width >= 1024
    }
  }

  // Calendar configuration based on viewport
  const calendarConfig = computed(() => {
    if (isMobileView.value) {
      return {
        showMiniCalendar: true,
        showFullGrid: false,
        showSidebar: false,
        eventsPerDay: 1,
        defaultView: 'day'
      }
    } else if (isTabletView.value) {
      return {
        showMiniCalendar: false,
        showFullGrid: true,
        showSidebar: true,
        eventsPerDay: 2,
        defaultView: 'week'
      }
    } else {
      return {
        showMiniCalendar: false,
        showFullGrid: true,
        showSidebar: true,
        eventsPerDay: 3,
        defaultView: 'month'
      }
    }
  })

  // Watchers
  watch(selectedDate, (newDate, oldDate) => {
    if (newDate.toDateString() !== oldDate?.toDateString()) {
      // Emit or trigger any date change handlers
    }
  })

  // Lifecycle methods
  const initialize = () => {
    updateViewportInfo()
    if (process.client) {
      window.addEventListener('resize', updateViewportInfo)
    }
  }

  const cleanup = () => {
    if (process.client) {
      window.removeEventListener('resize', updateViewportInfo)
    }
  }

  // Auto-initialize
  if (process.client) {
    nextTick(() => {
      initialize()
    })
  }

  return {
    // State
    selectedDate: readonly(selectedDate),
    currentDate: readonly(currentDate),
    viewMode,
    events: readonly(events),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    today: readonly(today),
    selectedDateString: readonly(selectedDateString),
    currentDateString: readonly(currentDateString),
    selectedDateEvents: readonly(selectedDateEvents),
    currentMonthEvents: readonly(currentMonthEvents),
    dayTimeSlots: readonly(dayTimeSlots),
    calendarDays: readonly(calendarDays),
    quickDates: readonly(quickDates),
    weekDates: readonly(weekDates),
    calendarConfig: readonly(calendarConfig),
    
    // Responsive state
    isMobileView: readonly(isMobileView),
    isTabletView: readonly(isTabletView),
    isDesktopView: readonly(isDesktopView),
    
    // Navigation methods
    selectDate,
    goToPreviousDay,
    goToNextDay,
    goToPreviousWeek,
    goToNextWeek,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    goToDate,
    
    // Event management
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getEventsForDateRange,
    hasEventsOnDate,
    getEventCountForDate,
    searchEvents,
    
    // Utility methods
    formatDate,
    formatTime,
    formatDateTime,
    isToday,
    isSameDay,
    isWeekend,
    getDaysDifference,
    isDateInRange,
    getEventTypeConfig,
    
    // Configuration
    eventTypes,
    options: defaultOptions,
    
    // Lifecycle
    initialize,
    cleanup
  }
}