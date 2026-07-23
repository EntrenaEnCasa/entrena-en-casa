<template>
    <div>
        <label v-if="label" class="mb-2 block text-sm font-semibold text-gray-800" :for="id">
            {{ label }}
        </label>
        <div ref="rootRef" class="relative">
            <button
                :id="id"
                ref="buttonRef"
                type="button"
                class="flex w-full items-center rounded-xl border bg-white px-4 py-3.5 text-left text-sm outline-none transition"
                :class="open ? accentClasses.ring : 'border-gray-200'"
                aria-haspopup="listbox"
                :aria-expanded="open"
                @click="toggle"
                @keydown.down.prevent="onArrowDown"
                @keydown.up.prevent="onArrowUp"
                @keydown.enter.prevent="onEnter"
                @keydown.space.prevent="onEnter"
                @keydown.esc="close"
            >
                <Icon v-if="icon" :name="icon" class="mr-3 shrink-0 text-base" :class="accentClasses.text" />
                <span class="flex-1 truncate" :class="selectedLabel ? 'text-gray-800' : 'text-gray-400'">
                    {{ selectedLabel || placeholder }}
                </span>
                <Icon
                    name="fa6-solid:chevron-down"
                    class="ml-2 shrink-0 text-sm text-gray-400 transition-transform"
                    :class="open ? 'rotate-180' : ''"
                />
            </button>

            <ul
                v-if="open"
                role="listbox"
                class="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
            >
                <li
                    v-for="(option, index) in options"
                    :key="option.value"
                    role="option"
                    :aria-selected="option.value === value"
                    class="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm"
                    :class="[
                        accentClasses.hover,
                        option.value === value ? `font-medium ${accentClasses.text}` : 'text-gray-700',
                        index === activeIndex ? accentClasses.active : '',
                    ]"
                    @click="select(option)"
                    @mouseenter="activeIndex = index"
                >
                    <span class="truncate">{{ option.label }}</span>
                    <Icon
                        v-if="option.value === value"
                        name="fa6-solid:check"
                        class="ml-2 shrink-0"
                        :class="accentClasses.text"
                    />
                </li>
            </ul>
        </div>
        <ErrorMessage :name="name" class="mt-1 block text-sm text-red-500" />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    modelValue: [String, Number],
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" },
    label: String,
    icon: String,
    name: { type: String, required: true },
    id: String,
    rules: [String, Object, Array, Function],
    accent: { type: String, default: "secondary" },
});
const emit = defineEmits(["update:modelValue"]);

const accentPalette = {
    secondary: {
        ring: "border-secondary ring-2 ring-secondary/20",
        text: "text-secondary",
        hover: "hover:bg-secondary/10",
        active: "bg-secondary/10",
    },
    primary: {
        ring: "border-primary ring-2 ring-primary/20",
        text: "text-primary",
        hover: "hover:bg-primary/10",
        active: "bg-primary/10",
    },
};

const accentClasses = computed(() => accentPalette[props.accent] ?? accentPalette.secondary);

const { value, handleBlur } = useField(
    () => props.name,
    () => props.rules,
    { initialValue: props.modelValue },
);

watch(value, (newValue) => {
    emit("update:modelValue", newValue);
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== value.value) value.value = newValue;
    },
);

const selectedLabel = computed(
    () => props.options.find((option) => option.value === value.value)?.label,
);

const open = ref(false);
const activeIndex = ref(-1);
const rootRef = ref(null);
const buttonRef = ref(null);

const openList = () => {
    open.value = true;
    activeIndex.value = props.options.findIndex((option) => option.value === value.value);
};

const close = () => {
    if (!open.value) return;
    open.value = false;
    handleBlur();
};

const toggle = () => (open.value ? close() : openList());

const select = (option) => {
    value.value = option.value;
    close();
    buttonRef.value?.focus();
};

const onArrowDown = () => {
    if (!open.value) {
        openList();
        return;
    }
    activeIndex.value = Math.min(activeIndex.value + 1, props.options.length - 1);
};

const onArrowUp = () => {
    if (!open.value) {
        openList();
        return;
    }
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
};

const onEnter = () => {
    if (!open.value) {
        openList();
        return;
    }
    if (activeIndex.value >= 0) select(props.options[activeIndex.value]);
};

const onDocumentClick = (event) => {
    if (rootRef.value && !rootRef.value.contains(event.target)) close();
};

onMounted(() => document.addEventListener("click", onDocumentClick));
onUnmounted(() => document.removeEventListener("click", onDocumentClick));
</script>
