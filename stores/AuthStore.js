import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'

export const useAuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            loggedIn: false
        }
    },
    actions: {
        logIn(userData) {
            const userStore = useUserStore();
            this.loggedIn = true;
            localStorage.setItem('token', userData.token);
            userStore.setUserData(userData);

        },
        logOut() {
            const userStore = useUserStore();
            this.loggedIn = false;
            localStorage.removeItem('token');
            userStore.removeUserData();
        },
        checkIfUserIsLoggedIn() {
            const userStore = useUserStore();
            if (localStorage.getItem('token')) {
                userStore.setUserFromLocalStorage();
                this.loggedIn = true;
            }
            else {
                this.loggedIn = false;
            }
        },
        signUp(userData) {
            const userStore = useUserStore();
            this.loggedIn = true;
            localStorage.setItem('token', userData.token);
            userStore.setUserData(userData);
        }
    }
})