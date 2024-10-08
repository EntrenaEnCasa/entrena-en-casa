<template>
    <div class="relative">
        <div class="mb-3 flex justify-start">
            <div v-for="(chip, index) in chips" :key="chip.user_id">
                <span
                    class="items-left inline-flex rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-white"
                >
                    <Icon
                        @click="removeChip(index)"
                        class="my-auto mr-2 text-lg"
                        name="fa6-solid:circle-xmark"
                    />
                    <span v-if="chip.first_name">
                        <span class="text-sm"> {{ chip.first_name }} {{ chip.last_name }} </span>
                        <span v-if="chip.title">
                            <br />
                            <span class="pr-2 text-xs">{{ chip.title }}</span>
                        </span>
                    </span>
                    <span v-else>
                        {{ chip.email }}
                    </span>
                </span>
            </div>
        </div>
        <div
            class="box-border w-full rounded-md border bg-white px-5 py-3.5 text-sm text-gray-800"
            :class="{ 'ring-2 ring-inset ring-primary': inputFocused }"
        >
            <div class="flex flex-wrap items-center gap-x-2 gap-y-4">
                <input
                    type="text"
                    v-model="searchTerm"
                    :placeholder="placeholder"
                    class="w-full outline-none"
                    @focus="inputFocused = true"
                    @blur="inputFocused = false"
                    @input="delayedFetchResults"
                    @keydown="handleKeydown"
                />
            </div>
            <div
                class="absolute left-0 right-0 top-[110%] rounded-md border bg-white p-3 shadow-lg"
                v-if="inputFocused && searchTerm"
            >
                <CommonLoading v-if="isLoading" text="Buscando" />
                <ul v-else>
                    <li
                        v-show="(isSearchPending || isLoading) && filteredResults.length === 0"
                        class="px-3 py-2"
                    >
                        Se buscará {{ searchTerm }}
                    </li>
                    <li
                        class="px-3 py-2"
                        v-if="
                            filteredResults.length === 0 &&
                            !isLoading &&
                            hasFetched &&
                            !isSearchPending
                        "
                    >
                        No se encontraron resultados
                    </li>
                    <li
                        class="rounded px-3 py-2 hover:bg-gray-100"
                        v-show="filteredResults.length > 0"
                        v-for="(result, index) in filteredResults"
                        :key="result.user_id"
                        @mousedown="addChip(result)"
                        :class="{
                            'bg-gray-200': index === selectedResultIndex,
                        }"
                    >
                        <p v-if="result.first_name" class="font-medium">
                            {{ result.first_name }} {{ result.last_name }}
                        </p>
                        <p v-else class="font-medium">
                            {{ result.email }}
                        </p>
                        <p class="text-xs">
                            {{ result.email }}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const props = defineProps({
    professionals: {
        type: Array,
        default: () => [],
    },
});

const chips = defineModel("professionals", {
    type: Array,
    default: () => [],
});

const placeholder = "Ingresa el correo electrónico o nombre";
const searchTerm = ref("");
const inputFocused = ref(false);
const results = ref([]);
const isLoading = ref(false);
const hasFetched = ref(false);
const isSearchPending = ref(false);
const selectedResultIndex = ref(-1);
let timeoutId = null;

const maxChips = 1;

const fetchResults = async () => {
    if (searchTerm.value) {
        isSearchPending.value = false; // Reset here
        isLoading.value = true;
        hasFetched.value = false;
        results.value = [];
        try {
            const response = await $fetch(
                `${runtimeConfig.public.apiBase}/admin/professionals/search`,
                {
                    method: "POST",
                    credentials: "include",
                    body: {
                        searchTerm: searchTerm.value,
                    },
                },
            );

            if (response.success) {
                results.value = response.professionals;
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            toast.error("Ocurrió un error al buscar los profesionales");
        } finally {
            isLoading.value = false;
            hasFetched.value = true;
        }
    }
};

const delayedFetchResults = () => {
    clearTimeout(timeoutId);
    isSearchPending.value = true; // Set this when a new search is initiated
    timeoutId = setTimeout(() => {
        if (searchTerm.value.trim() !== "") {
            fetchResults();
        } else {
            results.value = [];
            hasFetched.value = false;
            isSearchPending.value = false; // Also reset here if search term is empty
        }
    }, 500);
};

const filteredResults = computed(() => {
    const chipIds = Array.isArray(chips.value) ? chips.value.map((chip) => chip.user_id) : [];
    if (!searchTerm.value && chips.value.length === 0) return results.value.slice(0, 5);

    if (!searchTerm.value && chips.value.length > 0)
        return results.value.filter((student) => !chipIds.includes(student.user_id));

    return results.value
        .filter(
            (professional) =>
                ((professional.first_name &&
                    professional.first_name
                        .toLowerCase()
                        .includes(searchTerm.value.toLowerCase())) ||
                    professional.email.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
                !chipIds.includes(professional.user_id),
        )
        .slice(0, 5);
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
                addChip(filteredResults.value[selectedResultIndex.value]);
            }
            break;
    }
};

const addChip = (professional) => {
    if (chips.value.length >= maxChips) {
        alert("Las sesiones solo admiten 1 profesional");
        searchTerm.value = "";
        results.value = [];
        return;
    }
    chips.value.unshift(professional);
    searchTerm.value = "";
    results.value = [];
};

const removeChip = (index) => {
    chips.value.splice(index, 1);
};

watch([searchTerm, filteredResults], () => {
    selectedResultIndex.value = -1;
});

watch(
    () => chips,
    () => {
        if (chips.value.length > 2) {
            alert("Algunos de los profesionales añadidos serán eliminados");
            chips.value = chips.value.slice(0, 1);
        }
    },
);
</script>
