<template>
    <div>
        <div v-show="isFetchingData" class="flex">
            <CommonLoading />
        </div>
        <div
            v-show="!isFetchingData"
            class="flex items-center justify-self-center md:justify-self-start text-2xl">
            <button
                @click="goToPreviousWeek"
                :disabled="isStartWeek || isFetchingData">
                <Icon
                    :class="{
                        'text-gray-300': isStartWeek || isFetchingData,
                        'text-gray-800': !isStartWeek && !isFetchingData,
                    }"
                    name="fa6-solid:chevron-left"></Icon>
            </button>
            <button @click="goToNextWeek" :disabled="isFetchingData">
                <Icon
                    :class="{
                        'text-gray-300': isFetchingData,
                        'text-gray-800': !isFetchingData,
                    }"
                    name="fa6-solid:chevron-right"></Icon>
            </button>
            <p class="ml-2 font-medium capitalize">
                {{ currentMonth }}
                <span class="text-gray-500">{{ currentYear }}</span>
            </p>
        </div>
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
    isStartWeek: {
        type: Boolean,
        required: true,
    },
    isFetchingData: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["goToPreviousWeek", "goToNextWeek"]);

const goToPreviousWeek = () => {
    emit("goToPreviousWeek");
};

const goToNextWeek = () => {
    emit("goToNextWeek");
};
</script>
