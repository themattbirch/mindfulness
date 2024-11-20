import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
export default function SessionHistory() {
    var _a = useState([]), sessions = _a[0], setSessions = _a[1];
    var _b = useState('all'), filter = _b[0], setFilter = _b[1];
    useEffect(function () {
        storage.getSessionHistory().then(setSessions);
    }, []);
    var filteredSessions = sessions.filter(function (session) {
        if (filter === 'completed')
            return session.completed;
        if (filter === 'incomplete')
            return !session.completed;
        return true;
    });
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("div", { className: "flex justify-between items-center" },
            React.createElement("h2", { className: "text-xl font-semibold" }, "Session History"),
            React.createElement("select", { value: filter, onChange: function (e) { return setFilter(e.target.value); }, className: "px-2 py-1 rounded border" },
                React.createElement("option", { value: "all" }, "All Sessions"),
                React.createElement("option", { value: "completed" }, "Completed"),
                React.createElement("option", { value: "incomplete" }, "Incomplete"))),
        React.createElement("div", { className: "space-y-2" }, filteredSessions.map(function (session, index) { return (React.createElement("div", { key: index, className: "\n              p-3 rounded-lg ".concat(session.completed
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-red-50 dark:bg-red-900/20', "\n            ") },
            React.createElement("div", { className: "flex justify-between" },
                React.createElement("span", null, new Date(session.date).toLocaleDateString()),
                React.createElement("span", null,
                    Math.floor(session.duration / 60),
                    " minutes")))); }))));
}
