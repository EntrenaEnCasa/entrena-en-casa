<template>
    <div>
        <label v-if="label" class="font-medium text-sm mb-2 inline-block" :for="id">{{ label }}</label>
        <div class="flex items-center w-full">
            <div
                class="border text-gray-800 text-sm rounded-md w-full flex items-center px-5 py-3.5 focus-within:ring-2 focus-within:ring-primary">
                <div v-if="icon" class="mr-2">
                    <Icon :name="icon" class="text-secondary text-lg" />
                </div>
                <Field :id="id" :name="name" :modelValue="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)" :type="type" :placeholder="placeholder"
                    :rules="rules" class="w-full outline-none" />
                <div v-if="rightText" class="ml-2">
                    <p>{{ rightText }}</p>
                </div>
            </div>
        </div>
        <ErrorMessage :name="name" class="block mt-1 rounded-lg text-red-500 text-sm" />
    </div>
</template>
<style>
/* Removes arrows for number input types */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #333 !important;
    caret-color: #333;
}
</style>
<script setup>

defineProps(['modelValue', 'rules', 'placeholder', 'name', 'label', 'type', 'icon', 'id', 'rightText']);
defineEmits(['update:modelValue']);

</script>