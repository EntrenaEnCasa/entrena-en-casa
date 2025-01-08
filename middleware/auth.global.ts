import { useAuthStore } from "~/stores/AuthStore";

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    authStore.checkAuthState();
});
