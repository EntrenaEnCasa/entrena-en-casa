<template>
    <div class="flex justify-center">
        <div class="py-2 mb-5 flex flex-col sm:flex-row max-w-max items-center gap-y-2 gap-x-4">
            <div class="flex items-center gap-2">
                <select
                    v-model="selectedStartHour"
                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-4 py-3 outline-primary min-w-max">
                    <option
                        v-for="hour in startHourOptions"
                        :key="`start-hour-${hour}`"
                        :value="hour">
                        {{ hour }}
                    </option>
                </select>
                <span>:</span>
                <select
                    v-model="selectedStartMinute"
                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-4 py-3 outline-primary min-w-max">
                    <option
                        v-for="minute in startMinuteOptions"
                        :key="`start-minute-${minute}`"
                        :value="minute">
                        {{ minute }}
                    </option>
                </select>
            </div>
            <span class="font-semibold">-</span>
            <div class="flex items-center gap-2">
                <select
                    v-if="isManual"
                    v-model="selectedEndHour"
                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-4 py-3 outline-primary min-w-max">
                    <option v-for="hour in endHourOptions" :key="`end-hour-${hour}`" :value="hour">
                        {{ hour }}
                    </option>
                </select>
                <div
                    v-else
                    class="border border-gray-300 bg-gray-100 text-gray-600 text-sm rounded-md px-6 py-3 cursor-not-allowed">
                    {{ calculatedEndHour }}
                </div>

                <span>:</span>
                <span
                    class="border border-gray-300 bg-gray-100 text-gray-600 text-sm rounded-md px-6 py-3 cursor-not-allowed">
                    {{ selectedEndMinute }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimeRangeStore } from "~/stores/professional/dashboard/calendar/TimeRangeStore";

defineProps({
    isManual: {
        type: Boolean,
        default: false,
    },
});

const {
    selectedStartHour,
    selectedStartMinute,
    selectedEndHour,
    selectedEndMinute,
    startHourOptions,
    endHourOptions,
    startMinuteOptions,
    calculatedEndHour,
} = storeToRefs(useTimeRangeStore());
</script>
