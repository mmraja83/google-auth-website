import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Default to 'orange' which matches our root variables
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'orange');

    useEffect(() => {
        const root = document.documentElement;
        // Remove previous theme attributes if needed or just overwrite
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Handle dark mode class for Tailwind if using 'dark' theme
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
