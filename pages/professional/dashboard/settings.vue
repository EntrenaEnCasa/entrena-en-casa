<template>
    <div class="p-6 sm:p-8">
        <div class="row row-gap-4 mb-5">
            <h3 class="text-xl font-medium mb-4">Configuración</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Nombre de profesional</p>
                        <button disabled
                            class="px-8 py-1 rounded-lg bg-primary text-white disabled:bg-primary-100 disabled:cursor-not-allowed">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">Nombre de usuario</h3>
                </div>
                <div class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Correo electrónico</p>
                        <button class="px-8 py-1 rounded-lg bg-primary text-white">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">nombre.apellido@gmail.com</h3>
                </div>
                <div class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Fecha de nacimiento</p>
                        <button disabled
                            class="px-8 py-1 rounded-lg bg-primary text-white disabled:bg-primary-100 disabled:cursor-not-allowed">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">12/04/2000</h3>
                </div>
                <div class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Contraseña</p>
                        <button class="px-8 py-1 rounded-lg bg-primary text-white">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">************</h3>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-20">
            <div class="flex items-center gap-2">
                <p class="font-medium text-red-500 text-xl">¿Darse de baja?</p>
                <button class="px-4 py-1 bg-red-500 text-white flex items-center gap-2 font-medium rounded-md">
                    <Icon name="fa6-solid:triangle-exclamation" />
                    <span>Desactivar perfil</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "professional",
});
</script>