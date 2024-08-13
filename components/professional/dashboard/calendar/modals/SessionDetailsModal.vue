<!-- EventDetails component -->
<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modalRef">
                <div class="px-6 py-4">
                    <div class="text-center">
                        <h2 class="text-2xl font-semibold mb-4">
                            Información de la sesión
                        </h2>
                        <div class="text-lg">
                            <h4
                                v-if="modal.data.event?.type === 'personal'"
                                class="font-medium">
                                Evento personal
                            </h4>
                            <h4
                                v-else-if="
                                    modal.data.event?.type === 'session' &&
                                    modal.data.event?.clients.length === 0
                                "
                                class="font-medium">
                                Disponible
                            </h4>
                            <h4
                                v-else-if="
                                    modal.data.event?.type === 'session' &&
                                    modal.data.event?.clients.length > 0
                                "
                                class="font-medium">
                                Hora agendada
                            </h4>
                            <h4
                                v-else-if="
                                    modal.data.event?.type === 'manual_session'
                                "
                                class="font-medium">
                                Sesión manual
                            </h4>
                        </div>
                        <p class="mb-4">
                            {{ modal.data.event?.start_time }} -
                            {{ modal.data.event?.end_time }}
                        </p>
                        <div v-if="modal.data.event?.type == 'personal'">
                            <h5 class="font-medium text-lg">Clientes</h5>
                            <p v-if="modal.data.event?.clients.length == 0">
                                Aún no hay clientes agendados
                            </p>
                            <ul>
                                <li
                                    v-for="client in modal.data.event?.clients"
                                    :key="client.id">
                                    {{ client.name }}
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="modal.data.event?.type == 'session'">
                            <h5 class="font-medium text-lg">Formato</h5>
                            <p class="mb-4">
                                {{ modal.data.event?.session_info.format }}
                            </p>
                            <h5 class="font-medium text-lg">Modalidad</h5>
                            <p>{{ modal.data.event?.session_info.modality }}</p>

                            <div v-if="modal.data.event?.clients.length > 0">
                                <h5 class="font-medium text-lg">
                                    Clientes agendados
                                </h5>
                                <ul>
                                    <li
                                        v-for="client in modal.data.event
                                            ?.clients"
                                        :key="client.id">
                                        {{ client.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            v-else-if="
                                modal.data.event?.type == 'manual_session'
                            ">
                            <h5 class="font-medium text-lg">Formato</h5>
                            <p class="mb-4">
                                {{ modal.data.event?.session_info.format }}
                            </p>
                            <h5 class="font-medium text-lg">Modalidad</h5>
                            <p>{{ modal.data.event?.session_info.modality }}</p>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
const props = defineProps({
    modal: Object,
});

const modalRef = ref(null);

const handleOpenModal = () => {
    console.log("event: ", props.modal.data.event);
    modalRef.value?.openModal();
};

const handleCloseModal = () => {
    modalRef.value?.closeModal();
};

defineExpose({
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
});
</script>
