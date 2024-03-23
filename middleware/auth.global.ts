import { useAuthStore } from '~/stores/AuthStore'
import { useUserStore } from '~/stores/UserStore'

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const userStore = useUserStore();

    authStore.checkAuthState();

    const user = userStore.user;

    if (authStore.loggedIn) {
        if (to.path.includes("/auth/login" || "/auth/register")) {
            // If user is trying to access login page, redirect them to dashboard
            if (user?.user_type == 2) {
                return navigateTo('/user/dashboard/home');
            }
            else if (user?.user_type == 1) {
                return navigateTo('/professional/dashboard/home');
            }
            else if (user?.user_type == 3) {
                return navigateTo('/admin/dashboard/home');
            }
        }
        else {
            if (user?.user_type == 2 && !to.path.startsWith("/user")) {
                return navigateTo('/user/dashboard/home');
            }
            else if (user?.user_type == 1 && !to.path.startsWith("/professional")) {
                return navigateTo('/professional/dashboard/home');
            }
            else if (user?.user_type == 3 && !to.path.startsWith("/admin")) {
                return navigateTo('/admin/dashboard/home');
            }
        }
    }
})