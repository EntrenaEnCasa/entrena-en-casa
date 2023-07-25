<template>
    <div class="pt-10 bg-gradiente relative" style="padding-bottom: 100px">
        <div class="tellural">
            <h1 class="text-center font-bold text-5xl">
                Son cada vez más
                <br>
                alumnos entrenando
                <br>
                <div class="mt-4 inline-block px-5 py-2 text-white rounded-xl text-3xl font-bold bg-primary">
                    online
                </div>
            </h1>
            <div class="grid grid-cols-3 place-items-center">
                <div class="flex flex-col space-y-4">
                    <div class="self-start ml-8">
                        <img src="/icons/star.svg" alt="running" width="60">
                    </div>
                    <div>
                        <img src="/home/dad-son-exercising.png" alt="dad-son-exercising" class="w-full h-auto">
                    </div>
                    <div class="self-end mr-4">
                        <img src="/icons/star.svg" alt="running" width="40">
                    </div>
                </div>
                <div class="gap-4 flex items-center justify-center flex-col space-y-6">
                    <div class="px-10 py-2 text-white rounded-full leading-tight shadow-xl"
                        style="background-color: #00A4E8">
                        Conoce la nueva
                        <br>
                        metodología
                    </div>
                </div>
                <div class="flex">
                    <img src="/home/yoga-couple.png" alt="yoga-couple" width="200">
                    <div>
                        <div>
                            <span class="text-3xl">+50</span>
                            <p class="lh-1 text-secondary">
                                Alumnos
                                <br>
                                activos
                            </p>
                        </div>
                        <div>
                            <span class="text-3xl">+60</span>
                            <p class="lh-1 text-secondary">
                                Clases
                                <br>
                                grupales
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="rounded-lg shadow-lg bg-white w-10/12 p-4 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
                <div class="flex">
                    <img src="/icons/location.svg" alt="location icon" width="40">
                    <div class="ml-1 flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Online o presencial, tu escoges</p>
                    </div>
                </div>
                <div class="flex">
                    <img src="/icons/dumbbell.svg" alt="location icon" width="40">
                    <div class="ml-2 flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Programa tus propias
                            sesiones, ve a tu propio ritmo</p>
                    </div>
                </div>
                <div class="flex">
                    <img src="/icons/user.svg" alt="location icon" width="40">
                    <div class="ml-1 flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Entrena tanto
                            individual como grupal</p>
                    </div>
                </div>
                <div class="flex">
                    <router-link to="/user/auth/register" class="border-0 rounded-lg text-white px-3 py-2 font-medium"
                        style="background-color: #00A4E8">Registrarse
                        ahora
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.bg-gradiente {
    background: url('/background.svg') no-repeat center center fixed;
    /* background: linear-gradient(136deg, rgba(198, 243, 255, 0.15) 0%, rgba(113, 212, 240, 0.15) 64.54%, rgba(0, 142, 181, 0.15) 100%); */
}
</style>