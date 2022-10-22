import { ExpressResponse } from '../../interfaces';
import { User } from '../users/users.schema';

export class LoginResponse {
    readonly success: true;
    readonly token: string;
}

export class RegisterResponse {
    readonly success: true;
    readonly token: string;
}

export class GetMeResponse extends ExpressResponse<User> {}

export interface CookieSettings {
    readonly expires: Date;
    readonly httpOnly: boolean;
    secure?: boolean;
}

export interface TokenOptions {
    readonly token: string;
    readonly cookieSettings: CookieSettings;
}
