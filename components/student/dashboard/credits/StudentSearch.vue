<template>
    <div class="relative">
        <div
            class="border text-gray-800 text-sm rounded-md px-5 py-3.5 max-w-2xl box-border"
            :class="{ 'ring-2 ring-primary ring-inset': inputFocused }">
            <div class="flex items-center flex-wrap gap-y-4 gap-x-2">
                <input
                    type="text"
                    v-model="searchTerm"
                    :placeholder="placeholder"
                    class="outline-none w-full"
                    @focus="inputFocused = true"
                    @blur="inputFocused = false"
                    @input="delayedFetchResults"
                    @keydown="handleKeydown" />
                <div v-for="(chip, index) in chips" :key="chip.user_id">
                    <span
                        class="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-white">
                        <Icon
                            @click="removeChip(index)"
                            class="text-lg mr-1"
                            name="fa6-solid:circle-xmark" />
                        <span v-if="chip.first_name">
                            {{ chip.first_name }} {{ chip.last_name }}
                        </span>
                        <span v-else>
                            {{ chip.email }}
                        </span>
                    </span>
                </div>
            </div>
            <div
                class="border rounded-md absolute top-[110%] left-0 right-0 bg-white shadow-lg p-3"
                v-if="inputFocused && searchTerm">
                <CommonLoading v-if="isLoading" text="Buscando" />
                <ul v-else>
                    <li
                        v-show="
                            (isSearchPending || isLoading) &&
                            filteredResults.length === 0
                        "
                        class="px-3 py-2">
                        Se buscará {{ searchTerm }}
                    </li>
                    <li
                        class="px-3 py-2"
                        v-if="
                            filteredResults.length === 0 &&
                            !isLoading &&
                            hasFetched &&
                            !isSearchPending
                        ">
                        No se encontraron resultados
                    </li>
                    <li
                        class="px-3 py-2 rounded hover:bg-gray-100"
                        v-show="filteredResults.length > 0"
                        v-for="(result, index) in filteredResults"
                        :key="result.user_id"
                        @mousedown="addChip(result)"
                        :class="{
                            'bg-gray-200': index === selectedResultIndex,
                        }">
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
import { useUserStore } from "~/stores/UserStore";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const chips = defineModel("clients", {
    type: Array,
    default: () => [],
});

const placeholder = "Ingresa el nombre o correo electrónico";
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
                `${runtimeConfig.public.apiBase}/professional/student/search`,
                {
                    method: "POST",
                    credentials: "include",
                    body: {
                        searchTerm: searchTerm.value,
                    },
                }
            );

            if (response.success) {
                results.value = response.students;
            } else {
                toast.error(
                    response.message || "Ocurrió un error al buscar estudiantes"
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocurrió un error al buscar estudiantes");
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
    const chipIds = chips.value.map((chip) => chip.user_id);

    if (!searchTerm.value && chips.value.length === 0)
        return results.value.slice(0, 5);

    if (!searchTerm.value && chips.value.length > 0)
        return results.value.filter(
            (student) => !chipIds.includes(student.user_id)
        );

    return results.value
        .filter(
            (student) =>
                ((student.first_name &&
                    student.first_name
                        .toLowerCase()
                        .includes(searchTerm.value.toLowerCase())) ||
                    student.email
                        .toLowerCase()
                        .includes(searchTerm.value.toLowerCase())) &&
                !chipIds.includes(student.user_id)
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

const addChip = (student) => {
    if (chips.value.length >= maxChips) {
        toast.warning("Solo puedes tener 1 estudiante como dupla");
        searchTerm.value = "";
        results.value = [];
        return;
    }
    chips.value.unshift(student);
    searchTerm.value = "";
    results.value = [];
};

const removeChip = (index) => {
    chips.value.splice(index, 1);
};

watch([searchTerm, filteredResults], () => {
    selectedResultIndex.value = -1;
});
</script>
