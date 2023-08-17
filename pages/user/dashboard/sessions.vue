<template>
    <div>
        <div class="space-y-4">
            <div>
                <h3 class="text-xl font-medium">Sesión en curso</h3>
            </div>
            <div>
                <div class="bg-white lg:h-15 py-4 px-6 rounded-2xl border border-zinc-200 lg:flex gap-6 items-center justify-evenly"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-[#949494] text-sm">16:00hrs</div>
                    <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                    <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                    <div class="text-[#0EB3E0] text-2xl font-medium text-center"><a href="#">Online</a></div>
                    <div class="text-[#949494] text-base text-center gap-2">
                        <p>Calificar sesión</p>
                        <div class="flex place-content-center">
                            <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                            <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                            <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                            <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                            <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="text-xl font-medium">Sesiones próximas</h3>
            </div>
            <div v-if="sessions.length > 0">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>25 de Julio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#000000] text-2xl font-medium text-center">Lugar</div>
                        </div>
                    </div>
                    <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-5"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>26 de Julio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#000000] text-2xl font-medium text-center">Lugar</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                    <div class="text-md  text-center"><b>No hay sesiones disponibles</b></div>
                </div>
            </div>

            <!-- <div>
                <h3 class="text-xl font-medium">Sesiones pasadas</h3>
            </div>
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>25 de Junio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#0EB3E0] text-2xl font-medium text-center"><a href="#">Online</a></div>
                            <div class="text-[#949494] text-base text-center gap-2">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>26 de Junio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#0EB3E0] text-2xl font-medium text-center"><a href="#">Online</a></div>
                            <div class="text-[#949494] text-base text-center gap-2">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from '~/stores/UserStore'
const userStore = useUserStore();
const sessions = ref([]);

onMounted(async () => {
    await getScheduledSessions();
});

const getScheduledSessions = async () => {
    const { data, pending, error, refresh } = await useFetch('http://localhost:3002/informacion-sesiones/:idUsuario', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            idUsuario: userStore.user.idUsuario,
        },
        onResponse({ request, response, options }) {
            if (response._data.success) {
                sessions.value = response._data.sesiones;
            }
        },
    });
}
</script>