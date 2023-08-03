<template>
    <div>
        <div class="p-6 sm:p-8 relative">
            <div name="content">
                <div class="flex items-center justify-end">
                    <button @click="toggleFilterSidebar"
                        class="bg-secondary text-white px-5 py-2 inline-flex items-center gap-1 rounded-lg">
                        <span class="sr-only">Open filter sidebar</span>
                        <span>
                            Filtros
                        </span>
                        <Icon class="text-2xl" name="ic:round-filter-list" />
                    </button>
                </div>
                <h3 class="text-xl font-medium">Agendar sesión</h3>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full table-auto text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="p-6">
                                    Fecha
                                </th>
                                <th scope="col" class="p-6">
                                    Hora
                                </th>
                                <th scope="col" class="p-6">
                                    Modalidad
                                </th>
                                <th scope="col" class="p-6">
                                    Formato
                                </th>
                                <th scope="col" class="p-6">
                                    Profesional
                                </th>
                                <th scope="col" class="p-6">
                                    Créditos
                                </th>
                                <th scope="col" class="p-6">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="session in sessions" class="border-b" :key="session.id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.date }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.time }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.modality }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.format }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ session.professional.name }}
                                    <br>
                                    {{ session.professional.profession }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal">
                                    <div class="flex items-center gap-x-1">
                                        <img :src="`/plans/${session.credits.type}-medal.png`" class="w-6 h-6"
                                            :alt="session.credits.type">
                                        {{ session.credits.value }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button :disabled="!session.available"
                                        class="px-4 py-2 bg-primary text-white rounded-md font-medium disabled:bg-primary-100 disabled disabled:cursor-not-allowed">
                                        Agendar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full min-h-[calc(100vh_-_4.5rem)] bg-black/10 backdrop-blur-[3px] transition-all"
                :class="{ 'hidden': !filterSidebarOpen }">
            </div>
        </div>
        <aside id="logo-sidebar"
            class="fixed top-0 right-0 z-40 w-80 h-screen pt-20 transition-transform bg-white border-l border-gray-200"
            :class="filterSidebarOpen ? 'translate-x-0' : 'translate-x-full'" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
                <div class="flex justify-end items-center text-secondary ">
                    <button @click="filterSidebarOpen = false">
                        <span>Cerrar</span>
                        <Icon class="text-4xl" name="heroicons:x-mark-20-solid" />
                    </button>
                </div>
                <form @submit.prevent="filter" class="mx-auto mt-5">
                    <div class="flex flex-col justify-center gap-y-2">
                        <select id="selectCredito" class="text-center py-2 rounded-md bg-[#ededed]">
                            <option selected>Seleccionar tipo de credito</option>
                            <option>Oro</option>
                            <option>Plata</option>
                            <option>Bronce</option>
                        </select>

                        <select id="selectProfesional" class="text-center py-2 rounded-md bg-[#ededed]">
                            <option selected>Seleccionar Profesional</option>
                            <option>Entrenador Fisico</option>
                            <option>Nutricionista</option>
                        </select>
                        <div>
                            <div class="text-center flex justify-center gap-2 py-2 px-5 rounded-md bg-[#ededed]">
                                <span class="input-group-text" id="basic-addon2">Desde</span>
                                <input type="date" class="bg-[#ededed] " aria-describedby="basic-addon2" id="desde">
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-center gap-2 py-2 px-5 rounded-md bg-[#ededed]">
                                <span class="input-group-text" id="basic-addon2">Hasta</span>
                                <input type="date" class="bg-[#ededed]" aria-describedby="basic-addon2" id="hasta">
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="w-full px-5 py-2 rounded-md bg-secondary text-white">
                                <Icon class="text-2xl" name="ic:round-filter-list" />
                                Filtrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </aside>
    </div>
</template>

<script setup>

import { ref } from "vue";

const filterSidebarOpen = ref(false);
const toggleFilterSidebar = () => filterSidebarOpen.value = !filterSidebarOpen.value;

const sessions = [
    {
        id: 1,
        date: "Domingo 25/7",
        time: "16:00hrs",
        modality: "Presencial - Borde costero",
        format: "Grupal",
        professional: {
            name: "Jorge",
            profession: "Entrenador Físico",
        },
        credits: {
            value: 1,
            type: "silver",
        },
        available: true,
    },
    {
        id: 2,
        date: "Domingo 25/7",
        time: "17:00hrs",
        modality: "Online",
        format: "Grupal",
        professional: {
            name: "Gonzalo",
            profession: "Entrenador Físico"
        },
        credits: {
            value: 1,
            type: "bronze",
        },
        available: true,
    },
    {
        id: 3,
        date: "Domingo 25/7",
        time: "19:00hrs",
        modality: "Online",
        format: "Grupal",
        professional: {
            name: "Jorge",
            profession: "Entrenador Físico"
        },
        credits: {
            value: 1,
            type: "bronze",
        },
        available: true,
    },
    {
        id: 4,
        date: "Lunes 26/7",
        time: "16:00hrs",
        modality: "Online",
        format: "Individual",
        professional: {
            name: "Maria",
            profession: "Nutricionista"
        },
        credits: {
            value: 1,
            type: "bronze",
        },
        available: true,
    },
    {
        id: 5,
        date: "Lunes 26/7",
        time: "11:00hrs",
        modality: "Presencial - Viña del Mar",
        format: "Individual",
        professional: {
            name: "Francisco",
            profession: "Entrenador Físico"
        },
        credits: {
            value: 1,
            type: "gold",
        },
        available: false,
    },
    {
        id: 6,
        date: "Lunes 26/7",
        time: "13:00hrs",
        modality: "Presencial - Santiago",
        format: "Individual",
        professional: {
            name: "Jorge",
            profession: "Entrenador Físico"
        },
        credits: {
            value: 1,
            type: "gold",
        },
        available: false,
    },
    {
        id: 7,
        date: "Lunes 26/7",
        time: "16:00hrs",
        modality: "Presencial - Santiago",
        format: "Grupal",
        professional: {
            name: "Jorge",
            profession: "Entrenador Físico"
        },
        credits: {
            value: 3,
            type: "gold",
        },
        available: false,
    }

]

const filter = () => {
    console.log("filter");
}

definePageMeta({
    layout: "user",
});
</script>