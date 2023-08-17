<template>
    <div class="relative">
        <div>
            <div name="content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-medium ">Agendar sesión</h3>
                    <button @click="toggleFilterSidebar"
                        class="bg-secondary text-white px-5 py-2 inline-flex items-center gap-1 rounded-lg">
                        <span class="sr-only">Open filter sidebar</span>
                        <Icon class="text-2xl" name="ic:round-filter-list" />
                        <span>
                            Filtros
                        </span>
                    </button>
                </div>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="bg-white w-full table-auto text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
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
                            <tr v-for="session in sessions" class="border-b" :key="session.id_usuario">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ formatDate(session.fecha) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ formatTime(session.hora) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.presencial ? 'Presencial' : 'Online' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ session.formato }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ session.profesional.nombreProfesional }}
                                    {{ session.profesional.apellidoProfesional }}
                                    <br>
                                    {{ session.profesional.tituloProfesional }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal">
                                    <div class="flex items-center gap-x-1">
                                        <img :src="`/plans/${session.credito.tipoCredito}-medal.png`" class="w-6 h-6"
                                            :alt="session.credito.tipoCredito">
                                        {{ session.credito.cantidadCreditos }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button :disabled="!session.disponible" @click="scheduleSession(session)"
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

import { ref, onMounted } from "vue";

const filterSidebarOpen = ref(false);
const toggleFilterSidebar = () => filterSidebarOpen.value = !filterSidebarOpen.value;

const sessions = ref([]);

const getSessions = async () => {
    const { data, pending, error, refresh } = await useFetch('http://localhost:3002/sesiones/disponibles-agendar', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        onResponse({ request, response, options }) {
            const responseData = response._data;
            responseData.sort((session1, session2) => {
                const date1 = new Date(session1.fecha);
                const date2 = new Date(session2.fecha);
                return date1 - date2;
            });
            sessions.value = responseData;
        },
    });
}

const scheduleSession = async (session) => {
    const { data, pending, error, refresh } = await useFetch('http://localhost:3002/sesiones/agendar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idSesion: session.idSesion,
            idUsuario: userStore.user.idUsuario,
        }),
        onResponse({ request, response, options }) {
            const responseData = response._data;
            console.log(responseData);
            if (responseData.status === "success") {
                alert(responseData.message);
            } else {
                alert(responseData.error);
            }
        },
    });
}

const formatDate = (date) => {
    const daysOfWeek = [
        "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ];

    const dateObj = new Date(date);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${dayOfWeek} ${day}/${month}`;
}

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}hrs`;
}

const filter = () => {
    console.log("filter");
}

onMounted(() => {
    getSessions();
});

</script>