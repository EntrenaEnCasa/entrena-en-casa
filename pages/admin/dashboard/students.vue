<template>
    <div class="p-6 sm:p-8">
        <div class="relative">
            <div name="content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-medium ">Alumnos</h3>
                    <form novalidate>
                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <icon class="text-md text-slate-400" name="fa6-solid:magnifying-glass"></icon>
                            </div>
                            <input type="search" id="search"
                                class="w-full p-2 pl-10 text-sm border border-xl rounded-2xl border-slate-400 placeholder:text-slate-400 focus:ring-secondary-500 focus:border-secondary-500"
                                placeholder="Buscar..." required>
                        </div>
                    </form>
                </div>
                <CommonLoading v-if="allStudents.loading" />
                <div v-else-if="allStudents.success" class="overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Créditos
                                </th>
                                <th scope="col" class="p-6">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in allStudents.students" class="border-b" :key="student.user_id">
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ student.first_name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ student.last_name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {{ student.email }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex gap-x-2 min-w-max">
                                        <div class="flex items-center gap-x-1">
                                            <img :src="`/plans/gold-medal.png`" class="w-6 h-6" :alt="gold - medal">
                                            <p>
                                                {{ student.credits.gold }}
                                            </p>
                                        </div>
                                        <div class="flex items-center gap-x-1">
                                            <img :src="`/plans/silver-medal.png`" class="w-6 h-6" :alt="silver - medal">
                                            <p>
                                                {{ student.credits.silver }}
                                            </p>
                                        </div>
                                        <div class="flex items-center gap-x-1">
                                            <img :src="`/plans/bronze-medal.png`" class="w-6 h-6" :alt="Bronze - medal">
                                            <p>
                                                {{ student.credits.bronze }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <button @click="openModal(student)"
                                        class="px-4 py-2 bg-primary text-white rounded-md font-medium">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="text-md  text-center"><b>{{ allStudents.message }}</b></div>
                    </div>
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full min-h-[calc(100vh_-_4.5rem)] bg-black/10 backdrop-blur-[3px] transition-all"
                :class="{ 'hidden': !filterSidebarOpen }">
            </div>
        </div>
        <AdminDashboardStudentInfoModal :student="currentStudent" ref="studentModal" />
    </div>
</template>

<script setup>

import { useUserStore } from "~/stores/UserStore";

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const studentModal = ref(null);
const currentStudent = ref(null);

const allStudents = ref({
    success: false,
    loading: false,
    message: '',
    students: [],
});

onMounted(async () => {
    await getAllStudents();
});

const getAllStudents = async () => {

    allStudents.value.loading = true;

    await useFetch(`${runtimeConfig.public.apiBase}/admin/students`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.userToken,
        },
        onResponse({ request, response, options }) {
            allStudents.value = response._data;
            allStudents.value.loading = false;
        },
    });

};

const openModal = (student) => {
    studentModal.value.openModal();
    currentStudent.value = student;
};

</script>