import { useTheme } from '../../hooks';

export const Header = () => {
    const { switchTheme, theme } = useTheme();

    return (
        <header
            className={`navber navbar-dark bg-${
                theme === 'dark' ? 'dark' : 'primary'
            }`}
        >

            'sa'
            {/* <div className="container">
                <h1 style={{ color: 'white' }}>Accountings</h1>

                <button
                    onClick={switchTheme}
                    className={`btn btn-${theme === 'dark' ? 'ligth' : 'dark'}`}
                >
                    {theme === 'dark' ? 'Go ligth' : 'Go dark'}
                </button>
            </div> */}
        </header>
    );
};
