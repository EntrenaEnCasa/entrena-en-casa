<template>
    <div>
        <div class="" >
            <div class="row w-100 m-0">
                <div class="col w-50 d-flex flex-column justify-content-center align-items-center " style="margin-bottom: 50px;">
                    <img src="/logo.png" class="mb-4" alt="" width="150px">
                    <form @submit.prevent style="width: 80%;" >
                        <div class="container-group" >
                            <label for="InputEmail1" class="form-label" >Correo electrónico</label>
                            <div class=" input-group px-1 py-2 ">
                                <div class="input-group-text" alt="">

                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"  fill="#0EB3E0"/></svg>
                                </div>
                                
                                <input type="email"   class="form-control shadow-none" id="InputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico">
                            </div>
                        </div>
                        <div class="container-group row">
                            <div class="col">
                                <label for="InputPassword1" class="form-label">Contraseña</label>
    
                                <div class=" input-group px-1 py-2">
                                    <div class="input-group-text" alt="">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" fill="#0EB3E0"/></svg>
                                    </div>
                                    <input  type="password"  class="form-control shadow-none " id="InputPassword1" placeholder="* * * * * * * *">
                                </div>
                            </div>
                            <div class="col container-group">
                                <label for="InputPassword2" class="form-label">Reingresar Contraseña</label>
    
                                <div class=" input-group px-1 py-2">
                                    <div class="input-group-text" alt="">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" fill="#0EB3E0"/></svg>
                                    </div>
                                    <input  type="password"  class="form-control shadow-none " id="InputPassword2" placeholder="* * * * * * * *">
                                </div>
    
                            </div>
                        </div>
                        <div class="row d-flex">
                            <div class="col container-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                
                                <label class="form-check-label" for="exampleCheck1" style="font-size: 14px;">Estoy de acuerdo con términos y condiciones</label>
                            </div>
                            <div class="col">
                                <p class="text-end" style="color: #0EB3E0;"> ¿Olvidaste tu contraseña?</p>
                            </div>
                        </div>
                        <nuxt-link to="/user/main/userInicio"> 
                            <button class="p-2 w-100 border-0 text-white fw-medium mt-2" style="font-size: 20px;
                        border-radius: 3px;">Registrarse</button>
                        </nuxt-link>
                    </form>
                </div>
                <div class="col w-50 d-flex flex-column align-items-center justify-content-center min-vh-100 text-center" style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);" >
                    <div style="margin: 50px">
                        <div class="mb-4">
                            <h1 class="poppins fw-bold text-light" style="font-size: 70px;">¿Estás <br> preparado?</h1>
                        </div>
                        <img src="/emoji/runners.svg" alt="" width="50%" >
                    </div> 
                </div>

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