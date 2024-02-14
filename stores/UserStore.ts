import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {

    state: () => {
        return {
            user: null as User | Student | null
        }
    },
    getters: {
        userToken() {
            return localStorage.getItem('token');
        }
    },
    actions: {
        setUser(newUser: User | Student) {
            this.user = newUser;
            if(localStorage.getItem('token') === null) {
                this.storeUserInLocalStorage(newUser);
            } else {
                this.updateUserFromLocalStorage(newUser);
            }
        },
        removeUserData() {
            this.user = null;
            this.removeUserFromLocalStorage();
        },
        storeUserInLocalStorage(user: User | Student) {
            localStorage.setItem('user', JSON.stringify(user));
        },
        setUserFromLocalStorage() {
            const storedUser = localStorage.getItem('user');
            if (storedUser !== null) {
                this.user = JSON.parse(storedUser);
            }
        },
        removeUserFromLocalStorage() {
            localStorage.removeItem('user');
        },
        updateUserFromLocalStorage(newUser: User | Student) {
            this.removeUserFromLocalStorage();
            localStorage.setItem('user', JSON.stringify(this.user));
            this.user = newUser;
        },
    },
})