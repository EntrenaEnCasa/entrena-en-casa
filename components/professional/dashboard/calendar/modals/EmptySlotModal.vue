<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="flex flex-col gap-5 p-10">
                    <button @click="modal.addNewSession" class="px-10 py-4 bg-primary text-white rounded">
                        <p class="font-semibold">
                            Agregar bloque disponible para sesión
                        </p>
                    </button>
                    <button @click="modal.addNewEvent" class="px-10 py-4 bg-secondary text-white rounded">
                        <p class="font-semibold">
                            Agregar nuevo evento manualmente
                        </p>
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