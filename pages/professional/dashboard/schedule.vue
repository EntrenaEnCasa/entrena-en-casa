<template>
    <div>
        <div class="mt-4 mb-10">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center w-full">

                <div class="flex items-center justify-self-center md:justify-self-start text-2xl">
                    <button @click="goToPreviousWeek" :disabled="!isCurrentWeekOrLater">
                        <Icon :class="{ 'text-gray-300': !isCurrentWeekOrLater, 'text-gray-800': isCurrentWeekOrLater }"
                            name="fa6-solid:chevron-left"></Icon>
                    </button>
                    <button @click="goToNextWeek">
                        <Icon class="text-gray-800" name="fa6-solid:chevron-right"></Icon>
                    </button>
                    <p class="ml-2 font-medium">{{ currentMonth }} <span class="text-gray-500">{{ currentYear }}</span>
                    </p>
                </div>

                <div class="justify-self-center bg-gray-200 rounded-lg px-16 py-1">
                    <p class="font-semibold">Semanal</p>
                </div>

                <div class="flex gap-2 items-center justify-self-center md:justify-self-end">
                    <button v-if="!editMode" @click="toggleEditState"
                        class="bg-primary rounded text-white font-semibold px-4 py-1">
                        Editar
                    </button>
                    <button v-else @click="toggleEditState" class="bg-secondary rounded text-white font-semibold px-4 py-1">
                        <div class="flex items-center gap-x-1">
                            <Icon name="fa6-solid:pen-to-square"></Icon>
                            <p>
                                Modo edición
                            </p>
                        </div>
                    </button>
                    <div v-if="!editMode" class="relative">
                        <button @click.stop="newDropdown.toggle()"
                            class=" bg-primary rounded text-white font-semibold px-4 py-1 flex items-center gap-1">
                            <span>
                                Nuevo
                            </span>
                            <Icon name="fa6-solid:chevron-down"></Icon>
                        </button>
                        <div class="min-w-max absolute top-6 border right-0 z-50 my-4 text-base list-none text-white shadow-md font-semibold rounded"
                            :class="{ hidden: !newDropdown.active }">
                            <ul class="divide-y divide-gray-200">
                                <li>
                                    <button @click="onClickNewEmptySessionFromButtonModal"
                                        class="w-full px-4 py-2 rounded-t text-sm bg-primary hover:bg-primary-600"
                                        role="menuitem">
                                        Disponibilidad
                                    </button>
                                </li>
                                <li>
                                    <button @click="openNewEventModal"
                                        class="px-4 py-2 text-sm rounded-b bg-primary hover:bg-primary-600" role="menuitem">
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
                        <th v-for=" day, index  in  daysList " :key="index" scope="col"
                            class="px-6 pt-6 pb-3 text-center whitespace-nowrap font-semibold w-28">
                            {{ formatDate(day) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" time, index  in  timesList " :key="index">
                        <td class="h-14 pr-6 text-right font-semibold whitespace-nowrap">
                            {{ formatTime(time) }}
                        </td>
                        <td v-for=" day  in  7 " :key="day" class="h-14 border">
                            <div v-if="!timeTaken(day, time)" @click="!editMode && onClickNewEmptySessionModal(day, time)"
                                class="w-full h-full" :class="[editMode ? '' : editClass]">
                                <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                                    <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                                </div>
                            </div>
                            <div v-else @click="editMode && openEditModal(day, time)" class="w-full h-full bg-primary"
                                :class="[editMode ? editClass : '']">
                                <div :class="{ hidden: !editMode }">
                                    <Icon name="fa6-solid:pen-to-square" class="text-xl text-white" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class=" mt-10 mb-4 flex justify-center items-center gap-3">
            <div class="w-14 h-12 bg-primary rounded-md">
            </div>
            <span class="text-lg font-semibold">
                Horario disponible
            </span>
        </div>
        <!-- Modals -->

        <!-- addNewEmptySession Modal -->
        <Teleport to="body">
            <CommonModal ref="newEmptySessionModal">
                <div class="px-6 py-4">
                    <div class="flex items-center justify-center gap-x-2 mb-6">
                        <button @click="goToPreviousDay" :disabled="isFirstDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isFirstDayOfWeek, 'text-gray-800': !isFirstDayOfWeek }"
                                name="fa6-solid:chevron-left"></Icon>
                        </button>
                        <h3 class="text-center font-semibold text-xl w-60">
                            <span class="capitalize">
                                {{ currentlySelectedDayName }}
                            </span>
                            {{ currentlySelectedDayNumber }} de
                            <span class="capitalize">
                                {{ currentlySelectedMonth }}
                            </span>
                        </h3>
                        <button @click="goToNextDay" :disabled="isLastDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isLastDayOfWeek, 'text-gray-800': !isLastDayOfWeek }"
                                name="fa6-solid:chevron-right"></Icon>
                        </button>
                    </div>
                    <form action="">
                        <div class="flex flex-col py-2 max-w-max mx-auto mb-5">
                            <div class="flex items-center gap-4">
                                <select v-model="selectedStartTime"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option v-for=" time  in  timeOptions " :key="`start-${time}`" :value="time">
                                        {{ time }}
                                    </option>
                                </select>
                                <span class="font-semibold">-</span>
                                <p>{{ selectedEndTime }}hrs</p>
                            </div>
                        </div>
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
                        </div>

                    </form>
                    <div>
                        <p class="text-sm text-gray-500 mb-4 text-center">* Para presencial se aplicarán los
                            rangos de cobertura
                            propuestos
                            en el perfil
                        </p>
                        <div class="flex justify-between">
                            <button @click="closeNewEmptySessionModal" class="px-4 py-2 rounded-md bg-tertiary text-white">
                                Cancelar
                            </button>
                            <button @click="closeNewEmptySessionModal" class="px-4 py-2 rounded-md bg-primary text-white">
                                Confirmar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- addNewEmptySessionFromButtonModal -->
        <Teleport to="body">
            <CommonModal ref="newEmptySessionFromButtonModal">
                <div class="px-6 py-4">
                    <div class="flex items-center justify-center gap-x-2 mb-6">
                        <button @click="goToPreviousDay" :disabled="isFirstDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isFirstDayOfWeek, 'text-gray-800': !isFirstDayOfWeek }"
                                name="fa6-solid:chevron-left"></Icon>
                        </button>
                        <h3 class="text-center font-semibold text-xl w-60">
                            <span class="capitalize">
                                {{ currentlySelectedDayName }}
                            </span>
                            {{ currentlySelectedDayNumber }} de
                            <span class="capitalize">
                                {{ currentlySelectedMonth }}
                            </span>
                        </h3>
                        <button @click="goToNextDay" :disabled="isLastDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isLastDayOfWeek, 'text-gray-800': !isLastDayOfWeek }"
                                name="fa6-solid:chevron-right"></Icon>
                        </button>
                    </div>
                    <form action="">
                        <div class="flex flex-col py-2 max-w-max mx-auto mb-5">
                            <div class="flex items-center gap-4">
                                <select v-model="selectedStartTime"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option v-for=" time  in  timeOptions " :key="`start-${time}`" :value="time">
                                        {{ time }}
                                    </option>
                                </select>
                                <span class="font-semibold">-</span>
                                <p>{{ selectedEndTime }}hrs</p>
                            </div>
                        </div>
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
                        </div>

                    </form>
                    <div>
                        <p class="text-sm text-gray-500 mb-4 text-center">* Para presencial se aplicarán los
                            rangos de cobertura
                            propuestos
                            en el perfil
                        </p>
                        <div class="flex justify-between">
                            <button @click="closeNewEmptySessionFromButtonModal"
                                class="px-4 py-2 rounded-md bg-tertiary text-white">
                                Cancelar
                            </button>
                            <button @click="closeNewEmptySessionFromButtonModal"
                                class="px-4 py-2 rounded-md bg-primary text-white">
                                Confirmar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- addNewEventModal -->

        <Teleport to="body">
            <CommonModal ref="newEventModal">
                <div class="px-6 py-4">
                    <div class="flex items-center justify-center gap-x-2 mb-6">
                        <button @click="goToPreviousDay" :disabled="isFirstDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isFirstDayOfWeek, 'text-gray-800': !isFirstDayOfWeek }"
                                name="fa6-solid:chevron-left"></Icon>
                        </button>
                        <h3 class="text-center font-semibold text-xl w-60">
                            <span class="capitalize">
                                {{ currentlySelectedDayName }}
                            </span>
                            {{ currentlySelectedDayNumber }} de
                            <span class="capitalize">
                                {{ currentlySelectedMonth }}
                            </span>
                        </h3>
                        <button @click="goToNextDay" :disabled="isLastDayOfWeek">
                            <Icon class="text-xl"
                                :class="{ 'text-gray-300': isLastDayOfWeek, 'text-gray-800': !isLastDayOfWeek }"
                                name="fa6-solid:chevron-right"></Icon>
                        </button>
                    </div>
                    <form action="">
                        <label class="w-full">
                            <select
                                class="mb-6 border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary"
                                v-model="selectedEventType">
                                <option value="Nuevo entrenamiento">Nuevo entrenamiento</option>
                                <option value="Evento personal">Evento personal</option>
                            </select>
                        </label>
                        <div v-if="selectedEventType == 'Evento personal'" class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Cliente (opcional)</span>
                                <input type="text" placeholder="Ingresar correo o nombre del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Información adicional (opcional)</span>
                                <textarea placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-primary"
                                    rows="4"></textarea>
                            </label>

                        </div>
                        <div v-else class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Cliente</span>
                                <input type="text" placeholder="Ingresar correo o nombre del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                            </label>
                            <label class="w-full flex flex-col col-span-2 md:col-span-1">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Individual">Individual</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="w-full flex flex-col col-span-2 md:col-span-1">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input type="text" placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                            </label>
                        </div>

                        <div class="flex items-center my-10">
                            <input id="checkbox" type="checkbox" class="w-4 h-4 accent-primary-600 rounded">
                            <label for="checkbox" class="ms-2 text-sm text-gray-500">Enviar
                                notificación del evento</label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <button @click="closeAddEventModal" class="px-4 py-2 rounded-md bg-tertiary text-white">
                                Cancelar
                            </button>
                            <button @click="closeAddEventModal" class="px-4 py-2 rounded-md bg-primary text-white">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- editEmptySessionModal -->

        <Teleport to="body">
            <CommonModal ref="editEmptySessionModal">
                <div class="px-6 py-4">
                    <h3 class="mb-10 text-center font-semibold text-xl"> <span class="capitalize">{{
                        currentlySelectedDayName }} </span> {{ currentlySelectedDayNumber
    }} de <span class="capitalize">{{ currentlySelectedMonth }}</span></h3>
                    <form action="">
                        <div class="flex flex-col py-2 max-w-max mx-auto mb-5">
                            <div class="flex items-center gap-4">
                                <p> {{ selectedStartTime }}</p>
                                <span class="font-semibold">-</span>
                                <p>{{ selectedEndTime }}hrs</p>
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6">
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Individual">Individual</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <button @click="closeEditModal" class="px-4 py-2 rounded-md bg-tertiary text-white">
                                Cancelar
                            </button>
                            <button @click="closeEditModal" class="px-4 py-2 rounded-md bg-primary text-white">
                                Confirmar cambios
                            </button>
                        </div>
                    </div>
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

/* Edit state */
const editMode = ref(false); // Edit mode state

const editClass = reactive({
    'flex': true,
    'items-center': true,
    'justify-center': true,
    'group': true,
    'cursor-pointer': true,
});

const toggleEditState = () => {
    editMode.value = !editMode.value;
}

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

// Returns the current year
const currentYear = computed(() => currentDate.value.getFullYear());

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
    let day = date.getDay();
    day = day === 0 ? 6 : day - 1;
    const dayOfWeek = daysOfWeek[day];
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

// Computed property for time options
const timeOptions = computed(() => timesList.value.map(formatTime));

// Computed property for end time options

//instead of multiple options, there will be only one option, the one right after the start time
const selectedEndTime = computed(() => {
    const startIndex = timesList.value.findIndex(time => formatTime(time) === selectedStartTime.value);
    if (startIndex === timesList.value.length - 1) {
        return '21:00';
    } else {
        return formatTime(timesList.value[startIndex + 1]);
    }
});

/* Modals */

const currentlySelectedDate = ref(null);

const currentlySelectedDayName = computed(() => {
    return currentlySelectedDate.value.toLocaleString('default', { weekday: 'long' });
});

const currentlySelectedDayNumber = computed(() => {
    return currentlySelectedDate.value.getDate();
});

const currentlySelectedMonth = computed(() => {
    return currentlySelectedDate.value.toLocaleString('default', { month: 'long' });
});

// isCurrentDay should check on the currentDate variable because that's where we keep track of the moving weeks.

const isFirstDayOfWeek = computed(() => {
    // currentDate tracks the first day of the current week
    const firstDayOfWeek = currentDate.value;
    const todayYear = firstDayOfWeek.getFullYear();
    const todayMonth = firstDayOfWeek.getMonth();
    const todayDate = firstDayOfWeek.getDate();

    const currentYear = currentlySelectedDate.value.getFullYear();
    const currentMonth = currentlySelectedDate.value.getMonth();
    const currentDay = currentlySelectedDate.value.getDate();

    if (currentYear === todayYear && currentMonth === todayMonth && currentDay === todayDate) {
        return true;
    }

    return false;
});

const isLastDayOfWeek = computed(() => {
    // currentDate tracks the first day of the current week
    const firstDayOfWeek = currentDate.value;
    const todayYear = firstDayOfWeek.getFullYear();
    const todayMonth = firstDayOfWeek.getMonth();
    const todayDate = firstDayOfWeek.getDate();

    const currentYear = currentlySelectedDate.value.getFullYear();
    const currentMonth = currentlySelectedDate.value.getMonth();
    const currentDay = currentlySelectedDate.value.getDate();

    if (currentYear === todayYear && currentMonth === todayMonth && currentDay === todayDate + 6) {
        return true;
    }

    return false;
});

const goToNextDay = () => {
    // Create a new Date object with the updated date
    const newDate = new Date(currentlySelectedDate.value);
    newDate.setDate(newDate.getDate() + 1);

    // Update currentDate with the new Date object
    currentlySelectedDate.value = newDate;
};

const goToPreviousDay = () => {
    // Create a new Date object based on the current value of currentDate
    const newDate = new Date(currentlySelectedDate.value);
    newDate.setDate(newDate.getDate() - 1);

    // Update currentDate with the new Date object
    currentlySelectedDate.value = newDate;
};

// Add new session modal
const newEmptySessionModal = ref(null);

const onClickNewEmptySessionModal = (day, time) => {

    currentlySelectedDate.value = new Date(currentDate.value);
    currentlySelectedDate.value.setDate(currentDate.value.getDate() + day - 1);

    selectedStartTime.value = formatTime(time);
    newEmptySessionModal.value.openModal();
};

const closeNewEmptySessionModal = () => {
    newEmptySessionModal.value.closeModal();
};

// Add new empty session from button modal

const newEmptySessionFromButtonModal = ref(null);

const onClickNewEmptySessionFromButtonModal = () => {

    currentlySelectedDate.value = new Date(currentDate.value);

    selectedStartTime.value = formatTime(timesList.value[0]);
    newEmptySessionModal.value.openModal();
};

const closeNewEmptySessionFromButtonModal = () => {
    newEmptySessionModal.value.closeModal();
};

// Add new event modal
const newEventModal = ref(null);
const selectedEventType = ref("Nuevo entrenamiento");
// const onClickAddEventModal = (day) => {
//     currentlySelectedDay.value = daysList.value[day - 1].getDate();
//     currentlySelectedMonth.value = daysList.value[day - 1].toLocaleString('default', { month: 'long' });
//     addNewEventModal.value.openModal();
// };
const openNewEventModal = () => {
    newEventModal.value.openModal();
}

const closeAddEventModal = () => {
    newEventModal.value.closeModal();
};

// editEmptySessionModal

const editEmptySessionModal = ref(null);

const openEditModal = (day, time) => {

    currentlySelectedDate.value = new Date(currentDate.value);
    currentlySelectedDate.value.setDate(currentDate.value.getDate() + day - 1);

    selectedStartTime.value = formatTime(time);
    editEmptySessionModal.value.openModal();
}

const closeEditModal = () => {
    editEmptySessionModal.value.closeModal();
};

// Dropdown state
const newDropdown = reactive({
    active: false,
    toggle: () => newDropdown.active = !newDropdown.active,
    close: () => newDropdown.active = false,
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
    document.addEventListener('click', newDropdown.close);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', newDropdown.close);
});

</script>