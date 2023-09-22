
import { useAuthStore } from '~/stores/AuthStore'

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    const paths = [
        "/user",
        "/user/",
        "/user/dashboard",
        "/user/dashboard/",
    ];

    if (authStore.loggedIn) {
        if (paths.includes(to.path)) {
            return navigateTo('/user/dashboard/home');
        }
    }
    else if (!authStore.loggedIn && (to.path != "/user/auth/login" && to.path != "/user/auth/register") ) {
        return navigateTo('/user/auth/login');
    }
})