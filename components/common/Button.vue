<template>
    <button :class="[
        'rounded-md',
        `bg-${bgColor}`,
        `text-${textColor}`,
        `disabled:bg-${bgColor}-100`,
        'disabled:cursor-not-allowed',
        `text-${textSize}`
    ]" :disabled="disabled || loading">
        <span v-if="!loading">
            <slot></slot>
        </span>
        <div v-else>
            <span>{{ loadingText }}</span>
            <span>
                <Icon :class="[
                    'animate-spin',
                    'ml-2',
                    `text-${textColor}`,
                    `text-${iconSize}`
                ]" name="fa6-solid:circle-notch" />
            </span>
        </div>
    </button>
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Cargando'
    },
    textSize: {
        type: String,
        default: 'base'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    bgColor: {
        type: String,
        default: 'primary'
    },
    textColor: {
        type: String,
        default: 'white'
    },
    iconSize: {
        type: String,
        default: '2xl'
    }
});
</script>