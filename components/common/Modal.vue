<template>
    <Transition name="modal">
        <div v-show="isOpen" class="fixed grid place-items-center inset-0 z-50 p-4 bg-black/30 overflow-y-auto"
            @mousedown.self="closeModal">
            <div @click.stop class="p-4 bg-white rounded-xl max-w-[calc(100vw_-_50px)] w-full lg:w-fit">
                <div>
                    <button type="button" class="p-1 transition duration-75 bg-transparent rounded-lg hover:bg-gray-100"
                        @click="closeModal">
                        <div class="flex items-center gap-x-1 text-primary">
                            <Icon name="ic:round-close" class="text-3xl" />
                            <p class="text-xl font-medium">Cerrar</p>
                        </div>
                        <span class="sr-only">Cerrar modal</span>
                    </button>
                </div>
                <div class="mx-auto md:min-w-[40rem] w-full md:w-auto">
                    <div class="w-full">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-from {
    opacity: 0;
}

.modal-enter-to {
    opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.2s ease;
}

.modal-leave-from {
    opacity: 1;
}

.modal-leave-to {
    opacity: 0;
}
</style>

<script setup>

const isOpen = ref(false);

const openModal = () => {
    // document.body.classList.add('overflow-hidden');
    isOpen.value = true;

    // Add the event listener
    window.addEventListener('keydown', handleKeyDown);
};

const closeModal = () => {
    isOpen.value = false;
    // document.body.classList.remove('overflow-hidden');

    // Remove the event listener
    window.removeEventListener('keydown', handleKeyDown);
};

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

defineExpose({
    openModal,
    closeModal
})

</script>