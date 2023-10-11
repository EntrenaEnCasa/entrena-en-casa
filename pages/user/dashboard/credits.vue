<template>
    <div class="relative grid gap-y-5">
        <h3 class="text-xl font-medium ">Créditos</h3>
        <div class="grid gap-2">
            <div class="text-secondary flex justify-end mr-3 ">
                <p class="text-sm mr-3">¿Qué significa cada crédito</p>
                <Icon name="fa6-solid:circle-info" />
            </div>
            <div class="bg-white flex  justify-between h-14 py-4 px-8 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg font-semibold">Tus créditos</h5>
                </div>
                <div>
                    <div class="flex  space-x-4">
                        <div class="flex items-center space-x-1">
                            <img src="/plans/gold-medal.png" class="w-4 h-4" alt="">
                            <span>{{ user.credits.gold }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/silver-medal.png" class="w-4 h-4" alt="">
                            <span>{{ user.credits.silver }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/bronze-medal.png" class="w-4 h-4" alt="">
                            <span>{{ user.credits.bronze }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- </div>
    <div class="creditos">
        <div class="grid ">
            <h3 class="text-xl font-medium ">Créditos</h3>
            <div class="col-12" style="text-align: right;">
                <a class="ayuda" href="#">¿Qué significa cada crédito? <svg xmlns="http://www.w3.org/2000/svg"
                        class="ionicon" viewBox="0 0 512 512">
                        <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                            fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="32" d="M220 220h32v116" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                            stroke-width="32" d="M208 340h88" />
                        <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" />
                    </svg></a>
            </div>
            <div class="tusCreditos col-12 mb-5">
                <div class="card creditosUser rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-lg-7 tituloCreditos"><b>Tus créditos</b></div>
                        <div class="col-lg-5">
                            <div class="row cantidadCreditos">
                                <div class="col-sm-4">
                                    <img src="/plans/gold-medal.png" alt="">
                                    0
                                </div>
                                <div class="col-sm-4">
                                    <img src="/plans/silver-medal.png" alt="">
                                    1
                                </div>
                                <div class="col-sm-4">
                                    <img src="/plans/bronze-medal.png" alt="">
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-5">
                <div class="row justify-content-center text-center">
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-primary">Oro</button>
                    </div>
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-secondary">Plata</button>
                    </div>
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-danger">Bronce</button>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col-lg-6">Descripción</th>
                        <th scope="col-lg-2">Créditos</th>
                        <th scope="col-lg-2">Valor</th>
                        <th scope="col-lg-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1 Sesión a domicilio</td>
                        <td><img src="/plans/gold-medal.png" alt="">1</td>
                        <td class="precio">$20.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                    <tr>
                        <td>Pack mensual, sesiones 1 vez a la semana</td>
                        <td><img src="/plans/gold-medal.png" alt="">4</td>
                        <td class="precio">$75.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                    <tr>
                        <td>Pack mensual, sesiones 2 veces a la semana</td>
                        <td><img src="/plans/gold-medal.png" alt="">8</td>
                        <td class="precio">$140.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div> -->
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { useUserStore } from '~/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();


const user = ref({})

onMounted(() => {
    user.value = userStore.user;
})




</script>