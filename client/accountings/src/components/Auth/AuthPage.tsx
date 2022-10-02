import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { MutableRefObject, useRef, useState } from 'react';
import { AuthClient } from '../../api/authClient';
import { setAlert } from '../../context/alert';
import { Spinner } from '../Spinner/Spinner';

export const Auth = ({ type }: { type: 'login' | 'registration' }) => {
    const [spinner, setSpinner] = useState(false);

    const userNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();

    const authTitle = type === 'login' ? 'Войти' : 'Регистрация';

    const login = async (login: string, password: string): Promise<void> => {
        if (!login || !password) {
            return;
        }

        const result = await AuthClient.login(login, password);

        if (!result) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        navigate('/accountings');
        setAlert({ alertText: 'Вход выполнен', alertStatus: 'success' });
    };

    const register = async (login: string, password: string): Promise<void> => {
        if (!login || !password) {
            return;
        }

        if (password.length < 4 || password.length > 20) {
            return;
        }

        console.log(login, password)

        const result = await AuthClient.register(login, password);

        if (!result) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        navigate('/login');
        setAlert({
            alertText: 'Регистрация выполнена',
            alertStatus: 'success'
        });
    };

    const Auth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSpinner(true);

        switch (type) {
            case 'login':
                login(userNameRef.current.value, passwordRef.current.value);
                break;

            case 'registration':
                register(userNameRef.current.value, passwordRef.current.value);
                break;
        }
    };

    return (
        <div className="container">
            <h1>{authTitle}</h1>
            <form onSubmit={Auth} className="form-group">
                <label className="auth-label">
                    Имя пользователя
                    <input
                        ref={userNameRef}
                        type="text"
                        className="form-control"
                    />
                </label>
                <label className="auth-label">
                    Введите пароль
                    <input
                        ref={passwordRef}
                        type="text"
                        className="form-control"
                    />
                </label>
                <button className="btn btn-primary auth-btn">
                    {spinner ? <Spinner top={5} left={20} /> : authTitle}
                </button>
            </form>
            {type === 'login' ? (
                <div className="question-text">
                    <span>Еще нет аккаунта?</span>
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>
            ) : (
                <div className="question-text">
                    <span>Уже есть аккаунт?</span>
                    <Link to={'/login'}>Войти</Link>
                </div>
            )}
        </div>
    );
};
