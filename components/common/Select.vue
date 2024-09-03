<template>
    <div>
        <label v-if="label" class="mb-2 inline-block text-sm font-medium" :for="id">
            {{ label }}
        </label>
        <div class="flex w-full items-center">
            <div v-if="icon" class="mr-2">
                <Icon :name="icon" class="text-lg text-secondary" />
            </div>
            <Field
                :id="id"
                :name="name"
                v-model="internalValue"
                as="select"
                class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                :rules="rules"
            >
                <option v-if="placeholder" disabled value="">
                    {{ placeholder }}
                </option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </Field>
        </div>
        <ErrorMessage :name="name" class="mt-1 block rounded-lg text-sm text-red-500" />
    </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    placeholder: String,
    name: String,
    label: String,
    type: String,
    icon: String,
    id: String,
    options: Array,
    rules: [String, Object, Array],
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        internalValue.value = newValue;
    },
);

watch(internalValue, (newValue) => {
    emit("update:modelValue", newValue);
});
</script>
