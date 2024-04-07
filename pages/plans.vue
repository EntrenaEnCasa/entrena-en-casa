<template>
    <div class="min-h-[calc(100vh_-_5rem)] py-10 bg-gradiente">
        <div class="max-w-6xl mx-auto w-11/12">
            <h2 class="text-4xl tellural text-center font-bold mb-10">Nuestros planes</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10  mx-auto mb-10">
                <CommonSelect label="Región" v-model="region" name="region" id="region" :options="regionOptions" />
                <CommonSelect label="Formato" v-model="format" name="format" id="format" :options="sessionFormats" />
                <CommonSelect label="Modalidad" v-model="modality" name="modality" id="modality"
                    :options="sessionModalities" />
            </div>
            <div v-if="plansLoading">
                <CommonLoading />
            </div>
            <div v-else-if="error">
                Hubo un error al obtener los planes
            </div>
            <div v-else-if="plansResponse.plans.length === 0">
                No hay planes disponibles para la región, formato y modalidad seleccionada
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="plan in plansResponse.plans"
                    class="bg-white p-8 rounded-xl shadow flex flex-col items-center space-y-5">
                    <h3 class="text-3xl text-secondary font-semibold">{{ plan.formattedPrice }}</h3>
                    <h4 class="text-2xl text-gray-800 font-semibold text-center">Plan 8 sesiones individuales</h4>
                    <p class="font-medium text-center">{{ plan.description }}
                    </p>
                    <ul class="space-y-3">
                        <li class="flex gap-2">
                            <div
                                class="min-w-6 min-h-6 w-6 h-6 rounded-full bg-secondary-50/40 flex items-center justify-center">
                                <Icon name="mingcute:check-fill" class="text-secondary" />
                            </div>
                            <p>Entrenamiento con Personal Trainer el 100% de la sesión</p>
                        </li>
                        <li class="flex gap-2">
                            <div
                                class="min-w-6 min-h-6 w-6 h-6 rounded-full bg-secondary-50/40 flex items-center justify-center">
                                <Icon name="mingcute:check-fill" class="text-secondary" />
                            </div>
                            <p>Horario a convenir</p>
                        </li>
                        <li class="flex gap-2">
                            <div
                                class="min-w-6 min-h-6 w-6 h-6 rounded-full bg-secondary-50/40 flex items-center justify-center">
                                <Icon name="mingcute:check-fill" class="text-secondary" />
                            </div>
                            <p>
                                {{
                                    format === "Individual" ?
                                        "Formato personalizado, un tiempo solo para ti" :
                                        format === "Dupla" ?
                                            "Formato en dupla, siempre con alguien de confianza" :
                                            "Formato grupal, entrena junto a la comunidad de Entrena en Casa"
                                }}

                            </p>
                        </li>
                    </ul>
                    <CommonButton class="w-full px-4 py-2 bg-primary-500" rounded-size="full">
                        Hablar con ventas
                    </CommonButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const config = useRuntimeConfig();

const region = ref(13);
const format = ref("Individual");
const modality = ref("P");
const creditType = computed(() => {
    return format.value === "Dupla" || "Individual" ? "P" + modality.value : "G" + modality.value;
});

const regionOptions = ref([
    { value: 11, label: 'Aisén del General Carlos Ibañez del Campo' },
    { value: 2, label: 'Antofagasta' },
    { value: 15, label: 'Arica y Parinacota' },
    { value: 3, label: 'Atacama' },
    { value: 8, label: 'Bío Bío' },
    { value: 4, label: 'Coquimbo' },
    { value: 9, label: 'Araucanía' },
    { value: 6, label: 'Libertador General Bernardo O\'Higgins' },
    { value: 10, label: 'Los Lagos' },
    { value: 14, label: 'Los Ríos' },
    { value: 12, label: 'Magallanes y de la Antártica Chilena' },
    { value: 7, label: 'Maule' },
    { value: 13, label: 'Región Metropolitana de Santiago' },
    { value: 16, label: 'Ñuble' },
    { value: 1, label: 'Tarapacá' },
    { value: 5, label: 'Valparaíso' }
]);

const sessionFormats = ref([
    { value: 'Individual', label: 'Individual' },
    { value: 'Dupla', label: 'Dupla' },
    { value: 'Grupal', label: 'Grupal' }
]);

const sessionModalities = ref([
    { value: 'P', label: 'Presencial' },
    { value: 'O', label: 'Online' },
]);

watch([region], () => {
    console.log("region: " + region.value);
});

const { data: plansResponse, pending: plansLoading, error } = await useFetch(`${config.public.apiBase}/user/prices`, {
    method: 'POST',
    body: {
        region: region,
        credit_type: creditType,
        format_credit: format,
    },
    watch: [region, creditType, format],

})

</script>