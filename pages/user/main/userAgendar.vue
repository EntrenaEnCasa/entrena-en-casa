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
                <div class="">
                    <table class="rounded-4">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Modalidad</th>
                                <th scope="col">Formato</th>
                                <th scope="col">Profesional</th>
                                <th scope="col">Créditos</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Domingo 25/7</td>
                                <td>16:00hrs</td>
                                <td>Presencial - Borde costero</td>
                                <td>Grupal</td>
                                <td>Jorge<br>Entrenador Fisico</td>
                                <td><img src="/plans/silver-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Domingo 25/7</td>
                                <td>17:00hrs</td>
                                <td>Online</td>
                                <td>Grupal</td>
                                <td>Gonzalo<br>Entrenador Fisico</td>
                                <td><img src="/plans/bronze-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Domingo 25/7</td>
                                <td>19:00hrs</td>
                                <td>Online</td>
                                <td>Grupal</td>
                                <td>Jorge<br>Entrenador Fisico</td>
                                <td><img src="/plans/bronze-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lunes 26/7</td>
                                <td>16:00hrs</td>
                                <td>Online</td>
                                <td>Individual</td>
                                <td>Maria<br>Nutricionista</td>
                                <td><img src="/plans/bronze-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lunes 26/7</td>
                                <td>11:00hrs</td>
                                <td>Presencial - Viña del Mar</td>
                                <td>Individual</td>
                                <td>Francisco<br>Entrenador Fisico</td>
                                <td><img src="/plans/gold-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success disabled">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lunes 26/7</td>
                                <td>13:00hrs</td>
                                <td>Presencial - Santiago</td>
                                <td>Individual</td>
                                <td>Jorge<br>Entrenador Fisico</td>
                                <td><img src="/plans/gold-medal.png" alt="">1</td>
                                <td>
                                    <button class="btn btn-success disabled">Agendar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lunes 26/7</td>
                                <td>16:00hrs</td>
                                <td>Presencial - Santiago</td>
                                <td>Grupal</td>
                                <td>Jorge<br>Entrenador Fisico</td>
                                <td><img src="/plans/gold-medal.png" alt="">3</td>
                                <td>
                                    <button class="btn btn-success disabled">Agendar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-[3px] transition-all"
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

const filter = () => {
    console.log("filter");
}

definePageMeta({
    layout: "user",
});
</script>