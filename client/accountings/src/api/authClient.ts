import { setAuth } from '../context/auth';
import api from './axios';

export class AuthClient {
    public static async login(login: string, password: string) {
        try {
            console.log(login, password);

            const result = await api.post('api/v1/auth/login', {
                login,
                password
            });

            if (result.status === 201) {
                setAuth(true);
                localStorage.setItem('auth', JSON.stringify(result.data));
                return true;
            }

            return false;
        } catch (e) {}
    }

    public static async register(login: string, password: string) {
        try {
            const result = await api.post('api/v1/auth/register', {
                login,
                password
            });

            if (result.status === 201) {
                setAuth(false);
                return true;
            }

            return false;
        } catch (e) {}
    }
}
