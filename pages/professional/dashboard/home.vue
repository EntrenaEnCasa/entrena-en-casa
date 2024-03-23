<template>
    <div class="">
        <h2 class="text-xl text-center font-semibold text-gray-600 mb-4">Sesión en curso</h2>
        <CommonLoading v-if="currentSessionLoading" />
        <div v-else-if="currentSessionError">
            <div class="text-center text-red-500">
                Error al obtener la sesión en curso
            </div>
        </div>
        <div v-else-if="!currentSessionData?.success">
            <p class="text-center">
                {{ currentSessionData?.message }}
            </p>
        </div>
        <div v-else class="bg-white rounded-xl divide-y">
            <div class="p-5">
                <h3 class="text-center font-semibold text-lg first-letter:uppercase">
                    {{ formatDateToWeekdayMonthAndYear(currentSessionData.sessionInfo.date) }} -
                    {{ currentSessionData.sessionInfo.time }}hrs
                </h3>
            </div>
            <div class="p-5">
                <div class="my-10 flex flex-wrap justify-center gap-x-8 sm:gap-20 lg:gap-x-32 gap-y-5">
                    <div class="flex flex-col">
                        <h4 class="text-xl font-semibold">Modalidad</h4>
                        <p>{{ currentSessionData.sessionInfo.modality }}</p>
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-xl font-semibold">Formato</h4>
                        <p>{{ currentSessionData.sessionInfo.format }}</p>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex gap-x-2">
                            <h4 class="text-xl font-semibold">
                                {{ currentSessionData.sessionInfo.modality === 'Online' ? 'Reunión' : 'Lugar' }}
                            </h4>
                            <a class="flex text-secondary items-center" target="_blank"
                                :href="currentSessionData.sessionInfo.link">
                                <span>
                                    Link
                                </span>
                                <Icon name="fa6-solid:chevron-right" />
                            </a>
                        </div>
                        <p>{{ currentSessionData.sessionInfo.modality === 'Online' ? 'Online' : '' }}</p>
                    </div>
                </div>
                <div>
                    <h3 class="text-2xl font-semibold ml-10">Asistentes</h3>
                    <div class="overflow-x-auto">
                        <table class="mt-6 min-w-max w-full table-auto">
                            <thead>
                                <tr class=" text-gray-600 leading-normal">
                                    <th class="py-3 px-6 text-center">Confirmado</th>
                                    <th class="py-3 px-6 text-left">Nombre</th>
                                    <th class="py-3 px-6 text-left">Teléfono</th>
                                    <th class="py-3 px-6 text-left">Edad</th>
                                    <th class="py-3 px-6 text-left">Género</th>
                                    <th class="py-3 px-6 text-left">Peso</th>
                                    <th class="py-3 px-6 text-left">Estatura</th>
                                    <th v-if="studentsWithoutData && studentsWithoutData.length > 0"
                                        class="py-3 px-6 text-left"></th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-for="student, index in currentSessionData?.students" :key="index">

                                    <td class="py-3 px-6 text-center">
                                        <Icon
                                            :name="student.confirmed ? 'fa6-regular:circle-check' : 'fa6-regular:circle-xmark'"
                                            class="text-2xl"
                                            :class="student.confirmed ? 'text-primary' : 'text-tertiary'" />
                                    </td>
                                    <td class="py-3 px-6 text-left">
                                        <div v-if="student.first_name">
                                            <div class="text-base font-medium">
                                                {{ student.first_name }} {{ student.last_name }}
                                            </div>
                                            <div class="text-sm text-gray-500">{{ student.email }}</div>
                                        </div>
                                        <div v-else>
                                            <div>Sin datos</div>
                                            <div class="text-sm text-gray-500">{{ student.email }}</div>
                                        </div>
                                    </td>
                                    <td class="py-3 px-6 text-left">{{ student.phone || 'Sin datos' }}</td>
                                    <td class="py-3 px-6 text-left">{{ student.age ? student.age + ' años' : 'Sin datos'
                                        }}
                                    </td>
                                    <td class="py-3 px-6 text-left">{{ student.gender || 'Sin datos' }}</td>
                                    <td class="py-3 px-6 text-left">
                                        {{ student.weight ? student.weight + ' kg' : 'Sin datos' }}
                                    </td>
                                    <td class="py-3 px-6 text-left">
                                        {{ student.height ? student.height + ' cm' : 'Sin datos' }}
                                    </td>
                                    <td v-if="studentsWithoutData && studentsWithoutData.length > 0"
                                        class="py-3 px-6 text-left">
                                        <CommonButton v-if="student.first_name === null" class="px-4 py-2"
                                            bg-color="secondary" @click="handleOpenModal(student)">
                                            <Icon name="fa6-solid:user-pen" class="text-2xl" />
                                        </CommonButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <CommonModal ref="addStudentDataModal">
                <div class="px-3 py-6">
                    <Form v-slot="{ meta }" class="space-y-5">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <CommonInput label="Nombre" v-model="formData.firstName" name="firstName" type="text"
                                id="firstName" placeholder="Ingresa el nombre del alumno" :rules="validateFirstName" />
                            <CommonInput label="Apellido" v-model="formData.lastName" name="lastName" type="text"
                                id="lastName" placeholder="Ingresa el nombre del alumno" :rules="validateLastName" />
                            <CommonInput label="Teléfono" v-model="formData.phoneNumber" name="phoneNumber"
                                type="number" id="phoneNumber" placeholder="Ingresa el telefono del alumno"
                                :rules="validatePhoneNumber" />
                            <CommonInput label="¿Cual es tu fecha de nacimiento?" v-model="formData.birthDate"
                                name="birthDate" type="date" id="birthDate"
                                placeholder="Ingresa la fecha de nacimiento del alumno" :rules="validateBirthDate"
                                class="w-full" />
                            <CommonSelect label="Género" v-model="formData.gender" name="gender" id="gender"
                                placeholder="Ingresa el genero del alumno" :options="genderOptions"
                                :rules="validateGender" />
                            <CommonInput label="Peso" v-model="formData.weight" name="weight" type="number" id="weight"
                                placeholder="Ingresa el peso del alumno" :rules="validateWeight" right-text="KG" />
                            <CommonInput label="Estatura" v-model="formData.height" name="height" type="number"
                                id="height" placeholder="Ingresa la estatura del alumno" :rules="validateHeight"
                                right-text="CM" />
                        </div>
                        <CommonButton class="py-2 w-full font-medium" text-size="lg" :loading="addDataLoading"
                            :disabled="!meta.valid" @click="updateStudentInfo">
                            Guardar
                        </CommonButton>

                    </Form>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">

