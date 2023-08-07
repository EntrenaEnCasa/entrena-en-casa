import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'

export const useAuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            loggedIn: false
        }
    },
    actions: {
        logIn(userData, userDataCredits) {
            const userStore = useUserStore();

            this.loggedIn = true;

            const user = {
                id: userData.id_usuario,
                email: userData.correo,
                role: userData.tipo_usuario,
                credits: {
                    bronze: userDataCredits.bronce,
                    silver: userDataCredits.silver,
                    gold: userDataCredits.gold
                }
            }

            localStorage.setItem('token', userData.token);
            userStore.setUserData(user);

        },
        logOut() {
            const userStore = useUserStore();
            this.loggedIn = false;
            localStorage.removeItem('token');
            userStore.removeUserData();
        },
        checkIfUserIsLoggedIn() {
            if (localStorage.getItem('token')) {
                const userStore = useUserStore();
                userStore.setUserFromLocalStorage();
                this.loggedIn = true;
            }
            else {
                this.loggedIn = false;
            }
        }
    }
})