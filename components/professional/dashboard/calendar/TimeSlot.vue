<template>
    <div class="h-14 border-r border-gray-200 min-w-[130px]" :class="{ 'border-b': shouldShowBorder(timeSlot) }">
        <button v-if="isTimeSlotEmpty(timeSlot)" class="w-full h-full" :class="[editMode ? '' : editClass]"
            :disabled="editMode" @click="$emit('emptySlotClick')">
            <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
            </div>
        </button>
        <div v-else class="w-full h-full relative">
            <div v-for="(event, index) in timeSlot.events" :key="index" class="absolute left-0 right-0"
                :style="{ height: `${calculateEventHeight(event)}%`, top: `${calculateEventTop(event)}%` }">
                <button @click="$emit('eventClick', event.event)" :disabled="!event.isStartEvent || !editMode"
                    class="w-full h-full" :class="eventClasses(event)">
                    <div v-if="shouldShowEventDetails(event)"
                        class="w-full h-full flex flex-col justify-center items-center text-white">
                        <ProfessionalDashboardCalendarEventDetails :event="event.event" :timeSlot="timeSlot" />
                    </div>
                    <div :class="{ hidden: !editMode || !event.isStartEvent }">
                        <Icon name="fa6-solid:pen-to-square" class="text-xl text-white" />
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

const slotDurationInMinutes = ref(60);

const props = defineProps({
    timeSlot: Object,
    editMode: Boolean,
});

const emit = defineEmits(['emptySlotClick', 'eventClick']);

const eventClasses = (event) => {
    let baseClass;
    if (event.event.type === 'personal') {
        baseClass = 'bg-quaternary';
    } else if (event.event.clients.length > 0) {
        baseClass = 'bg-secondary';
    } else {
        baseClass = 'bg-primary';
    }
    return [baseClass];
};

const editClass = reactive({
    flex: true,
    'items-center': true,
    'justify-center': true,
    group: true,
});

const isTimeSlotEmpty = (timeSlot) => {
    return !timeSlot || !timeSlot.events || timeSlot.events.length === 0;
};

const shouldShowBorder = (timeSlot) => {
    if (isTimeSlotEmpty(timeSlot)) return true;
    return timeSlot.events.some(event => event.isEndEvent);
};

const shouldShowEventDetails = (event) => {
    return !props.editMode && event.isStartEvent;
};

const calculateEventHeight = (event) => {
    const totalMinutes = slotDurationInMinutes.value;
    const eventDuration = totalMinutes - event.startOffset - event.endOffset;
    return (eventDuration / totalMinutes) * 100;
};

const calculateEventTop = (event) => {
    return (event.startOffset / slotDurationInMinutes.value) * 100;
};

</script>
