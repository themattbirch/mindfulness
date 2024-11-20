var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
export default function Settings(_a) {
    var _this = this;
    var onClose = _a.onClose;
    var _b = useState(null), settings = _b[0], setSettings = _b[1];
    useEffect(function () {
        storage.getSettings().then(setSettings);
    }, []);
    var updateSettings = function (updates) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.saveSettings(updates)];
                case 1:
                    _a.sent();
                    setSettings(function (prev) { return prev ? __assign(__assign({}, prev), updates) : null; });
                    return [2 /*return*/];
            }
        });
    }); };
    if (!settings)
        return null;
    return (React.createElement("div", { className: "space-y-6" },
        React.createElement("div", { className: "flex justify-between items-center" },
            React.createElement("h2", { className: "text-xl font-semibold" }, "Settings"),
            React.createElement("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full" },
                React.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })))),
        React.createElement("div", { className: "space-y-4" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "block text-sm font-medium" }, "Notification Interval"),
                React.createElement("select", { className: "w-full p-2 border rounded-lg" },
                    React.createElement("option", { value: "900" }, "15 minutes"),
                    React.createElement("option", { value: "1800" }, "30 minutes"),
                    React.createElement("option", { value: "3600" }, "1 hour"))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "block text-sm font-medium" }, "Theme"),
                React.createElement("select", { className: "w-full p-2 border rounded-lg" },
                    React.createElement("option", { value: "light" }, "Light"),
                    React.createElement("option", { value: "dark" }, "Dark"))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "block text-sm font-medium" }, "Quote Categories"),
                React.createElement("div", { className: "space-y-1" }, ['Mindfulness', 'Meditation', 'Zen', 'Wellness'].map(function (category) { return (React.createElement("label", { key: category, className: "flex items-center space-x-2" },
                    React.createElement("input", { type: "checkbox", className: "rounded" }),
                    React.createElement("span", null, category))); }))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "block text-sm font-medium" }, "Sound Settings"),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { className: "flex items-center space-x-2" },
                        React.createElement("input", { type: "checkbox", checked: settings.soundEnabled, onChange: function (e) { return updateSettings({ soundEnabled: e.target.checked }); }, className: "rounded" }),
                        React.createElement("span", null, "Enable Sounds")),
                    React.createElement("div", { className: "flex items-center space-x-2" },
                        React.createElement("span", { className: "text-sm" }, "Volume"),
                        React.createElement("input", { type: "range", min: "0", max: "1", step: "0.1", value: settings.volume, onChange: function (e) { return updateSettings({ volume: parseFloat(e.target.value) }); }, className: "w-full" })))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "block text-sm font-medium" }, "Timer Presets"),
                React.createElement("div", { className: "space-y-2" }, settings.presets.map(function (preset) { return (React.createElement("div", { key: preset.id, className: "flex items-center space-x-2" },
                    React.createElement("input", { type: "text", value: preset.name, onChange: function (e) {
                            var newPresets = settings.presets.map(function (p) {
                                return p.id === preset.id ? __assign(__assign({}, p), { name: e.target.value }) : p;
                            });
                            updateSettings({ presets: newPresets });
                        }, className: "border rounded px-2 py-1" }),
                    React.createElement("input", { type: "number", value: preset.duration / 60, onChange: function (e) {
                            var newPresets = settings.presets.map(function (p) {
                                return p.id === preset.id ? __assign(__assign({}, p), { duration: parseInt(e.target.value) * 60 }) : p;
                            });
                            updateSettings({ presets: newPresets });
                        }, className: "border rounded px-2 py-1 w-20" }),
                    React.createElement("span", { className: "text-sm" }, "minutes"))); }))))));
}
