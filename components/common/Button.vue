<template>
    <button :class="[
        'rounded-md',
        `bg-${color}`,
        'text-white',
        `disabled:bg-${color}-100`,
        'disabled:cursor-not-allowed',
        `text-${size}`
    ]" :disabled="disabled || loading">
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
    },
    disabled: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'primary'
    }
});
</script>
