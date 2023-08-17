<template>
    <div class="about-you">
        <div class="topSection mt-2 mb-5 mx-3">
            <nuxt-link to="/">

                <img class="img-fluid mx-auto d-block" width="120" src="/logo.png" alt="">
            </nuxt-link>
            <p>Cuéntanos un poco sobre ti</p>
        </div>

        <form class="row g-3 mx-5 row-gap-3 w-80">
            <div class="col-md-4">
                <label for="inputNombre" class="form-label">¿Cuál es tu Nombre?</label>
                <input type="text" class="form-control py-3" id="inputNombre" placeholder="Jorge">
            </div>
            <div class="col-md-4">
                <label for="inputApellido" class="form-label">¿Cuál es tu Apellido?</label>
                <input type="text" class="form-control py-3" id="inputApellido" placeholder="Sierra">
            </div>
            <div class="col-md-4">
                <label for="inputGenero" class="form-label">¿Cuál es tu género?</label>
                <select id="inputGenero" class="form-select py-3 ">
                    <option selected>Selecciona tu género</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                    <option>No especificado</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputNacimiento" class="form-label">Fecha de Nacimiento</label>
                <input type="date" class="form-control py-3">
            </div>
            <div class="col-md-4">
                <label for="inputPeso" class="form-label">¿Cuál es tu peso actual?</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control py-3" placeholder="80" aria-label="Recipient's username"
                        aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">Kg</span>
                </div>
            </div>
            <div class="col-md-4">
                <label for="inputPeso" class="form-label">¿Cuál es tu estatura?</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control py-3" placeholder="170" aria-label="Recipient's username"
                        aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">cm</span>
                </div>
            </div>
            <div class="col-12 mt-4 mb-3">
                <div class="form-label extra">Estos datos son necesarios para informar al profesor durante la sesión
                    agendada e ir midiendo tu avance.</div>
            </div>
            <div class="row justify-content-between mt-2">
                <nuxt-link class="col-md-4 skip" to="/user/dashboard/home" style="text-decoration: none; color: inherit;">
                    <p class="link-info">Recordarmelo más tarde </p>
                </nuxt-link>
                <nuxt-link class="col-md-4 boton" to="/user/dashboard/home">
                    <button type="submit" class="btn float-right">Confirmar</button>
                </nuxt-link>
            </div>
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "auth",
});
</script>
    
<style scoped  lang="scss">
$color_enfasis: #0EB3E0;
$color_principal: #505050;
$color_secondary: #C3C3C3;
$extra-color: #949494;
$green: #B5CD13;
$red: #FF3A3A;

$font_family_primary: 'Poppins', sans-serif;
$font_family_Secondary: 'tellural', sans-serif;

.about-you {
    background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
}

.topSection {
    text-align: center;
}


.topSection p {
    color: $color_enfasis;
    font-family: $font_family_primary;
    font-size: 25px;
    font-weight: 600;
    line-height: 119.5%;
}

form {
    font-family: $font_family_primary;
}

form label {
    margin: 0px 10px;
    color: $color_principal;
    font-size: 17px;
    font-family: $font_family_primary;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 3px;
}

form .form-control {
    color: $color_secondary !important;
    box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);
    border: none;
}

form .form-select {
    color: $color_secondary !important;
    box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);
    border: none;
}


form .input-group-text {
    color: $color_principal;
    border: none;
}

::placeholder {
    color: $color_secondary !important;
}

.form-label.extra {
    margin: 0px 10px;
    color: $extra-color;
    font-size: 15px;
    font-family: $font_family_primary;
    font-style: normal;
    font-weight: 500;
    text-align: center;
}

.skip {
    justify-content: left;
    font-size: 18px;
    font-family: $font_family_primary;
}

.btn {
    float: right;
    font-size: 18px;
    font-family: $font_family_primary;
    color: white;
    background-color: $green;
}

.link-info {
    color: $color_enfasis !important;
    text-decoration: none;
}

.col-md-4 {
    margin-bottom: 20px;
}
</style>
