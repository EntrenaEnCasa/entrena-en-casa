<template>
    <div class="mx-auto flex min-h-screen max-w-xl items-center">
        <div class="mb-12 flex w-full flex-col items-center justify-center">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="mb-4 w-36" alt="logo" />
            </NuxtLink>
            <AdminAuthLoginForm />
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "auth",
});

const login = () => {
    console.log("login");
};
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
