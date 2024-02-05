<template>
    <div>
        <label v-if="label" class="block mb-1" :for="id">{{ label }}</label>
        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
            style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
            <div v-if="icon">
                <Icon :name="icon" class="text-secondary text-lg" />
            </div>
            <Field :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                class="w-full outline-none" :type="type" :id="id" :placeholder="placeholder" :rules="rules" />
        </div>
        <ErrorMessage class="block mt-1 rounded-lg text-red-500" :name="name" />
    </div>
</template>
<script setup>

defineProps(['modelValue', 'rules', 'placeholder', 'name', 'label', 'type', 'icon', 'id', 'rules']);
defineEmits(['update:modelValue']);

</script>