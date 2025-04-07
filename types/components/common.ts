export {};

declare global {
    interface SelectOption {
        value: string | number;
        label: string;
    }
}
