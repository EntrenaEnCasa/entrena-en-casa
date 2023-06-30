<template>
    <div class="about-you py-5 px-5">
        <div class="topSection mt-3 mb-5 mx-3">
            <img class="img-fluid mx-auto d-block" src="/logo.png" alt="">
            <p>Cuéntanos un poco sobre ti</p>
        </div>
        

        <form class="row g-3 mx-5 row-gap-3">
            <div class="col-md-4">
                <label for="inputNombre" class="form-label">¿Cuál es tu Nombre?</label>
                <input type="text" class="form-control form-control-lg" id="inputNombre" placeholder="Jorge">
            </div>
            <div class="col-md-4">
                <label for="inputApellido" class="form-label">¿Cuál es tu Apellido?</label>
                <input type="text" class="form-control form-control-lg" id="inputApellido" placeholder="Sierra">
            </div>
            <div class="col-md-4">
                <label for="inputGenero" class="form-label">¿Cuál es tu género?</label>
                <select id="inputGenero" class="form-select form-select-lg">
                    <option selected>Selecciona tu género</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                    <option>No especificado</option>
                </select>
            </div>
            <div class="col-md-4">
                    <label for="inputNacimiento" class="form-label">Fecha de Nacimiento</label>
                    <input type="date" class="form-control form-control-lg">
            </div>
            <div class="col-md-4">
                <label for="inputPeso" class="form-label">¿Cuál es tu peso actual?</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control form-control-lg" placeholder="80" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">Kg</span>
                </div>
            </div>
            <div class="col-md-4">
                <label for="inputPeso" class="form-label">¿Cuál es tu estatura?</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control form-control-lg" placeholder="170" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">cm</span>
                </div>
            </div>
            <div class="col-12 mt-4 mb-5">
                <div class="form-label extra">Estos datos son necesarios para informar al profesor durante la sesión agendada e ir midiendo tu avance.</div>
            </div>
            <div class="row justify-content-between mt-3">
                <div class="col-md-4 skip">
                    <a href="#" class="link-info">Recordarmelo más tarde ></a>
                </div>
                <div class="col-md-4 boton">
                    <button type="submit" class="btn float-right">Confirmar</button>
                </div>
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

    .about-you{
        background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
        box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
    }

    .topSection{
        text-align: center;
    }

    img{
        width: 240px;
    }

    .topSection p{
        color: $color_enfasis;
        font-family: $font_family_primary;
        font-size: 50px;
        font-weight: 600;
        line-height: 119.5%;
    }

    form{
        font-family: $font_family_primary;
    }

    form label{
        margin: 0px 10px;
        color: $color_principal;
        font-size: 22px;
        font-family: $font_family_primary;
        font-style: normal;
        font-weight: 500;
    }

    form .form-control{
        color: $color_secondary !important;
        box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);
        border: none;
    }

    form .form-select{
        color: $color_secondary !important;
        box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);
        border: none;
    }


    form .input-group-text{
        color: $color_principal;
        border: none;
    }
    
    ::placeholder {
        color: $color_secondary !important;
    }

    .form-label.extra{
        margin: 0px 10px;
        color: $extra-color;
        font-size: 22px;
        font-family: $font_family_primary;
        font-style: normal;
        font-weight: 500;
        text-align: center;
    }

    .skip{
        justify-content: left;
        font-size: 22px;
        font-family: $font_family_primary;
    }

    .btn{
        float: right;
        font-size: 22px;
        font-family: $font_family_primary;
        color: white;
        background-color: $green;
    }

    .link-info{
        color: $color_enfasis !important;
        text-decoration: none;
    }

    .col-md-4{
        margin-bottom: 20px;
    }

</style>
