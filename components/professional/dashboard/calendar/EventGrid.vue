<!-- EventGrid.vue -->
<template>
    <div class="overflow-x-auto rounded-2xl border bg-white px-9 py-7">
        <CommonLoading v-if="fetchingEvents" class="my-8" />
        <div v-else>
            <div
                class="grid"
                style="
                    grid-template-columns: minmax(60px, max-content) repeat(7, minmax(130px, 1fr));
                "
            >
                <div class="border-gray-200 text-center text-sm font-semibold"></div>
                <div
                    v-for="day in calendarData"
                    :key="day.date"
                    class="min-w-[130px] border-b border-gray-200 pb-4 text-center text-sm font-semibold capitalize text-gray-500"
                >
                    {{ day.formattedDate }}
                </div>
                <template v-if="calendarData.length > 0">
                    <template v-for="(timeSlot, index) in timeSlots" :key="timeSlot.time">
                        <div
                            class="border-r border-gray-200 py-2 pr-4 text-center text-sm font-semibold text-gray-500"
                        >
                            {{ timeSlot.time }}
                        </div>
                        <div v-for="day in calendarData" :key="day.date">
                            <ProfessionalDashboardCalendarTimeSlot
                                :timeSlot="day.timeSlots[index]"
                                :editMode="editMode"
                                :slotDurationInMinutes="slotDurationInMinutes"
                                @emptySlotClick="
                                    emptySlotModal.handleClick(day.date, timeSlot.time)
                                "
                                @infoClick="(event) => infoEventHandler.handleClick(event)"
                                @editClick="
                                    (event) => editEventHandler.handleClick(day.date, event)
                                "
                            />
                        </div>
                    </template>
                </template>
                <template v-else>
                    <p>No hay datos de calendario disponibles.</p>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    fetchingEvents: Boolean,
    calendarData: Array,
    editMode: Boolean,
    emptySlotModal: Object,
    infoEventHandler: Object,
    editEventHandler: Object,
    slotDurationInMinutes: Number,
});

// Extract unique time slots from the first day's timeSlots
const timeSlots = computed(() => {
    if (props.calendarData.length > 0) {
        return props.calendarData[0].timeSlots;
    }
    return [];
});
</script>
