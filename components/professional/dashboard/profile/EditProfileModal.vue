<template>
    <CommonModal ref="modalRef">
        <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold">Editar Información Profesional</h2>
        </div>
        <div class="space-y-5 p-5">
            <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <label class="flex w-full flex-col">
                    <span class="mb-2 font-medium">Nombre</span>
                    <input
                        v-model="editData.first_name"
                        type="text"
                        placeholder="Tu nombre..."
                        class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                    />
                </label>
                <label class="flex w-full flex-col">
                    <span class="mb-2 font-medium">Apellido</span>
                    <input
                        v-model="editData.last_name"
                        type="text"
                        placeholder="Tu apellido..."
                        class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                    />
                </label>
            </div>
            <label class="flex w-full flex-col">
                <span class="mb-2 font-medium">Fecha de Nacimiento</span>
                <input
                    v-model="editData.birth_date"
                    type="date"
                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                />
            </label>
            <label class="flex w-full flex-col">
                <span class="mb-2 font-medium">Número de Teléfono</span>
                <input
                    v-model="editData.phone"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                />
            </label>
            <label class="flex w-full flex-col">
                <span class="mb-2 font-medium">Título Profesional *</span>
                <input
                    v-model="editData.title"
                    type="text"
                    placeholder="Ej: Entrenador Profesional"
                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                />
            </label>
            <label class="flex w-full flex-col">
                <span class="mb-2 font-medium">Instituto o Universidad</span>
                <input
                    v-model="editData.institution"
                    type="text"
                    placeholder="Nombre de tu institución..."
                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                />
            </label>
            <label class="flex w-full flex-col">
                <span class="mb-2 font-medium">Biografía</span>
                <textarea
                    v-model="editData.biography"
                    rows="4"
                    placeholder="Cuéntanos sobre ti y tu experiencia profesional..."
                    class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                ></textarea>
            </label>
        </div>
        <div class="flex justify-between p-5 pb-2">
            <CommonButton @click="closeModal" class="bg-tertiary px-5 py-2">
                Cancelar
            </CommonButton>
            <CommonButton @click="saveChanges" class="px-5 py-2">
                Guardar Cambios
            </CommonButton>
        </div>
    </CommonModal>
</template>

<script setup>
const props = defineProps({
    profileData: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['save']);

const modalRef = ref(null);
const editData = reactive({
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    title: '',
    institution: '',
    biography: ''
});

const openModal = () => {
    // Copy current profile data to edit data
    Object.assign(editData, props.profileData);
    
    // Convert birth_date to YYYY-MM-DD format for input type="date"
    if (editData.birth_date) {
        const date = new Date(editData.birth_date);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            editData.birth_date = `${year}-${month}-${day}`;
        }
    }
    
    modalRef.value.openModal();
};

const closeModal = () => {
    modalRef.value.closeModal();
};

const saveChanges = () => {
    // Remove email from updates (email is updated through a separate endpoint)
    const { email, ...updates } = editData;
    emit('save', updates);
    closeModal();
};

defineExpose({
    openModal,
    closeModal
});
</script>
