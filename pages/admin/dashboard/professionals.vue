<template>
    <div class="p-6 sm:p-8">
        <div class="relative">
            <div name="content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-medium ">Profesionales</h3>
                    <form novalidate>   
                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <icon class="text-md text-slate-400" name="fa6-solid:magnifying-glass"></icon>
                            </div>
                            <input type="search" id="search" class="w-full p-2 pl-10 text-sm border border-xl rounded-2xl border-slate-400 placeholder:text-slate-400 focus:ring-secondary-500 focus:border-secondary-500" placeholder="Buscar..." required>
                        </div>
                    </form>
                </div>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="bg-white w-full table-auto text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" class="p-6">
                                    Nombre
                                </th>
                                <th scope="col" class="p-6">
                                    Apellido
                                </th>
                                <th scope="col" class="p-6">
                                    Correo
                                </th>
                                <th scope="col" class="p-6">
                                    Profesional
                                </th>
                                <th scope="col" class="p-6">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="professional in professionals" class="border-b" :key="professional.id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.lastName }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.email }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal flex space-x-1">
                                    {{ professional.type }}
                                </td>
                                <td class="px-6 py-4">
                                    <button class="px-4 py-2 bg-primary text-white rounded-md font-medium">
                                        Ver Detalles
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
    </div>
</template>

<script setup>

const professionals = [
    {
        id:1,
        name:"Juan",
        lastName:"Araya",
        email:"juan.araya@gmail.com",
        type:"Entrenador",
    },
    {
        id:2,
        name:"Andres",
        lastName:"Araya",
        email:"andres.araya@gmail.com",
        type:"Nutricionista",
    },
    {
        id:3,
        name:"Catalina",
        lastName:"Schencke",
        email:"cata.schencke@gmail.com",
        type:"Entrenador",
    },
    {
        id:4,
        name:"Jorge",
        lastName:"Sierra",
        email:"jsierracalderon@gmail.com",
        type:"Entrenador",
    },
]

definePageMeta({
    layout: "admin",
});

</script>

<style lang="scss">
    
</style>