import React, { createContext, useContext, useState, useEffect } from 'react';
import themes from './themes';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('default');

    useEffect(() => {
        const selectedTheme = themes[theme];
        Object.keys(selectedTheme).forEach(key => {
            const cssKey = `--${key}-color`;
            document.documentElement.style.setProperty(cssKey, selectedTheme[key]);
        });
    }, [theme]);

    const changeTheme = (themeName) => {
        setTheme(themeName);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};