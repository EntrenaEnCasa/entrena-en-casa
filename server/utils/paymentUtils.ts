// paymentUtils.ts
import crypto from "crypto";

function createSignature(data: Record<string, any>, secretKey: string): string {
    const queryString = createQueryString(data);
    const signature = crypto.createHmac("sha256", secretKey).update(queryString).digest("hex");

    return signature;
}

export function createFormData(data: Record<string, any>, secretKey?: string): FormData {
    const sortedParams = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));

    const formData = new FormData();
    sortedParams.forEach(([key, value]) => formData.append(key, value.toString()));

    if (secretKey) {
        const dataToSign = sortedParams.map(([key, value]) => `${key}${value}`).join("");
        const signature = crypto.createHmac("sha256", secretKey).update(dataToSign).digest("hex");
        formData.append("s", signature);
    }

    return formData;
}

function createQueryString(data: Record<string, any>): string {
    const sortedParams = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));

    const queryString = sortedParams.map(([key, value]) => `${key}=${value}`).join("&");

    return queryString;
}

export function createQueryParams(
    data: Record<string, any>,
    secretKey: string,
): Record<string, any> {
    const signature = createSignature(data, secretKey);

    const queryParams = {
        ...data,
        s: signature,
    };

    return queryParams;
}
