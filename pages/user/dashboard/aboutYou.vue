<template>
    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center px-6 py-10 lg:px-12"
        style="background-image: url('/auth/step-2-bg.png');"
    >
        <div class="relative z-10 w-full max-w-6xl rounded-3xl bg-white p-8 shadow-2xl lg:p-10">
            <div class="mb-5 flex flex-col items-center justify-between gap-6 lg:flex-row">
                <NuxtLink to="/">
                    <NuxtImg src="/logo.png" class="w-40" alt="logo" />
                </NuxtLink>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-400"
                        >
                            1
                        </div>
                        <div class="text-sm font-medium text-gray-400">Paso 1 de 2</div>
                    </div>
                    <div class="h-0.5 w-14 bg-primary"></div>
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
                        >
                            2
                        </div>
                        <div class="text-sm font-semibold text-primary">Paso 2 (opcional)</div>
                    </div>
                </div>
            </div>

            <Form v-slot="{ meta }" @submit="saveUserData">
                <div class="grid gap-10 lg:grid-cols-[260px_1fr]">
                    <div class="flex flex-col items-center md:items-start w-2/3 md:w-full mx-auto">
                        <div class="mb-5 flex h-20 w-20 text-center md:text-start items-center justify-center rounded-full bg-primary/10">
                            <Icon name="fa6-solid:trophy" class="text-3xl text-primary" />
                        </div>
                        <h2 class="mb-3 text-xl font-bold text-center md:text-start leading-snug text-gray-900">
                            Solo unos pasos más para personalizar tu plan
                        </h2>
                        <p class="mb-6 text-sm text-center md:text-start text-gray-500">
                            Esta información nos ayuda a recomendarte entrenamientos hechos para ti.
                        </p>
                        <div
                            class="flex items-start gap-3 rounded-xl bg-secondary/5 p-4 text-sm text-secondary"
                        >
                            <Icon name="fa6-solid:circle-info" class="mt-0.5 shrink-0" />
                            <p>Información opcional. Puedes completarla ahora o más tarde.</p>
                        </div>
                    </div>

                    <div>
                        <div class="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="firstName">
                                    Nombre
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:user" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        v-model="formData.firstName"
                                        type="text"
                                        placeholder="Ingresa tu nombre"
                                        :rules="validateFirstName"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="firstName" class="mt-1 block text-sm text-red-500" />
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="lastName">
                                    Apellido
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:user" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        v-model="formData.lastName"
                                        type="text"
                                        placeholder="Ingresa tu apellido"
                                        :rules="validateLastName"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="lastName" class="mt-1 block text-sm text-red-500" />
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="phone">
                                    Teléfono
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:phone" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="phone"
                                        name="phone"
                                        v-model="formData.phone"
                                        type="tel"
                                        placeholder="+56 9 1234 5678"
                                        :rules="validatePhone"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="phone" class="mt-1 block text-sm text-red-500" />
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="birthDate">
                                    Fecha de nacimiento
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:calendar-days" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="birthDate"
                                        name="birthDate"
                                        v-model="formData.birthDate"
                                        type="date"
                                        :rules="validateBirthDate"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="birthDate" class="mt-1 block text-sm text-red-500" />
                            </div>

                            <CommonListbox
                                id="gender"
                                name="gender"
                                v-model="formData.gender"
                                label="Género"
                                placeholder="Selecciona tu género"
                                accent="primary"
                                :options="genderOptions"
                                :rules="validateGender"
                            />

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="weight">
                                    Peso actual (kg)
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:weight-scale" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="weight"
                                        name="weight"
                                        v-model="formData.weight"
                                        type="number"
                                        placeholder="Ej. 68"
                                        :rules="validateWeight"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="weight" class="mt-1 block text-sm text-red-500" />
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-semibold text-gray-800" for="height">
                                    Estatura actual (cm)
                                </label>
                                <div
                                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                >
                                    <Icon name="fa6-solid:ruler-vertical" class="mr-3 text-base text-primary" />
                                    <Field
                                        id="height"
                                        name="height"
                                        v-model="formData.height"
                                        type="number"
                                        placeholder="Ej. 175"
                                        :rules="validateHeight"
                                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <ErrorMessage name="height" class="mt-1 block text-sm text-red-500" />
                            </div>
                        </div>

                        <div class="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                            <button
                                type="button"
                                class="inline-flex items-center gap-2 text-sm font-semibold text-secondary bg-secondary-50/15 hover:bg-secondary/10 rounded-xl px-8 py-3.5 transition"
                                @click="openModal()"
                            >
                                <Icon name="fa6-solid:clock" />
                                Recordar más tarde
                            </button>
                            <CommonButton
                                type="submit"
                                bg-color="primary"
                                rounded-size="xl"
                                class="px-8 py-3.5 text-sm font-semibold"
                                :loading="saveUserDataLoading"
                                :disabled="!meta.valid"
                            >
                                Guardar y continuar
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </Form>
        </div>

        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="p-4 text-center">
                    <div class="mb-4">
                        <h3 class="mb-2 text-2xl font-semibold">¿Estar seguro/a?</h3>
                        <p class="max-w-2xl text-lg">
                            Si no rellenas estos datos, no podrás agendar ninguna sesión.
                        </p>
                        
                    </div>
                    <div class="flex flex-col gap-4 lg:flex-row lg:justify-center">
                        <div>
                            <CommonButton
                                bg-color="tertiary"
                                class="px-4 py-2"
                                @click="closeModal()"
                            >
                                Cancelar
                            </CommonButton>
                        </div>
                        <div>
                            <CommonButton class="px-4 py-2" @click="goToHome">
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
import { useToast } from "vue-toastification";

