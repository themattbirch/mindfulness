import React from 'react'
import { TimerSettings as TimerSettingsType } from '../../services/settings'
import { animations } from '../../utils/animations'

interface TimerSettingsProps {
  settings: TimerSettingsType
  onUpdate: (settings: TimerSettingsType) => void
}

export function TimerSettings({ settings, onUpdate }: TimerSettingsProps) {
  return (
    <div className={`space-y-4 ${animations.fadeIn}`}>
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Default Duration (minutes)
        </label>
        <input
          type="number"
          value={settings.defaultDuration / 60}
          onChange={(e) => onUpdate({
            ...settings,
            defaultDuration: parseInt(e.target.value) * 60
          })}
          min="1"
          max="120"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Notification Interval
        </label>
        <select
          value={settings.notificationInterval}
          onChange={(e) => onUpdate({
            ...settings,
            notificationInterval: parseInt(e.target.value)
          })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="300">5 minutes</option>
          <option value="600">10 minutes</option>
          <option value="900">15 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="3600">1 hour</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.autoStart}
            onChange={(e) => onUpdate({
              ...settings,
              autoStart: e.target.checked
            })}
            className="rounded"
          />
          <span className="text-sm">Auto-start next session</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Timer Presets</label>
        <div className="space-y-2">
          {settings.presets.map((preset, index) => (
            <div key={preset.id} className="flex gap-2">
              <input
                type="text"
                value={preset.name}
                onChange={(e) => {
                  const newPresets = [...settings.presets]
                  newPresets[index] = { ...preset, name: e.target.value }
                  onUpdate({ ...settings, presets: newPresets })
                }}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Preset name"
              />
              <input
                type="number"
                value={preset.duration / 60}
                onChange={(e) => {
                  const newPresets = [...settings.presets]
                  newPresets[index] = {
                    ...preset,
                    duration: parseInt(e.target.value) * 60
                  }
                  onUpdate({ ...settings, presets: newPresets })
                }}
                className="w-24 px-3 py-2 border rounded-md"
                min="1"
                max="120"
              />
              <button
                onClick={() => {
                  const newPresets = settings.presets.filter(p => p.id !== preset.id)
                  onUpdate({ ...settings, presets: newPresets })
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newPreset = {
                id: crypto.randomUUID(),
                name: 'New Preset',
                duration: 900
              }
              onUpdate({
                ...settings,
                presets: [...settings.presets, newPreset]
              })
            }}
            className="w-full px-3 py-2 text-sm text-blue-500 border border-blue-500
              rounded-md hover:bg-blue-50"
          >
            Add Preset
          </button>
        </div>
      </div>
    </div>
  )
} 