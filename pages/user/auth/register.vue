<template>
    <div class="grid grid-cols-2 min-h-screen">
        <div class="flex flex-col justify-center items-center mb-12">
            <img src="/logo.png" class="mb-4 w-36" alt="logo">
            <form class="space-y-4 w-4/5" @submit.prevent="register">
                <div>
                    <label class="block mb-1" for="email">Correo electrónico</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                <path
                                    d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"
                                    fill="#0EB3E0" />
                            </svg>
                        </div>
                        <input type="email" class="w-full" id="email" aria-describedby="emailHelp"
                            placeholder="Ingresa tu correo electrónico">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-x-3">
                    <div>
                        <label class="block mb-1" for="password">Contraseña</label>
                        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
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
                    <div>
                        <label class="block mb-1" for="password-repeat">Confirmar Contraseña</label>
                        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                            style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <path
                                        d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z"
                                        fill="#0EB3E0" />
                                </svg>
                            </div>
                            <input type="password" class="form-control shadow-none " id="password-repeat"
                                placeholder="* * * * * * * *">
                        </div>

                    </div>
                </div>
                <div class="flex items-center space-x-1">
                    <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
                    <label class="text-gray-500" for="remember">Acepto los <span class="underline">términos y
                            condiciones</span></label>
                </div>
                <nuxt-link class="block" to="/user/main/userInicio">
                    <button class="text-xl rounded-sm p-2 w-full text-white font-medium mt-2">Registrarse</button>
                </nuxt-link>
            </form>
        </div>
        <div class="flex flex-col items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);">
            <div class="space-y-10">
                <div class="mb-4">
                    <h1 class="font-bold text-white text-7xl">¿Estás <br> preparado?</h1>
                </div>
                <img src="/emoji/runners.svg" class="w-1/2 mx-auto" alt="runners">
            </div>
        </div>

    </div>
</template>
<script setup>



// const router = useRouter();

// const formData = reactive({
//     email: "",
//     password: "",
//     repassword: ""
// });

definePageMeta({
    layout: "auth",
});

const register = () => {
    console.log("register");
}

    // const signup = () => {
    //     if(formData.email == "" || formData.password == "" || formData.repassword == ""){
    //         alert("Por favor, rellene todos los campos");
    //         return;
    //     }
    //     if(formData.password != formData.repassword){
    //         alert("Las contraseñas no coinciden");
    //         return;
    //     }

    //     //una vez que te logeas, te envía a la página de usuario
    //     router.push('/user/main/aboutYou');
    // }

</script>
<style lang="scss">
button {
    background: #B5CD13;
}

.input-group-text {
    background: none;
    outline: none;
}

svg {
    width: 20px;
    height: 20px;
}

.input-group>* {
    border: none;
    outline: none;
}

.input-group {

    border-radius: 3px;
    box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);

}

.container-group {
    margin-bottom: 30px;
}

*:focus {

    outline: none !important;
    box-shadow: none;
}
</style>