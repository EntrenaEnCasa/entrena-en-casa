import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            user: null || {
                id: null,
                email: null,
                role: null,
                credits: {
                    bronze: null,
                    silver: null,
                    gold: null
                }
            },
        }
    },
    actions: {
        setUserData(user) {
            this.user = user;
            this.storeUserInLocalStorage(user);
        },
        removeUserData() {
            this.user = null;
            this.removeUserFromLocalStorage();
        },
        storeUserInLocalStorage(user) {
            localStorage.setItem('user', JSON.stringify(user));
        },
        setUserFromLocalStorage() {
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        removeUserFromLocalStorage() {
            localStorage.removeItem('user');
        }
    }
})