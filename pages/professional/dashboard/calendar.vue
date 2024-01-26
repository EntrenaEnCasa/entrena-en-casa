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
                                    <button @click="newEmptySessionModal.handleClickFromButton"
                                        class="w-full px-4 py-2 rounded-t text-sm bg-primary hover:bg-primary-600"
                                        role="menuitem">
                                        Disponibilidad
                                    </button>
                                </li>
                                <li>
                                    <button @click="newEventModal.handleClick"
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
        <div class="overflow-x-auto bg-white rounded-2xl border py-7 px-9">
            <CommonLoading v-show="fetchingEvents" class="my-8" />
            <div v-show="!fetchingEvents">
                <!-- Apply a custom grid template columns style with specific min-width for the time column -->
                <div class="grid" style="grid-template-columns: minmax(60px, max-content) repeat(7, minmax(130px, 1fr));">
                    <!-- Time column with specific min-width -->
                    <div class="text-sm font-semibold text-center border-gray-200">
                    </div>
                    <!-- Day columns with minimum width -->
                    <div v-for="(day, index) in eventMatrix" :key="index"
                        class="capitalize text-sm font-semibold text-center border-b border-gray-200 pb-4 min-w-[130px] text-gray-500">
                        {{ day[0].formattedDay }}
                    </div>
                    <template v-for="(timeSlot, index) in  eventMatrix[0] " :key="timeSlot.time">
                        <!-- Time slot label -->
                        <div class="text-sm font-semibold text-center border-r border-gray-200 py-2 pr-4 text-gray-500">
                            {{ timeSlot.formattedTime }}
                        </div>
                        <!-- Event slot cells -->
                        <div v-for="(day, dayIndex) in  eventMatrix " :key="`day-${dayIndex}-slot-${index}`"
                            class="h-14 border-r border-gray-200 min-w-[130px]"
                            :class="{ 'border-b': !(day[index].event && day[index].event.type === 'personal') || isLastEventUnique(day, index) }">
                            <button v-if="!day[index].event" class="w-full h-full" :class="[editMode ? '' : editClass]"
                                :disabled="editMode" @click="emptySlotModal.handleClick(day[index].day, day[index].time)">
                                <div class="hidden" :class="{ 'group-hover:flex': !editMode }">
                                    <Icon name="fa6-solid:square-plus" class="text-3xl text-gray-300" />
                                </div>
                            </button>
                            <button v-else
                                @click="editEventHandler.handleClick(day[index].day, day[index].time, day[index].event)"
                                :disabled="!editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index))"
                                class="w-full h-full" :class="eventClasses(day, index)">
                                <div v-if="day[index].event.type === 'personal' &&
                                    isFirstEventUnique(day, index) && !editMode"
                                    class="w-full h-full flex flex-col justify-center items-center text-white">
                                    <h4 class="font-medium">Evento personal</h4>
                                    <p class="text-xs">{{ day[index].event.start_time }} - {{ day[index].event.end_time }}
                                    </p>
                                </div>
                                <div
                                    :class="{ hidden: !editMode || ((day[index].event && day[index].event.type === 'personal') && !isFirstEventUnique(day, index)) }">
                                    <Icon name="fa6-solid:pen-to-square" class="text-xl text-white" />
                                </div>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="mt-10 mb-4 flex justify-center">
            <div class="flex flex-col items-start lg:flex-row lg:justify-center gap-10 font-semibold">
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-primary rounded-md">
                    </div>
                    <span>
                        Bloque disponible para sesión
                    </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-secondary rounded-md">
                    </div>
                    <span>
                        Sesión con al menos 1 cliente
                    </span>
                </div>
                <div class="flex justify-center items-center gap-3">
                    <div class="w-14 h-12 bg-quaternary rounded-md">
                    </div>
                    <span>
                        Evento personal
                    </span>
                </div>
            </div>

        </div>

        <!-- Modals -->

        <!-- emptySlotModal -->
        <Teleport to="body">
            <CommonModal ref="emptySlotModalRef">
                <div class="flex flex-col gap-5 p-10">
                    <button @click="emptySlotModal.addNewSession" class="px-10 py-4 bg-primary text-white rounded">
                        <p class="font-semibold">
                            Agregar bloque disponible para sesión
                        </p>
                    </button>
                    <button @click="emptySlotModal.addNewEvent" class="px-10 py-4 bg-secondary text-white rounded">
                        <p class="font-semibold">
                            Agregar nuevo evento manualmente
                        </p>
                        <p class="text-sm italic">Evento personal - Entrenamiento</p>
                    </button>
                </div>
            </CommonModal>
        </Teleport>

        <!-- addNewEmptySessionModal -->
        <Teleport to="body">
            <CommonModal ref="newEmptySessionModalRef">
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
                                    <option v-for="   time    in    startTimeOptions   " :key="`start-${time}`"
                                        :value="time">
                                        {{ time }}
                                    </option>
                                </select>
                                <span class="font-semibold">-</span>
                                <p>{{ automaticallySelectedEndTime }}hrs</p>
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select v-model="newEmptySessionModal.data.selectedFormat"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Individual">Individual</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="flex flex-col">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select v-model="newEmptySessionModal.data.selectedModality"
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
                            <CommonButton @click="newEmptySessionModal.closeModal" text="Cancelar"
                                class="px-4 py-2 bg-tertiary" />
                            <CommonButton text="Crear nueva sesión" @click="addNewEmptySession" class="px-4 py-2"
                                :loading="newEmptySessionModal.loading" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- addNewEventModal -->

        <Teleport to="body">
            <CommonModal ref="newEventModalRef">
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
                            <select class="mb-6 border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5"
                                v-model="newEventModal.data.selectedEventType">
                                <option value="Nuevo entrenamiento">Nuevo entrenamiento</option>
                                <option value="Evento personal">Evento personal</option>
                            </select>
                        </label>
                        <div v-show="newEventModal.data.selectedEventType == 'Evento personal'"
                            class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <div class="flex max-w-max items-center gap-4">
                                    <select v-model="selectedStartTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for="   time    in    startTimeOptions   " :key="`start-${time}`"
                                            :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                    <span class="font-semibold">-</span>
                                    <select v-model="manuallySelectedEndTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for="time in endTimeOptions" :key="`end-${time}`" :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                </div>
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Clientes (opcional)</span>
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:modelValue="newEventModal.data.personalEvent.clients"
                                        :selectedFormat="newEventModal.data.personalEvent.selectedFormat" />
                                </label>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Información adicional (opcional)</span>
                                <textarea v-model="newEventModal.data.personalEvent.additionalInfo"
                                    placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                                    rows="4"></textarea>
                            </label>

                        </div>
                        <div v-show="newEventModal.data.selectedEventType == 'Nuevo entrenamiento'"
                            class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <div class="flex max-w-max items-center gap-4">
                                    <select v-model="selectedStartTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for="   time    in    startTimeOptions   " :key="`start-${time}`"
                                            :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                    <span class="font-semibold">-</span>
                                    <p>{{ automaticallySelectedEndTime }}hrs</p>
                                </div>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Clientes</span>
                                <ProfessionalDashboardCalendarClientSearchInput
                                    v-model:modelValue="newEventModal.data.manualSession.clients"
                                    :selectedFormat="newEventModal.data.manualSession.selectedFormat" />
                            </label>

                            <div class="grid gap-6 md:grid-cols-2 col-span-2">
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Formato</span>
                                    <select v-model="newEventModal.data.manualSession.selectedFormat"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Individual">Individual</option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Modalidad</span>
                                    <select v-model="newEventModal.data.manualSession.selectedModality"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Online">Online</option>
                                        <option value="Presencial">Presencial</option>
                                    </select>
                                </label>
                            </div>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input v-model="newEventModal.data.manualSession.link" type="text" placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
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
                            <CommonButton @click="newEventModal.closeModal" text="Cancelar"
                                class="px-4 py-2 bg-tertiary text-white" />
                            <CommonButton text="Crear nuevo evento" @click="newEventModal.addNewEvent" class="px-4 py-2"
                                :loading="newEventModal.data.loading" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- editEmptySessionModal -->

        <Teleport to="body">
            <CommonModal ref="editEmptySessionModalRef">
                <div class="px-6 py-4">
                    <h3 class="mb-10 text-center font-semibold text-xl"> <span class="capitalize">{{
                        currentlySelectedDayName }} </span> {{ currentlySelectedDayNumber
    }} de <span class="capitalize">{{ currentlySelectedMonth }}</span></h3>
                    <form action="">
                        <div class="flex flex-col py-2 max-w-max mx-auto mb-5">
                            <div class="flex items-center gap-4">
                                <p> {{ selectedStartTime }}</p>
                                <span class="font-semibold">-</span>
                                <p>{{ automaticallySelectedEndTime }}hrs</p>
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6">
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Formato</span>
                                <select v-model="editEmptySessionModal.data.selectedFormat"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Individual">Individual</option>
                                    <option value="Grupal">Grupal</option>
                                </select>
                            </label>
                            <label class="w-full flex flex-col">
                                <span class="font-medium text-sm mb-2">Modalidad</span>
                                <select v-model="editEmptySessionModal.data.selectedModality"
                                    class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <CommonButton text="Eliminar sesión" @click="editEmptySessionModal.removeSession"
                                :loading="editEmptySessionModal.data.removeSessionLoading" class="px-4 py-2 bg-tertiary" />

                            <CommonButton text="Confirmar cambios" @click="editEmptySessionModal.updateSession"
                                :loading="editEmptySessionModal.data.updateSessionLoading" class="px-4 py-2" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <!-- Edit manual session modal -->

        <Teleport to="body">
            <CommonModal ref="editManualSessionModalRef">
                <div class="px-6 py-4">
                    <h3 class="mb-10 text-center font-semibold text-xl"> <span class="capitalize">{{
                        currentlySelectedDayName }} </span> {{ currentlySelectedDayNumber
    }} de <span class="capitalize">{{ currentlySelectedMonth }}</span></h3>
                    <form action="">
                        <div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <div class="flex max-w-max items-center gap-4">
                                    <select v-model="selectedStartTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for="    time     in     startTimeOptions    " :key="`start-${time}`"
                                            :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                    <span class="font-semibold">-</span>
                                    <p>{{ automaticallySelectedEndTime }}hrs</p>
                                </div>
                            </label>
                            <div class="col-span-2">
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Clientes</span>
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:modelValue="editManualSessionModal.data.clients"
                                        :selectedFormat="editManualSessionModal.data.selectedFormat" />
                                </label>
                            </div>

                            <div class="grid gap-6 md:grid-cols-2 col-span-2">
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Formato</span>
                                    <select v-model="editManualSessionModal.data.selectedFormat"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Individual">Individual</option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Modalidad</span>
                                    <select v-model="editManualSessionModal.data.selectedModality"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Online">Online</option>
                                        <option value="Presencial">Presencial</option>
                                    </select>
                                </label>
                            </div>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input v-model="editManualSessionModal.data.link" type="text" placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
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
                            <CommonButton text="Eliminar sesión" @click="editManualSessionModal.removeSession"
                                :loading="editManualSessionModal.data.removeSessionLoading" class="px-4 py-2 bg-tertiary" />
                            <CommonButton text="Confirmar cambios" @click="editManualSessionModal.updateSession"
                                :loading="editManualSessionModal.data.updateSessionLoading" class="px-4 py-2" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

        <Teleport to="body">
            <CommonModal ref="editPersonalEventModalRef">
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
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <div class="flex max-w-max items-center gap-4">
                                    <select v-model="selectedStartTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for="    time     in     startTimeOptions    " :key="`start-${time}`"
                                            :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                    <span class="font-semibold">-</span>
                                    <select v-model="manuallySelectedEndTime"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option v-for=" time  in  endTimeOptions " :key="`end-${time}`" :value="time">
                                            {{ time }}
                                        </option>
                                    </select>
                                </div>
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <label class="w-full flex flex-col col-span-2">
                                    <span class="font-medium text-sm mb-2">Clientes (opcional)</span>
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:modelValue="editPersonalEventModal.data.clients"
                                        :selectedFormat="editPersonalEventModal.data.selectedFormat" />
                                </label>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Información adicional (opcional)</span>
                                <textarea v-model="editPersonalEventModal.data.additionalInfo"
                                    placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                                    rows="4"></textarea>
                            </label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <CommonButton @click="editPersonalEventModal.removeSession" text="Eliminar evento"
                                class="px-4 py-2 bg-tertiary" :loading="editPersonalEventModal.data.removeSessionLoading" />
                            <CommonButton text="Confirmar cambios" @click="editPersonalEventModal.updateSession"
                                class="px-4 py-2" :loading="editPersonalEventModal.data.updateSessionLoading" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from '~/stores/UserStore';

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const events = ref([]); // Array of events
const fetchingEvents = ref(false); // Loading state of the events

