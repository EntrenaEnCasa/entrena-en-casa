import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    const user = userStore.user;

    if (
        user?.user_type === 2 &&
        !user.verified &&
        !to.path.startsWith("/email") &&
        !to.path.includes("/user/dashboard/aboutYou")
    ) {
        return navigateTo("/email/verify-email");
    }
});
