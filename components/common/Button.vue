<template>
    <button
        :class="[
            `rounded-${roundedSize}`,
            `bg-${bgColor}`,
            `text-${textColor}`,
            `disabled:bg-${bgColor}-100`,
            'disabled:cursor-not-allowed',
            `text-${textSize}`,
        ]"
        :disabled="disabled || loading"
        @click="handleClick"
    >
        <span v-if="!loading" class="inline-flex items-center justify-center gap-1">
            <slot></slot>
            <Icon
                v-if="to"
                name="tabler:external-link"
                class="h-4 w-4"
                :class="[`text-${textColor}`]"
            />
        </span>
        <div v-else class="inline-flex items-center justify-center gap-1">
            <span>{{ loadingText }}</span>
            <span>
                <Icon
                    :class="['animate-spin', `text-${textColor}`, `text-${iconSize}`]"
                    name="fa6-solid:circle-notch"
                />
            </span>
        </div>
    </button>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    loadingText: {
        type: String,
        default: "Cargando",
    },
    textSize: {
        type: String,
        default: "base",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    bgColor: {
        type: String,
        default: "primary",
    },
    textColor: {
        type: String,
        default: "white",
    },
    iconSize: {
        type: String,
        default: "2xl",
    },
    roundedSize: {
        type: String,
        default: "md",
    },
    to: {
        type: [String, Object],
        default: null,
    },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
    if (props.to) {
        router.push(props.to);
    } else {
        emit("click", event);
    }
};
</script>
