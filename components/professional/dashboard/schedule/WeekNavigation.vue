<template>
    <div class="flex items-center justify-self-center md:justify-self-start text-2xl">
        <button @click="goToPreviousWeek" :disabled="!isCurrentWeekOrLater">
            <Icon :class="{ 'text-gray-300': !isCurrentWeekOrLater, 'text-gray-800': isCurrentWeekOrLater }"
                name="fa6-solid:chevron-left"></Icon>
        </button>
        <button @click="goToNextWeek">
            <Icon class="text-gray-800" name="fa6-solid:chevron-right"></Icon>
        </button>
        <p class="ml-2 font-medium">{{ currentMonth }} <span class="text-gray-500">{{ currentYear }}</span>
        </p>
    </div>
</template>

<script setup>

const props = defineProps({
    currentMonth: {
        type: String,
        required: true,
    },
    currentYear: {
        type: Number,
        required: true,
    },
    isCurrentWeekOrLater: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['goToPreviousWeek', 'goToNextWeek']);

const goToPreviousWeek = () => {
    emit('goToPreviousWeek');
};

const goToNextWeek = () => {
    emit('goToNextWeek');
};


</script>