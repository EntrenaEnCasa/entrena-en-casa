import { useAuthStore } from "~/stores/AuthStore";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const user = userStore.user;

    if (authStore.loggedIn && !to.path.includes("/dashboard") && !to.path.startsWith("/email")) {
        // Special case: If it's a student viewing a plan detail page
        if (user?.user_type === 2 && to.path.startsWith("/plans/")) {
            const planId = to.params.id;
            return navigateTo({
                path: "/user/dashboard/credits",
                query: planId ? { planId: planId } : {},
            });
        }

        // Default dashboard redirects based on user type
        if (user?.user_type === 2) {
            return navigateTo("/user/dashboard/home");
        } else if (user?.user_type === 1) {
            return navigateTo("/professional/dashboard/home");
        } else if (user?.user_type === 0) {
            return navigateTo("/admin/dashboard/home");
        }
    }
});