const eventMatrix = ref([]); // Matrix of events
const startHour = 9; // Starting hour of the day
const endHour = 20; // Ending hour of the day

/* styling of cells */

const eventClasses = (day, index) => {
    let classes = [editMode ? editClass : '', 'bg-primary']; // Default class

    if (day[index].event.type === 'personal') {
        classes = [editMode ? editClass : '', 'bg-quaternary'];
    } else if (day[index].event.type === 'manual_session') {
        classes = [editMode ? editClass : '', 'bg-secondary'];
    }

    return classes;
};

const isFirstEventUnique = (day, index) => {
    if (index == 0) return true;

    const event = day[index].event;
    const previousEvent = day[index - 1].event;

    return !event || !previousEvent || previousEvent.event_id !== event.event_id;
};

const isLastEventUnique = (day, index) => {
    if (index == day.length - 1) return true;

    const event = day[index].event;
    const nextEvent = day[index + 1].event;

    return !event || !nextEvent || nextEvent.event_id !== event.event_id;
};

// Edit mode state
const editMode = ref(false);

const editClass = reactive({
    'flex': true,
    'items-center': true,
    'justify-center': true,
    'group': true,
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

const parseTime = (timeString) => {
    // 'timeString' is a string like '13:00'
    return parseInt(timeString.split(':')[0]);
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

// Computed property for start time options
const startTimeOptions = computed(() => timesList.value.map(formatTime));

// Computed property for end time options
// Computed property for end time options
const endTimeOptions = computed(() => {
    let options = [];
    let start = parseInt(selectedStartTime.value);
    // Start from one hour after the selected start time
    let begin = start + 1;

    for (let i = begin; i <= endHour + 1; i++) {
        options.push(formatTime(i));
    }
    return options;
});

//instead of multiple options, there will be only one option, the one right after the start time
const automaticallySelectedEndTime = computed(() => {
    const startIndex = timesList.value.findIndex(time => formatTime(time) === selectedStartTime.value);
    if (startIndex === timesList.value.length - 1) {
        return '21:00';
    } else {
        return formatTime(timesList.value[startIndex + 1]);
    }
});


const manuallySelectedEndTime = ref(formatTime(timesList.value[1]));

// Watch for changes in selectedStartTime
// Watch for changes in selectedStartTime
watch(selectedStartTime, (newStartTime, oldStartTime) => {
    // Convert the times to integers for comparison
    const newStartTimeInt = parseTime(newStartTime);
    const manuallySelectedEndTimeInt = parseTime(manuallySelectedEndTime.value);

    // If the new start time is later than the currently selected end time
    if (newStartTimeInt >= manuallySelectedEndTimeInt) {
        // Find the index of the new end time
        const newEndTimeIndex = timesList.value.findIndex(time => time === newStartTimeInt) + 1;

        // If the new end time index is out of range, set the end time to '21:00'
        if (newEndTimeIndex >= timesList.value.length) {
            manuallySelectedEndTime.value = '21:00';
        } else {
            // Otherwise, update the end time to be one hour after the new start time
            manuallySelectedEndTime.value = formatTime(timesList.value[newEndTimeIndex]);
        }
    }
});


const setSelectedStartTimeToFirstAvailableTime = () => {
    selectedStartTime.value = formatTime(timesList.value[0]);
};

/* Modals */

// Logic to handle moving around days when a modal is open

const currentlySelectedDate = ref(new Date());

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

const updateCurrentlySelectedDate = (day, time) => {
    goToFirstDay();
    currentlySelectedDate.value.setDate(currentDate.value.getDate() + day - 1);
    selectedStartTime.value = formatTime(time);
};

// will update the currently selected date to the first day of the week
const goToFirstDay = () => {
    currentlySelectedDate.value = new Date(currentDate.value);
};

// Empty slot modal
const emptySlotModalRef = ref(null);

const emptySlotModal = reactive({
    openModal: () => {
        if (emptySlotModalRef.value) {
            emptySlotModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (emptySlotModalRef.value) {
            emptySlotModalRef.value.closeModal();
        }
    },
    handleClick: (day, time) => {
        updateCurrentlySelectedDate(day, time);
        emptySlotModalRef.value.openModal();
    },
    addNewSession: () => {
        emptySlotModalRef.value.closeModal();
        newEmptySessionModal.openModal();
    },
    addNewEvent: () => {
        emptySlotModalRef.value.closeModal();
        newEventModal.openModal();
    }
});

// Add new empty session modal

const newEmptySessionModalRef = ref(null);

const newEmptySessionModal = reactive({
    data: {
        selectedFormat: 'Individual',
        selectedModality: 'Online',
    },
    loading: false,
    openModal: () => {
        newEmptySessionModal.resetModalData();
        if (newEmptySessionModalRef.value) {
            newEmptySessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (newEmptySessionModalRef.value) {
            newEmptySessionModalRef.value.closeModal();
        }
    },
    resetModalData: () => {
        newEmptySessionModal.data.selectedFormat = 'Individual';
        newEmptySessionModal.data.selectedModality = 'Online';
    },
    handleClickFromButton: () => {
        goToFirstDay();
        setSelectedStartTimeToFirstAvailableTime();
        newEmptySessionModal.openModal();
    },
});

// Add new event modal
const newEventModalRef = ref(null);

const newEventModal = reactive({
    data: {
        selectedEventType: 'Nuevo entrenamiento',
        loading: false,
        manualSession: {
            clients: [],
            selectedFormat: 'Individual',
            selectedModality: 'Online',
            link: '',
        },
        personalEvent: {
            clients: [],
            selectedFormat: 'Grupal',
            additionalInfo: '',
        },
    },
    openModal: () => {
        newEventModal.resetModalData();
        if (newEventModalRef.value) {
            newEventModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (newEventModalRef.value) {
            newEventModalRef.value.closeModal();
        }
    },
    resetModalData: () => {
        newEventModal.data.selectedEventType = 'Nuevo entrenamiento';
        newEventModal.data.manualSession.clients = [];
        newEventModal.data.manualSession.selectedFormat = 'Individual';
        newEventModal.data.manualSession.selectedModality = 'Online';
        newEventModal.data.manualSession.link = '';
        newEventModal.data.personalEvent.clients = [];
        newEventModal.data.personalEvent.selectedFormat = 'Grupal';
        newEventModal.data.personalEvent.additionalInfo = '';
    },
    handleClick: () => {
        goToFirstDay();
        setSelectedStartTimeToFirstAvailableTime();
        newEventModal.openModal();
    },
    addNewEvent: async () => {
        newEventModal.data.loading = true;
        const localDateString = getLocalDateString(currentlySelectedDate.value);

        if (newEventModal.data.selectedEventType == 'Nuevo entrenamiento') {

            const clientsIDs = newEventModal.data.manualSession.clients.map(client => client.user_id);

            const body = {
                "user_id": userStore.getUser().user_id,
                "date": localDateString, // fecha en formato YYYY-MM-DD
                "start_time": selectedStartTime.value, // hora en formato HH:MM
                "end_time": automaticallySelectedEndTime.value, // hora en formato HH:MM
                "format": newEventModal.data.manualSession.selectedFormat, // "Individual" o "Grupal"
                "modality": newEventModal.data.manualSession.selectedModality, // "Online" o "Presencial"
                "text": newEventModal.data.manualSession.link, // link de la sesión, se pasa como text
                "clients": clientsIDs, // array de ids de clientes
                "type": "manual_session", // "manual session en caso de Nuevo entrenamiento"
            };

            const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/manual`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": userStore.getUserToken()
                },
                body: body
            });

            if (error.value) {
                console.log("Fetch error:", error.value);
                newEventModal.data.loading = false;
                return;
            }

            newEventModal.data.loading = false;
            newEventModal.closeModal();

            if (data.value.success) {
                getEvents();
            }
            else {
                console.log(data.value.message);
            }

        }
        else if (newEventModal.data.selectedEventType == 'Evento personal') {

            const clientsIDs = newEventModal.data.personalEvent.clients.map(client => client.user_id);

            const body = {
                "user_id": userStore.getUser().user_id,
                "date": localDateString, // fecha en formato YYYY-MM-DD
                "start_time": selectedStartTime.value, // hora en formato HH:MM
                "end_time": manuallySelectedEndTime.value, // hora en formato HH:MM
                "text": newEventModal.data.personalEvent.additionalInfo, // información adicional
                "clients": clientsIDs, // array de ids de clientes
                "type": "personal", // "Nuevo entrenamiento" o "Evento personal"
            };

            const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/personal`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": userStore.getUserToken()
                },
                body: body
            });

            if (error.value) {
                console.log("Fetch error:", error.value);
                newEventModal.data.loading = false;
                return;
            }

            newEventModal.data.loading = false;
            newEventModal.closeModal();

            if (data.value.success) {
                getEvents();
            }
            else {
                console.log(data.value.message);
            }
        }
    },
});

const editEventHandler = reactive({
    handleClick: (day, time, event) => {
        if (event.type === 'session') {
            editEmptySessionModal.handleClick(day, time, event);
        }
        else if (event.type === 'manual_session') {
            editManualSessionModal.handleClick(day, time, event);
        }
        else if (event.type === 'personal') {
            editPersonalEventModal.handleClick(day, time, event);
        }
    }
});

// Edit empty session modal
const editEmptySessionModalRef = ref(null);

const editEmptySessionModal = reactive({
    data: {
        selectedFormat: null,
        selectedModality: null,
        event: null,
        removeSessionLoading: false,
        updateSessionLoading: false,
    },
    openModal: (day, time) => {
        if (editEmptySessionModalRef.value) {
            editEmptySessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editEmptySessionModalRef.value) {
            editEmptySessionModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editEmptySessionModal.data.selectedFormat = event.session_info.format;
        editEmptySessionModal.data.selectedModality = event.session_info.modality;
        editEmptySessionModal.data.event = event;
        updateCurrentlySelectedDate(day, time);
        editEmptySessionModal.openModal();
    },
    updateSession: async () => {

        editEmptySessionModal.data.updateSessionLoading = true;
        const event = editEmptySessionModal.data.event;

        const body = {
            user_id: userStore.getUser().user_id,
            session_id: event.session_info.session_id,
            date: getLocalDateString(currentlySelectedDate.value),
            time: selectedStartTime.value,
            format: editEmptySessionModal.data.selectedFormat,
            modality: editEmptySessionModal.data.selectedModality,
            link: event.session_info.link,
            clients: [],
        }
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
            body: body
        });

        editEmptySessionModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editEmptySessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editEmptySessionModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-session/${editEmptySessionModal.data.event.session_info.session_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
        });

        editEmptySessionModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            console.log(data.value.message);
            editEmptySessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

const editManualSessionModalRef = ref(null);

const editManualSessionModal = reactive({
    data: {
        selectedEventType: 'Nuevo entrenamiento',
        clients: [],
        selectedFormat: 'Individual',
        selectedModality: 'Online',
        link: '',
        event: null,
        removeSessionLoading: false,
        updateSessionLoading: false
    },
    openModal: () => {
        if (editManualSessionModalRef.value) {
            editManualSessionModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editManualSessionModalRef.value) {
            editManualSessionModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editManualSessionModal.data.selectedEventType = event.type;
        editManualSessionModal.data.clients = [...event.clients]; // Create a new array
        editManualSessionModal.data.selectedFormat = event.session_info.format;
        editManualSessionModal.data.selectedModality = event.session_info.modality;
        editManualSessionModal.data.link = event.session_info.link;
        editManualSessionModal.data.event = event;
        updateCurrentlySelectedDate(day, time);
        editManualSessionModal.openModal();
    },
    updateSession: async () => {

        editManualSessionModal.data.updateSessionLoading = true;
        const event = editManualSessionModal.data.event;
        const body = {
            user_id: userStore.getUser().user_id,
            event_id: event.event_id,
            session_id: event.session_info.session_id,
            date: getLocalDateString(currentlySelectedDate.value),
            start_time: selectedStartTime.value,
            end_time: automaticallySelectedEndTime.value,
            format: editManualSessionModal.data.selectedFormat,
            modality: editManualSessionModal.data.selectedModality,
            text: editManualSessionModal.data.link,
            clients: editManualSessionModal.data.clients.map(client => client.user_id),
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/manual`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
            body: body
        });

        editManualSessionModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editManualSessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editManualSessionModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-session/${editManualSessionModal.data.event.session_info.session_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
        });

        editManualSessionModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editManualSessionModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

const editPersonalEventModalRef = ref(null);

const editPersonalEventModal = reactive({
    data: {
        clients: [],
        selectedFormat: 'Grupal',
        additionalInfo: '',
        removeSessionLoading: false,
        updateSessionLoading: false,
        event: null,
    },
    openModal: () => {
        if (editPersonalEventModalRef.value) {
            editPersonalEventModalRef.value.openModal();
        }
    },
    closeModal: () => {
        if (editPersonalEventModalRef.value) {
            editPersonalEventModalRef.value.closeModal();
        }
    },
    handleClick: (day, time, event) => {
        editPersonalEventModal.data.clients = [...event.clients]; // Create a new array
        editPersonalEventModal.data.additionalInfo = event.text;
        editPersonalEventModal.data.event = event;
        updateCurrentlySelectedDate(day, time);
        manuallySelectedEndTime.value = formatTime(parseTime(event.end_time));
        editPersonalEventModal.openModal();
    },
    updateSession: async () => {

        editPersonalEventModal.data.updateSessionLoading = true;
        const event = editPersonalEventModal.data.event;
        const body = {
            user_id: userStore.getUser().user_id,
            event_id: event.event_id,
            date: getLocalDateString(currentlySelectedDate.value),
            start_time: selectedStartTime.value,
            end_time: manuallySelectedEndTime.value,
            text: editPersonalEventModal.data.additionalInfo,
            clients: editPersonalEventModal.data.clients.map(client => client.user_id),
            type: "personal",
        }

        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session/personal`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
            body: body
        });

        editPersonalEventModal.data.updateSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editPersonalEventModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
    removeSession: async () => {

        editPersonalEventModal.data.removeSessionLoading = true;
        const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/delete-event/${editPersonalEventModal.data.event.event_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": userStore.getUserToken()
            },
        });

        editPersonalEventModal.data.removeSessionLoading = false;

        if (error.value) {
            console.log("Fetch error:", error.value);
            return;
        }

        if (data.value.success) {
            editPersonalEventModal.closeModal();
            getEvents();
        }
        else {
            console.log(data.value.message);
        }
    },
});

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

const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/* API calls */

const getEvents = async () => {

    fetchingEvents.value = true;

    const localDateString = getLocalDateString(currentDate.value);

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/calendar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        body: {
            "user_id": userStore.getUser().user_id,
            "date": localDateString, // fecha en formato YYYY-MM-DD
        }
    });

    if (error.value) {
        console.log("Fetch error:", error.value);
        fetchingEvents.value = false;
        return;
    }

    fetchingEvents.value = false;
    initializeEventMatrix(); // Reset the matrix before populating

    if (data.value.success) {
        populateEventMatrix(data.value.events); // Fill the matrix with the fetched events
        events.value = data.value.events;
    }
    else {
        fetchingEvents.value = false;
        events.value = [];
        console.log(data.value.message);
    }
};

const populateEventMatrix = (events) => {
    const timeZone = "UTC"; // Change this to the target time zone
    events.forEach(event => {
        // Convert UTC date to the target time zone
        const startDateTime = new Date(`${event.date.split('T')[0]}T${event.start_time}:00Z`);
        const startDate = convertUtcDateToLocalDate(startDateTime, timeZone);

        let durationHours = 1; // Default duration for events without an end time

        if (event.type === 'personal' && event.end_time) {
            const endDateTime = new Date(`${event.date.split('T')[0]}T${event.end_time}:00Z`);
            const endDate = convertUtcDateToLocalDate(endDateTime, timeZone);
            durationHours = (endDate - startDate) / (1000 * 60 * 60);
        }

        for (let i = 0; i < durationHours; i++) {
            const eventHour = startDate.getHours() + i;
            const eventHourIndex = eventHour - startHour;

            const eventDayIndex = daysList.value.findIndex(day =>
                day.getFullYear() === startDate.getFullYear() &&
                day.getMonth() === startDate.getMonth() &&
                day.getDate() === startDate.getDate()
            );

            if (eventDayIndex >= 0 && eventHourIndex >= 0 && eventHourIndex < 12) {
                eventMatrix.value[eventDayIndex][eventHourIndex].event = event;
            }
        }
    });
};

// Helper function to convert UTC date to a date in the target time zone
function convertUtcDateToLocalDate(utcDate, timeZone) {
    return new Date(utcDate.toLocaleString('en-US', { timeZone }));
}

const addNewEmptySession = async () => {
    const localDateString = getLocalDateString(currentlySelectedDate.value);
    newEmptySessionModal.loading = true;

    const body = {
        "user_id": userStore.getUser().user_id,
        "date": localDateString, // fecha en formato YYYY-MM-DD
        "time": selectedStartTime.value,
        "available": true, // will be removed later
        "format": newEmptySessionModal.data.selectedFormat,
        "modality": newEmptySessionModal.data.selectedModality,
        "link": "https://www.maps.google.com", // placeholder for now
        "credit_type": "gold", // placeholder for now
    }

    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}/professional/session`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        body: body
    });

    newEmptySessionModal.loading = false;
    newEmptySessionModal.closeModal();

    if (error.value) {
        console.log("Fetch error:", error.value);
        return;
    }

    if (data.value.success) {
        console.log(data.value.message);
        getEvents();
    }
    else {
        console.log(data.value.message);
    }

}

/* Lifecycle hooks */

onMounted(() => {
    // Get the events when the component is mounted
    initializeEventMatrix();
    getEvents();
    //allows for closing the dropdown when clicking outside of it
    document.addEventListener('click', newDropdown.close);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', newDropdown.close);
});

</script>