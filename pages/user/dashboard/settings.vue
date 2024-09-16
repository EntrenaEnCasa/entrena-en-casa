<template>
    <div>
        <div class="row row-gap-4 mb-5">
            <h3 class="mb-4 text-xl font-medium">Configuración</h3>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div v-if="userStore.user.name" class="rounded-xl border bg-white px-7 py-4">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Nombre de usuario</p>
                        <button disabled
                            class="rounded-lg bg-primary px-8 py-1 text-white disabled:cursor-not-allowed disabled:bg-primary-100">
                            Editar
                        </button>
                    </div>
                    <h3 class="overflow-hidden text-ellipsis text-2xl font-medium">
                        {{ userStore.user.name }}
                    </h3>
                </div>
                <div v-if="userStore.user.email" class="rounded-xl border bg-white px-7 py-4">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Correo electrónico</p>
                        <button class="rounded-lg bg-primary px-8 py-1 text-white" @click="openModalEmail()">
                            Editar
                        </button>
                    </div>
                    <h3 class="overflow-hidden text-ellipsis text-2xl font-medium">
                        {{ userStore.user.email }}
                    </h3>
                </div>
                <div v-if="userStore.user.bornDate" class="rounded-xl border bg-white px-7 py-4">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Fecha de nacimiento</p>
                        <button disabled
                            class="rounded-lg bg-primary px-8 py-1 text-white disabled:cursor-not-allowed disabled:bg-primary-100">
                            Editar
                        </button>
                    </div>
                    <h3 class="overflow-hidden text-ellipsis text-2xl font-medium">
                        {{ userStore.user.bornDate }}
                    </h3>
                </div>
                <div class="rounded-xl border bg-white px-7 py-4">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Contraseña</p>
                        <button class="rounded-lg bg-primary px-8 py-1 text-white" @click="openModalPassword()">
                            Editar
                        </button>
                    </div>
                    <h3 class="overflow-hidden text-ellipsis text-2xl font-medium">************</h3>
                </div>
            </div>
        </div>
        <div class="mt-20 flex justify-center">
            <div class="flex flex-col items-center gap-2">
                <p class="text-xl font-medium text-tertiary">¿Darse de baja?</p>
                <button @click="openModalDeactivate()"
                    class="flex items-center gap-2 rounded-md bg-tertiary px-4 py-1 font-medium text-white">
                    <Icon name="fa6-solid:triangle-exclamation" />
                    <span>Desactivar perfil</span>
                </button>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="modalEmail">
                <Form class="w-full" @submit="changeEmail">
                    <div class="mb-6 grid gap-6 md:grid-cols-2">
                        <CommonInput label="Email" v-model="email" name="email" type="email" id="email"
                            icon="fa6-solid:lock" placeholder="1234@entrenaencasa.cl" :rules="validateEmail" />

                        <CommonInput label="Confirmar email" name="email-repeat" type="email" id="email-repeat"
                            icon="fa6-solid:lock" placeholder="1234@entrenaencasa.cl" :rules="validateEmailRepeat" />
                    </div>
                    <CommonButton class="w-full py-2 font-medium" text-size="xl" :loading="loading">
                        Confirmar
                    </CommonButton>
                </Form>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="modalPassword">
                <Form class="w-full" @submit="changePassword">
                    <div class="mb-6 grid gap-6 md:grid-cols-2">
                        <CommonInput label="Contraseña" v-model="password" name="password" type="password" id="password"
                            icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />

                        <CommonInput label="Confirmar contraseña" name="password-repeat" type="password"
                            id="password-repeat" icon="fa6-solid:lock" placeholder="* * * * * * * *"
                            :rules="validatePasswordRepeat" />
                    </div>
                    <CommonButton class="w-full py-2 font-medium" text-size="xl" :loading="loading">
                        Confirmar
                    </CommonButton>
                </Form>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="modalDeactivate">
                <div class="p-4 text-center">
                    <div class="mb-4">
                        <h3 class="mb-2 text-2xl font-semibold">¿Estas seguro/a?</h3>
                        <p class="max-w-2xl text-lg">
                            Si desactivas tu cuenta, solo podrás volver a activarla hablando con el administrador.
                        </p>
                    </div>
                    <div class="flex flex-col gap-4 lg:flex-row lg:justify-center">
                        <div>
                            <CommonButton bg-color="tertiary" class="px-4 py-2" @click="closeModal()">
                                Cancelar
                            </CommonButton>
                        </div>
                        <div>
                            <CommonButton class="px-4 py-2" @click="deactivateAccount()">
                                Continuar
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useToast } from "vue-toastification";

const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const userStore = useUserStore();
const authStore = useAuthStore();
const loading = ref(false);
const modalPassword = ref(null);
const modalEmail = ref(null);
const password = ref("");
const email = ref("");

const openModalPassword = () => {
    modalPassword.value.openModal();
};

const openModalEmail = () => {
    modalEmail.value.openModal();
};

const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return "El correo electrónico es requerido";
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return "El correo electrónico no es válido";
    }
    // All is good
    return true;
};

const validateEmailRepeat = (emailRepeat) => {
    if (!emailRepeat) {
        return "Debes repetir el correo electrónico";
    }

    if (emailRepeat !== email.value) {
        return "Los correos electrónicos no coinciden";
    }

    return true;
};

const validatePassword = (password) => {
    if (!password) {
        return "La contraseña es requerida";
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    // Check if the password contains at least one number
    let hasNumber = false;
    for (let char of password) {
        if (char >= "0" && char <= "9") {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
        return "La contraseña debe tener al menos un número";
    }
    // Check if the password contains at least one capital letter
    let hasCapital = false;
    for (let char of password) {
        if (char >= "A" && char <= "Z") {
            hasCapital = true;
            break;
        }
    }
    if (!hasCapital) {
        return "La contraseña debe tener al menos una letra mayúscula";
    }
    // All good
    return true;
};

const validatePasswordRepeat = (passRepeat) => {
    if (!passRepeat) {
        return "Debes repetir la contraseña";
    }

    if (passRepeat !== password.value) {
        return "Las contraseñas no coinciden";
    }

    return true;
};

const changePassword = async () => {
    loading.value = true;

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/user/update-password`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                user_id: userStore.user.user_id,
                newPassword: password.value,
            }),
        });

        if (response.success) {
            toast.success("Contraseña cambiada con éxito");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al cambiar la contraseña");
    } finally {
        loading.value = false;
    }
};

const changeEmail = async () => {
    loading.value = true;

    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/user/update-email`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                user_id: userStore.user.user_id,
                newEmail: email.value,
            }),
        });

        if (response.success) {
            toast.success("Correo electrónico cambiado con éxito");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al cambiar el correo electrónico");
    } finally {
        loading.value = false;
    }
};

const modalDeactivate = ref(null);

const openModalDeactivate = () => {
    modalDeactivate.value.openModal();
};
const deactivateAccount = async () => {
    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/user/disable-account`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                user_id: userStore.user.user_id,
            }),
        });

        if (response.success) {
            toast.success("Perfil desactivado con éxito.");
            setTimeout(() => { logout(); }, 500);
            setTimeout(() => { router.push("/"); }, 500);

        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al desactivar el perfil");
    }
};

const logout = async () => {
    try {
        const response = await $fetch("/api/auth/log-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.success) {
            toast.success("Sesión cerrada con éxito. Redirigiendo...");
            setTimeout(() => { authStore.logOut(); }, 800);

        } else {
            toast.error("Error al cerrar sesión");
        }
    } catch (error) {
        toast.error("Error al cerrar sesión");
    }
};
</script>
