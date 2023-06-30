<template >
    <div class="userInicio py-5">
        <div class="row row-gap-5">
            <div class="col-md-6 px-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Últimas sesiones</h5>
                    </div>
                </div>
            </div>
            <div class="col-md-6 px-5">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title">Próximas sesiones</h5>
                    </div>
                </div>
            </div>
            <div class="col-md-12 px-5">
                <div class="card">
                    <div class="card-body cartaGrande">
                        <div class="titulo">
                            <h5 class="card-title">Estadísticas</h5>
                        </div>
                        <div class="texto">
                            <p class="card-text align-middle mt-5 pt-5">No hay estadísticas disponibles actualmente.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="scss">
    $color_enfasis: #0EB3E0;
    $color_principal: #505050;
    $color_secondary: #C3C3C3;
    $extra-color: #949494;
    $green: #B5CD13;
    $red: #FF3A3A;

    $font_family_primary: 'Poppins', sans-serif;
    $font_family_Secondary: 'tellural', sans-serif;

    .userInicio{
        font-family: $font_family_primary;
        background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
        box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
    }

    .elemento{
        background-color: red;
    }

    .card{
        width: 100%;
        height: 300px;
        border-radius: 20px;
        border: 1px solid #E8E8E8;
        box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);
    }

    .card-title{
        color: $extra-color;
        font-size: 20px;
    }

    .card-text{
        color: $extra-color;
        font-size: 25px;
        text-align: center;
    }
    
    .texto{
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>