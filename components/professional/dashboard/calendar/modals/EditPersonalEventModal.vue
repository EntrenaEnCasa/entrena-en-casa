<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <label class="w-full flex flex-col col-span-2">
                                    <span class="font-medium text-sm mb-2">Clientes (opcional)</span>
                                    <ProfessionalDashboardCalendarClientSearchInput v-model:clients="modal.data.clients"
                                        :selectedFormat="modal.data.selectedFormat" />
                                </label>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Información adicional (opcional)</span>
                                <textarea v-model="modal.data.additionalInfo" placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                                    rows="4"></textarea>
                            </label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <CommonButton @click="modal.removeSession" text="Eliminar evento" class="px-4 py-2 bg-tertiary"
                                :loading="modal.data.removeSessionLoading" />
                            <CommonButton text="Confirmar cambios" @click="modal.updateSession" class="px-4 py-2"
                                :loading="modal.data.updateSessionLoading" />
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
})

const handleOpenModal = () => {
    modalRef.value?.openModal();
}

const handleCloseModal = () => {
    modalRef.value?.closeModal();
}

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});

</script>
  
<style></style>