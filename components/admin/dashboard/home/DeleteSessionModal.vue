<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full p-5 text-center">
                    <h1 class="text-2xl font-bold">¿De verdad quieres eliminar esta sesión?</h1>
                    <p class="mt-2 text-gray-500">Esta acción no puede ser revertida</p>
                </div>
                <table
                    class="mx-auto mb-2 table-auto bg-white text-center text-sm"
                    v-if="sessionInfo"
                >
                    <thead class="text-gray-400">
                        <tr>
                            <th scope="col" class="font-medium"></th>
                            <th scope="col" class="font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-6 py-2">
                                <div class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5">
                                    <p class="text-right font-light">Profesional</p>
                                    <p class="text-left font-bold">
                                        {{ sessionInfo.professional.first_name }}
                                        {{ sessionInfo.professional.last_name }}
                                        - {{ sessionInfo.professional.title }}
                                    </p>
                                </div>
                                <div class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5">
                                    <p class="text-right font-light">Fecha</p>
                                    <p class="text-left font-bold">
                                        {{ sessionInfo.date }}
                                    </p>
                                </div>
                                <div class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5">
                                    <p class="text-right font-light">Hora</p>
                                    <p class="text-left font-bold">{{ sessionInfo.time }} hrs</p>
                                </div>
                                <div class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5">
                                    <p class="text-right font-light">Modalidad</p>
                                    <p class="text-left font-bold">
                                        {{ sessionInfo.modality }}
                                    </p>
                                </div>
                                <div class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5">
                                    <p class="text-right font-light">Formato</p>
                                    <p class="text-left font-bold">
                                        {{ sessionInfo.format }}
                                    </p>
                                </div>
                                <div
                                    class="mx-auto mb-5 grid w-5/6 grid-cols-2 gap-5"
                                    v-if="sessionInfo.students.length > 0"
                                >
                                    <p class="text-right font-light">Estudiante(s)</p>
                                    <div>
                                        <p
                                            v-for="student in sessionInfo.students"
                                            class="text-left font-bold"
                                        >
                                            {{ student.email }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:justify-center">
                    <CommonButton
                        @click="deleteSession"
                        bg-color="tertiary"
                        class="mr-2 rounded-md px-4 py-2"
                    >
                        Eliminar sesión
                    </CommonButton>
                    <CommonButton
                        @click="closeModal"
                        bg-color="gray-200"
                        text-color="gray-700"
                        class="rounded-md px-4 py-2"
                    >
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
            },
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
