<template>
    <div>
        <div class="mt-4 mb-10">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center w-full">

                <ProfessionalDashboardCalendarWeekNavigation :currentMonth="currentMonth" :isFetchingData="fetchingEvents"
                    :currentYear="currentYear" :isCurrentWeekOrLater="isCurrentWeekOrLater"
                    @go-to-previous-week="goToPreviousWeek" @go-to-next-week="goToNextWeek" />

                <div class="justify-self-center bg-gray-200 rounded-lg px-16 py-1">
                    <p class="font-semibold">Semanal</p>
                </div>

                <div class="flex gap-2 items-center justify-self-center md:justify-self-end">
                    <button v-show="!editMode" :disabled="events.length == 0" @click="toggleEditState"
                        class="bg-primary rounded text-white font-semibold px-4 py-1 disabled:bg-primary-100 disabled:cursor-not-allowed">
                        Editar
                    </button>
                    <button v-show="editMode" @click="toggleEditState"
                        class="bg-secondary rounded text-white font-semibold px-4 py-1">
                        <div class="flex items-center gap-x-1">
                            <Icon name="fa6-solid:pen-to-square"></Icon>
                            <p>
                                Modo edición
                            </p>
                        </div>
                    </button>
                    <div v-show="!editMode" class="relative">
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
                                    <button @click="onClickNewEventModal"
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
            <CommonLoading v-show="fetchingEvents" class="my-8" />
            <table v-show="!fetchingEvents" class="w-full table-fixed text-sm text-gray-500">
                <thead>
                    <tr>
                        <th scope="col" class="w-20"></th>
                        <th v-for="(day, index) in eventMatrix" :key="index" scope="col"
                            class="px-6 pt-6 pb-3 text-center whitespace-nowrap font-semibold w-28 capitalize">
                            {{ day[0].formattedDay }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(timeSlot, index) in eventMatrix[0]" :key="timeSlot.time">
                        <td class="h-14 pr-6 text-right font-semibold whitespace-nowrap">
                            {{ timeSlot.formattedTime }}
                        </td>
                        <td v-for="(day, dayIndex) in eventMatrix" :key="dayIndex" class="h-14 border">
                            <div v-if="!day[index].event"
                                @click="!editMode && onClickEmptySlot(day[index].day, day[index].time)"
                                class="w-full h-full" :class="[editMode ? '' : editClass]">
                                <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                                    <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                                </div>
                            </div>
                            <div v-else @click="editMode && openEditModal(day[index].day, day[index].time)"
                                class="w-full h-full" :class="[
                                    editMode ? editClass : '',
                                    day[index].event.type === 'personal'
                                        ? 'bg-quaternary'
                                        : day[index].event.type === 'manual_session'
                                            ? 'bg-secondary'
                                            : day[index].event.type === 'session' && day[index].event.clients.length > 0
                                                ? 'bg-secondary'
                                                : 'bg-primary']">
                                <div v-if="day[index].event.type === 'personal'"
                                    class="w-full h-full flex flex-col justify-center items-center text-white">
                                    <h4 class="font-medium">Evento personal</h4>
                                    <p class="text-xs">{{ day[index].event.start_time }} - {{ day[index].event.end_time }}
                                    </p>
                                </div>
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
            <CommonModal ref="emptySlotModal">
                <div class="flex flex-col gap-5 p-10">
                    <button @click="addNewSession" class="px-10 py-4 bg-primary text-white rounded">
                        <p class="font-semibold">
                            Agregar bloque disponible para sesión
                        </p>
                    </button>
                    <button @click="addNewEvent" class="px-10 py-4 bg-secondary text-white rounded">
                        <p class="font-semibold">
                            Agregar nuevo evento manualmente
                        </p>
                        <p class="text-sm italic">Evento personal - Entrenamiento</p>
                    </button>
                </div>
            </CommonModal>
        </Teleport>

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
                                    <option v-for="  time   in   timeOptions  " :key="`start-${time}`" :value="time">
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
                                    <option v-for="  time   in   timeOptions  " :key="`start-${time}`" :value="time">
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
                        <div v-show="selectedEventType == 'Evento personal'" class="grid gap-6 mb-6 md:grid-cols-2">
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
                        <div v-show="selectedEventType == 'Nuevo entrenamiento'" class="grid gap-6 mb-6 md:grid-cols-2">
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

const events = ref([]); // Array of events
const fetchingEvents = ref(false); // Loading state of the events

const eventMatrix = ref([]); // Matrix of events
const startHour = 9; // Starting hour of the day
const endHour = 20; // Ending hour of the day

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

/* Calendar logic */

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

