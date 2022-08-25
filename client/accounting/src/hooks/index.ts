import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(
        JSON.parse((localStorage.getItem('theme') as string) || 'dark')
    );

    const datkTheme =
        'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css';

    const lightTheme =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css';

    const setCurrentMode = (theme: string) => {
        const link = document.getElementById('theme-link') as HTMLLinkElement;
        link.href = theme === 'dark' ? datkTheme : lightTheme;
    };

    const switchTheme = () => {
        const inverseMode = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', JSON.stringify(inverseMode));

        setCurrentMode(theme);
        setTheme(inverseMode);
    };

    useEffect(() => {
        setCurrentMode(theme);
    }, [theme]);


    return { switchTheme, theme}
};
