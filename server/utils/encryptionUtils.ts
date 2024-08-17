import crypto from "crypto";

const config = useRuntimeConfig();

const algorithm = "aes-256-cbc";
const secretKey = process.env.BACKEND_SECRET_KEY || "";

function encryptData(data: any) {
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "hex") || "", iv);

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    return Buffer.concat([iv, encrypted]);
}

export function encryptApiKey(apiKey: string) {
    const encryptedApiKey = encryptData(apiKey);
    return encryptedApiKey.toString("hex");
}
