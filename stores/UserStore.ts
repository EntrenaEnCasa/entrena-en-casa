import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', () => {
    const user = ref<User | Student | Professional | null>(null)

    const setUser = (userData: User | Student | Professional) => {
        user.value = userData
    }

    const removeUserData = () => {
        user.value = null
    }

    return {
        user,
        setUser,
        removeUserData,
    }
}, { persist: {
    storage: localStorage,
  } })