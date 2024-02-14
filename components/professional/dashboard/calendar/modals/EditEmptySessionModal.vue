<template>
  <div>
    <Teleport to="body">
      <CommonModal ref="modalRef">
        <div class="px-6 py-4">
          <ProfessionalDashboardCalendarDayNavigation />
          <form action="">
            <div class="flex flex-col py-2 max-w-max mx-auto mb-5">
              <ProfessionalDashboardCalendarTimeRange :isManual="false" />
            </div>
            <div class="grid gap-6 mb-6">
              <label class="w-full flex flex-col">
                <span class="font-medium text-sm mb-2">Formato</span>
                <select v-model="modal.data.selectedFormat"
                  class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                  <option value="Individual">Individual</option>
                  <option value="Grupal">Grupal</option>
                </select>
              </label>
              <label class="w-full flex flex-col">
                <span class="font-medium text-sm mb-2">Modalidad</span>
                <select v-model="modal.data.selectedModality"
                  class="border text-gray-800 bg-white text-sm rounded-md w-full px-5 py-3.5 outline-primary">
                  <option value="Online">Online</option>
                  <option value="Presencial">Presencial</option>
                </select>
              </label>
            </div>
          </form>
          <div>
            <div class="flex justify-between">
              <CommonButton text="Eliminar sesión" @click="modal.removeSession" :loading="modal.data.removeSessionLoading"
                class="px-4 py-2 bg-tertiary" />

              <CommonButton text="Confirmar cambios" @click="modal.updateSession"
                :loading="modal.data.updateSessionLoading" class="px-4 py-2" />
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