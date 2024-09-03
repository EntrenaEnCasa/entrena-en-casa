<template>
    <div class="relative z-30">
        <input
            type="text"
            v-model="searchTerm"
            :placeholder="placeholder"
            class="w-full rounded-md border px-12 py-3.5 text-sm text-gray-800 outline-none"
            :class="{ 'ring-2 ring-inset ring-primary': inputFocused }"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @input="delayedFetchResults"
            @keydown="handleKeydown"
        />
        <div
            class="absolute left-3 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-full p-1"
        >
            <Icon name="heroicons:map-pin" class="text-2xl" />
        </div>
        <div
            class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-300 p-2"
        >
            <Icon name="fa6-solid:magnifying-glass" class="text-lg text-white" />
        </div>
        <div
            class="absolute left-0 right-0 top-[110%] rounded-md border bg-white p-3 text-sm shadow-lg"
            v-if="inputFocused && searchTerm"
        >
            <CommonLoading v-if="searchState === 'loading'" text="Buscando" />
            <ul v-else>
                <li
                    v-show="searchState === 'pending' && filteredResults.length === 0"
                    class="px-3 py-2"
                >
                    Se buscará {{ searchTerm }}
                </li>
                <li
                    class="px-3 py-2"
                    v-if="filteredResults.length === 0 && searchState === 'success'"
                >
                    No se encontraron resultados
                </li>
                <li
                    class="rounded px-3 py-2 hover:bg-gray-100"
                    v-show="filteredResults.length > 0"
                    v-for="(result, index) in filteredResults"
                    :key="result.id"
                    @mousedown="selectResult(result)"
                    :class="{ 'bg-gray-200': index === selectedResultIndex }"
                >
                    <p class="font-medium">
                        {{ result.place_name }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const placeholder = "Busca un lugar";
const searchTerm = ref("");
const inputFocused = ref(false);
const results = ref([]);
const searchState = ref("idle"); // New state machine
const selectedResultIndex = ref(-1);
let timeoutId = null;
const runtimeConfig = useRuntimeConfig();

const fetchResults = async () => {
    if (searchTerm.value) {
        searchState.value = "loading";
        results.value = [];

        try {
            const response = await $fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    searchTerm.value,
                )}.json?language=ES&country=CL&access_token=${runtimeConfig.public.mapboxApiKey}`,
            );

            searchState.value = response && response.features ? "success" : "failure";

            if (searchState.value === "success") {
                results.value = response.features;
            }
        } catch (error) {
            searchState.value = "failure";
            console.log(error);
            toast.error("Ocurrió un error al buscar el lugar");
        }
    }
};

const delayedFetchResults = () => {
    clearTimeout(timeoutId);
    searchState.value = "pending";
    timeoutId = setTimeout(fetchResults, 500);
};

const filteredResults = computed(() => {
    if (!searchTerm.value) return results.value.slice(0, 5);

    return results.value.filter((place) => place.place_name.toLowerCase()).slice(0, 5);
});

const handleKeydown = (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (selectedResultIndex.value > 0) {
                selectedResultIndex.value--;
            }
            break;
        case "ArrowDown":
            if (selectedResultIndex.value < filteredResults.value.length - 1) {
                selectedResultIndex.value++;
            }
            break;
        case "Enter":
            if (selectedResultIndex.value >= 0) {
                selectResult(filteredResults.value[selectedResultIndex.value]);
            }
            break;
    }
};

const updateSearchTerm = (placeName) => {
    searchTerm.value = placeName;
    delayedFetchResults();
};

defineExpose({
    updateSearchTerm,
});

const emit = defineEmits(["locationSelected"]);

const selectResult = (place) => {
    searchTerm.value = place.place_name;
    searchState.value = "idle"; // Reset the search state
    emit("locationSelected", place); // Emit an event with the selected location
};
</script>
