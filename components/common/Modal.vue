<template>
    <Transition name="modal">
        <div v-show="isOpen"
            class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full flex justify-center items-center backdrop-blur-sm bg-black/30"
            :class="{ 'modal-open': isOpen }" @click="closeModal">
            <div @click.stop
                class="w-full md:w-auto bg-white rounded-xl p-4 flex flex-col justify-between max-w-[calc(100vw_-_50px)] max-h-[calc(100vh_-_80px)] relative overflow-y-auto">
                <div>
                    <button type="button" class="bg-transparent hover:bg-gray-100 transition duration-75 rounded-lg p-1"
                        @click="closeModal">
                        <div class="flex items-center gap-x-1 text-primary">
                            <Icon name="ic:round-close" class="text-3xl" />
                            <p class="text-xl font-medium">Cerrar</p>
                        </div>
                        <span class="sr-only">Cerrar modal</span>
                    </button>
                </div>
                <div class="flex flex-col items-center mx-auto md:min-w-[40rem] w-full md:w-auto">
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

import { ref } from 'vue';

const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
    const body = document.querySelector('body');
    body.classList.add('modal-open');

    // Add the event listener
    window.addEventListener('keydown', handleKeyDown);
};

const closeModal = () => {
    isOpen.value = false;
    const body = document.querySelector('body');
    body.classList.remove('modal-open');

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