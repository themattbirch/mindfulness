import React from 'react';
import { useState } from 'react';
import Timer from './components/Timer';
import Quote from './components/Quote';
import Controls from './components/Controls';
import Settings from './components/Settings';
import { ToastProvider } from './components/ui/toast';
import { ThemeProvider } from './contexts/ThemeContext';
function App() {
    var _a = useState(false), isSettingsOpen = _a[0], setIsSettingsOpen = _a[1];
    return (React.createElement(ThemeProvider, null,
        React.createElement(ToastProvider, null,
            React.createElement("div", { className: "\n          w-96 min-h-[400px] p-6 rounded-lg shadow-lg relative\n          dark:bg-gray-800 bg-[#F0F4FF]\n          dark:text-white transition-colors\n        " }, isSettingsOpen ? (React.createElement(Settings, { onClose: function () { return setIsSettingsOpen(false); } })) : (React.createElement(React.Fragment, null,
                React.createElement(Timer, null),
                React.createElement(Quote, null),
                React.createElement(Controls, null),
                React.createElement("button", { onClick: function () { return setIsSettingsOpen(true); }, className: "absolute top-4 right-4 p-2 rounded-full hover:bg-blue-100 transition-colors" },
                    React.createElement("svg", { className: "w-5 h-5" /* Add settings icon SVG here */ }))))))));
}
export default App;
