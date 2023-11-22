import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            user: null || {
                user_id: -1,
                email: "",
                user_type: 0,
                credits: null || {
                    bronze: 0,
                    silver: 0,
                    gold: 0
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
        },
        getUserToken() {
            return localStorage.getItem('token');
        },
        updateUserFromLocalStorage(user) {
            this.removeUserFromLocalStorage();
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        updateCredits(credits) {
            this.user.credits = credits;

            this.updateUserFromLocalStorage(this.user);
        }
    }
})