<!-- EventDetails component -->
<template>
    <div>
        <h4 v-if="event.type === 'personal'" class="font-medium text-sm">
            Evento personal
        </h4>
        <h4 v-else-if="event.type === 'session' && event.clients.length === 0" class="font-medium text-sm">
            Disponible
        </h4>
        <h4 v-else-if="event.type === 'session' && event.clients.length > 0" class="font-medium text-sm">
            Hora agendada
        </h4>
        <h4 v-else-if="event.type === 'manual_session'" class="font-medium text-sm">
            Sesión manual
        </h4>
        <p class="text-xs">
            {{ event.start_time }} - {{ event.end_time }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    event: Object,
    timeSlot: Object,
});

</script>