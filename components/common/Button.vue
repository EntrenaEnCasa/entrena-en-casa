<template>
    <button class="bg-primary text-white rounded-sm" :class="'text-' + size">
        <span v-if="!loading">
            {{ text }}
        </span>
        <div v-else>
            <span>{{ loadingText }}</span>
            <span>
                <Icon :class="'text-' + size" class="animate-spin text-2xl text-white ml-2" name="fa6-solid:circle-notch" />
            </span>
        </div>
    </button>
</template>
<script setup>

const props = defineProps({
    text: {
        type: String,
        default: 'Botón'
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Cargando'
    },
    size: {
        type: String,
        default: 'base'
    }
});

</script>