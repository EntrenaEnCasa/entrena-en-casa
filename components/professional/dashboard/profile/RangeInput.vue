<template>
    <div class="relative mx-auto mb-10 mt-8 w-10/12">
        <input
            type="range"
            class="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary"
            :min="inputMinValue"
            :max="inputMaxValue"
            v-model="sliderValue"
        />
        <div
            class="absolute top-[-40px] -translate-x-1/2 whitespace-nowrap rounded-md bg-secondary px-5 py-1 text-white"
            :style="{ left: `${tooltipPosition}%` }"
        >
            {{ sliderValue }} km
        </div>
        <div class="mt-2 flex justify-between px-1 text-xs">
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
const props = defineProps({
    inputMinValue: {
        type: Number,
        required: true,
    },
    inputMaxValue: {
        type: Number,
        required: true,
    },
});

const sliderValue = defineModel("sliderValue", {
    type: String,
    defaultValue: 1,
});

const tooltipPosition = computed(() => {
    const max = props.inputMaxValue - props.inputMinValue;
    const value = sliderValue.value - props.inputMinValue;
    let offset = 0; // Offset to center the tooltip
    if (sliderValue.value < 10) {
        offset = 0.1;
    } else if (sliderValue.value > 10) {
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
