<template>
    <CommonModal ref="modalRef">
        <div class="p-6 text-center">
            <h2 class="text-2xl font-semibold mb-4">
                Información de la sesión
            </h2>
            <p class="text-lg font-medium">
                {{ eventTypeText }}
            </p>
            <p class="mb-4">{{ event?.start_time }} - {{ event?.end_time }}</p>

            <template v-if="event?.type === 'personal'">
                <h5 class="font-medium text-lg">Clientes</h5>
                <p v-if="event.clients.length === 0">
                    Aún no hay clientes agendados
                </p>
                <ul v-else>
                    <li v-for="client in event.clients" :key="client.id">
                        {{ client.name }}
                    </li>
                </ul>
            </template>

            <template
                v-else-if="['session', 'manual_session'].includes(event?.type)">
                <h5 class="font-medium text-lg">Formato</h5>
                <p class="mb-4">{{ event.session_info.format }}</p>
                <h5 class="font-medium text-lg">Modalidad</h5>
                <p>{{ event.session_info.modality }}</p>

                <template
                    v-if="event.type === 'session' && event.clients.length > 0">
                    <h5 class="font-medium text-lg">Clientes agendados</h5>
                    <ul>
                        <li v-for="client in event.clients" :key="client.id">
                            {{ client.name }}
                        </li>
                    </ul>
                </template>
            </template>
        </div>
    </CommonModal>
</template>

<script setup>
const props = defineProps({
    modal: Object,
});

const event = computed(() => props.modal.data.event);

const eventTypeText = computed(() => {
    switch (event.value?.type) {
        case "personal":
            return "Evento personal";
        case "session":
            return event.value.clients.length === 0
                ? "Disponible"
                : "Hora agendada";
        case "manual_session":
            return "Sesión manual";
        default:
            return "";
    }
});

const modalRef = ref(null);

const openModal = () => modalRef.value?.openModal();
const closeModal = () => modalRef.value?.closeModal();

defineExpose({ openModal, closeModal });
</script>
