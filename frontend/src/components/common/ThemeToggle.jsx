import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const themes = [
    { id: 'orange', name: 'Orange', color: '#f27f0d' },
    { id: 'light', name: 'Blue (Light)', color: '#135bec' },
    { id: 'dark', name: 'Dark', color: '#101622' },
];

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark p-1 rounded-lg border border-border-light dark:border-border-dark">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => toggleTheme(t.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${theme === t.id
                            ? 'border-text-main scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                    style={{ backgroundColor: t.color }}
                    title={`Switch to ${t.name} theme`}
                    aria-label={`Switch to ${t.name} theme`}
                />
            ))}
        </div>
    );
};

export default ThemeToggle;
