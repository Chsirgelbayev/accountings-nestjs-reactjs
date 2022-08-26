import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { MutableRefObject, useRef, useState } from 'react';
import { AuthClient } from '../../api/authClient';

export const Auth = ({ type }: { type: 'login' | 'registration' }) => {
    const [spinner, setSpinner] = useState(false);

    const userNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const navigate = useNavigate();

    const authTitle = type === 'login' ? 'Войти' : 'Регистрация';

    const login = async (username: string, password: string) => {
        if (!username || !password) {
            return;
        }

        const result = await AuthClient.login(username, password);

        if (!result) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        navigate('/accountings');
    };

    const register = async (
        username: string,
        password: string,
        email: string
    ) => {
        if (!username || !password || !email) {
            return;
        }

        if (password.length < 4 || password.length > 20) {
            return;
        }

        const result = await AuthClient.login(username, password);
    };

    return (
        <div className="container">
            <h1>{authTitle}</h1>
            <form className="form-group">
                <label className="auth-label">
                    Имя пользователя
                    <input type="text" className="form-control" />
                </label>
                <label className="auth-label">
                    Введите пароль
                    <input type="text" className="form-control" />
                </label>
                <button className="btn btn-primary auth-btn">
                    {authTitle}
                </button>
            </form>
            {type === 'login' ? (
                <div className="question_text">
                    <span>Еще нет аккаунта?</span>
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>
            ) : (
                <div className="question_text">
                    <span>Уже есть аккаунт?</span>
                    <Link to={'/login'}>Войти</Link>
                </div>
            )}
        </div>
    );
};
