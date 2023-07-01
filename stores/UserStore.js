import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            user: {},
            loggedIn: false
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        setLoggedIn(loggedIn) {
            this.loggedIn = loggedIn;
        }
    }
})