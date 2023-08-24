<template>
    <div class="min-h-screen flex items-center max-w-xl mx-auto">
        <div class="w-full flex flex-col justify-center items-center mb-12">
            <nuxt-link to="/">
                <img src="/logo.png" class="mb-4 w-36" alt="logo">
            </nuxt-link>
            <AdminAuthLoginForm/>
        </div>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "auth",
});

const login = () => {
    console.log("login");
}

</script>
<style scoped lang="scss">
svg {
    width: 20px;
    height: 20px;
}

*:focus {

    outline: none !important;
    box-shadow: none;
}
</style>