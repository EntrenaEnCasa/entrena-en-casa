<template>
    <div class="background  my-1/5 h-screen grid gap-x-2">
        <div class="flex flex-col items-center pt-5 mx-3">
            <nuxt-link to="/">
                <img class="img-fluid mx-auto d-block" width="120" src="/logo.png" alt="">
            </nuxt-link>
            <p class="text-secondary text-lg font-semibold ">Cuéntanos un poco sobre ti</p>
        </div>

        <form class=" w-8/14 grid sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-3 justify-items-center">

            <div class="grid w-3/4 content-center">
                <label for="inputNombre" class="form-label">¿Cuál es tu Nombre?</label>
                <input type="text" class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full outline-none"
                    id="inputNombre" placeholder="Jorge">
            </div>
            <div class="grid w-3/4 content-center">
                <label for="inputApellido" class="form-label">¿Cuál es tu Apellido?</label>
                <input type="text" class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full outline-none"
                    id="inputApellido" placeholder="Sierra">
            </div>
            <div class="grid w-3/4 content-center ">
                <label for="inputGenero" class="form-label">¿Cuál es tu género?</label>
                <select id="inputGenero"
                    class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full outline-none text-gray-500 ">
                    <option selected>Selecciona tu género</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                    <option>No especificado</option>
                </select>
            </div>

            <div class="grid w-3/4 content-center">
                <label for="phone" class="form-label">Número de Teléfono</label>
                <div class="flex items-center mb-3 gap-x-3">
                    <input type="text" class="border rounded-md px-4 py-3 flex items-center space-x-4 w-3/4 outline-none "
                        placeholder="+56 9 XXXX XXXX" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2"></span>
                </div>
            </div>

            <div class="grid w-3/4 content-center">
                <label for="inputNacimiento" class="form-label">Fecha de Nacimiento</label>
                <input type="date"
                    class="border rounded-md p-3 flex items-center space-x-4 w-full outline-none text-gray-500">
            </div>
            <div class="grid w-3/4 content-center">
                <label for="inputPeso" class="form-label">¿Cuál es tu peso actual?</label>
                <div class="flex items-center mb-3 gap-x-3">
                    <input type="text" class="border rounded-md px-4 py-3 flex items-center space-x-4 w-3/4 outline-none "
                        placeholder="80" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">Kg</span>
                </div>
            </div>
            <div class="grid w-3/4 content-center">
                <label for="inputPeso" class="form-label">¿Cuál es tu estatura?</label>
                <div class="flex items-center">
                    <input type="text" class="border rounded-md px-4 py-3 flex items-center space-x-4 w-3/4 outline-none "
                        placeholder="170" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">cm</span>
                </div>
            </div>

        </form>
        <div class="mx-5">
            <div>
                <div class="form-label extra text-center">Estos datos son necesarios para informar al profesor durante la
                    sesión
                    agendada e ir midiendo tu avance.</div>
            </div>

            <div class="flex justify-between px-5">
                <button class="text-secondary" to="/user/dashboard/home" @click="openModal()">
                    <p class="link-info">Recordarmelo más tarde </p>
                </button>
                <CommonButton text="Confirmar" class="px-4 py-2 rounded-lg" to="/user/dashboard/home">
                </CommonButton>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <h3 class="text-xl">¿Estás seguro? Si no rellenas estos datos, no podrás agendar ninguna sesión.</h3>
                <div class="flex space-x-4">
                    <div>
                        <button class="px-4 py-2 rounded-md bg-primary text-white"
                            @click="router.push('/user/dashboard/home');">Confirmar</button>
                    </div>
                    <div>
                        <button class="px-4 py-2 rounded-md bg-red-500 text-white" @click="closeModal()">Cancelar</button>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>

const modal = ref(null);
const openModal = () => {
    modal.value.openModal();
};

const closeModal = () => {
    modal.value.closeModal();
};

const router = useRouter();

definePageMeta({
    layout: "auth",
});
</script>
    


