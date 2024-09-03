<template>
    <div>
        <label v-if="label" class="mb-2 inline-block text-sm font-medium" :for="id">{{
            label
        }}</label>
        <div class="flex w-full items-center">
            <div
                class="flex w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 focus-within:ring-2 focus-within:ring-primary"
            >
                <div v-if="icon" class="mr-2">
                    <Icon :name="icon" class="text-lg text-secondary" />
                </div>
                <Field
                    :id="id"
                    :name="name"
                    :modelValue="modelValue"
                    as="textarea"
                    @input="$emit('update:modelValue', $event.target.value)"
                    :placeholder="placeholder"
                    :rules="rules"
                    class="w-full resize-none outline-none"
                    :rows="rows"
                    :cols="cols"
                    :maxlength="maxlength"
                ></Field>
                <div v-if="rightText" class="ml-2">
                    <p>{{ rightText }}</p>
                </div>
            </div>
        </div>
        <ErrorMessage :name="name" class="mt-1 block rounded-lg text-sm text-red-500" />
    </div>
</template>

<script setup>
defineProps([
    "modelValue",
    "rules",
    "placeholder",
    "name",
    "label",
    "icon",
    "id",
    "rightText",
    "rows",
    "cols",
    "maxlength",
]);
defineEmits(["update:modelValue"]);
</script>
