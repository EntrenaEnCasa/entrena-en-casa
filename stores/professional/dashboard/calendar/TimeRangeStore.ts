import { defineStore } from "pinia";
import { useFormatter } from "~/composables/time/useFormatter";

const { formatHourToTimeString, extractHourFromTimeString } = useFormatter();

const initialStartTime = 0;
const initialEndTime = 23;

const generateHourOptions = (startTime: number, endTime: number): number[] => {
    const times = [];
    for (let i = startTime; i <= endTime; i++) {
        times.push(i);
    }
    return times;
};

const generateMinuteIntervals = (interval: number): string[] => {
    const minutes = [];
    for (let i = 0; i < 60; i += interval) {
        minutes.push(i.toString().padStart(2, "0"));
    }
    return minutes;
};

const hourOptions = generateHourOptions(initialStartTime, initialEndTime);
const minuteIntervals = generateMinuteIntervals(15);

export const useTimeRangeStore = defineStore("timeRangeStore", () => {
    const selectedStartHour = ref(hourOptions[0].toString().padStart(2, "0"));
    const selectedStartMinute = ref(minuteIntervals[0]);
    const selectedEndHour = ref(hourOptions[1].toString().padStart(2, "0"));

    const startHourOptions = computed(() =>
        hourOptions.map((hour) => hour.toString().padStart(2, "0"))
    );

    const endHourOptions = computed(() => {
        const startHour = parseInt(selectedStartHour.value);
        const startIndex = hourOptions.findIndex((hour) => hour === startHour);
        return hourOptions
            .slice(startIndex + 1)
            .map((hour) => hour.toString().padStart(2, "0"));
    });

    const startMinuteOptions = computed(() => minuteIntervals);

    const selectedStartTime = computed(
        () => `${selectedStartHour.value}:${selectedStartMinute.value}`
    );

    const automaticallySelectedEndTime = computed(() => {
        const startHour = parseInt(selectedStartHour.value);
        const startMinute = parseInt(selectedStartMinute.value);
        let endHour = startHour + 1;
        let endMinute = startMinute;

        if (endHour > 23) {
            endHour = 0;
        }

        return `${endHour.toString().padStart(2, "0")}:${endMinute
            .toString()
            .padStart(2, "0")}`;
    });

    const selectedEndTime = computed(() => {
        return `${selectedEndHour.value}:${selectedStartMinute.value}`;
    });

    watch(
        [selectedStartHour, selectedStartMinute],
        ([newStartHour, newStartMinute]) => {
            const startHourInt = parseInt(newStartHour);
            let endHourInt = startHourInt + 1;

            if (endHourInt > 23) {
                endHourInt = 0;
            }

            selectedEndHour.value = endHourInt.toString().padStart(2, "0");
        }
    );

    const updateSelectedStartTimeFromNumber = (newStartTime: number) => {
        const timeString = formatHourToTimeString(newStartTime);
        const [hour, minute] = timeString.split(":");
        selectedStartHour.value = hour;
        selectedStartMinute.value = minute;
    };

    const updateSelectedStartTimeFromString = (newStartTime: string) => {
        const [hour, minute] = newStartTime.split(":");
        selectedStartHour.value = hour;
        selectedStartMinute.value = minute;
    };

    const updateSelectedEndTimeFromNumber = (newEndTime: number) => {
        const timeString = formatHourToTimeString(newEndTime);
        const [hour] = timeString.split(":");
        selectedEndHour.value = hour;
    };

    const updateSelectedEndTimeFromString = (newEndTime: string) => {
        const [hour] = newEndTime.split(":");
        selectedEndHour.value = hour;
    };

    const setSelectedStartTimeToFirstAvailableTime = () => {
        selectedStartHour.value = hourOptions[0].toString().padStart(2, "0");
        selectedStartMinute.value = minuteIntervals[0];
    };

    return {
        selectedStartHour,
        selectedStartMinute,
        selectedEndHour,
        startHourOptions,
        endHourOptions,
        startMinuteOptions,
        selectedStartTime,
        selectedEndTime,
        automaticallySelectedEndTime,
        updateSelectedStartTimeFromNumber,
        updateSelectedStartTimeFromString,
        updateSelectedEndTimeFromNumber,
        updateSelectedEndTimeFromString,
        setSelectedStartTimeToFirstAvailableTime,
    };
});
