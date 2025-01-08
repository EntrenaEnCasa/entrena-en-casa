import { useAuthStore } from "~/stores/AuthStore";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    if (!authStore.loggedIn) {
        if (to.path.includes("/email/verify-email")) {
            return navigateTo("/user/auth/login");
        }

        if (to.path.includes("/dashboard")) {
            if (to.path.startsWith("/user")) {
                return navigateTo("/user/auth/login");
            } else if (to.path.startsWith("/professional")) {
                return navigateTo("/professional/auth/login");
            } else if (to.path.startsWith("/admin")) {
                return navigateTo("/admin/auth/login");
            }
            return navigateTo("/");
        }
    }
});
