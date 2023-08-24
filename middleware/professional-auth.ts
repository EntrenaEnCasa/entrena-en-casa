
import { useAuthStore } from '~/stores/AuthStore'

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    const paths = [
        "/professional",
        "/professional/",
        "/professional/dashboard",
        "/professional/dashboard/",
    ];

    if (authStore.loggedIn) {
        if (paths.includes(to.path)) {
            return navigateTo('/professional/dashboard/home');
        }
    }
    else if (!authStore.loggedIn && to.path != "/professional/auth/login") {
        return navigateTo('/professional/auth/login');
    }

})