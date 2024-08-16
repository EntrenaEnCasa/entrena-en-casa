export const useFormatter = () => {
    const formatDateToWeekdayAndDay = (date: Date): string => {
        const formatter = new Intl.DateTimeFormat("es-CL", {
            weekday: "short", // "short" for abbreviated days, "long" for full names.
            day: "numeric",
        });
        return formatter.format(date).replace(".", ""); // Remove the period after the abbreviated day name if present.
    };

    // Hour is a number that goes from 1 to 24
    const formatHourToTimeString = (hour: number): string => {
        const date = new Date();
        date.setHours(hour, 0, 0, 0);
        const formatter = new Intl.DateTimeFormat("es-CL", {
            hour: "numeric",
            minute: "numeric",
            hour12: false, // Set to true if you want 12-hour format with AM/PM
        });
        return formatter.format(date);
    };

    // 'timeString' is a string like '13:00'
    const extractHourFromTimeString = (time: string): number => {
        return parseInt(time.split(":")[0]);
    };

    const formatDateToFullLongFormat = (date: string | Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("es-CL", options);
        return formatter.format(new Date(date));
    };

    return {
        formatHourToTimeString,
        extractHourFromTimeString,
        formatDateToWeekdayAndDay,
        formatDateToFullLongFormat,
    };
};
