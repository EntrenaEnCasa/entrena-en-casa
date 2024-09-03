<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="flex flex-col gap-y-3 px-2 py-4 md:px-8 md:py-6">
                    <button
                        @click="modal.addNewSession"
                        class="rounded bg-primary px-6 py-4 text-white"
                    >
                        <p class="font-semibold">Agregar bloque disponible para sesión</p>
                    </button>
                    <button
                        @click="modal.addNewEvent"
                        class="rounded bg-secondary px-6 py-4 text-white"
                    >
                        <p class="font-semibold">Agregar nuevo evento manualmente</p>
                        <p class="text-sm italic">Evento personal - Entrenamiento</p>
                    </button>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
const modalRef = ref(null);

const props = defineProps({
    modal: Object,
});

const handleOpenModal = () => {
    modalRef.value.openModal();
};

const handleCloseModal = () => {
    modalRef.value.closeModal();
};

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});
</script>
