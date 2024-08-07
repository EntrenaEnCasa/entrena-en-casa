<template>
    <div class="flex justify-center">
        <div class="py-2 mb-5 flex max-w-max items-center gap-4">
            <div class="flex items-center gap-2">
                <select
                    v-model="selectedStartHour"
                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-4 py-3 outline-primary">
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
                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-4 py-3 outline-primary">
                    <option
                        v-for="minute in startMinuteOptions"
                        :key="`start-minute-${minute}`"
                        :value="minute">
                        {{ minute }}
                    </option>
                </select>
            </div>
            <span class="font-semibold">-</span>
            <div v-if="isManual" class="flex items-center gap-2">
                <select
                    v-model="selectedEndHour"
                    class="border text-gray-800 bg-white text-sm rounded-md px-4 py-3 outline-primary">
                    <option
                        v-for="hour in endHourOptions"
                        :key="`end-hour-${hour}`"
                        :value="hour">
                        {{ hour }}
                    </option>
                </select>
                <span>:</span>
                <span
                    class="border border-gray-300 bg-gray-100 text-gray-600 text-sm rounded-md px-4 py-3 cursor-not-allowed">
                    {{ selectedStartMinute }}
                </span>
            </div>
            <div
                v-else
                class="border border-gray-300 bg-gray-100 text-gray-600 text-sm rounded-md px-4 py-3 cursor-not-allowed">
                {{ automaticallySelectedEndTime }}
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
    startHourOptions,
    endHourOptions,
    startMinuteOptions,
    automaticallySelectedEndTime,
} = storeToRefs(useTimeRangeStore());
</script>
