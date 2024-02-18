<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                            </label>
                            <div class="col-span-2">
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Clientes</span>
                                    <ProfessionalDashboardCalendarClientSearchInput v-model:clients="modal.data.clients"
                                        :selectedFormat="modal.data.selectedFormat" />
                                </label>
                            </div>

                            <div class="grid gap-6 md:grid-cols-2 col-span-2">
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Formato</span>
                                    <select v-model="modal.data.selectedFormat"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Individual">Individual</option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Modalidad</span>
                                    <select v-model="modal.data.selectedModality"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Online">Online</option>
                                        <option v-if="modal.data.selectedFormat !== 'Grupal'" value="Presencial">
                                            Presencial</option>
                                    </select>
                                </label>
                            </div>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input v-model="modal.data.link" type="text" placeholder="https://"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary">
                            </label>
                        </div>
                        <div class="flex items-center my-10">
                            <input id="checkbox" type="checkbox" class="w-4 h-4 accent-primary-600 rounded">
                            <label for="checkbox" class="ms-2 text-sm text-gray-500">Enviar
                                notificación del evento</label>
                        </div>
                    </form>
                    <div>
                        <div class="flex justify-between">
                            <CommonButton @click="modal.removeSession" :loading="modal.data.removeSessionLoading"
                                class="px-4 py-2 bg-tertiary">
                                Eliminar sesión
                            </CommonButton>
                            <CommonButton @click="modal.updateSession" :loading="modal.data.updateSessionLoading"
                                class="px-4 py-2">
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