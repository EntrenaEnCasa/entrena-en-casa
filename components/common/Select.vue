<template>
    <div>
        <label v-if="label" class="font-medium text-sm mb-2 inline-block" :for="id">{{
            label
        }}</label>
        <div class="flex items-center w-full">
            <div v-if="icon" class="mr-2">
                <Icon :name="icon" class="text-secondary text-lg" />
            </div>
            <Field
                :id="id"
                :name="name"
                :modelValue="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                as="select"
                class="border text-gray-800 text-sm rounded-md w-full px-5 py-3.5 outline-none focus:ring-2 ring-primary"
                :rules="rules">
                <option v-if="placeholder" disabled value="">
                    {{ placeholder }}
                </option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </Field>
        </div>
        <ErrorMessage :name="name" class="block mt-1 rounded-lg text-red-500 text-sm" />
    </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps([
    "modelValue",
    "placeholder",
    "name",
    "label",
    "type",
    "icon",
    "id",
    "options",
    "rules",
]);
defineEmits(["update:modelValue"]);
</script>
