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
                <template v-for="(timeSlot, index) in  eventMatrix[0] " :key="timeSlot.time">
                    <div class="text-sm font-semibold text-center border-r border-gray-200 py-2 pr-4 text-gray-500">
                        {{ timeSlot.formattedTime }}
                    </div>
                    <div v-for="(day, dayIndex) in  eventMatrix " :key="`day-${dayIndex}-slot-${index}`"
                        class="h-14 border-r border-gray-200 min-w-[130px]"
                        :class="{ 'border-b': !(day[index].event && day[index].event.type === 'personal') || isLastEventUnique(day, index) }">
                        <button v-if="!day[index].event" class="w-full h-full" :class="[editMode ? '' : editClass]"
                            :disabled="editMode" @click="emptySlotModal.handleClick(day[index].day, day[index].time)">
                            <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                                <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                            </div>
                        </button>
                        <button v-else
                            @click="editEventHandler.handleClick(day[index].day, day[index].time, day[index].event)"
                            :disabled="!editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index))"
                            class="w-full h-full" :class="eventClasses(day, index)">
                            <div v-if="day[index].event.type === 'personal' &&
                                isFirstEventUnique(day, index) && !editMode"
                                class="w-full h-full flex flex-col justify-center items-center text-white">
                                <h4 class="font-medium">Evento personal</h4>
                                <p class="text-xs">{{ day[index].event.start_time }} - {{ day[index].event.end_time }}
                                </p>
                            </div>
                            <div
                                :class="{ hidden: !editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index)) }">
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

</script>