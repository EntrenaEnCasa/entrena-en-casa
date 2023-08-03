<template>
    <div class="flex flex-col h-screen justify-center items-center ">
        <nuxt-link to="/">
            <img src="/logo.png" class=" w-36" alt="logo">
        </nuxt-link>
        <form class="w-2/3 lg:w-1/3 space-y-6" @submit.prevent="submit">
            <div>
                <label class="block mb-1" for="email">Correo electrónico</label>
                <div class="border rounded-md px-2 py-3 flex items-center space-x-4 w-full"
                    style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                            <path
                                d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"
                                fill="#0EB3E0" />
                        </svg>
                    </div>

                    <input class="w-full" type="email" id="email" aria-describedby="emailHelp"
                        placeholder="Ingresa tu correo electrónico">
                </div>
            </div>
            <div>
                <label class="block mb-1" for="password">Contraseña</label>
                <div class="border rounded-md px-2 py-3 flex items-center space-x-4 w-full"
                    style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                            <path
                                d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z"
                                fill="#0EB3E0" />
                        </svg>
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
            <nuxt-link class="block" to="/admin/main/adminInicio">
                <button type="submit"
                    class="bg-primary py-3 w-full text-white font-medium mt-2 text-xl rounded-sm">Iniciar
                    sesión</button>
            </nuxt-link>
        </form>
    </div>
</template>
<script setup>

//    import {useUserStore} from '~/stores/userStore'

//     const router = useRouter();
//     const userStore = useUserStore();

//     const formData = reactive({
//         email: "",
//         password: ""
//     });

definePageMeta({
    layout: "auth",
});

const login = () => {
    console.log("login");
}

//     const login = () => {
//         if(formData.email == "" || formData.password == ""){
//             alert("Por favor, ingrese todos los datos");
//             return;
//         }
//         //llamada a la api

//         //guardar en el store
//         userStore.setName();
//         //una vez que te logeas, te envía a la página de usuario
//         router.push('/user/main/userInicio');
//     }

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