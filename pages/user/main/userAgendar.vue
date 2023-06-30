<template>
    <div class="userAgendar p-5">
        <div class="titulo my-3">Agendar Sesión</div>
        <form class="mb-3">
            <div class="row">
                <div class="col-md-3">
                    <select id="selectCredito" class="form-select">
                        <option selected>Seleccionar tipo de credito</option>
                        <option>Oro</option>
                        <option>Plata</option>
                        <option>Bronce</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select id="selectProfesional" class="form-select">
                        <option selected>Seleccionar Profesional</option>
                        <option>Entrenador Fisico</option>
                        <option>Nutricionista</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon2">Desde</span>
                        <input type="date" class="form-control" aria-describedby="basic-addon2" id="desde">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon2">Hasta</span>
                        <input type="date" class="form-control" aria-describedby="basic-addon2" id="hasta">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="col-md-4 boton">
                        <button type="submit" class="btn btn-primary disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M32 144h448M112 256h288M208 368h96"/>
                            </svg>
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <table class="table rounded-4">
            <thead>
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Modalidad</th>
                    <th scope="col">Formato</th>
                    <th scope="col">Profesional</th>
                    <th scope="col">Créditos</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Domingo 25/7</td>
                    <td>16:00hrs</td>
                    <td>Presencial - Borde costero</td>
                    <td>Grupal</td>
                    <td>Jorge<br>Entrenador Fisico</td>
                    <td><img src="/plans/silver-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Domingo 25/7</td>
                    <td>17:00hrs</td>
                    <td>Online</td>
                    <td>Grupal</td>
                    <td>Gonzalo<br>Entrenador Fisico</td>
                    <td><img src="/plans/bronze-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Domingo 25/7</td>
                    <td>19:00hrs</td>
                    <td>Online</td>
                    <td>Grupal</td>
                    <td>Jorge<br>Entrenador Fisico</td>
                    <td><img src="/plans/bronze-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Lunes 26/7</td>
                    <td>16:00hrs</td>
                    <td>Online</td>
                    <td>Individual</td>
                    <td>Maria<br>Nutricionista</td>
                    <td><img src="/plans/bronze-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Lunes 26/7</td>
                    <td>11:00hrs</td>
                    <td>Presencial - Viña del Mar</td>
                    <td>Individual</td>
                    <td>Francisco<br>Entrenador Fisico</td>
                    <td><img src="/plans/gold-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success disabled">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Lunes 26/7</td>
                    <td>13:00hrs</td>
                    <td>Presencial - Santiago</td>
                    <td>Individual</td>
                    <td>Jorge<br>Entrenador Fisico</td>
                    <td><img src="/plans/gold-medal.png" alt="">1</td>
                    <td>
                        <button class="btn btn-success disabled">Agendar</button>
                    </td>
                </tr>
                <tr>
                    <td>Lunes 26/7</td>
                    <td>16:00hrs</td>
                    <td>Presencial - Santiago</td>
                    <td>Grupal</td>
                    <td>Jorge<br>Entrenador Fisico</td>
                    <td><img src="/plans/gold-medal.png" alt="">3</td>
                    <td>
                        <button class="btn btn-success disabled">Agendar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    
}
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


    .userAgendar{
        font-family: $font_family_primary;
        background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
        box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
    }

    .titulo{
        font-size: 25px;
        color: black;
        font-weight: 500;
    }

    ::-webkit-datetime-edit-year-field:not([aria-valuenow]),
    ::-webkit-datetime-edit-month-field:not([aria-valuenow]),
    ::-webkit-datetime-edit-day-field:not([aria-valuenow]) {
        color: transparent;
    }

    .boton{
        display: inline;
        align-items: right;
        font-size: 15px;
    }

    .btn.btn-primary{
        background-color: $color_enfasis ;
        border: none;
        font-size: 25px;
    }

    .boton svg{
        fill: white;
        width: 25px;
        height: 25px;
    }

    form{
        filter: opacity(60%);
    }

    th{
        font-size: 18px;
    }

    .btn.btn-success{
        background-color: $green;
        border: none;
        color: white;
    }

    img{
        width: 25px;
        height: 25px;
    }

    td{
        font-size: 15px;
        color: $color_principal;
    }

    .disabled{
        filter: opacity(60%);
    }

</style>