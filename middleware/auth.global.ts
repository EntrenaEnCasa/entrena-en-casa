import { useAuthStore } from "~/stores/AuthStore";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    authStore.checkAuthState();

    const user = userStore.user;

    if (authStore.loggedIn) {
        // Si el usuario está logeado, pero no ha verificado su email, y no está en la ruta para verificar el email, será redirigido a la ruta para verificar el email.
        // El usuario no podrá acceder a ninguna otra ruta hasta que haya verificado su email, a excepción del "aboutYou", que es necesario para que el usuario llene sus datos al momento de registrase.
        if (
            user?.user_type == 2 &&
            !user.verified &&
            !to.path.startsWith("/email") &&
            !to.path.includes("/user/dashboard/aboutYou")
        ) {
            return navigateTo("/email/verify-email");
        }

        if (!to.path.includes("/dashboard") && !to.path.startsWith("/email")) {
            // Added condition to check if the current path is not the verify email route
            if (user?.user_type == 2) {
                return navigateTo("/user/dashboard/home");
            } else if (user?.user_type == 1) {
                return navigateTo("/professional/dashboard/home");
            } else if (user?.user_type == 0) {
                return navigateTo("/admin/dashboard/home");
            }
        }
    } else {
        // Cuando el usuario no está logeado, si el usuario intenta acceder a la ruta para verificar email, automáticamente lo redirige al login, ya que no tiene sentido que un usuario no logeado pueda verificar su email, ya que para realizar la validación el usuario debe estar logeado para poder obtener los datos necesarios.
        if (to.path.includes("/email/verify-email")) {
            return navigateTo("/user/auth/login");
        } else if (to.path.includes("/dashboard")) {
            if (to.path.startsWith("/user")) {
                return navigateTo("/user/auth/login");
            } else if (to.path.startsWith("/professional")) {
                return navigateTo("/professional/auth/login");
            } else if (to.path.startsWith("/admin")) {
                return navigateTo("/admin/auth/login");
            } else {
                return navigateTo("/");
            }
        }
    }
});
