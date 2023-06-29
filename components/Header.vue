<template>
    <nav class="navbar navbar-expand-lg bg-gradiente">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="/logo-horizontal.png" class="object-fit-contain" alt="Bootstrap" width="150" height="50">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav gap-2 mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="#">Sobre Nosotros</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " href="#">Planes</a>
                    </li>
                </ul>
                <div class="ms-auto">
                    <ul class="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
                        <li class="nav-item p-2">
                            <a class="nav-link " href="#">Registro</a>
                        </li>
                        <li class="nav-item p-2">
                            <button type="button" class="btn btn-outline-success">Iniciar sesión</button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>
<style>
.bg-gradiente {
    background: url('/background.svg') no-repeat center center fixed;
    /* background: linear-gradient(136deg, rgba(198, 243, 255, 0.15) 0%, rgba(113, 212, 240, 0.15) 64.54%, rgba(0, 142, 181, 0.15) 100%); */
}
</style>