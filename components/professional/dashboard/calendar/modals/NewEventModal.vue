<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <label class="w-full">
                            <select class="mb-6 border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5"
                                v-model="modal.data.selectedEventType">
                                <option value="Nuevo entrenamiento">Nuevo entrenamiento</option>
                                <option value="Evento personal">Evento personal</option>
                            </select>
                        </label>
                        <div v-show="modal.data.selectedEventType == 'Evento personal'"
                            class="grid gap-6 mb-6 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="true" />
                            </label>
                            <label class="w-full flex flex-col col-span-2">
                                <label class="w-full flex flex-col">
                                    <span class="font-medium text-sm mb-2">Clientes (opcional)</span>
                                    <ProfessionalDashboardCalendarClientSearchInput
                                        v-model:modelValue="modal.data.personalEvent.clients"
                                        :selectedFormat="modal.data.personalEvent.selectedFormat" />
                                </label>
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Información adicional (opcional)</span>
                                <textarea v-model="modal.data.personalEvent.additionalInfo"
                                    placeholder="Ingresar detalles del cliente"
                                    class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                                    rows="4"></textarea>
                            </label>

                        </div>
                        <div v-show="modal.data.selectedEventType == 'Nuevo entrenamiento'"
                            class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                            <label class="flex flex-col items-center col-span-2">
                                <span class="font-medium text-sm mb-2">Horario</span>
                                <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                            </label>

                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Clientes</span>
                                <ProfessionalDashboardCalendarClientSearchInput
                                    v-model:modelValue="modal.data.manualSession.clients"
                                    :selectedFormat="modal.data.manualSession.selectedFormat" />
                            </label>

                            <div class="grid gap-6 md:grid-cols-2 col-span-2">
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Formato</span>
                                    <select v-model="modal.data.manualSession.selectedFormat"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Individual">Individual</option>
                                        <option value="Grupal">Grupal</option>
                                    </select>
                                </label>
                                <label class="flex flex-col">
                                    <span class="font-medium text-sm mb-2">Modalidad</span>
                                    <select v-model="modal.data.manualSession.selectedModality"
                                        class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                                        <option value="Online">Online</option>
                                        <option value="Presencial">Presencial</option>
                                    </select>
                                </label>
                            </div>
                            <label class="w-full flex flex-col col-span-2">
                                <span class="font-medium text-sm mb-2">Link</span>
                                <input v-model="modal.data.manualSession.link" type="text" placeholder="https://"
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
                            <CommonButton @click="modal.closeModal" text="Cancelar"
                                class="px-4 py-2 bg-tertiary text-white" />
                            <CommonButton text="Crear nuevo evento" @click="modal.addNewEvent" class="px-4 py-2"
                                :loading="modal?.data.loading" />
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">

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