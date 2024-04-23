<!-- TimeSlot component -->

<template>
    <button v-if="!timeSlot || !timeSlot.event" class="w-full h-full" :class="[editMode ? '' : editClass]"
        :disabled="editMode" @click="$emit('emptySlotClick')">
        <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
            <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
        </div>
    </button>
    <button v-else @click="$emit('eventClick', timeSlot?.event)" :disabled="!isFirstEventUnique || !editMode"
        class="w-full h-full" :class="eventClasses(timeSlot)">
        <div v-if="shouldShowEventDetails" class="w-full h-full flex flex-col justify-center items-center text-white">
            <ProfessionalDashboardCalendarEventDetails :event="timeSlot.event" :timeSlot="timeSlot" />
        </div>
        <div :class="{ hidden: !editMode || !isFirstEventUnique }">
            <Icon name="fa6-solid:pen-to-square" class="text-xl text-white" />
        </div>
    </button>
</template>

<script setup>

const props = defineProps({
    timeSlot: Object,
    timeSlots: Array,
    slotIndex: Number,
    editMode: Boolean,
});

const emit = defineEmits(['emptySlotClick', 'eventClick']);

const eventClasses = (timeSlot) => {
    const event = timeSlot.event;
    let baseClass;
    if (event.type === 'personal') {
        baseClass = 'bg-quaternary';
    } else if (event.clients.length > 0) {
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

const isFirstEventUnique = computed(() => {
    const { slotIndex, timeSlots } = props;
    if (slotIndex === 0) return true;

    const event = timeSlots[slotIndex].event;
    const previousEvent = timeSlots[slotIndex - 1].event;

    return !event || !previousEvent || previousEvent.event_id !== event.event_id;
});

const shouldShowEventDetails = computed(() => {
    return !props.editMode && isFirstEventUnique.value;
});
</script>