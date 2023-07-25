<template>
    <div class="my-10 flex flex-col items-center">
        <p class="text-sm tracking-[.15rem]">SOBRE NOSOTROS</p>
        <h2 class="font-medium text-4xl">¿Qué es Entrena en Casa?</h2>
        <div class="mt-10">
            <div class="grid grid-cols-2 items-center w-11/12 mx-auto">
                <div>
                    <div class="contenedor">
                        <iframe class="responsive-iframe " width="560" height="315"
                            src="https://www.youtube.com/embed/LMNJWdFQrHg?&autohide=1&showinfo=0&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="w-10/12 mx-auto leading-tight font-light flex flex-col justify-center text-justify">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit obcaecati libero voluptates in? Ducimus
                        eius <span class="font-semibold">corrupti</span> libero esse voluptatibus eveniet quod, facilis
                        voluptate, tempora eligendi pariatur
                        assumenda iure?</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
                        porro et,
                        exercitationem nobis
                        rem explicabo quaerat vero. <span class="font-semibold">Illum</span> odit vel error dolor ad saepe
                        voluptatum, qui numquam eligendi
                        exercitationem ipsam?</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis porro et, exercitationem nobis
                        rem <span class="font-semibold">explicabo</span> quaerat vero. Illum odit vel error dolor ad saepe
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