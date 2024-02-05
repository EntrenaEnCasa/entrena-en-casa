<template>
    <div>
        <label v-if="label" class="block mb-1" :for="id">{{ label }}</label>
        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
            style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
            <div v-if="icon">
                <Icon :name="icon" class="text-secondary text-lg" />
            </div>
            <Field :id="id" :name="name" :modelValue="modelValue" @input="$emit('update:modelValue', $event)" as="select"
                class="w-full outline-none" :rules="rules">
                <option disabled value="">{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </Field>
        </div>
        <ErrorMessage :name="name" class="block mt-1 rounded-lg text-red-500" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';

defineProps(['modelValue', 'placeholder', 'name', 'label', 'type', 'icon', 'id', 'options', 'rules']);
defineEmits(['update:modelValue']);
</script>
