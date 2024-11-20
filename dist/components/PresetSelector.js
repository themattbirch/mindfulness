import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
export default function PresetSelector(_a) {
    var onSelect = _a.onSelect;
    var _b = useState([]), presets = _b[0], setPresets = _b[1];
    useEffect(function () {
        storage.getSettings().then(function (settings) { return setPresets(settings.presets); });
    }, []);
    return (React.createElement("div", { className: "flex space-x-2 mb-4" }, presets.map(function (preset) { return (React.createElement("button", { key: preset.id, onClick: function () { return onSelect(preset.duration); }, className: "px-3 py-1 text-sm rounded-full bg-blue-100 \n                     dark:bg-blue-900 hover:bg-blue-200 \n                     dark:hover:bg-blue-800 transition-colors" }, preset.name)); })));
}
