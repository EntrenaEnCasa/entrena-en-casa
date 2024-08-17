// store.js
import { defineStore } from "pinia";

export const useDayNavigationStore = defineStore({
    id: "dayNavigation",
    state: () => ({
        selectedDate: new Date() as Date,
        today: new Date() as Date,
    }),
    getters: {
        selectedDayName(state) {
            return state.selectedDate.toLocaleString("default", {
                weekday: "long",
            });
        },
        selectedDayNumber(state) {
            return state.selectedDate.getDate();
        },
        selectedMonth(state) {
            return state.selectedDate.toLocaleString("default", {
                month: "long",
            });
        },
        isFirstDayOfWeek(state) {
            return (
                state.selectedDate.toDateString() === state.today.toDateString()
            );
        },
        isLastDayOfWeek(state) {
            const lastDayOfWeek = new Date(state.today);
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
            return (
                state.selectedDate.toDateString() ===
                lastDayOfWeek.toDateString()
            );
        },
    },
    actions: {
        goToNextDay() {
            const newDate = new Date(this.selectedDate);
            newDate.setDate(newDate.getDate() + 1);
            this.selectedDate = newDate;
        },
        goToPreviousDay() {
            const newDate = new Date(this.selectedDate);
            newDate.setDate(newDate.getDate() - 1);
            this.selectedDate = newDate;
        },
        goToStartOfWeek() {
            const newDate = new Date(this.today);
            this.selectedDate = newDate;
        },

        updateSelectedDate(date: Date) {
            const newDate = new Date(date);
            this.selectedDate = newDate;
        },
    },
});
