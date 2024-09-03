<template>
    <div
        class="relative h-14 min-w-[130px] border-r border-gray-200"
        :class="{ 'border-b': shouldShowBorder(timeSlot) }"
    >
        <button
            v-if="isTimeSlotEmpty(timeSlot)"
            class="h-full w-full"
            :class="[editMode ? '' : editClass]"
            :disabled="editMode"
            @click="$emit('emptySlotClick')"
        >
            <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
            </div>
        </button>
        <button
            v-else
            v-for="(event, index) in timeSlot.events"
            :key="index"
            @click="handleClick(event.event)"
            :disabled="!shouldShowEventDetails(event)"
            class="absolute w-full overflow-hidden"
            :class="eventClasses(event)"
            :style="getEventStyle(event)"
        >
            <div
                v-if="shouldShowEventDetails(event)"
                class="flex items-center justify-center text-white"
            >
                <Icon
                    :name="editMode ? 'fa6-solid:pen-to-square' : 'mdi:eye'"
                    :class="editMode ? 'text-xl text-white' : 'text-lg text-white'"
                />
                <span class="ml-1.5 text-sm">{{ editMode ? "Editar" : "Ver detalles" }}</span>
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

const emit = defineEmits(["emptySlotClick", "editClick", "infoClick"]);

const handleClick = (event) => {
    if (props.editMode) {
        emit("editClick", event);
    } else {
        emit("infoClick", event);
    }
};

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

const editClass = computed(() => ({
    flex: true,
    "items-center": true,
    "justify-center": true,
    group: true,
}));

const isTimeSlotEmpty = (timeSlot) => {
    return !timeSlot || !timeSlot.events || timeSlot.events.length === 0;
};

const shouldShowBorder = (timeSlot) => {
    if (isTimeSlotEmpty(timeSlot)) return true;
    return timeSlot.events.some((event) => event.isEndEvent);
};

const getEventStartMinute = (event) => {
    const [hours, minutes] = event.event.start_time.split(":");
    return parseInt(minutes);
};

const shouldShowEventDetails = (event) => {
    if (event.isStartEvent) {
        const startMinute = getEventStartMinute(event);

        if (startMinute > props.slotDurationInMinutes / 2) {
            return false; // It will be shown in the next slot
        }

        return true; // Show in the current slot
    } else {
        if (event.isSecondEvent) {
            const startMinute = getEventStartMinute(event);

            if (startMinute <= props.slotDurationInMinutes / 2) {
                return false; // It was shown in the previous slot
            }

            return true;
        }
    }

    return false;
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
