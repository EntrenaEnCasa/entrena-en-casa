<template>
    <div>
        <div class="mt-4 mb-10">
            <div class="w-full inline-flex flex-col items-center justify-between gap-5 md:flex-row">
                <div class="flex items-center text-2xl">
                    <p class="mr-2 font-medium">{{ currentMonth }} <span class="text-gray-500">{{ currentYear }}</span></p>
                    <button @click="goToPreviousWeek" :disabled="!isCurrentWeekOrLater">
                        <Icon :class="{ 'text-gray-300': !isCurrentWeekOrLater, 'text-gray-800': isCurrentWeekOrLater }"
                            name="fa6-solid:chevron-left"></Icon>
                    </button>
                    <button @click="goToNextWeek">
                        <Icon class="text-gray-800" name="fa6-solid:chevron-right"></Icon>
                    </button>
                </div>
                <div>
                    <div class="bg-gray-200 rounded-lg px-16 py-1">
                        <p class="font-semibold">Semanal</p>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <button class="bg-primary rounded text-white font-semibold px-4 py-1">Editar</button>
                    <div class="relative">
                        <button @click="toggleNewDropdown"
                            class=" bg-primary rounded text-white font-semibold px-4 py-1 flex items-center gap-1">
                            <span>
                                Nuevo
                            </span>
                            <Icon name="fa6-solid:chevron-down"></Icon>
                        </button>
                        <div class=" min-w-max absolute top-6 border right-0 z-50 my-4 text-base list-none bg-primary text-white rounded shadow-md font-semibold"
                            :class="{ hidden: !newDropdownOpen }">
                            <ul class="divide-y divide-gray-200">
                                <li>
                                    <button @click="userMenuOpen = false"
                                        class="w-full px-4 py-2 text-sm hover:bg-primary-600" role="menuitem">
                                        Disponibilidad
                                    </button>
                                </li>
                                <li>
                                    <button @click="userMenuOpen = false" class="px-4 py-2 text-sm hover:bg-primary-600"
                                        role="menuitem">
                                        Evento Manual
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="overflow-x-auto bg-white rounded-2xl border pr-10">
            <CommonLoading v-if="sessionsLoading" class="my-8" />
            <table v-else class="w-full table-fixed text-sm text-gray-500">
                <thead>
                    <tr>
                        <th scope="col" class="w-20"></th>
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
                            <div v-if="!timeTaken(n, time)" @click="openModal()"
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
        <div class="mt-10 mb-4 flex justify-center items-center gap-3">
            <div class="w-14 h-12 bg-primary rounded-md">
            </div>
            <span class="text-lg font-semibold">
                Horario disponible
            </span>
        </div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <form action="" class="w-full">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <label class="flex flex-col">
                            <span class="font-medium text-sm mb-2">Formato</span>
                            <select
                                class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                <option value="Individual">Individual</option>
                                <option value="Grupal">Grupal</option>
                            </select>
                        </label>
                        <label class="flex flex-col">
                            <span class="font-medium text-sm mb-2">Modalidad</span>
                            <select
                                class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                <option value="Online">Online</option>
                                <option value="Presencial">Presencial</option>
                            </select>
                        </label>

                        <div class="flex flex-col py-2">
                            <span class="font-medium text-sm mb-2">Rango de tiempo</span>
                            <div class="flex items-center gap-4">
                                <select v-model="selectedStartTime"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option v-for="time in timeOptions" :key="`start-${time}`" :value="time">{{ time }}
                                    </option>
                                </select>
                                <span>-</span>
                                <select v-model="selectedEndTime"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option v-for="time in endTimeOptions" :key="`end-${time}`" :value="time">{{ time }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </div>
                </form>
                <div>
                    <button @click="closeModal" class="px-4 py-2 rounded-md bg-primary text-white">Confirmar</button>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/stores/UserStore';

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const sessions = ref([]); // Array of sessions
const sessionsLoading = ref(false); // Loading state of the sessions

// Modal state
const modal = ref(null);

const openModal = () => {
    modal.value.openModal();
};

const closeModal = () => {
    modal.value.closeModal();
};

// Dropdown state
const newDropdownOpen = ref(false);
const toggleNewDropdown = () => newDropdownOpen.value = !newDropdownOpen.value;

/* Schedule logic */

// The starting point will be the current date
const currentDate = ref(new Date());

// returns the current month
const currentMonth = computed(() => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[currentDate.value.getMonth()];
});

