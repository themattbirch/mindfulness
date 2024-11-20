var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { createContext, useContext, useState } from 'react';
var ToastContext = createContext(undefined);
export function ToastProvider(_a) {
    var children = _a.children;
    var _b = useState([]), toasts = _b[0], setToasts = _b[1];
    var addToast = function (message, type) {
        if (type === void 0) { type = 'info'; }
        var id = Date.now();
        setToasts(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ id: id, message: message, type: type }], false); });
        setTimeout(function () {
            setToasts(function (prev) { return prev.filter(function (toast) { return toast.id !== id; }); });
        }, 5000);
    };
    return (React.createElement(ToastContext.Provider, { value: { toast: addToast } },
        children,
        React.createElement("div", { className: "fixed bottom-4 right-4 space-y-2" }, toasts.map(function (toast) { return (React.createElement("div", { key: toast.id, className: "\n              p-4 rounded-lg shadow-lg text-white\n              ".concat(toast.type === 'success' ? 'bg-green-500' :
                toast.type === 'error' ? 'bg-red-500' :
                    'bg-blue-500', "\n            ") }, toast.message)); }))));
}
export function useToast() {
    var context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
