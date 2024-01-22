<template>
    <div class="relative w-10/12 mx-auto mt-8 mb-10">
        <input type="range" class="slider w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            :min="inputMinValue" :max="inputMaxValue" v-model="sliderValue" />
        <div class="absolute top-[-40px] -translate-x-1/2 whitespace-nowrap bg-secondary text-white py-1 px-5 rounded-md"
            :style="{ left: `${tooltipPosition}%` }">
            {{ sliderValue }} km
        </div>
        <div class="flex justify-between text-xs mt-2 px-1">
            <span>
                {{ inputMinValue }}
            </span>
            <span>
                {{ inputMaxValue }}
            </span>
        </div>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue';

const props = defineProps({
    inputMinValue: {
        type: Number,
        required: true
    },
    inputMaxValue: {
        type: Number,
        required: true
    }
});

const sliderValue = defineModel('sliderValue', {
    type: Number,
    defaultValue: 1
});

const tooltipPosition = computed(() => {
    const max = props.inputMaxValue - props.inputMinValue;
    const value = sliderValue.value - props.inputMinValue;
    let offset = 0; // Offset to center the tooltip
    if (sliderValue.value < 10) {
        offset = 0.1;
    }
    else if (sliderValue.value > 10) {
        offset = -0.1;
    }
    return ((value + offset) / max) * 100;
});

</script>

<style scoped>
.slider::-webkit-slider-thumb {
    /* Custom styles for the slider thumb */
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    /* Width of the thumb */
    height: 25px;
    /* Height of the thumb */
    background: #ffffff;
    /* Thumb color */
    cursor: pointer;
    /* Cursor on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Optional: Shadow for the thumb */
    border-radius: 50%;
    /* Rounded corners for the thumb */
}

.slider::-moz-range-thumb {
    /* Styles for Firefox */
    width: 25px;
    height: 25px;
    background: #ffffff;
    cursor: pointer;
    border-radius: 50%;
}
</style>