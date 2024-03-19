<template>
    <div class="py-14">
        <div class="w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center">
            <div class="mb-10 text-center">
                <p class="text-sm tracking-[.15rem]">CONTACTO</p>
                <h2 class="text-3xl md:text-4xl font-medium text-center">¿Tienes dudas? ¡Contactanos!</h2>
            </div>
            <div class="flex flex-col lg:flex-row items-stretch w-full mb-10 gap-10">
                <Form @submit="sendEmail" v-slot="{ meta }" class="space-y-4 flex-1">
                    <CommonInput v-model="formData.email" type="text" name="email" label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico" />
                    <CommonInput v-model="formData.subject" type="text" name="subject" label="Asunto"
                        placeholder="Ingresa tu consulta" />
                    <CommonTextarea v-model="formData.message" name="message" label="¿Como te podemos ayudar?"
                        placeholder="Escribe aquí tus dudas" rows="5" maxlength="350" />
                    <p class="text-xs text-gray-400 text-center font-medium">* Máximo 350 caracteres</p>

                    <CommonButton class="w-full py-2 font-medium" text-size="sm" bg-color="secondary">
                        Enviar
                    </CommonButton>
                </Form>
                <div class="place-self-center lg:place-self-start flex-1">
                    <NuxtImg class="rounded-2xl object-cover h-full" width="400" height="450" src="/home/Jorge.jpg"
                        alt="Contacto" />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 space-x-5">
                <div class="flex items-center gap-x-3 text-secondary">
                    <Icon class="text-2xl md:text-3xl" name="fa6-solid:envelope" />
                    <p class="text-lg md:text-xl">entrenaencasa0@gmail.com</p>
                </div>
                <div class="text-2xl flex items-center gap-2 text-secondary">
                    <Icon class="text-2xl md:text-3xl" name="fa6-solid:phone" />
                    <p class="text-lg md:text-xl">+56 9 7137 0313</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const formData = reactive({
    email: "",
    subject: "",
    message: ""
});

const sendEmail = () => {
    console.log(formData);
}

</script>