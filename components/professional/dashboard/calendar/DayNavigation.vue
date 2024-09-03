<template>
    <div class="mb-6 flex items-center justify-center gap-x-2">
        <button @click="goToPreviousDay" :disabled="isFirstDayOfWeek">
            <Icon
                class="text-xl"
                :class="{
                    'text-gray-300': isFirstDayOfWeek,
                    'text-gray-800': !isFirstDayOfWeek,
                }"
                name="fa6-solid:chevron-left"
            ></Icon>
        </button>
        <h3 class="w-60 text-center text-xl font-semibold">
            <span class="capitalize">
                {{ selectedDayName }}
            </span>
            {{ selectedDayNumber }} de
            <span class="capitalize">
                {{ selectedMonth }}
            </span>
        </h3>
        <button @click="goToNextDay" :disabled="isLastDayOfWeek">
            <Icon
                class="text-xl"
                :class="{
                    'text-gray-300': isLastDayOfWeek,
                    'text-gray-800': !isLastDayOfWeek,
                }"
                name="fa6-solid:chevron-right"
            ></Icon>
        </button>
    </div>
</template>
<script setup>
import { useDayNavigationStore } from "~/stores/professional/dashboard/calendar/DayNavigationStore";

const store = useDayNavigationStore();

const { selectedDayName, selectedDayNumber, selectedMonth, isFirstDayOfWeek, isLastDayOfWeek } =
    toRefs(store);
const { goToNextDay, goToPreviousDay } = store;
</script>
