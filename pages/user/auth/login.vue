<template>
    <div>
        <div class="" >
            <div class="row w-100 ">
                <div class="col w-50 d-flex flex-column align-items-center justify-content-center min-vh-100 text-center" style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);" >
                    <div style="margin: 50px">
                        <div class="mb-4">
                            <h1 class="poppins fw-bold text-light" style="font-size: 70px;">¡Bienvenido <br> de nuevo!</h1>
                            <p class="poppins text-light" style="font-size: 22px;">¿Listo para un nuevo desafío?</p>
                        </div>
                        <img src="/emoji/runners.svg" alt="" width="50%" >
                    </div> 
                </div>
                <div class="col w-50 d-flex flex-column justify-content-center align-items-center " style="        margin-bottom: 50px;">
                    <img src="/logo.png" class="mb-4" alt="" width="150px">
                    <form @submit.prevent style="width: 80%;" class="">
                        <div class="container-group" >
                            <label for="exampleInputEmail1" class="form-label" >Email address</label>
                            <div class=" input-group px-1 py-2 ">
                                <div class="input-group-text" alt="">

                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"  fill="#0EB3E0"/></svg>
                                </div>
                                
                                <input type="email"  v-model="formData.email" class="form-control shadow-none" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico">
                            </div>
                        </div>
                        <div class="container-group">
                            <label for="exampleInputPassword1" class="form-label">Password</label>

                            <div class=" input-group px-1 py-2">
                                <div class="input-group-text" alt="">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" fill="#0EB3E0"/></svg>
                                </div>
                                <input v-model="formData.password" type="password"  class="form-control shadow-none " id="exampleInputPassword1" placeholder="* * * * * * * *">
                            </div>

                        </div>
                        <div class="row d-flex">
                            <div class="col container-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                
                                <label class="form-check-label" for="exampleCheck1" style="font-size: 14px;">Check me out</label>
                            </div>
                            <div class="col">
                                <p class="text-end" style="color: #0EB3E0;"> ¿Olvidaste tu contraseña?</p>
                            </div>
                        </div>
                        <button @click="login" class="p-2 w-100 border-0 text-white fw-medium mt-2" style="font-size: 20px;
                        border-radius: 3px;">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

   

    const router = useRouter();

    const formData = reactive({
        email: "",
        password: ""
    });

    definePageMeta({
        layout: "auth",
    });

    const login = () => {
        //una vez que te logeas, te envía a la página de usuario
        router.push('');
    }

</script>
<style lang="scss">
    button{
        background: #B5CD13;
    }
    .input-group-text{
        background: none;
        outline: none;
    }
    svg{
        width: 20px;
        height: 20px;
    }

    .input-group > *{
        border: none;
        outline: none;
    }
    .input-group{
        
        border-radius: 3px;
        box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);

    }
    .container-group{
        margin-bottom: 30px;
    }
    *:focus{

        outline: none!important;
         box-shadow: none;
    }

</style>