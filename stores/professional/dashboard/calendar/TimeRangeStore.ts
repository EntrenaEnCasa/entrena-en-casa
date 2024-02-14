import { defineStore } from 'pinia';
import { useFormatter } from '~/composables/time/useFormatter';

const { formatHourToTimeString, extractHourFromTimeString } = useFormatter();

const initialStartTime = 9;
const initialEndTime = 21;

const generateTimesList = (startTime: number, endTime: number) : number[] => {
  const times = [];
  for (let i = startTime; i <= endTime; i++) {
    times.push(i);
  }
  return times;
};

const timesList = generateTimesList(initialStartTime, initialEndTime);

export const useTimeRangeStore = defineStore('timeRangeStore', () => {
  const selectedStartTime = ref(formatHourToTimeString(timesList[0]));
  const selectedEndTime = ref(formatHourToTimeString(timesList[1]));

  const startTimeOptions = computed(() => timesList.map(formatHourToTimeString));

  const endTimeOptions = computed(() => {
    let options = [];
    let start = extractHourFromTimeString(selectedStartTime.value);
    let begin = start + 1;

    for (let i = begin; i <= initialEndTime + 1; i++) {
      options.push(formatHourToTimeString(i));
    }
    return options;
  });

  const automaticallySelectedEndTime = computed(() => {
    const startIndex = timesList.findIndex(time => formatHourToTimeString(time) === selectedStartTime.value);
    if (startIndex === timesList.length - 1) {
      return formatHourToTimeString(timesList[startIndex] + 1);
    } else {
      return formatHourToTimeString(timesList[startIndex + 1]);
    }
  });

  watch(selectedStartTime, (newStartTime) => {
    const newStartTimeInt = extractHourFromTimeString(newStartTime);
    const manuallySelectedEndTimeInt = extractHourFromTimeString(selectedEndTime.value);

    if (newStartTimeInt >= manuallySelectedEndTimeInt) {
      const newEndTimeIndex = timesList.findIndex(time => time === newStartTimeInt) + 1;

      if (newEndTimeIndex >= timesList.length) {
        selectedEndTime.value = formatHourToTimeString(timesList[newEndTimeIndex - 1] + 1);
      } else {
        selectedEndTime.value = formatHourToTimeString(timesList[newEndTimeIndex]);
      }
    }
  });

  const updateSelectedStartTimeFromNumber = (newStartTime: number) => {
    selectedStartTime.value = formatHourToTimeString(newStartTime);
  };

  const updateSelectedStartTimeFromString = (newStartTime: string) => {
    selectedStartTime.value = newStartTime;
  };

  const updateSelectedEndTimeFromNumber = (newEndTime: number) => {
    selectedEndTime.value = formatHourToTimeString(newEndTime);
  };

  const updateSelectedEndTimeFromString = (newEndTime: string) => {
    selectedEndTime.value = newEndTime;
  };

  const setSelectedStartTimeToFirstAvailableTime = () => {
    selectedStartTime.value = formatHourToTimeString(timesList[0]);
  };

  return {
    selectedStartTime,
    selectedEndTime,
    startTimeOptions,
    endTimeOptions,
    automaticallySelectedEndTime,
    updateSelectedStartTimeFromNumber,
    updateSelectedStartTimeFromString,
    updateSelectedEndTimeFromNumber,
    updateSelectedEndTimeFromString,
    setSelectedStartTimeToFirstAvailableTime,
  };
});