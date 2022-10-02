import { useStore } from 'effector-react';
import { $login } from '../../context/auth';
import { useTheme } from '../../hooks/useTheme';

export const Header = () => {
    const { switchTheme, theme } = useTheme();
    const login = useStore($login)

    return (
        <header
            className={`navbar navbar-dark bg-${
                theme === 'dark' ? 'dark' : 'primary'
            }`}
        >
            <div className="container">
                <h1 style={{ color: 'white' }}>Accountings</h1>
                {login.length ? <h2 style={{ color: 'white' }}>{login}</h2> : ''}
                <button
                    onClick={switchTheme}
                    className={`btn btn-theme btn-${
                        theme === 'dark' ? 'light' : 'dark'
                    }`}
                >
                    {theme === 'dark' ? 'Go light' : 'Go dark'}
                </button>
            </div>
        </header>
    );
};
