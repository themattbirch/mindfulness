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
var DEFAULT_SETTINGS = {
    notificationInterval: 900,
    theme: 'light',
    quoteCategories: ['Mindfulness', 'Meditation'],
    volume: 0.5,
    presets: [
        { id: '1', name: 'Quick Break', duration: 300 },
        { id: '2', name: 'Short Session', duration: 900 },
        { id: '3', name: 'Full Session', duration: 1800 }
    ],
    soundEnabled: true
};
var DEFAULT_STATS = {
    totalMinutes: 0,
    sessionsCompleted: 0,
    longestStreak: 0,
    currentStreak: 0,
    lastSessionDate: null
};
export var storage = {
    getSettings: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.sync.get(['settings'], function (result) {
                            resolve(result.settings || DEFAULT_SETTINGS);
                        });
                    })];
            });
        });
    },
    saveSettings: function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.sync.get(['settings'], function (result) {
                            var newSettings = __assign(__assign(__assign({}, DEFAULT_SETTINGS), result.settings), settings);
                            chrome.storage.sync.set({ settings: newSettings }, resolve);
                        });
                    })];
            });
        });
    },
    getTimer: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.local.get(['timer'], function (result) {
                            resolve(result.timer || { time: 0, isRunning: false });
                        });
                    })];
            });
        });
    },
    saveTimer: function (timer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.local.set({ timer: timer }, resolve);
                    })];
            });
        });
    },
    getStatistics: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.sync.get(['statistics'], function (result) {
                            resolve(result.statistics || DEFAULT_STATS);
                        });
                    })];
            });
        });
    },
    updateStatistics: function (sessionDuration) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, today, isConsecutiveDay, newStats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatistics()];
                    case 1:
                        stats = _a.sent();
                        today = new Date().toISOString().split('T')[0];
                        isConsecutiveDay = stats.lastSessionDate ===
                            new Date(Date.now() - 86400000).toISOString().split('T')[0];
                        newStats = {
                            totalMinutes: stats.totalMinutes + Math.floor(sessionDuration / 60),
                            sessionsCompleted: stats.sessionsCompleted + 1,
                            currentStreak: isConsecutiveDay ? stats.currentStreak + 1 : 1,
                            longestStreak: Math.max(stats.longestStreak, isConsecutiveDay ? stats.currentStreak + 1 : 1),
                            lastSessionDate: today
                        };
                        return [2 /*return*/, new Promise(function (resolve) {
                                chrome.storage.sync.set({ statistics: newStats }, resolve);
                            })];
                }
            });
        });
    }
};
