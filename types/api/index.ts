export {};

declare global {
    interface APIResponse {
        success: boolean;
        message: string;
    }
}
