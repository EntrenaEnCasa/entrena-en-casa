<template>
    <div>
        <div class="mt-4 mb-10">
            <div class="w-full inline-flex flex-col items-center justify-between gap-5 md:flex-row">
                <div class="flex items-center text-2xl">
                    <p class="mr-2 font-medium">Enero <span class="text-gray-500">2024</span></p>
                    <button disabled>
                        <Icon class="text-gray-300" name="fa6-solid:chevron-left"></Icon>
                    </button>
                    <button>
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
            <CommonLoading v-if="loading" class="my-8" />
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
                        <!-- <label class="flex flex-col">
                            <span class="font-medium text-sm mb-2">Cantidad máxima de asistentes</span>
                            <input type="text"
                                class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-primary"
                                value="1">
                        </label> -->
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
                                    <!-- Ensure 20:00 is always an option -->
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
import { ref, onMounted } from "vue";
import { useUserStore } from '~/stores/UserStore';

const daysList = ref([]);
const timesList = ref([]);
const modal = ref(null);
const loading = ref(false);

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const sessions = ref([])

const openModal = () => {
    modal.value.openModal();
};

const closeModal = () => {
    modal.value.closeModal();
};

const newDropdownOpen = ref(false);
const toggleNewDropdown = () => newDropdownOpen.value = !newDropdownOpen.value;

const selectedStartTime = ref('09:00'); // Set initial start time

// Generate times from 09:00 to 21:00
const baseTimeOptions = [];
for (let hour = 9; hour <= 21; hour++) {
    baseTimeOptions.push(`${hour.toString().padStart(2, '0')}:00`);
}

const selectedEndTime = ref(baseTimeOptions[1]); // Initialize with the second time slot

const timeOptions = computed(() => {
    // Generate times from 09:00 to 19:00 for the start time options
    return baseTimeOptions.slice(0, -1);
});

const endTimeOptions = computed(() => {
    // Calculate end time options based on the selected start time
    const startIndex = baseTimeOptions.indexOf(selectedStartTime.value) + 1;
    // Always include 20:00 as an option for end time
    return baseTimeOptions.slice(startIndex);
});

const generateDaysList = () => {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + i);
        daysList.value.push(newDate);
    }
};

const formatDate = (date) => {
    const daysOfWeek = ["Lun", "Mar", "Mier", "Jue", "Vie", "Sab", "Dom"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek} ${dayOfMonth}`;
};

const generateTimesList = () => {
    const startTime = 9; // 9 AM
    const endTime = 20; // 8 PM

    for (let i = startTime; i <= endTime; i++) {
        const formattedTime = `${i < 10 ? "0" : ""}${i}:00`;
        timesList.value.push(formattedTime);
    }
};

const formatTime = (time) => {
    const [hour] = time.split(":");
    return `${parseInt(hour)}:00`;
};

const timeTaken = (n, time) => {
    // Check if the given time is taken based on the API response
    const date = new Date(daysList.value[n - 1]);
    // Split the time into hours and minutes
    const [hour, minute] = time.split(":");

    // Set the hours and minutes for the date
    date.setHours(parseInt(hour), parseInt(minute), 0, 0);

    return sessions.value.some((session) => {
        const sessionDate = new Date(session.date);
        const sessionTime = session.time.split(":");
        sessionDate.setHours(sessionTime[0], sessionTime[1]);
        return sessionDate.getTime() === date.getTime();
    });
};

const getSessions = async () => {
    loading.value = true;
    await useFetch(`${runtimeConfig.public.apiBase}/professional/session/user/${userStore.user.user_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        onResponse({ request, response, options }) {

            loading.value = false;
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
    getSessions();
    generateDaysList();
    generateTimesList();
});
</script>