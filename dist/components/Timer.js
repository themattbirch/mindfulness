import { useTimer } from '../hooks/useTimer';
import { CircularProgress } from './CircularProgress';
export default function Timer() {
    var _a = useTimer(), time = _a.time, progress = _a.progress, isRunning = _a.isRunning;
    return (React.createElement("div", { className: "relative flex justify-center items-center" },
        React.createElement(CircularProgress, { progress: progress }),
        React.createElement("div", { className: "absolute text-4xl font-bold tabular-nums" }, formatTime(time))));
}
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    return "".concat(pad(hours), ":").concat(pad(minutes), ":").concat(pad(secs));
}
function pad(num) {
    return num.toString().padStart(2, '0');
}
