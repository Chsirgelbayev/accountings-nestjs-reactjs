import { setAuth } from '../context/auth';
import api from './axios';

export class AuthClient {
    public static async login(username: string, password: string) {
        try {
            console.log(username, password);

            const result = await api.post('api/v1/auth/login', {
                username,
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

    public static async register(username: string, password: string) {
        try {
            const result = await api.post('/api/v1/auth/register', {
                username,
                password
            });

            console.log(result);

            if (result.status === 201) {
                setAuth(false);
                return true;
            }

            return false;
        } catch (e) {}
    }
}
