<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full">
                    <div
                        class="text-center lg:text-start grid grid-cols-1 place-items-center lg:place-items-start lg:grid-cols-3 mb-8">
                        <div class="mb-5 space-y-2 lg:justify-self-start">
                            <h3 class="text-gray-500">Nombre</h3>
                            <p class="text-3xl font-medium text-gray-700">{{ student.first_name }} {{
                                student.last_name }}</p>
                        </div>
                        <div class="mb-5 lg:justify-self-center">
                            <img class="w-24 h-24 rounded-full" src="/icons/woman.png" alt="user photo">
                        </div>
                        <div class="mb-5 space-y-2 lg:justify-self-end">
                            <h3 class="text-gray-500">Correo electrónico</h3>
                            <p class="text-3xl font-medium text-gray-700">{{ student.email }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-y-6">
                        <div class="flex gap-x-3">
                            <img :src="`/plans/gold-medal.png`" class="w-6 h-6" :alt="gold - medal">
                            <p>
                                {{ student.credits.gold }}
                            </p>
                            <input type="text" class="w-8 border-b outline-none">
                            <CommonButton class="px-2 py-1 rounded-lg" text="Agregar" />
                        </div>
                        <div class="flex gap-x-3">
                            <img :src="`/plans/silver-medal.png`" class="w-6 h-6" :alt="gold - medal">
                            <p>
                                {{ student.credits.silver }}
                            </p>
                            <input type="text" class="w-8 border-b outline-none">
                            <CommonButton class="px-2 py-1 rounded-lg" text="Agregar" />
                        </div>
                        <div class="flex gap-x-3">
                            <img :src="`/plans/bronze-medal.png`" class="w-6 h-6" :alt="gold - medal">
                            <p>
                                {{ student.credits.bronze }}
                            </p>
                            <input type="text" class="w-8 border-b outline-none">
                            <CommonButton class="px-2 py-1 rounded-lg" text="Agregar" />
                        </div>
                    </div>
                    <div class="mt-10 w-full lg:w-10/12 mx-auto">
                        <div class="mb-6 px-5 py-3 rounded-lg border flex items-center justify-between">
                            <p class="text-lg">Sesiones próximas</p>
                            <Icon name="fa6-solid:chevron-right" />
                        </div>
                        <div class="mb-2 px-5 py-3 rounded-lg border flex items-center justify-between">
                            <p class="text-lg">Sesiones pasadas</p>
                            <Icon name="fa6-solid:chevron-down" />
                        </div>
                        <div class="overflow-x-auto">
                            <table class="bg-white table-auto text-sm text-left text-gray-500">
                                <thead class="text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-6 font-medium">
                                            Fecha
                                        </th>
                                        <th scope="col" class="p-6 font-medium">
                                            Hora
                                        </th>
                                        <th scope="col" class="p-6 font-medium">
                                            Modalidad
                                        </th>
                                        <th scope="col" class="p-6 font-medium">
                                            Formato
                                        </th>
                                        <th scope="col" class="p-6 font-medium">
                                            Alumnos
                                        </th>
                                        <th scope="col" class="p-6 font-medium">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            25/06
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            16:00hrs
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            Presencial - borde costero
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            Grupal
                                        </td>
                                        <td class="px-6 py-4">
                                            5/10
                                        </td>
                                        <td class="px-6 py-4">
                                            <p>Jorge</p>
                                            <br />
                                            <p>Entrenador Físico</p>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            28/08
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            13:00hrs
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap ">
                                            Online
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            Grupal
                                        </td>
                                        <td class="px-6 py-4">
                                            2/2
                                        </td>
                                        <td class="px-6 py-4">
                                            <p>Jorge</p>
                                            <br />
                                            <p>Entrenador Físico</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const modal = ref(null);

const openModal = () => {
    modal.value.openModal();
}

const props = defineProps({
    student: {
        type: Object,
        required: true
    }
})

defineExpose({
    openModal
})

</script>