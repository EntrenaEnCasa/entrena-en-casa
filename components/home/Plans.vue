<template>
    <div class="bg-gradiente py-10 lg:pt-32 lg:pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-3">
            <div class="order-last lg:order-none col-span-2">
                <div class="flex flex-col gap-8">
                    <div class="px-4 py-3 border mx-auto bg-white relative w-10/12">
                        <p class="font-semibold tracking-[.2rem]">ENTRENAMIENTO FUNCIONAL</p>
                        <p class="font-semibold text-sm" style="letter-spacing: .15rem;">BORDE COSTERO</p>
                        <p class="text-center my-2">
                            Entrenamiento una vez por semana
                            <br>
                            Cada sábado a las 12:00hrs
                        </p>
                        <div class="flex justify-between text-secondary">
                            <p class="italic">Apto para todo tipo de personas</p>
                            <button class="border-none bg-transparent tellural text-secondary">Contratar</button>
                        </div>
                        <div class="absolute -top-4 -right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $20.000
                            </span>
                        </div>
                    </div>
                    <div class="px-4 py-3 border mx-auto bg-white relative w-10/12">
                        <p class="font-semibold tracking-[.2rem]">PLAN ESTÁNDAR</p>
                        <p class="text-center my-2">
                            Entrenamiento dos veces por semana
                            <br>
                            Acompañamiento el 100% de la sesión
                            <br />
                            modalidad <span class="text-secondary">online</span>
                        </p>
                        <div class="flex justify-end text-secondary">
                            <button class="border-none bg-transparent tellural text-secondary">Contratar</button>
                        </div>
                        <div class="absolute -top-4 -right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $112.000
                            </span>
                        </div>
                        <div class="absolute top-[15%] right-[8px] translate-y-full">
                            <span class="tellural text-secondary">
                                $14.000/sesión
                            </span>
                        </div>
                    </div>
                    <div class="px-4 py-3 border mx-auto bg-white relative w-10/12">
                        <p class="font-semibold tracking-[.2rem]">PLAN ESTÁNDAR</p>
                        <p class="font-semibold text-sm" style="letter-spacing: .15rem;">VIÑA DEL MAR</p>
                        <p class="text-center my-2">
                            Entrenamiento dos veces por semana
                            <br>
                            Sesión individual
                            <br />
                            Modalidad <span class="text-secondary">presencial</span>
                        </p>
                        <div class="flex justify-end text-secondary">
                            <button class="border-none bg-transparent tellural text-secondary">Contratar</button>
                        </div>
                        <div class="absolute -top-4 -right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $140.000
                            </span>
                        </div>
                        <div class="absolute top-[15%] right-[8px] translate-y-full">
                            <span class="tellural text-secondary">
                                $17.500/sesión
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 flex flex-col justify-center items-center space-y-2 mb-10 lg:mb-0">
                <p class="text-sm tracking-[.2rem]">SERVICIOS</p>
                <h5 class="text-4xl font-medium">Nuestros planes</h5>
                <p class="text-sm tracking-[.2rem]">MÁS VENDIDOS</p>
                <img src=" /home/runner.png" alt="" width="350">
                <router-link to="/" class="bg-primary text-white px-2 py-2 tellural">Ver todos los planes</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-gradiente {
    background: url('/background.svg') no-repeat center center fixed;
}
</style>