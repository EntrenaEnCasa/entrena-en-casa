<template>
    <CommonModal ref="modalRef">
        <div class="relative mb-8 mt-2 text-center">
            <button
                @click="closeModal"
                class="absolute left-0 top-0 text-2xl text-gray-500 hover:text-gray-700"
            >
                <Icon name="fa6-solid:xmark" />
            </button>
            <h2 class="text-2xl font-bold">Subir Fotografía</h2>
        </div>
        <div class="p-5">
            <div
                @dragover.prevent
                @drop.prevent="handleFileDrop"
                @click="triggerFileInput"
                class="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition-colors hover:border-primary hover:bg-gray-100"
            >
                <Icon name="fa6-solid:arrow-up-from-bracket" class="mb-4 text-6xl text-gray-400" />
                <p class="mb-2 text-gray-600">Haz clic para subir o arrastra y suelta</p>
                <p class="text-sm text-gray-500">PNG, JPG o GIF</p>
                <input
                    ref="fileInput"
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    @change="handleFileSelect"
                    class="hidden"
                />
            </div>
        </div>
        <div class="flex justify-between p-5 pb-2">
            <CommonButton @click="closeModal" class="bg-tertiary px-5 py-2">
                Cancelar
            </CommonButton>
        </div>
    </CommonModal>
</template>

<script setup>
import { useToast } from "vue-toastification";

const emit = defineEmits(['fileSelected']);

const modalRef = ref(null);
const fileInput = ref(null);
const toast = useToast();

const openModal = () => {
    modalRef.value.openModal();
};

const closeModal = () => {
    modalRef.value.closeModal();
};

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        processFile(file);
    }
};

const handleFileDrop = (event) => {
    const file = event.dataTransfer.files?.[0];
    if (file) {
        processFile(file);
    }
};

const processFile = (file) => {
    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        toast.error('Tipo de archivo no válido. Solo PNG, JPG o GIF.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        emit('fileSelected', {
            file: file,
            url: e.target.result
        });
        closeModal();
    };
    reader.readAsDataURL(file);
};

defineExpose({
    openModal,
    closeModal
});
</script>
