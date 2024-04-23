<!-- EventDetails component -->
<template>
    <div>
        <template v-if="event.type === 'personal'">
            <h4 class="font-medium text-sm">Evento personal</h4>
            <p class="text-xs">
                {{ event.start_time }} - {{ event.end_time }}
            </p>
        </template>
        <template v-else-if="event.type === 'session' && event.clients.length === 0">
            <h4 class="font-medium text-sm">Disponible</h4>
            <p class="text-xs">
                {{ timeSlot.time }} - {{ calculateEndTime(timeSlot.time) }}
            </p>
        </template>
        <template v-else-if="event.type === 'session' && event.clients.length > 0">
            <h4 class="font-medium text-sm">Hora agendada</h4>
            <p class="text-xs">
                {{ timeSlot.time }} - {{ calculateEndTime(timeSlot.time) }}
            </p>
        </template>
        <template v-else-if="event.type === 'manual_session'">
            <h4 class="font-medium text-sm">Sesión manual</h4>
            <p class="text-xs">
                {{ timeSlot.time }} - {{ calculateEndTime(timeSlot.time) }}
            </p>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    event: Object,
    timeSlot: Object,
});

const calculateEndTime = (startTime) => {
    const time = new Date();
    const [hours, minutes] = startTime.split(':');
    time.setHours(parseInt(hours, 10));
    time.setMinutes(parseInt(minutes, 10));
    time.setHours(time.getHours() + 1);
    return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};
</script>