const timesList = computed(() => {
    const times = [];
    for (let i = startHour; i <= endHour; i++) {
        times.push(i);
    }
    return times;
});

const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat('es-CL', {
        weekday: 'short', // "short" for abbreviated days, "long" for full names.
        day: 'numeric'
    });
    return formatter.format(date).replace('.', ''); // Remove the period after the abbreviated day name if present.
};

const formatTime = (hour) => {
    // Assuming 'hour' is an integer from 0 to 23
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    const formatter = new Intl.DateTimeFormat('es-CL', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // Set to true if you want 12-hour format with AM/PM
    });
    return formatter.format(date);
};

const goToNextWeek = () => {
    // Create a new Date object with the updated date
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + 7);

    // Update currentDate with the new Date object
    currentDate.value = newDate;
    getEvents();
};

const goToPreviousWeek = () => {
    // Create a new Date object based on the current value of currentDate
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() - 7);

    // Update currentDate with the new Date object
    currentDate.value = newDate;
    getEvents();
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

// Logic to handle moving around days when a modal is open

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
    const firstDayOfWeek = new Date(currentDate.value);
    // calculate the last day of the week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const currentYear = currentlySelectedDate.value.getFullYear();
    const currentMonth = currentlySelectedDate.value.getMonth();
    const currentDay = currentlySelectedDate.value.getDate();

    if (currentYear === lastDayOfWeek.getFullYear() && currentMonth === lastDayOfWeek.getMonth() && currentDay === lastDayOfWeek.getDate()) {
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

// Empty slot modal
const emptySlotModal = ref(null);

const onClickEmptySlot = (day, time) => {

    currentlySelectedDate.value = new Date(currentDate.value);
    currentlySelectedDate.value.setDate(currentDate.value.getDate() + day - 1);

    selectedStartTime.value = formatTime(time);
    emptySlotModal.value.openModal();
};

const addNewSession = () => {
    emptySlotModal.value.closeModal();
    newEmptySessionModal.value.openModal();
};

const addNewEvent = () => {
    emptySlotModal.value.closeModal();
    newEventModal.value.openModal();
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
const onClickNewEventModal = () => {
    currentlySelectedDate.value = new Date(currentDate.value);

    selectedStartTime.value = formatTime(timesList.value[0]);
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

/* Matrix logic */

const initializeEventMatrix = () => {
    // Reset the matrix
    eventMatrix.value = [];

    // Populate the matrix with placeholders for each time slot
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        eventMatrix.value[dayIndex] = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            let hourIndex = hour - startHour;
            eventMatrix.value[dayIndex][hourIndex] = {
                day: dayIndex + 1,
                time: hour,
                formattedDay: formatDate(daysList.value[dayIndex]), // Use your formatDate function
                formattedTime: formatTime(hour), // Use your formatTime function
                event: null
            };
        }
    }
};

const getEvents = async () => {

    fetchingEvents.value = true;

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/calendar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        body: {
            "user_id": userStore.getUser().user_id,
            "date": currentDate.value.toISOString().split('T')[0], // fecha en formato YYYY-MM-DD
        }
    });

    if (error.value) {
        console.log("Fetch error:", error.value);
        fetchingEvents.value = false;
        return;
    }

    initializeEventMatrix(); // Reset the matrix before populating

    if (data.value.success) {
        fetchingEvents.value = false;
        populateEventMatrix(data.value.events); // Fill the matrix with the fetched events
        console.log(data.value.events);
        events.value = data.value.events;
    }
    else {
        fetchingEvents.value = false;
        events.value = [];
        console.log(data.value.message);
    }
};

const populateEventMatrix = (events) => {
    events.forEach(event => {
        const utcDate = new Date(`${event.date.split('T')[0]}T${event.start_time}:00Z`);

        // Use getUTC... methods to get the date and time in UTC
        const eventDayIndex = daysList.value.findIndex(day =>
            day.getUTCFullYear() === utcDate.getUTCFullYear() &&
            day.getUTCMonth() === utcDate.getUTCMonth() &&
            day.getUTCDate() === utcDate.getUTCDate()
        );

        const eventHour = utcDate.getUTCHours();
        const eventHourIndex = eventHour - startHour;

        if (eventDayIndex >= 0 && eventHourIndex >= 0 && eventHourIndex < 12) {
            // events can only happen 1 at a time, so there is no need to make an array but a single event
            eventMatrix.value[eventDayIndex][eventHourIndex].event = event;
        }
    });
};

onMounted(() => {
    // Get the events when the component is mounted
    initializeEventMatrix();
    getEvents();
    document.addEventListener('click', newDropdown.close);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', newDropdown.close);
});

</script>