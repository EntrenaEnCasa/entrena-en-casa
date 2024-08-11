<template>
    <div
        class="relative h-14 border-r border-gray-200 min-w-[130px]"
        :class="{ 'border-b': shouldShowBorder(timeSlot) }">
        <button
            v-if="isTimeSlotEmpty(timeSlot)"
            class="w-full h-full"
            :class="[editMode ? '' : editClass]"
            :disabled="editMode"
            @click="$emit('emptySlotClick')">
            <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                <Icon
                    name="fa6-solid:square-plus"
                    class="text-3xl text-gray-300" />
            </div>
        </button>
        <button
            v-else
            v-for="(event, index) in timeSlot.events"
            :key="index"
            @click="$emit('eventClick', event.event)"
            :disabled="!event.isStartEvent || !editMode"
            class="absolute w-full h-full overflow-hidden"
            :class="eventClasses(event)"
            :style="getEventStyle(event)">
            <div
                v-if="shouldShowEventDetails(event)"
                @mouseover="showPopover = true"
                @mouseleave="showPopover = false"
                class="w-full h-full flex flex-col justify-center items-center text-white">
                <Popper :show="showPopover">
                    <button>
                        <Icon name="mdi:eye" class="text-lg text-white" />
                        <span class="ml-1 text-sm">Ver info</span>
                    </button>
                    <template #content>
                        <ProfessionalDashboardCalendarEventDetails
                            :event="event.event"
                            :timeSlot="timeSlot" />
                    </template>
                </Popper>
            </div>
            <div :class="{ hidden: !editMode || !event.isStartEvent }">
                <Icon
                    name="fa6-solid:pen-to-square"
                    class="text-xl text-white" />
            </div>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    timeSlot: Object,
    editMode: Boolean,
    slotDurationInMinutes: Number,
});

const showPopover = ref(false);
const emit = defineEmits(["emptySlotClick", "eventClick"]);

const eventClasses = (event) => {
    let baseClass;
    if (event.event.type === "personal") {
        baseClass = "bg-quaternary";
    } else if (event.event.clients.length > 0) {
        baseClass = "bg-secondary";
    } else {
        baseClass = "bg-primary";
    }
    return [baseClass];
};

const editClass = reactive({
    flex: true,
    "items-center": true,
    "justify-center": true,
    group: true,
});

const isTimeSlotEmpty = (timeSlot) => {
    return !timeSlot || !timeSlot.events || timeSlot.events.length === 0;
};

const shouldShowBorder = (timeSlot) => {
    if (isTimeSlotEmpty(timeSlot)) return true;
    return timeSlot.events.some((event) => event.isEndEvent);
};

const shouldShowEventDetails = (event) => {
    return !props.editMode && event.isStartEvent;
};

const calculateEventHeight = (event) => {
    const totalMinutes = props.slotDurationInMinutes;
    const eventDuration = totalMinutes - event.startOffset - event.endOffset;
    return (eventDuration / totalMinutes) * 100;
};

const calculateEventTop = (event) => {
    return (event.startOffset / props.slotDurationInMinutes) * 100;
};

const getEventStyle = (event) => {
    const height = calculateEventHeight(event);
    const top = calculateEventTop(event);

    return {
        height: `${height}%`,
        top: `${top}%`,
    };
};
</script>
