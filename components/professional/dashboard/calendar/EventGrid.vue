<template>
    <div class="overflow-x-auto bg-white rounded-2xl border py-7 px-9">
        <CommonLoading v-show="fetchingEvents" class="my-8" />
        <div v-show="!fetchingEvents">
            <div class="grid" style="grid-template-columns: minmax(60px, max-content) repeat(7, minmax(130px, 1fr));">
                <div class="text-sm font-semibold text-center border-gray-200">
                </div>
                <div v-for="(day, index) in eventMatrix" :key="index"
                    class="capitalize text-sm font-semibold text-center border-b border-gray-200 pb-4 min-w-[130px] text-gray-500">
                    {{ day[0].formattedDay }}
                </div>
                <template v-for="(timeSlot, index) in  eventMatrix[0]" :key="timeSlot.time">
                    <div class="text-sm font-semibold text-center border-r border-gray-200 py-2 pr-4 text-gray-500">
                        {{ timeSlot.formattedTime }}
                    </div>
                    <div v-for="(day, dayIndex) in  eventMatrix " :key="`day-${dayIndex}-slot-${index}`"
                        class="h-14 border-r border-gray-200 min-w-[130px]"
                        :class="{ 'border-b': shouldShowBorder(day, index) }">
                        <button v-if="!day[index].event" class="w-full h-full" :class="{ editClass: !editMode }"
                            :disabled="editMode" @click="emptySlotModal.handleClick(day[index].day, day[index].time)">
                            <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                                <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                            </div>
                        </button>
                        <button v-else
                            @click="editEventHandler.handleClick(day[index].day, day[index].time, day[index].event)"
                            :disabled="isButtonDisabled(day, index)" class="w-full h-full"
                            :class="eventClasses(day, index)">
                            <div v-if="shouldShowEventDetails(day, index)"
                                class="w-full h-full flex flex-col justify-center items-center text-white">
                                <template v-if="day[index].event.type === 'personal'">
                                    <h4 class="font-medium text-sm">Evento personal</h4>
                                    <p class="text-xs">
                                        {{ day[index].event.start_time }} - {{ day[index].event.end_time }}
                                    </p>
                                </template>
                                <template
                                    v-else-if="day[index].event.type === 'session' && day[index].event.clients.length == 0">
                                    <h4 class="font-medium text-sm">Disponible</h4>
                                    <p class="text-xs">
                                        {{ day[index].event.start_time }} - {{ calculateEndTime(day[index].event.start_time)
                                        }}
                                    </p>
                                </template>
                                <template
                                    v-else-if="day[index].event.type === 'session' && day[index].event.clients.length > 0">
                                    <h4 class="font-medium text-sm">Hora agendada</h4>
                                    <p class="text-xs">
                                        {{ day[index].event.start_time }} - {{ calculateEndTime(day[index].event.start_time)
                                        }}
                                    </p>
                                </template>
                                <template v-else-if="day[index].event.type === 'manual_session'">
                                    <h4 class="font-medium text-sm">Sesión manual</h4>
                                    <p class="text-xs">
                                        {{ day[index].event.start_time }} - {{ calculateEndTime(day[index].event.start_time)
                                        }}
                                    </p>
                                </template>
                            </div>
                            <div :class="{ hidden: !shouldShowEditIcon(day, index) }">
                                <Icon name="fa6-solid:pen-to-square" class="text-xl text-white" />
                            </div>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    fetchingEvents: Boolean,
    eventMatrix: Array,
    editMode: Boolean,
    emptySlotModal: Object,
    editEventHandler: Object,
});

/* styling of cells */

const eventClasses = (day, index) => {
    if (day[index].event.type === 'personal') {
        return [props.editMode ? editClass : '', 'bg-quaternary'];
    } else if (day[index].event.clients.length > 0) {
        return [props.editMode ? editClass : '', 'bg-secondary'];
    }
    else {
        return [props.editMode ? editClass : '', 'bg-primary'];
    }
}

const editClass = reactive({
    'flex': true,
    'items-center': true,
    'justify-center': true,
    'group': true,
});

const shouldShowBorder = (day, index) => {
    return !(day[index].event && day[index].event.type === 'personal') || isLastEventUnique(day, index);
};

const isButtonDisabled = (day, index) => {
    return !props.editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index));
};

const shouldShowEventDetails = (day, index) => {
    return isFirstEventUnique(day, index) && !props.editMode;
};

const shouldShowEditIcon = (day, index) => {
    return props.editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index));
};

const isFirstEventUnique = (day, index) => {
    if (index == 0) return true;

    const event = day[index].event;
    const previousEvent = day[index - 1].event;

    return !event || !previousEvent || previousEvent.event_id !== event.event_id;
};

const isLastEventUnique = (day, index) => {
    if (index == day.length - 1) return true;

    const event = day[index].event;
    const nextEvent = day[index + 1].event;

    return !event || !nextEvent || nextEvent.event_id !== event.event_id;
};

const calculateEndTime = (startTime) => {
    // Create a new Date object
    const time = new Date();

    // Split the startTime string into hours and minutes
    const [hours, minutes] = startTime.split(':');

    // Set the hours and minutes of the Date object
    time.setHours(parseInt(hours, 10));
    time.setMinutes(parseInt(minutes, 10));

    // Add 1 hour to the time
    time.setHours(time.getHours() + 1);

    // Return the new time as a string in the format HH:MM
    return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

</script>