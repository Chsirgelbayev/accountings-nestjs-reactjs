import { useTheme } from '../../hooks/useTheme';

export const Header = () => {
    const { switchTheme, theme } = useTheme();

    return (
        <header
            className={`navbar navbar-dark bg-${
                theme === 'dark' ? 'dark' : 'primary'
            }`}
        >
            <div className="container">
                <h1 style={{ color: 'white' }}>Accountings</h1>

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
