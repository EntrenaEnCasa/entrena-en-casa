<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/tellural");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

body {
    font-family: "Poppins", sans-serif;
}

body.modal-open {
    overflow: hidden;
    overflow-y: auto;
}

.tellural {
    font-family: "tellural", sans-serif;
}

.bg-gradiente {
    background: url("/background.svg") no-repeat center center fixed;
}

:root {
    --popper-theme-background-color: #fff;
    --popper-theme-background-color-hover: #fff;
    --popper-theme-text-color: #333;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
