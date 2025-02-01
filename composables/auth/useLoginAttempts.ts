export const useLoginAttempts = (maxAttempts = 3, lockoutTime = 15) => {
    const attempts = ref(0);
    const isLocked = ref(false);
    const timer = ref(0);
    let timerInterval: NodeJS.Timeout | null = null;

    const increment = () => {
        attempts.value++;
        if (attempts.value >= maxAttempts) {
            startLockout();
        }
    };

    const reset = () => {
        attempts.value = 0;
        isLocked.value = false;
        timer.value = 0;
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    };

    const startLockout = () => {
        isLocked.value = true;
        timer.value = lockoutTime;
        timerInterval = setInterval(() => {
            timer.value--;
            if (timer.value <= 0) {
                reset();
            }
        }, 1000);
    };

    onUnmounted(() => {
        if (timerInterval) clearInterval(timerInterval);
    });

    return {
        attempts,
        isLocked,
        timer,
        increment,
        reset,
        maxAttempts,
    };
};
