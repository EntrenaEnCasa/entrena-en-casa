<template>
    <div class="flex justify-center">
        <div class="mb-5 flex max-w-max flex-col items-center gap-x-4 gap-y-2 py-2 sm:flex-row">
            <div class="flex items-center gap-2">
                <select
                    v-model="selectedStartHour"
                    class="w-full min-w-max rounded-md border bg-white px-4 py-3 text-sm text-gray-800 outline-primary"
                >
                    <option
                        v-for="hour in startHourOptions"
                        :key="`start-hour-${hour}`"
                        :value="hour"
                    >
                        {{ hour }}
                    </option>
                </select>
                <span>:</span>
                <select
                    v-model="selectedStartMinute"
                    class="w-full min-w-max rounded-md border bg-white px-4 py-3 text-sm text-gray-800 outline-primary"
                >
                    <option
                        v-for="minute in startMinuteOptions"
                        :key="`start-minute-${minute}`"
                        :value="minute"
                    >
                        {{ minute }}
                    </option>
                </select>
            </div>
            <span class="font-semibold">-</span>
            <div class="flex items-center gap-2">
                <select
                    v-if="isManual"
                    v-model="selectedEndHour"
                    class="w-full min-w-max rounded-md border bg-white px-4 py-3 text-sm text-gray-800 outline-primary"
                >
                    <option v-for="hour in endHourOptions" :key="`end-hour-${hour}`" :value="hour">
                        {{ hour }}
                    </option>
                </select>
                <div
                    v-else
                    class="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-7 py-3 text-sm text-gray-600"
                >
                    {{ calculatedEndHour }}
                </div>

                <span>:</span>
                <span
                    class="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-7 py-3 text-sm text-gray-600"
                >
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
