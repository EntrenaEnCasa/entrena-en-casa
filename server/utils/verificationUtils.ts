import jsonwebtoken from "jsonwebtoken";

const config = useRuntimeConfig();

export function createToken(payload: Record<string, any>, expiresIn: string): string {
    const token = jsonwebtoken.sign(payload, config.emailToken, { expiresIn });
    return token;
}

export function verifyToken(token: string): Record<string, any> {
    const payload = jsonwebtoken.verify(token, config.emailToken) as Record<string, any>;
    return payload;
}
