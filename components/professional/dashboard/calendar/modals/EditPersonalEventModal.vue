<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-4 py-4 sm:px-6">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <div class="mb-6 grid gap-6 md:grid-cols-2">
                            <label class="col-span-2 flex flex-col items-center">
                                <span class="mb-2 text-sm font-medium">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="true" />
                            </label>
                            <label class="col-span-2 flex w-full flex-col">
                                <label class="col-span-2 flex w-full flex-col">
                                    <span class="mb-2 text-sm font-medium"
                                        >Clientes (opcional)</span
                                    >
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:clients="modal.data.clients"
                                        :selectedFormat="modal.data.selectedFormat"
                                    />
                                </label>
                            </label>

                            <label class="col-span-2 flex w-full flex-col">
                                <span class="mb-2 text-sm font-medium"
                                    >Información adicional (opcional)</span
                                >
                                <textarea
                                    v-model="modal.data.additionalInfo"
                                    placeholder="Ingresar detalles del cliente"
                                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                                    rows="4"
                                ></textarea>
                            </label>
                        </div>
                    </form>
                    <div>
                        <div
                            class="flex flex-col-reverse justify-between gap-x-4 gap-y-2 sm:flex-row"
                        >
                            <CommonButton
                                @click="modal.removeSession"
                                class="bg-tertiary px-4 py-2"
                                :loading="modal.data.removeSessionLoading"
                            >
                                Eliminar sesión
                            </CommonButton>
                            <CommonButton
                                @click="modal.updateSession"
                                class="px-4 py-2"
                                :loading="modal.data.updateSessionLoading"
                            >
                                Guardar cambios
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
const modalRef = ref<Modal | null>(null);

defineProps({
    modal: {
        type: Object,
        required: true,
    },
});

const handleOpenModal = () => {
    modalRef.value?.openModal();
};

const handleCloseModal = () => {
    modalRef.value?.closeModal();
};

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});
</script>

<style></style>
