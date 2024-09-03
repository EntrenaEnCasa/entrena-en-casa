<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="w-full p-5 text-center">
                    <h1 class="text-2xl font-bold">¿De verdad quieres eliminar este plan?</h1>
                    <p class="mt-2 text-gray-500">Esta acción no puede ser revertida</p>
                </div>
                <div class="flex items-center justify-center p-5">
                    <CommonButton
                        @click="deletePlan"
                        bg-color="tertiary"
                        class="mr-2 rounded-md px-4 py-2"
                    >
                        Eliminar Plan
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
const toast = useToast();
const runtimeConfig = useRuntimeConfig();

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
};
const closeModal = () => {
    modal.value?.closeModal();
};

const props = defineProps<{
    plan_id: number | null;
}>();

const deletePlan = async () => {
    if (!props.plan_id) {
        return;
    }
    try {
        const response = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/admin/plan/${props.plan_id}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        if (response.success) {
            toast.success("Plan eliminado correctamente");
            reloadNuxtApp();
            closeModal();
        } else {
            toast.error("Ocurrió un error al eliminar el plan");
        }
    } catch (error) {
        toast.error("Ocurrió un error al eliminar el plan");
    }
};
defineExpose({
    openModal,
    closeModal,
});
</script>
