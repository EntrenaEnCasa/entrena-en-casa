export const useWeekNavigation = () => {
    const currentDate = ref(new Date());

    const getStartOfWeek = (date: Date) => {
        // The start of the week is always the current date
        return new Date(date);
    };

    const getEndOfWeek = (date: Date) => {
        const result = new Date(date);
        // The end of the week is always six days after the start of the week
        result.setDate(result.getDate() + 6);
        return result;
    };

    const startOfWeekDate = computed(() => getStartOfWeek(currentDate.value));
    const endOfWeekDate = computed(() => getEndOfWeek(currentDate.value));
    const currentMonth = computed(() => {
        return currentDate.value.toLocaleString("es-ES", { month: "long" });
    });
    const currentYear = computed(() => currentDate.value.getFullYear());

    const weekDays = computed(() => {
        const result = [];
        const startOfWeek = startOfWeekDate.value;
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            result.push(date);
        }
        return result;
    });

    const isStartWeek = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00.000
        const current = new Date(currentDate.value);
        current.setHours(0, 0, 0, 0); // set time to 00:00:00.000
        return current.getTime() === today.getTime();
    });

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate.value);
        newDate.setDate(newDate.getDate() - 7);
        currentDate.value = newDate;
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentDate.value);
        newDate.setDate(newDate.getDate() + 7);
        currentDate.value = newDate;
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
        };
        const formattedDate = new Intl.DateTimeFormat(
            "default",
            options
        ).format(date);
        const [day, ...month] = formattedDate.split(" ");
        const monthWithoutDe = month.join(" ").replace("de ", "");
        return { day, month: monthWithoutDe };
    };

    return {
        currentDate,
        startOfWeekDate,
        endOfWeekDate,
        weekDays,
        isStartWeek,
        currentMonth,
        currentYear,
        goToPreviousWeek,
        goToNextWeek,
        formatDate,
    };
};
