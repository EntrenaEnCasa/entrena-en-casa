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
                            <tr v-for="professional in allProfessionals.professionals" class="border-b" :key="professional.user_id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.first_name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.last_name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ professional.email }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap md:whitespace-normal flex space-x-1">
                                    {{ professional.title }}
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

import { useUserStore } from "~/stores/UserStore";


const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const allProfessionals = ref({
    success: false,
    loading: false,
    message: '',
    professionals: [],
});

onMounted(async () =>{
    await getAllProfessionals();
});

const getAllProfessionals= async() =>{

    allProfessionals.value.loading = true;

    await useFetch(`${runtimeConfig.public.apiBase}/admin/professionals`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken(),
        },
        onResponse({request,response,options}){
            allProfessionals.value = response._data;
            allProfessionals.value.loading = false;
        },
    });

};



</script>

<style lang="scss">
    
</style>