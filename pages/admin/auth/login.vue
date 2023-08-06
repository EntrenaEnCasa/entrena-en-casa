<template>
    <div class="min-h-screen flex items-center max-w-xl mx-auto">
        <div class="w-full flex flex-col justify-center items-center mb-12">
            <nuxt-link to="/">
                <img src="/logo.png" class="mb-4 w-36" alt="logo">
            </nuxt-link>
            <form class="w-4/5 space-y-5" @submit.prevent="submit">
                <div>
                    <label class="block mb-1" for="email">Correo electrónico</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <Icon name="fa6-solid:envelope" class="text-secondary text-lg" />
                        </div>

                        <input class="w-full" type="email" id="email" aria-describedby="emailHelp"
                            placeholder="Ingresa tu correo electrónico">
                    </div>
                </div>
                <div>
                    <label class="block mb-1" for="password">Contraseña</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <Icon name="fa6-solid:lock" class="text-secondary text-lg" />
                        </div>
                        <input type="password" class="w-full" id="password" placeholder="* * * * * * * *">
                    </div>

                </div>
                <div class="flex justify-between">
                    <div class="flex items-center space-x-1">
                        <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
                        <label class="text-gray-500" for="remember">Recuérdame</label>
                    </div>
                    <p class=" text-secondary">Olvidé mi contraseña</p>
                </div>
                <nuxt-link class="block" to="/admin/dashboard/home">
                    <button type="submit"
                        class="bg-primary py-3 w-full text-white font-medium mt-2 text-xl rounded-sm">Iniciar
                        sesión</button>
                </nuxt-link>
            </form>
        </div>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "auth",
});

const login = () => {
    console.log("login");
}

</script>
<style scoped lang="scss">
svg {
    width: 20px;
    height: 20px;
}

*:focus {

    outline: none !important;
    box-shadow: none;
}
</style>