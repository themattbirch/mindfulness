import { useTimer } from '../hooks/useTimer';
export default function Controls() {
    var _a = useTimer(), isRunning = _a.isRunning, start = _a.start, pause = _a.pause, reset = _a.reset;
    return (React.createElement("div", { className: "flex justify-center space-x-4 mt-8" },
        React.createElement("button", { onClick: isRunning ? pause : start, className: "\n          px-6 py-2 rounded-lg font-medium transition-all duration-300\n          ".concat(isRunning
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-black hover:bg-gray-800 text-white', "\n        ") }, isRunning ? 'Pause' : 'Start'),
        React.createElement("button", { onClick: reset, className: "px-6 py-2 rounded-lg font-medium border border-gray-300\n                   hover:bg-gray-100 transition-colors" }, "Reset")));
}
