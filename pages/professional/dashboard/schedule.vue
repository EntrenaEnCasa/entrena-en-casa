<template>
    <div class="p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h3 class="text-xl font-medium">Horario disponible</h3>
            <div class="flex justify-center items-center gap-3">
                <span>
                    Disponible
                </span>
                <div class="w-14 h-10 bg-primary rounded-md">
                </div>
            </div>
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
                        <td class="h-14 pr-6 text-right font-semibold whitespace-nowrap">
                            {{ formatTime(time) }}
                        </td>
                        <td v-for="n in 7" :key="n" class="h-14 border">
                            <div v-if="!timeTaken(n, time)"
                                class="w-full h-full flex items-center justify-center group cursor-pointer">
                                <div class="hidden group-hover:flex">
                                    <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                                </div>
                            </div>
                            <div v-else class="w-full h-full bg-primary">
                            </div>
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
const takenTimes = [
    {
        date: new Date(2023, 8, 6, 9),
    },
    {
        date: new Date(2023, 8, 8, 10),
    },
    {
        date: new Date(2023, 8, 8, 13),
    },
    {
        date: new Date(2023, 8, 12, 18),
    }
];

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
        timesList.value.push(i);
    }
}

const formatTime = (hour) => {
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour} ${amPm}`;
}

const timeTaken = (n, time) => {
    const date = new Date(daysList.value[n - 1]);
    date.setHours(time);

    return takenTimes.some((takenTime) => {
        return (takenTime.date.getHours() === date.getHours() && takenTime.date.getDate() === date.getDate());
    });
}

onMounted(() => {
    generateDaysList();
    generateTimesList();
});

</script>