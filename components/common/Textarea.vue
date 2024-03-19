<template>
    <div>
        <label v-if="label" class="font-medium text-sm mb-2 inline-block" :for="id">{{ label }}</label>
        <div class="flex items-center w-full">
            <div
                class="border text-gray-800 text-sm rounded-md w-full flex px-5 py-3.5 focus-within:ring-2 focus-within:ring-primary">
                <div v-if="icon" class="mr-2">
                    <Icon :name="icon" class="text-secondary text-lg" />
                </div>
                <Field :id="id" :name="name" :modelValue="modelValue" as="textarea"
                    @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :rules="rules"
                    class="w-full outline-none resize-none" :rows="rows" :cols="cols" :maxlength="maxlength"></Field>
                <div v-if="rightText" class="ml-2">
                    <p>{{ rightText }}</p>
                </div>
            </div>
        </div>
        <ErrorMessage :name="name" class="block mt-1 rounded-lg text-red-500 text-sm" />
    </div>
</template>

<script setup>
defineProps(['modelValue', 'rules', 'placeholder', 'name', 'label', 'icon', 'id', 'rightText', 'rows', 'cols', 'maxlength']);
defineEmits(['update:modelValue']);
</script>