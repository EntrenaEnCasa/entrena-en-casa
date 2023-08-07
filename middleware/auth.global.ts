import { useAuthStore } from '~/stores/AuthStore'
import { useUserStore } from '~/stores/UserStore'

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const userStore = useUserStore();
    authStore.checkIfUserIsLoggedIn();

    const user = userStore.user;

    if (authStore.loggedIn) {
        if (user?.role == 2 && !to.path.startsWith('/user')) {
            return navigateTo('/user/dashboard/home');
        }
        else if (user?.role == 1 && !to.path.startsWith('/professional')) {
            return navigateTo('/professional/dashboard');
        }
    }

})