import { useToast } from 'vue-toastification';
import { useUserStore } from '~/stores/UserStore';
import { useFormatter } from '~/composables/time/useFormatter';

const userStore = useUserStore();
const config = useRuntimeConfig();
const toast = useToast();
const { formatDateToWeekdayMonthAndYear } = useFormatter();

interface currentSessionResponse {
    success: boolean;
    message: string;
    sessionInfo: SessionInfo;
    students: Student[];
}

interface updateStudentInfoResponse {
    success: boolean;
    message: string;
}

interface SessionInfo {
    session_id: number;
    coordinates: string | null;
    link: string;
    modality: string;
    format: string;
    date: string;
    time: string;
}

interface Student {
    user_id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string | null;
    age: number | null;
    gender: string | null;
    weight: number | null;
    height: number | null;
    confirmed: boolean;
}

const addStudentDataModal = ref<Modal | null>(null);
const addDataLoading = ref(false);
const selectedStudent = ref<Student | null>(null);

const formData = reactive({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
});

const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Otro', value: 'Otro' }
];

const { data: currentSessionData, pending: currentSessionLoading, error: currentSessionError, refresh: getCurrentSession } = await useFetch<currentSessionResponse>(`${config.public.apiBase}/professional/session/attendance/${userStore.user?.user_id}`, {
    method: 'GET',
    credentials: 'include',
    lazy: true
});

const studentsWithoutData = computed(() => {
    return currentSessionData.value?.students.filter(student => student.first_name === null);
});

const validateFirstName = () => {
    if (!formData.firstName) {
        return 'El nombre es requerido';
    }
    else if (formData.firstName.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
    }
    return true;
};

const validateLastName = () => {
    if (!formData.lastName) {
        return 'El apellido es requerido';
    }
    else if (formData.lastName.length < 3) {
        return 'El apellido debe tener al menos 3 caracteres';
    }
    return true;
};

const validateBirthDate = () => {
    if (!formData.birthDate) {
        return 'La fecha de nacimiento es requerida';
    }

    const date = new Date(formData.birthDate);
    const currentDate = new Date();
    const yearDifference = currentDate.getFullYear() - date.getFullYear();
    if (yearDifference > 80 || yearDifference < 10 || date >= currentDate) {
        return 'Debes ingresar una fecha correcta';
    }

    return true;
};

const validateGender = () => {
    if (!formData.gender) {
        return 'El género es requerido';
    }

    return true;
}

const validateWeight = () => {
    if (!formData.weight) {
        return 'El peso es requerido';
    }
    else if (Number(formData.weight) < 30 || Number(formData.weight) > 200) {
        return 'El peso debe estar entre 30 y 200 kg';
    }
    return true;
};

const validateHeight = () => {
    if (!formData.height) {
        return 'La estatura es requerida';
    }
    else if (Number(formData.height) < 100 || Number(formData.height) > 250) {
        return 'La estatura debe estar entre 100 y 250 cm';
    }
    return true;
};

const validatePhoneNumber = () => {
    if (!formData.phoneNumber) {
        return 'El número de teléfono es requerido';
    }
    else if (formData.phoneNumber.length != 9) {
        return 'El número de teléfono debe tener 9 dígitos';
    }
    return true;
};

const handleOpenModal = (student: Student) => {
    selectedStudent.value = student;
    addStudentDataModal.value?.openModal();
}

const updateStudentInfo = async () => {

    addDataLoading.value = true;

    if (selectedStudent.value === null) {
        toast.error('Hubo un error al intentar actualizar la información del alumno');
        addDataLoading.value = false;
        return;
    }

    const body = {
        student_id: selectedStudent.value.user_id,
        updates: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phoneNumber,
            birth_date: formData.birthDate,
            gender: formData.gender,
            weight: formData.weight,
            height: formData.height,
        }
    }

    try {
        const response = await $fetch<updateStudentInfoResponse>(`${config.public.apiBase}/professional/student/update`, {
            method: 'PUT',
            credentials: 'include',
            body: body
        });

        if (response.success) {
            toast.success(response.message);
            getCurrentSession();
        }
        else {
            toast.error(response.message);
        }
    }
    catch (error) {
        toast.error('Hubo un error al intentar actualizar la información del alumno');
        console.log(error);
    }
    finally {
        addDataLoading.value = false;
        addStudentDataModal.value?.closeModal();
    }

}


</script>