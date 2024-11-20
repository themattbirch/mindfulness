import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ui/toast';
import { storage } from '../services/storage';
export function useTimer() {
    var _a = useState(0), time = _a[0], setTime = _a[1];
    var _b = useState(false), isRunning = _b[0], setIsRunning = _b[1];
    var toast = useToast().toast;
    // Load timer state
    useEffect(function () {
        storage.getTimer().then(function (_a) {
            var time = _a.time, isRunning = _a.isRunning;
            setTime(time);
            setIsRunning(isRunning);
        });
    }, []);
    // Save timer state
    useEffect(function () {
        storage.saveTimer({ time: time, isRunning: isRunning });
        chrome.runtime.sendMessage({
            type: 'UPDATE_TIMER',
            timer: { time: time, isRunning: isRunning }
        });
    }, [time, isRunning]);
    var showNotification = useCallback(function () {
        chrome.alarms.create('mindfulness-reminder', {
            delayInMinutes: 15
        });
    }, []);
    useEffect(function () {
        var interval = null;
        if (isRunning) {
            interval = window.setInterval(function () {
                setTime(function (prev) {
                    var next = prev + 1;
                    if (next % 900 === 0) { // 15 minutes
                        showNotification();
                    }
                    return next;
                });
            }, 1000);
        }
        return function () {
            if (interval)
                clearInterval(interval);
        };
    }, [isRunning, showNotification]);
    var start = function () { return setIsRunning(true); };
    var pause = function () { return setIsRunning(false); };
    var reset = function () {
        setTime(0);
        setIsRunning(false);
    };
    var progress = (time % 900) / 900 * 100;
    return {
        time: time,
        isRunning: isRunning,
        progress: progress,
        start: start,
        pause: pause,
        reset: reset
    };
}
