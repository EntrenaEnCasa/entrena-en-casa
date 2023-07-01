<template>
    <div class="userSoporte p-5">
        <div class="row row-gap-3">
            <div class="col-md-12 tituloSoporte">Soporte Técnico</div>
            <div class="col-md-12 pregFrecSoporte">Preguntas frecuentes</div>
            <div class="col-md-12">
                <div class="accordion" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                ¿Por Que ...?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                ¿Por Que ...?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                ¿Por Que ...?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 extraSoporte">¿Necesitas ayuda personalizada?</div>
            <div class="col-lg-12 contactoSoporte"><a class="contacSoporte" href="#">Contáctanos ></a></div>
        </div>
    </div>
</template>

<script>
    definePageMeta({
        layout: "user",
    });
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

    .userSoporte{
        font-family: $font_family_primary;
        background: linear-gradient(135deg, rgba(153, 208, 223, 0.10) 0%, rgba(255, 255, 255, 0.10) 0.01%, rgba(63, 136, 166, 0.10) 100%);
        box-shadow: 0px -29px 89px 0px rgba(0, 0, 0, 0.10);
    }

    .tituloSoporte{
        font-size: 25px;
        color: black;
    }

    .pregFrecSoporte{
        font-size: 25px;
        color: $color_principal;
    }

    .extraSoporte{
        text-align: center !important;
        color: $extra-color;
        font-size: 15px;
    }

    .contactoSoporte{
        text-align: center;
    }

    .contacSoporte{
        color: $green !important;
        font-size: 25px;
        text-decoration: none;
    }
    
    .accordion{
        margin-bottom: 100px;

    }

</style>