import { createContext, useContext, useEffect, useState } from 'react';
var ThemeContext = createContext(undefined);
export function ThemeProvider(_a) {
    var children = _a.children;
    var _b = useState('light'), theme = _b[0], setTheme = _b[1];
    useEffect(function () {
        // Load theme from storage
        chrome.storage.sync.get(['theme'], function (result) {
            if (result.theme) {
                setTheme(result.theme);
            }
        });
    }, []);
    var toggleTheme = function () {
        var newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        chrome.storage.sync.set({ theme: newTheme });
    };
    return (React.createElement(ThemeContext.Provider, { value: { theme: theme, toggleTheme: toggleTheme } },
        React.createElement("div", { className: theme }, children)));
}
export function useTheme() {
    var context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
