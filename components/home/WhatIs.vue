<template>
    <div class="my-5 d-flex flex-column align-items-center">
        <p class="fs-7" style="letter-spacing: .15rem;">SOBRE NOSOTROS</p>
        <h2 class="fw-medium fs-1">¿Qué es Entrena en Casa?</h2>
        <div class="container mt-5">
            <div class="row">
                <div class="col-6">
                    <div class="contenedor">
                        <iframe class="responsive-iframe " width="560" height="315"
                            src="https://www.youtube.com/embed/LMNJWdFQrHg?&autohide=1&showinfo=0&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="col-5 mx-auto lh-sm fw-light d-flex flex-column justify-content-center"
                    style="text-align: justify;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit obcaecati libero voluptates in? Ducimus
                        eius corrupti libero esse voluptatibus eveniet quod, facilis voluptate, tempora eligendi pariatur
                        assumenda iure?</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
                        porro et,
                        exercitationem nobis
                        rem explicabo quaerat vero. <span class="fw-semibold">Illum</span> odit vel error dolor ad saepe
                        voluptatum, qui numquam eligendi
                        exercitationem ipsam?</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis porro et, exercitationem nobis
                        rem <span class="fw-semibold">explicabo</span> quaerat vero. Illum odit vel error dolor ad saepe
                        <span class="fw-semibold">voluptatum</span>, qui numquam eligendi
                        exercitationem ipsam?
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contenedor {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
}

.responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
</style>