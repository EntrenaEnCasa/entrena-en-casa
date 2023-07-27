<template>
    <div class="userAjustes p-5">
        <div class="row row-gap-4 mb-5">
            <div class="ajustesTitulo mb-5">Ajustes de la cuenta</div>

            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-sm-6 tituloAjustes">
                            <p>Nombre de usuario</p>
                        </div>
                        <div class="col-sm-6 botonAjustes"><button class="btn btn-success disabled">Editar</button></div>
                        <div class="col-lg-12 textoAjustes">Nombre Usuario</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-sm-6 tituloAjustes">
                            <p>Correo electrónico</p>
                        </div>
                        <div class="col-sm-6 botonAjustes"><button class="btn btn-success">Editar</button></div>
                        <div class="col-lg-12 textoAjustes">nombre.apellido@gmail.com</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-sm-6 tituloAjustes">
                            <p>Fecha de nacimiento</p>
                        </div>
                        <div class="col-sm-6 botonAjustes"><button class="btn btn-success disabled">Editar</button></div>
                        <div class="col-lg-12 textoAjustes">12/04/2000</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-sm-6 tituloAjustes">
                            <p>Contraseña</p>
                        </div>
                        <div class="col-sm-6 botonAjustes"><button class="btn btn-success">Editar</button></div>
                        <div class="col-lg-12 textoAjustes">***********</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 mt-5">
            <div class="row justify-content-center row-gap-3 text-center">
                <div class="col-sm-6 col-md-3 col-lg-2 dangerText">
                    ¿Darse de baja?
                </div>
                <div class="col-sm-6 col-md-3 col-lg-2 dangerButton">
                    <button class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon dangerIcon" viewBox="0 0 512 512">
                            <path
                                d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0080 446.25h340.89a32 32 0 0028.18-47.17zm-198.6-1.83a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.95a21.73 21.73 0 0121.5-22.69h.21a21.74 21.74 0 0121.73 22.7z" />
                        </svg>
                        Desactivar Perfil
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
    layout: "user",
});
</script>

<style scoped lang="scss">
$color_enfasis: #0EB3E0;
$color_principal: #505050;
$color_secondary: #C3C3C3;
$extra-color: #949494;
$green: #B5CD13;
$red: #FF3A3A;

$font_family_primary: 'Poppins', sans-serif;
$font_family_Secondary: 'tellural', sans-serif;

.userAjustes {
    font-family: $font_family_primary;
    background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
}

.ajustesTitulo {
    color: #000;
    font-size: 25px;

}

.tituloAjustes {
    color: $extra-color;
    font-size: 15px;
}

.textoAjustes {
    color: $color_principal;
    font-size: 25px;

}

.btn.btn-success {
    background-color: $green;
    border: none;
}

.botonAjustes {
    text-align: right;
}

.dangerText {
    color: #FF3A3A;
    font-size: 25px;

}

.dangerButton {
    font-size: 20px;

    .dangerIcon {
        fill: white !important;
        color: white;
    }

    .btn.btn-danger {
        background-color: #FF3A3A;
    }
}</style>