import { useAuthStore } from "~/stores/AuthStore";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const user = userStore.user;

    if (authStore.loggedIn && !to.path.includes("/dashboard") && !to.path.startsWith("/email")) {
        if (user?.user_type === 2) {
            return navigateTo("/user/dashboard/home");
        } else if (user?.user_type === 1) {
            return navigateTo("/professional/dashboard/home");
        } else if (user?.user_type === 0) {
            return navigateTo("/admin/dashboard/home");
        }
    }
});
