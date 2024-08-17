<template>
    <div class="min-h-screen">
        <div class="flex flex-col items-center pt-5 mx-3 mb-10">
            <NuxtLink to="/">
                <NuxtImg class="mx-auto w-28 h-28" src="/logo.png" alt="logo" />
            </NuxtLink>
            <p class="text-secondary text-lg font-semibold">
                Cuéntanos un poco sobre ti
            </p>
        </div>

        <Form v-slot="{ meta }" @submit="saveUserData">
            <div
                class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center lg:px-10">
                <CommonInput
                    label="¿Cual es tu nombre?"
                    v-model="formData.firstName"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    placeholder="Ingresa tu nombre"
                    :rules="validateFirstName"
                    class="w-full" />
                <CommonInput
                    label="¿Cual es tu apellido?"
                    v-model="formData.lastName"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    placeholder="Ingresa tu apellido"
                    :rules="validateLastName"
                    class="w-full" />
                <CommonInput
                    label="¿Cual es tu fecha de nacimiento?"
                    v-model="formData.birthDate"
                    name="birthDate"
                    type="date"
                    id="birthDate"
                    placeholder="Ingresa tu fecha de nacimiento"
                    :rules="validateBirthDate"
                    class="w-full" />
                <CommonSelect
                    label="¿Cuál es tu género?"
                    v-model="formData.gender"
                    name="gender"
                    id="gender"
                    placeholder="Ingresa tu género"
                    :rules="validateGender"
                    :options="genderOptions"
                    class="w-full" />
                <CommonInput
                    label="¿Cual es tu peso actual?"
                    v-model="formData.weight"
                    name="weight"
                    type="number"
                    id="weight"
                    placeholder="Ingresa tu peso actual"
                    :rules="validateWeight"
                    right-text="KG"
                    class="w-full" />
                <CommonInput
                    label="¿Cual es tu estatura actual?"
                    v-model="formData.height"
                    name="height"
                    type="number"
                    id="height"
                    placeholder="Ingresa tu estatura actual"
                    :rules="validateHeight"
                    right-text="CM"
                    class="w-full" />
                <CommonInput
                    label="¿Cual es tu número de teléfono?"
                    v-model="formData.phoneNumber"
                    name="phoneNumber"
                    type="number"
                    id="phoneNumber"
                    placeholder="9 XXXX XXXX"
                    :rules="validatePhoneNumber"
                    class="w-full" />
            </div>

            <div class="mt-10">
                <p class="text-center mb-3">
                    Estos datos son necesarios para informar al profesor durante
                    la sesión agendada e ir midiendo tu avance.
                </p>
                <div
                    class="flex flex-col lg:flex-row lg:justify-center gap-4 px-5">
                    <CommonButton
                        type="button"
                        class="px-4 py-2"
                        bg-color="secondary"
                        @click="openModal()">
                        Recordarmelo más tarde
                    </CommonButton>
                    <CommonButton
                        type="submit"
                        :loading="saveUserDataLoading"
                        :disabled="!meta.valid"
                        class="px-4 py-2">
                        Confirmar
                    </CommonButton>
                </div>
            </div>
        </Form>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="p-4 text-center">
                    <div class="mb-4">
                        <h3 class="font-semibold text-2xl mb-2">
                            ¿Estar seguro/a?
                        </h3>
                        <p class="text-lg max-w-2xl">
                            Si no rellenas estos datos, no podrás agendar
                            ninguna sesión.
                        </p>
                    </div>
                    <div
                        class="flex flex-col lg:flex-row lg:justify-center gap-4">
                        <div>
                            <CommonButton
                                bg-color="tertiary"
                                class="px-4 py-2"
                                @click="closeModal()">
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
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
    phoneNumber: "",
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

const validatePhoneNumber = () => {
    if (!formData.phoneNumber) {
        return "El número de teléfono es requerido";
    } else if (formData.phoneNumber.length != 9) {
        return "El número de teléfono debe tener 9 dígitos";
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
        birth_date: formData.birthDate,
        gender: formData.gender,
        weight: formData.weight,
        height: formData.height,
        phone: formData.phoneNumber,
    };

    try {
        const data = await $fetch(
            `${runtimeConfig.public.apiBase}/student/info`,
            {
                method: "PUT",
                credentials: "include",
                body: body,
            }
        );

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
