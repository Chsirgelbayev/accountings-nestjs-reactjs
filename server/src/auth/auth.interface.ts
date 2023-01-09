import { User } from '../users/schemas/user.schema';

export class LoginResponse {
    readonly success: true;
    readonly token: string;
}

export class RegisterResponse {
    readonly success: true;
    readonly token: string;
}

export interface CookieSettings {
    readonly expires: Date;
    readonly httpOnly: boolean;
    secure?: boolean;
}

export interface TokenOptions {
    readonly token: string;
    readonly cookieSettings: CookieSettings;
}
