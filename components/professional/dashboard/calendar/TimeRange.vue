<template>
    <div class="flex justify-center">
        <div class="py-2 mb-5 flex max-w-max items-center gap-4">
            <select v-model="selectedStartTime"
                class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                <option v-for="time in startTimeOptions" :key="`start-${time}`" :value="time">
                    {{ time }}
                </option>
            </select>
            <span class="font-semibold">-</span>
            <select v-show="isManual" v-model="selectedEndTime"
                class="border text-gray-800 bg-white text-sm rounded-md px-5 py-3.5 outline-primary">
                <option v-for="time in endTimeOptions" :key="`end-${time}`" :value="time">
                    {{ time }}
                </option>
            </select>
            <p v-show="!isManual">
                {{ automaticallySelectedEndTime }}hrs
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useTimeRangeStore } from '~/stores/professional/dashboard/calendar/TimeRangeStore';

defineProps({
    isManual: Boolean,
});

const { selectedStartTime, selectedEndTime, startTimeOptions, endTimeOptions, automaticallySelectedEndTime } = storeToRefs(useTimeRangeStore());

</script>