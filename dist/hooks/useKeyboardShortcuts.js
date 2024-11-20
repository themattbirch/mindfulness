import { useEffect } from 'react';
export function useKeyboardShortcuts(handlers) {
    useEffect(function () {
        var handleKeyPress = function (event) {
            var _a, _b, _c, _d, _e;
            // Only handle if not typing in an input
            if (event.target instanceof HTMLInputElement)
                return;
            switch (event.key.toLowerCase()) {
                case ' ':
                    event.preventDefault();
                    (_a = handlers.onStart) === null || _a === void 0 ? void 0 : _a.call(handlers);
                    break;
                case 'p':
                    (_b = handlers.onPause) === null || _b === void 0 ? void 0 : _b.call(handlers);
                    break;
                case 'r':
                    (_c = handlers.onReset) === null || _c === void 0 ? void 0 : _c.call(handlers);
                    break;
                case 's':
                    (_d = handlers.onSettings) === null || _d === void 0 ? void 0 : _d.call(handlers);
                    break;
                case 'f':
                    (_e = handlers.onFocusMode) === null || _e === void 0 ? void 0 : _e.call(handlers);
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return function () { return window.removeEventListener('keydown', handleKeyPress); };
    }, [handlers]);
}
