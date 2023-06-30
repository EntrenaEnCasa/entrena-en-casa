<template>
    <div>
        <div>
            <nav class=" navbar navbar-expand-lg bg-white" style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10); position: fixed; left:0; top:0; width: 100vw; z-index: 100;">
                <div class="container w-100" style="height: 60px;">
                    <div class="flex-grow-1">
                        <a class="navbar-brand" href="#">
                            <img src="/logo-horizontal.png" class="object-fit-contain" alt="Bootstrap" width="150" height="35">
                        </a>
                    </div>
                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class=" d-flex flex-column align-items-center " id="to-collapse">
                            <div class="">
                                <p class="mx-auto fw-medium" style="font-size: 12px;">Créditos disponibles</p>
                            </div>
                            <div class="">
                                <ul class="navbar-nav gap-4  mb-lg-0 creditos" >
                                    
                                    <li class="nav-item d-flex align-items-center medal">
                                        <img src="/plans/gold-medal.png" alt="" width="20" style="object-fit:contain;">
                                        <p class="text-gray">0</p>
                                    </li>
                                    <li class="nav-item  d-flex align-items-center medal">
                                        <img src="/plans/silver-medal.png" alt="" width="20" style="object-fit:contain;">
                                        <p class="text-gray">1</p>
                                    </li>
                                    <li class="nav-item  d-flex align-items-center medal">
                                        <img src="/plans/bronze-medal.png" alt="" width="20px" style="object-fit:contain;">
                                        <p class="text-gray">2</p>
                                    </li>
                                    
                                </ul>
                                <button id="logout" class=" py-1 text-white"  style="margin-bottom: 20px;  padding-left:10px; padding-right:10px; background: #0EB3E0; outline: none; border: 0px; border-radius: 5px; font-size: 16px;">Cerrar Sesión</button>

                            </div>
                        </div>
                    </div>
                    <div class="ms-auto">
                        <ul class="justify-content-center user-dropdown me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <button class=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Nombre Usuario
                                        <img class="mx-2" src="/icons/woman.png" alt="" width="40px" style="object-fit:cover;">
                                </button>
                                <ul class="dropdown-menu bg-light">
                                    <li>
                                        <a class="dropdown-item" href="#">Cerrar Sesión</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="sidebar" style="position: fixed; left: 0; width: 19vw; height: 100vh; background: white; box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.20); z-index: 0!important;">
                <ul class="nav nav-pills flex-column py-4 align-items-betweeen"  style="margin-left: 1.5vw; height: 100%; ">
                    <div class="">
                        <li class="nav-item">
                            <nuxt-link to="/user/main/userInicio" class="nav-link   d-flex mx-2 gap-2" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"/><path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"/></svg>
                              <p class="text-sidebar">Inicio</p>
                            </nuxt-link>
    
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/user/main/userSesiones" class="nav-link  d-flex mx-2 gap-2" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"/></svg>
                              <p class="text-sidebar">Sesiones agendadas</p>
                            </nuxt-link>
    
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/user/main/userAgendar" class="nav-link  d-flex mx-2 gap-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3zm344-208a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24z"/></svg>
    
                              <p class="text-sidebar">Agendar Sesión</p>
                            </nuxt-link>
    
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/user/main/userRecom" class="nav-link  d-flex mx-2 gap-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M208 512a24.84 24.84 0 01-23.34-16l-39.84-103.6a16.06 16.06 0 00-9.19-9.19L32 343.34a25 25 0 010-46.68l103.6-39.84a16.06 16.06 0 009.19-9.19L184.66 144a25 25 0 0146.68 0l39.84 103.6a16.06 16.06 0 009.19 9.19l103 39.63a25.49 25.49 0 0116.63 24.1 24.82 24.82 0 01-16 22.82l-103.6 39.84a16.06 16.06 0 00-9.19 9.19L231.34 496A24.84 24.84 0 01208 512zm66.85-254.84zM88 176a14.67 14.67 0 01-13.69-9.4l-16.86-43.84a7.28 7.28 0 00-4.21-4.21L9.4 101.69a14.67 14.67 0 010-27.38l43.84-16.86a7.31 7.31 0 004.21-4.21L74.16 9.79A15 15 0 0186.23.11a14.67 14.67 0 0115.46 9.29l16.86 43.84a7.31 7.31 0 004.21 4.21l43.84 16.86a14.67 14.67 0 010 27.38l-43.84 16.86a7.28 7.28 0 00-4.21 4.21l-16.86 43.84A14.67 14.67 0 0188 176zM400 256a16 16 0 01-14.93-10.26l-22.84-59.37a8 8 0 00-4.6-4.6l-59.37-22.84a16 16 0 010-29.86l59.37-22.84a8 8 0 004.6-4.6l22.67-58.95a16.45 16.45 0 0113.17-10.57 16 16 0 0116.86 10.15l22.84 59.37a8 8 0 004.6 4.6l59.37 22.84a16 16 0 010 29.86l-59.37 22.84a8 8 0 00-4.6 4.6l-22.84 59.37A16 16 0 01400 256z"/></svg>
                              
                              <p class="text-sidebar">Recomendaciones</p>
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="#" class="nav-link  d-flex mx-2 gap-2 disabled" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M104 496H72a24 24 0 01-24-24V328a24 24 0 0124-24h32a24 24 0 0124 24v144a24 24 0 01-24 24zM328 496h-32a24 24 0 01-24-24V232a24 24 0 0124-24h32a24 24 0 0124 24v240a24 24 0 01-24 24zM440 496h-32a24 24 0 01-24-24V120a24 24 0 0124-24h32a24 24 0 0124 24v352a24 24 0 01-24 24zM216 496h-32a24 24 0 01-24-24V40a24 24 0 0124-24h32a24 24 0 0124 24v432a24 24 0 01-24 24z"/></svg>
                              <p class="text-sidebar">Estadísticas</p>
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/user/main/userCredits" class="nav-link  d-flex mx-2 gap-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M448 400H64a16 16 0 010-32h384a16 16 0 010 32zM416 448H96a16 16 0 010-32h320a16 16 0 010 32zM32 272H16v48a32 32 0 0032 32h48v-16a64.07 64.07 0 00-64-64z"/><path d="M480 240h16v-64h-16a96.11 96.11 0 01-96-96V64H128v16a96.11 96.11 0 01-96 96H16v64h16a96.11 96.11 0 0196 96v16h256v-16a96.11 96.11 0 0196-96zm-224 64a96 96 0 1196-96 96.11 96.11 0 01-96 96z"/><circle cx="256" cy="208" r="64"/><path d="M416 336v16h48a32 32 0 0032-32v-48h-16a64.07 64.07 0 00-64 64zM480 144h16V96a32 32 0 00-32-32h-48v16a64.07 64.07 0 0064 64zM96 80V64H48a32 32 0 00-32 32v48h16a64.07 64.07 0 0064-64z"/></svg>
                              <p class="text-sidebar">Créditos</p>
                            </nuxt-link>
                        </li>
                    </div>
                    <div class="">

                        <li class="nav-item ">
                            <nuxt-link to="/" class="nav-link  d-flex mx-2 gap-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48"/><path d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z"/></svg>

                              <p class="text-sidebar">Ajustes</p>
                            </nuxt-link>
                        </li>
                        <li class="nav-item ">
                            <nuxt-link to="/" class="nav-link  d-flex mx-2 gap-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" class="ionicon" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm-6 304a20 20 0 1120-20 20 20 0 01-20 20zm33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 01-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 11-28-1.35c.11-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43z"/></svg>
                                
                              <p class="text-sidebar">Soporte técnico</p>
                            </nuxt-link>
                        </li>
                    </div>
                </ul>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
    .nav-item{
        width: 80%;
        .nav-link p{
           font-size: 12px; 
        }

    }
    .dropdown-toggle{
        background: white;
        outline: none;
        border: 0px;
    }
    .dropdown-menu{
        border-radius: 10px;
        border: 0px;
        
    }
    ul{
        list-style: none;
    }
    
    #logout{
        display: none;
        margin-top: 30px;
    }

    .nav-link[aria-current="page"] {
      svg{
        fill: white;
      }
      p{
        color: white;
      }
      background: #0EB3E0!important;
    }

    .nav-link:not([aria-current="page"]) {
      svg {
        fill:gray;
      }
      p{
        color: gray;
      }
    }



    @media (max-width: 992px) {
        .user-dropdown{
            display: none;
        }
        .text-sidebar{
          display: none;
        }
        .creditos{
            display: flex;
            flex-direction: row;
        
        }
        .navbar-collapse{
            background-color: rgb(244, 244, 244);
            margin-top: 20px;
            border-radius: 10px;

        }
        #logout{
            display:block;
        }
        #to-collapse{
            margin-top: 30px;
            z-index: 10000;
            position: fixed;
            top: 60px;
            right: 40px;
            background-color: rgb(244, 244, 244);
            padding: 20px;
            box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.20);
        }
        .nav-item{
          display: flex;
          justify-content: center;
        }
        .sidebar{
          width: 10vw!important;
        }

    }   
  

</style>