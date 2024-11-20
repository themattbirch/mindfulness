import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
export default function Statistics() {
    var _a = useState(null), stats = _a[0], setStats = _a[1];
    useEffect(function () {
        storage.getStatistics().then(setStats);
    }, []);
    if (!stats)
        return null;
    return (React.createElement("div", { className: "grid grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg" },
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, stats.totalMinutes),
            React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-300" }, "Total Minutes")),
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, stats.sessionsCompleted),
            React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-300" }, "Sessions")),
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, stats.currentStreak),
            React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-300" }, "Current Streak")),
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, stats.longestStreak),
            React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-300" }, "Longest Streak"))));
}
