<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full mt-3">
                    <CommonLoading v-if="!professional || pastSessionsLoading || futureSessionsLoading" />
                    <div v-else>
                        <h2 class="text-2xl text-center mb-5 font-semibold">Entrenador</h2>
                        <div class="text-center space-y-5 mb-10 w-10/12 mx-auto">
                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p class="text-2xl font-medium text-gray-700" v-if="professional.first_name">
                                    {{ professional.first_name }} {{ professional.last_name }}</p>
                                <p class="text-2xl font-medium text-gray-700" v-else> Sin datos </p>
                            </div>

                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="text-2xl font-medium text-gray-700">{{ professional.email }}</p>
                            </div>
                        </div>
                        <div class="space-y-6 mb-6">
                            <div class="px-5 py-3 rounded-lg border flex items-center justify-between"
                                id="futureSessionsToggle" @click="toggleFutureSessions">
                                <!-- //toggle de sesiones próximas -->
                                <p class="text-lg">Sesiones próximas</p>
                                <Icon
                                    :name="isFutureSessionsVisible ? 'fa6-solid:chevron-down' : 'fa6-solid:chevron-right'" />

                            </div>
                            <div class="overflow-x-auto" id="futureSessions" v-show="isFutureSessionsVisible">
                                <div v-if="futureSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="futureSessions.length > 0"
                                    class="bg-white table-auto text-sm text-left w-full text-gray-500">
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b " v-for="session in futureSessions">
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.date }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.format }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.modality }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.actual_assistant }}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones próximas</p>
                                </div>
                            </div>
                            <div class="px-5 py-3 rounded-lg border flex items-center justify-between"
                                id="pastSessionsToggle" @click="togglePastSessions">
                                <!-- //toggle de sesiones pasadas -->
                                <p class="text-lg">Sesiones pasadas</p>
                                <Icon
                                    :name="isPastSessionsVisible ? 'fa6-solid:chevron-down' : 'fa6-solid:chevron-right'" />

                            </div>
                            <div class="overflow-x-auto" id="pastSessions" v-show="isPastSessionsVisible">
                                <div v-if="pastSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="pastSessions.length > 0"
                                    class="bg-white table-auto text-sm text-left w-full text-gray-500">
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b " v-for="session in pastSessions">
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.date }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap ">
                                                {{ session.format }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.modality }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ session.actual_assistant }}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones pasadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>

    </div>
</template>

<script setup lang="ts">



const runtimeConfig = useRuntimeConfig();



const isPastSessionsVisible = ref(false);
const isFutureSessionsVisible = ref(false);


const toggleFutureSessions = () => {
    isFutureSessionsVisible.value = !isFutureSessionsVisible.value;
}
const togglePastSessions = () => {
    isPastSessionsVisible.value = !isPastSessionsVisible.value;
}



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
    email: string;
}

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
}

const props = defineProps<{
    professional: Professional | null;
    futureSessions: Session[];
    pastSessions: Session[];
    futureSessionsLoading: boolean;
    pastSessionsLoading: boolean;
}>();

defineExpose({
    openModal
})

onMounted(() => {
    console.log(props.futureSessions)
})



</script>