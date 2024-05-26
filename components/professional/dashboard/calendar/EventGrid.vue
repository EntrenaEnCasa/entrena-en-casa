<!-- EventGrid component -->
<template>
    <div class="overflow-x-auto bg-white rounded-2xl border py-7 px-9">
        <CommonLoading v-if="fetchingEvents" class="my-8" />
        <div v-else>
            <div class="grid" style="grid-template-columns: minmax(60px, max-content) repeat(7, minmax(130px, 1fr));">
                <div class="text-sm font-semibold text-center border-gray-200"></div>
                <div v-for="(day, index) in calendarData" :key="index"
                    class="capitalize text-sm font-semibold text-center border-b border-gray-200 pb-4 min-w-[130px] text-gray-500">
                    {{ day.formattedDate }}
                </div>
                <template v-if="calendarData.length > 0">
                    <template v-for="(timeSlot, index) in calendarData[0].timeSlots" :key="timeSlot.time">
                        <div class="text-sm font-semibold text-center border-r border-gray-200 py-2 pr-4 text-gray-500">
                            {{ timeSlot.time }}
                        </div>
                        <div v-for="(day, dayIndex) in calendarData" :key="`day-${dayIndex}-slot-${index}`">
                            <ProfessionalDashboardCalendarTimeSlot :timeSlot="day.timeSlots[index]" :editMode="editMode"
                                @emptySlotClick="emptySlotModal.handleClick(day.date, timeSlot.time)"
                                @eventClick="editEventHandler.handleClick(day.date, timeSlot.time, day.timeSlots[index].event)" />
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
    editEventHandler: Object,
});

</script>