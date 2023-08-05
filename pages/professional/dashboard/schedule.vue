<template>
    <div class="p-6 sm:p-8">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-medium">Horario disponible</h3>
        </div>
        <div class="overflow-x-auto sm:rounded-lg">
            <table class="bg-white w-full table-fixed text-sm text-gray-500 border">
                <thead>
                    <tr>
                        <th scope="col" class="w-24"></th>
                        <th v-for="day, index in daysList" :key="index" scope="col"
                            class="px-6 pt-6 pb-3 text-center whitespace-nowrap font-semibold w-28">
                            {{ formatDate(day) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="time, index in timesList" :key="index">
                        <td class="py-4 pr-6 text-right font-semibold whitespace-nowrap">
                            {{ time }}
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                        <td class="border">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from "vue";

const daysList = ref([]);
const timesList = ref([]);

const generateDaysList = () => {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + i);
        daysList.value.push(newDate);
    }
}

const formatDate = (date) => {
    const daysOfWeek = ["Lun", "Mar", "Mier", "Jue", "Vie", "Sab", "Dom"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek} ${dayOfMonth}`;
}

const generateTimesList = () => {
    const startTime = 9; // 9 AM
    const endTime = 20; // 8 PM

    for (let i = startTime; i <= endTime; i++) {
        const formattedTime = formatTime(i);
        timesList.value.push(formattedTime);
    }
}

const formatTime = (hour) => {
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour} ${amPm}`;
}

onMounted(() => {
    generateDaysList();
    generateTimesList();
});

</script>