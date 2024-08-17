<template>
    <div class="recomendaciones">
        <p class="tituloPrincipal">Recomendaciones</p>
        <div class="row row-gap-3">
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-6 subtitulo">
                            <p>Alimentacion</p>
                        </div>
                        <div class="col-sm-6 emoji">
                            <p>🍎</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b>Tips para alimentarse de forma soludable</b>
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-6 subtitulo">
                            <p>Ejercicio</p>
                        </div>
                        <div class="col-sm-6 emoji">
                            <p>😰</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b>No te sobreexijas</b>
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-6 subtitulo">
                            <p>Meditación</p>
                        </div>
                        <div class="col-sm-6 emoji">
                            <p>🧘🏻</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b>La forma correcta de relajarse</b>
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-6 subtitulo">
                            <p>Ejercicio</p>
                        </div>
                        <div class="col-sm-6 emoji">
                            <p>🏋🏽</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b
                                >Como recuperarse correctamente después de un
                                día de ejercicio</b
                            >
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-12 subtitulo">
                            <p>Alimentacion</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b>Comidas post entrenamiento</b>
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card secondary rounded-4 px-3">
                    <div class="card-body row row-gap-3">
                        <div class="col-sm-12 subtitulo">
                            <p>Ejercicio</p>
                        </div>
                        <div class="col-lg-12 titulo">
                            <b>Otro punto importante</b>
                        </div>
                        <div class="col-lg-12 Texto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut et massa mi.....
                        </div>
                        <div class="col-lg-12 method">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$color_enfasis: #0eb3e0;
$color_principal: #505050;
$color_secondary: #c3c3c3;
$extra-color: #949494;
$green: #b5cd13;
$red: #ff3a3a;

$font_family_primary: "Poppins", sans-serif;
$font_family_Secondary: "tellural", sans-serif;

.recomendaciones {
    font-family: $font_family_primary;
    background: linear-gradient(
        135deg,
        rgba(153, 208, 223, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 0.01%,
        rgba(63, 136, 166, 0.1) 100%
    );
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.1);
}

.tituloPrincipal {
    color: black;
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
}

.subtitulo {
    color: #636363;
    font-size: 15px;
    text-align: left;
}

.emoji {
    font-size: 15px;
    text-align: right;
}

.titulo {
    font-size: 20px;
    color: #000;
    text-align: center;
}

.Texto {
    font-size: 15px;
    color: $color_principal;
}

.method {
    text-align: right;
}

a {
    color: $color_enfasis;
    text-decoration: none;
}
</style>
