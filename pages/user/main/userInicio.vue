<template >
    <div class="p-6 sm:p-8 space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="w-full h-72 py-4 px-6 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg text-[#949494]">Últimas sesiones</h5>
                </div>
                <div class="mt-5">
                    <p class="text-lg text-[#949494]">No hay estadísticas disponibles actualmente.</p>
                </div>
            </div>
            <div class="w-full h-72 py-4 px-6 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg text-[#949494]">Próximas sesiones</h5>
                </div>
                <div class="mt-5">
                    <p class="text-lg text-[#949494]">No hay estadísticas disponibles actualmente.</p>
                </div>
            </div>
        </div>
        <div>
            <div class="w-full h-72 py-4 px-6 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg text-[#949494]">Estadísticas</h5>
                </div>
                <div class="mt-5">
                    <p class="text-lg text-[#949494]">No hay estadísticas disponibles actualmente.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.userInicio {
    background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
}
</style>

<script setup>
definePageMeta({
    layout: "user",
});
</script>