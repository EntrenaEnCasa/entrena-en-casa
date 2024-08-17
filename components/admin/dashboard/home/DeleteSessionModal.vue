type: Object,
<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full p-5 text-center">
                    <h1 class="text-2xl font-bold">¿De verdad quieres eliminar esta sesión?</h1>
                    <p class="text-gray-500 mt-2">Esta acción no puede ser revertida</p>
                </div>
                <table
                    class="bg-white table-auto text-sm text-center mx-auto mb-2"
                    v-if="sessionInfo">
                    <thead class="text-gray-400">
                        <tr>
                            <th scope="col" class="font-medium"></th>
                            <th scope="col" class="font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-6 py-2">
                                <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                    <p class="font-light text-right">Profesional</p>
                                    <p class="font-bold text-left">
                                        {{ sessionInfo.professional.first_name }}
                                        {{ sessionInfo.professional.last_name }}
                                        - {{ sessionInfo.professional.title }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                    <p class="font-light text-right">Fecha</p>
                                    <p class="font-bold text-left">
                                        {{ sessionInfo.date }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                    <p class="font-light text-right">Hora</p>
                                    <p class="font-bold text-left">{{ sessionInfo.time }} hrs</p>
                                </div>
                                <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                    <p class="font-light text-right">Modalidad</p>
                                    <p class="font-bold text-left">
                                        {{ sessionInfo.modality }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5">
                                    <p class="font-light text-right">Formato</p>
                                    <p class="font-bold text-left">
                                        {{ sessionInfo.format }}
                                    </p>
                                </div>
                                <div
                                    class="grid grid-cols-2 w-5/6 mx-auto gap-5 mb-5"
                                    v-if="sessionInfo.students.length > 0">
                                    <p class="font-light text-right">Estudiante(s)</p>
                                    <div>
                                        <p
                                            v-for="student in sessionInfo.students"
                                            class="font-bold text-left">
                                            {{ student.email }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-center items-center p-5">
                    <CommonButton
                        @click="deleteSession"
                        bg-color="tertiary"
                        class="px-4 py-2 rounded-md mr-2">
                        Eliminar sesión
                    </CommonButton>
                    <CommonButton
                        @click="closeModal"
                        bg-color="gray-200"
                        text-color="gray-700"
                        class="px-4 py-2 rounded-md">
                        Cancelar
                    </CommonButton>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { useToast } from "vue-toastification";
const runtimeConfig = useRuntimeConfig();

const toast = useToast();
const modal = ref<Modal | null>(null);

const props = defineProps<{
    sessionInfo: SessionInfo | null;
}>();

const openModal = () => {
    modal.value?.openModal();
};

const closeModal = () => {
    modal.value?.closeModal();
};

defineExpose({
    openModal,
    closeModal,
});

const deleteSession = async () => {
    if (!props.sessionInfo) return;
    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/session/${props.sessionInfo.session_id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (response.success) {
            toast.success(response.message);
            reloadNuxtApp();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        closeModal();
    }
};
</script>
