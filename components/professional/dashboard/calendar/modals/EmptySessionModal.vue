<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <ProfessionalDashboardCalendarDayNavigation />
                    <form action="">
                        <ProfessionalDashboardCalendarTimeRange :isManual="false" />
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
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
                    </form>
                    <div>
                        <p class="text-sm text-gray-500 mb-4 text-center">* Para presencial se aplicarán los
                            rangos de cobertura
                            propuestos
                            en el perfil
                        </p>
                        <div class="flex justify-between">
                            <CommonButton @click="modal.closeModal" text="Cancelar" class="px-4 py-2 bg-tertiary" />
                            <CommonButton text="Crear nueva sesión" @click="modal.addNewEmptySession" class="px-4 py-2"
                                :loading="modal.loading" />
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