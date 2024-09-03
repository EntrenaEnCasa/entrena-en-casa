<template>
    <div>
        <div class="mb-4">
            <h3 class="text-xl font-medium">Alumnos</h3>
        </div>
        <CommonLoading v-show="studentsLoading" />
        <div
            v-show="!studentsLoading && data && data.success"
            class="overflow-x-auto shadow-md sm:rounded-lg"
        >
            <table class="w-full table-auto bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-200 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="p-6">Nombre</th>
                        <th scope="col" class="p-6">Apellido</th>
                        <th scope="col" class="p-6">Correo</th>
                        <th scope="col" class="p-6">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in data?.students" class="border-b" :key="student.user_id">
                        <td class="whitespace-nowrap px-6 py-4">
                            <div v-if="student.first_name">
                                {{ student.first_name }}
                            </div>
                            <div v-else>Sin datos</div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            <div v-if="student.last_name">
                                {{ student.last_name }}
                            </div>
                            <div v-else>Sin datos</div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            {{ student.email }}
                        </td>

                        <td class="px-6 py-4">
                            <button
                                @click="openModalStudent(student)"
                                class="rounded-md bg-primary px-4 py-2 font-medium text-white"
                            >
                                Ver Detalles
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="!studentsLoading && data && !data.success">
            <div
                class="items-center gap-6 space-y-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
            >
                <div class="text-md text-center">
                    <b>{{ data?.message }}</b>
                </div>
            </div>
        </div>
        <AdminDashboardStudentsStudentInfoModal
            :student="currentStudent"
            :pastSessions="pastSessions"
            :futureSessions="futureSessions"
            :futureSessionsLoading="futureSessionsLoading"
            :pastSessionsLoading="pastSessionsLoading"
            ref="studentModal"
        />
    </div>
</template>

<script setup lang="ts">
interface StudentResponse extends APIResponse {
    students: Student[];
}
interface FutureSessionsResponse extends APIResponse {
    sessions: Session[];
}
interface PastSessionsResponse extends APIResponse {
    sessions: Session[];
}

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    enabled: boolean;
    region: number;
}

const runtimeConfig = useRuntimeConfig();

const studentModal = ref<Modal | null>(null);
const currentStudent = ref<Student | null>(null);
const futureSessions = ref<Session[]>([]);
const pastSessions = ref<Session[]>([]);
const futureSessionsLoading = ref<boolean>(false);
const pastSessionsLoading = ref<boolean>(false);

interface Session {
    session_id: number;
    date: string;
    time: string;
    available: boolean;
    modality: string;
    format: string;
    link: string;
    actual_assistant: number;
    type: string;
    coordinates: string | null;
    professional: Professional;
}
interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
}

const { data, pending: studentsLoading } = await useFetch<StudentResponse>(
    `${runtimeConfig.public.apiBase}/admin/students`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const getPastSessions = async (student: Student) => {
    pastSessionsLoading.value = true;

    try {
        const response = await $fetch<PastSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/sessions/past/${student.user_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (response.success) {
            if (response.sessions) {
                pastSessions.value = response.sessions;
            } else {
                pastSessions.value = [];
            }
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        pastSessionsLoading.value = false;
    }
};

const getFutureSessions = async (student: Student) => {
    futureSessionsLoading.value = true;

    try {
        const response = await $fetch<FutureSessionsResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/sessions/future/${student.user_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (response.success) {
            if (response.sessions) {
                futureSessions.value = response.sessions;
            } else {
                futureSessions.value = [];
            }
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        futureSessionsLoading.value = false;
    }
};

const openModalStudent = (student: Student) => {
    currentStudent.value = student;
    studentModal.value?.openModal();
    getFutureSessions(student);
    getPastSessions(student);
};
</script>
