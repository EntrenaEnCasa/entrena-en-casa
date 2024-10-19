<template>
    <div class="mx-auto my-8 max-w-3xl">
        <div class="relative overflow-hidden rounded-lg bg-black shadow-xl">
            <video
                ref="videoRef"
                class="h-auto w-full"
                @timeupdate="onTimeUpdate"
                @loadedmetadata="onLoadedMetadata"
                @ended="isPlaying = false"
            >
                <source :src="videoSrc" type="video/mp4" />
                Tu navegador no soporta este tipo de video.
            </video>

            <!-- Custom controls -->
            <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
            >
                <!-- Progress bar -->
                <div
                    class="relative mb-2 h-1 cursor-pointer rounded-full bg-gray-600"
                    @click="seek"
                >
                    <div
                        class="absolute left-0 top-0 h-full rounded-full bg-white"
                        :style="{ width: `${progress}%` }"
                    ></div>
                </div>

                <div class="flex items-center justify-between">
                    <!-- Play/Pause button -->
                    <button
                        @click="togglePlay"
                        class="text-white hover:text-gray-300 focus:outline-none"
                    >
                        <Icon name="fa-solid:play" v-if="!isPlaying" class="h-8 w-8" />
                        <Icon name="fa-solid:pause" v-else class="h-8 w-8" />
                    </button>

                    <!-- Time display -->
                    <div class="text-sm text-white">
                        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>

                    <!-- Volume control -->
                    <div class="flex items-center">
                        <button
                            @click="toggleMute"
                            class="mr-2 text-white hover:text-gray-300 focus:outline-none"
                        >
                            <Icon name="fa-solid:volume-mute" v-if="isMuted" class="h-6 w-6" />
                            <Icon name="fa-solid:volume" v-else class="h-6 w-6" />
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            v-model="volume"
                            class="w-20 accent-white"
                            @input="onVolumeChange"
                        />
                    </div>

                    <!-- Fullscreen button -->
                    <button
                        @click="toggleFullscreen"
                        class="text-white hover:text-gray-300 focus:outline-none"
                    >
                        <Icon name="fa-solid:expand" class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    videoSrc: {
        type: String,
        required: true,
    },
});

const videoRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const progress = ref(0);

const togglePlay = () => {
    if (videoRef.value.paused) {
        videoRef.value.play();
        isPlaying.value = true;
    } else {
        videoRef.value.pause();
        isPlaying.value = false;
    }
};

const onTimeUpdate = () => {
    currentTime.value = videoRef.value.currentTime;
    progress.value = (currentTime.value / duration.value) * 100;
};

const onLoadedMetadata = () => {
    duration.value = videoRef.value.duration;
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const toggleMute = () => {
    videoRef.value.muted = !videoRef.value.muted;
    isMuted.value = videoRef.value.muted;
};

const onVolumeChange = () => {
    videoRef.value.volume = volume.value;
    isMuted.value = volume.value === 0;
};

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        videoRef.value.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const seek = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedValue = (x / rect.width) * duration.value;
    videoRef.value.currentTime = clickedValue;
};

watch(isMuted, (newValue) => {
    videoRef.value.muted = newValue;
    if (newValue) {
        volume.value = 0;
    } else {
        volume.value = videoRef.value.volume;
    }
});

onMounted(() => {
    if (videoRef.value) {
        videoRef.value.volume = volume.value;
    }
});
</script>
