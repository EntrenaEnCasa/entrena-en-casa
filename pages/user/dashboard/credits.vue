<template>
    <div class="creditos">
        <div class="row">
            <div class="col-12 tituloPrincipal">
                Créditos
            </div>
            <div class="col-12" style="text-align: right;">
                <a class="ayuda" href="#">¿Qué significa cada crédito? <svg xmlns="http://www.w3.org/2000/svg"
                        class="ionicon" viewBox="0 0 512 512">
                        <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                            fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="32" d="M220 220h32v116" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                            stroke-width="32" d="M208 340h88" />
                        <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" />
                    </svg></a>
            </div>
            <div class="tusCreditos col-12 mb-5">
                <div class="card creditosUser rounded-4 px-3">
                    <div class="card-body row">
                        <div class="col-lg-7 tituloCreditos"><b>Tus créditos</b></div>
                        <div class="col-lg-5">
                            <div class="row cantidadCreditos">
                                <div class="col-sm-4">
                                    <img src="/plans/gold-medal.png" alt="">
                                    0
                                </div>
                                <div class="col-sm-4">
                                    <img src="/plans/silver-medal.png" alt="">
                                    1
                                </div>
                                <div class="col-sm-4">
                                    <img src="/plans/bronze-medal.png" alt="">
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-5">
                <div class="row justify-content-center text-center">
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-primary">Oro</button>
                    </div>
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-secondary">Plata</button>
                    </div>
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-danger">Bronce</button>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col-lg-6">Descripción</th>
                        <th scope="col-lg-2">Créditos</th>
                        <th scope="col-lg-2">Valor</th>
                        <th scope="col-lg-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1 Sesión a domicilio</td>
                        <td><img src="/plans/gold-medal.png" alt="">1</td>
                        <td class="precio">$20.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                    <tr>
                        <td>Pack mensual, sesiones 1 vez a la semana</td>
                        <td><img src="/plans/gold-medal.png" alt="">4</td>
                        <td class="precio">$75.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                    <tr>
                        <td>Pack mensual, sesiones 2 veces a la semana</td>
                        <td><img src="/plans/gold-medal.png" alt="">8</td>
                        <td class="precio">$140.000</td>
                        <td><button class="btn btn-success">Comprar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<style scoped lang="scss">
$color_enfasis: #0EB3E0;
$color_principal: #505050;
$color_secondary: #C3C3C3;
$extra-color: #949494;
$green: #B5CD13;
$red: #FF3A3A;

$font_family_primary: 'Poppins', sans-serif;
$font_family_Secondary: 'tellural', sans-serif;

.creditos {
    font-family: $font_family_primary;
    background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
    box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
}

.ayuda {
    font-size: 12px;
    text-align: right;
    display: inline;
}

.ayuda {
    color: $color_enfasis;
    text-decoration: none;

}

svg {
    fill: $color_enfasis;
    color: $color_enfasis;
    height: 15px;
    width: 15px;
}

.tituloPrincipal {
    font-size: 25px;
    color: black;
    font-weight: 600;

}

img {
    height: 30px;
    width: 30px;
}

.cred {
    align-items: end;
    text-align: right;
}

.tusCreditos {
    font-size: 24px;
}

.btn {
    border: none;
}

.btn.btn-primary {
    width: 150px;
    background-color: #FFD976;
}

.btn.btn-secondary {
    width: 150px;
    background-color: #a9a9a9;
}

.btn.btn-danger {
    width: 150px;
    background-color: #FFB57A;
}

.btn.btn-success {
    background-color: $green;
    width: 150px;
}

.precio {
    color: $color_enfasis;
}
</style>