import { useUserStore } from "./UserStore";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("AuthStore", () => {
    const loggedIn = ref<Boolean>(false);
    const userStore = useUserStore();
    const toast = useToast();

    const logIn = (userData: any) => {
        loggedIn.value = true;
        console.log("User logged in, userData: ", userData);
        userStore.setUser(userData);
    };

    const logOut = () => {
        loggedIn.value = false;
        userStore.removeUserData();
        reloadNuxtApp({ path: "/" });
    };

    const checkAuthState = () => {
        const isAuthenticated = !!useCookie("is_authenticated").value;
        if (loggedIn.value && !isAuthenticated) {
            toast.error("Su sesión ha expirado, por favor ingrese nuevamente");
        }
        loggedIn.value = isAuthenticated;
    };

    const signUp = (userData: any) => {
        loggedIn.value = true;
        userStore.setUser(userData);
    };

    return {
        loggedIn,
        logIn,
        logOut,
        checkAuthState,
        signUp,
    };
});
