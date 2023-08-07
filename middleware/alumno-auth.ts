
import { useAuthStore } from '~/stores/AuthStore'

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    if (to.path.startsWith('/user/auth') && authStore.loggedIn) {
        return navigateTo('/user/dashboard/home');
    }

    if (to.path.startsWith('/user/dashboard') && !authStore.loggedIn) {
        return navigateTo('/user/auth/login');
    }

    if (to.path == "/user/dashboard" || to.path == "/user" || to.path == "/user/dashboard/" || to.path == "/user/") {
        return navigateTo('/user/dashboard/home');
    }
})