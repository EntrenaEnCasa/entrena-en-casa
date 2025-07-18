<template>
    <div class="py-14" id="contacto">
        <div class="mx-auto flex w-10/12 flex-col items-center justify-center lg:w-8/12">
            <div class="mb-10 text-center">
                <p class="text-sm tracking-[.15rem]">CONTACTO</p>
                <h2 class="text-center text-3xl font-medium md:text-4xl">
                    ¿Tienes dudas? ¡Contactanos!
                </h2>
            </div>
            <div class="mb-10 flex w-full flex-col items-stretch gap-10 lg:flex-row">
                <Form @submit="sendEmail" class="flex-1 space-y-4" v-slot="{ meta }">
                    <CommonInput
                        v-model="formData.email"
                        type="text"
                        name="email"
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        :rules="validateEmail"
                    />
                    <CommonInput
                        v-model="formData.subject"
                        type="text"
                        name="subject"
                        label="Asunto"
                        placeholder="Ingresa tu consulta"
                        :rules="validateSubject"
                    />
                    <CommonTextarea
                        v-model="formData.message"
                        name="message"
                        label="¿Como te podemos ayudar?"
                        placeholder="Escribe aquí tus dudas"
                        rows="5"
                        maxlength="350"
                        :rules="validateMessage"
                    />
                    <p class="text-center text-xs font-medium text-gray-400">
                        * Máximo 350 caracteres
                    </p>
                    <CommonButton
                        class="w-full py-2 font-medium"
                        text-size="sm"
                        bg-color="secondary"
                        :loading="loading"
                        :disabled="!meta.valid"
                    >
                        Enviar
                    </CommonButton>
                </Form>
                <div class="flex-1 place-self-center lg:place-self-start">
                    <NuxtImg
                        class="h-full rounded-2xl object-cover"
                        width="400"
                        height="450"
                        src="/home/Jorge.jpg"
                        alt="Contacto"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-4 space-x-5 md:flex-row">
                <div class="flex items-center gap-x-3 text-secondary">
                    <Icon class="text-2xl md:text-3xl" name="fa6-solid:envelope" />
                    <p class="text-lg md:text-xl">entrenaencasa0@gmail.com</p>
                </div>
                <div class="flex items-center gap-2 text-2xl text-secondary">
                    <Icon class="text-2xl md:text-3xl" name="fa6-solid:phone" />
                    <p class="text-lg md:text-xl">+56 9 7137 0313</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();

const formData = reactive({
    email: "",
    subject: "",
    message: "",
});

const loading = ref(false);

const validateEmail = (value) => {
    if (!value) {
        return "El email es requerido";
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return "El email no es válido";
    }

    return true;
};

const validateSubject = (value) => {
    if (!value) {
        return "El asunto es requerido";
    }

    if (value.length < 10) {
        return "El asunto debe tener al menos 10 caracteres";
    }

    return true;
};

const validateMessage = (value) => {
    if (!value) {
        return "El mensaje es requerido";
    }

    if (value.length < 20) {
        return "El mensaje debe tener al menos 20 caracteres";
    }

    return true;
};

const sendEmail = async (values, { resetForm }) => {
    loading.value = true;

    const body = {
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
    };

    try {
        const response = await $fetch("/api/email/send/contactForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });

        if (response.success) {
            toast.success("Mensaje enviado correctamente");
            resetForm();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Ocurrió un error al enviar el correo");
    } finally {
        loading.value = false;
    }
};

const resetFormData = () => {
    formData.email = "";
    formData.subject = "";
    formData.message = "";
};
</script>