const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();
const user = userStore.user;
const toast = useToast();

const formData = reactive({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
});

const saveUserDataLoading = ref(false);

const genderOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "Otro", label: "Otro" },
];

const validateFirstName = () => {
    if (!formData.firstName) {
        return "El nombre es requerido";
    } else if (formData.firstName.length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
    }
    return true;
};

const validateLastName = () => {
    if (!formData.lastName) {
        return "El apellido es requerido";
    } else if (formData.lastName.length < 3) {
        return "El apellido debe tener al menos 3 caracteres";
    }
    return true;
};

const validatePhone = () => {
    if (!formData.phone) {
        return "El teléfono es requerido";
    }
    const regex = /^[0-9+\s]{8,15}$/;
    if (!regex.test(formData.phone)) {
        return "El teléfono no es válido";
    }
    return true;
};

const validateBirthDate = () => {
    if (!formData.birthDate) {
        return "La fecha de nacimiento es requerida";
    }

    const date = new Date(formData.birthDate);
    const currentDate = new Date();
    const yearDifference = currentDate.getFullYear() - date.getFullYear();
    if (yearDifference > 80 || yearDifference < 10 || date >= currentDate) {
        return "Debes ingresar una fecha correcta";
    }

    return true;
};

const validateGender = () => {
    if (!formData.gender) {
        return "El género es requerido";
    }

    return true;
};

const validateWeight = () => {
    if (!formData.weight) {
        return "El peso es requerido";
    } else if (formData.weight < 30 || formData.weight > 200) {
        return "El peso debe estar entre 30 y 200 kg";
    }
    return true;
};

const validateHeight = () => {
    if (!formData.height) {
        return "La estatura es requerida";
    } else if (formData.height < 100 || formData.height > 250) {
        return "La estatura debe estar entre 100 y 250 cm";
    }
    return true;
};

const goToHome = () => {
    closeModal();
    router.push("/user/dashboard/home");
};

const modal = ref(null);
const openModal = () => {
    modal.value.openModal();
};

const closeModal = () => {
    modal.value.closeModal();
};

const router = useRouter();

const saveUserData = async () => {
    saveUserDataLoading.value = true;

    const body = {
        user_id: user.user_id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        birth_date: formData.birthDate,
        weight: formData.weight,
        height: formData.height,
        phone: formData.phone,
    };

    try {
        const data = await $fetch(`${runtimeConfig.public.apiBase}/student/info`, {
            method: "PUT",
            credentials: "include",
            body: body,
        });

        if (data.success) {
            const user = userStore.user;
            const newUser = { ...user, info: { ...body } };
            userStore.setUser(newUser);
            toast.success("Datos guardados correctamente");
            goToHome();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al guardar los datos");
    } finally {
        saveUserDataLoading.value = false;
    }
};

definePageMeta({
    layout: "auth",
});
</script>