// Returns current week days, starting from today to the same day of the next week
const daysList = computed(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate.value);
        date.setDate(date.getDate() + i);
        days.push(date);
    }
    return days;
});

// Business time a day is 09:00hrs to 20:00hrs
const timesList = computed(() => {
    const times = [];
    for (let i = 9; i <= 20; i++) {
        times.push(i);
    }
    return times;
});

const formatDate = (date) => {
    const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek} ${dayOfMonth}`;
};

const formatTime = (time) => {
    return `${time}:00`;
};

// Since railway stores dates in UTC, we need to convert the UTC time to local time
const timeTaken = (day, time) => {
    // Create a local date from daysList
    const localDate = new Date(daysList.value[day - 1]);
    localDate.setHours(time, 0, 0, 0);

    return sessions.value.some((session) => {
        // Extract year, month, and day from session.date
        const [year, month, day] = session.date.split('-').map(num => parseInt(num));

        // Create a date object in local time zone
        const sessionDate = new Date(year, month - 1, day); // Month is 0-indexed

        // Set the session time
        const sessionTime = parseInt(session.time);
        sessionDate.setHours(sessionTime, 0, 0, 0);

        // Compare dates
        return sessionDate.getTime() === localDate.getTime();
    });
};

// Returns the current year
const currentYear = computed(() => currentDate.value.getFullYear());

const goToNextWeek = () => {
    // Create a new Date object with the updated date
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + 7);

    // Update currentDate with the new Date object
    currentDate.value = newDate;
};

const goToPreviousWeek = () => {
    // Create a new Date object based on the current value of currentDate
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() - 7);

    // Update currentDate with the new Date object
    currentDate.value = newDate;
};

// Check if the current week is the current week or later
const isCurrentWeekOrLater = computed(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const currentYear = currentDate.value.getFullYear();
    const currentMonth = currentDate.value.getMonth();
    const currentDay = currentDate.value.getDate();

    if (currentYear > todayYear) {
        return true;
    }

    if (todayYear === currentYear) {
        if (currentMonth > todayMonth) {
            return true;
        }
        if (todayMonth === currentMonth) {

            if (currentDay > todayDate) {
                return true;
            }
        }
    }

    return false;
});

/* Time range logic */

// Initialize selectedStartTime with the first time from timesList
const selectedStartTime = ref(formatTime(timesList.value[0]));

// Reactive variable for selected end time
const selectedEndTime = ref(formatTime(timesList.value[1]));

// Computed property for time options
const timeOptions = computed(() => timesList.value.slice(0, -1).map(formatTime));

// Computed property for end time options
const endTimeOptions = computed(() => {
    const startIndex = timesList.value.findIndex(time => formatTime(time) === selectedStartTime.value);
    return timesList.value.slice(startIndex + 1).map(formatTime);
});

// When StartTime changes, endTime will select the first available option
watch(selectedStartTime, () => {
    const startIndex = timesList.value.findIndex(time => formatTime(time) === selectedStartTime.value);
    const selectedEndTimeIndex = timesList.value.findIndex(time => formatTime(time) === selectedEndTime.value);
    if (startIndex >= selectedEndTimeIndex) {
        selectedEndTime.value = formatTime(timesList.value[startIndex + 1]);
    }
});

// API call to get sessions
const getSessions = async () => {
    sessionsLoading.value = true;
    await useFetch(`${runtimeConfig.public.apiBase}/professional/session/user/${userStore.user.user_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        onResponse({ request, response, options }) {

            sessionsLoading.value = false;
            const responseData = response._data;

            if (responseData.success) {
                sessions.value = responseData.sessions;
            }
            else {
                console.log(responseData.message);
            }

        },
    });
}

onMounted(() => {
    // Get the sessions when the component is mounted
    getSessions();
});

</script>