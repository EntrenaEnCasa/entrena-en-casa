<template>
    <Transition name="modal">
        <div
            ref="scrollableContentRef"
            v-show="isOpen"
            class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/30 p-4"
            @mousedown.self="closeModal"
        >
            <div
                @click.stop
                class="w-full max-w-[calc(100vw_-_50px)] rounded-xl bg-white p-4 lg:w-fit"
            >
                <div>
                    <button
                        type="button"
                        class="rounded-lg bg-transparent p-1 transition duration-75 hover:bg-gray-100"
                        @click="closeModal"
                    >
                        <div class="flex items-center gap-x-1 text-primary">
                            <Icon name="ic:round-close" class="text-3xl" />
                            <p class="text-xl font-medium">Cerrar</p>
                        </div>
                        <span class="sr-only">Cerrar modal</span>
                    </button>
                </div>
                <div class="mx-auto w-full md:w-auto md:min-w-[40rem]">
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
const emit = defineEmits(['modal-closed'])

const isOpen = ref(false);
const scrollableContentRef = ref(null);

const openModal = () => {
    // document.body.classList.add('overflow-hidden');
    isOpen.value = true;

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);
};

const closeModal = () => {
    isOpen.value = false;
    // document.body.classList.remove('overflow-hidden');

    // Remove the event listener
    window.removeEventListener("keydown", handleKeyDown);
    
    // Emit event when modal closes
    emit('modal-closed');
};

const handleKeyDown = (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
};

const scrollToTop = () => {
    scrollableContentRef.value.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToBottom = () => {
    nextTick(() => {
        scrollableContentRef.value.scrollTo({
            top: scrollableContentRef.value.offsetHeight,
            behavior: "smooth",
        });
    });
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

defineExpose({
    openModal,
    closeModal,
    scrollToTop,
    scrollToBottom,
});
</script>
