import React from 'react'
import { ThemeSettings as ThemeSettingsType } from '../../services/settings'
import { animations } from '../../utils/animations'

interface ThemeSettingsProps {
  settings: ThemeSettingsType
  onUpdate: (settings: ThemeSettingsType) => void
}

export function ThemeSettings({ settings, onUpdate }: ThemeSettingsProps) {
  return (
    <div className={`space-y-4 ${animations.fadeIn}`}>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.useSystemTheme}
            onChange={(e) => onUpdate({
              ...settings,
              useSystemTheme: e.target.checked
            })}
            className="rounded"
          />
          <span className="text-sm">Use system theme</span>
        </label>
      </div>

      {!settings.useSystemTheme && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Theme</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdate({ ...settings, theme: 'light' })}
              className={`p-4 border rounded-md ${
                settings.theme === 'light' ? 'border-blue-500' : ''
              }`}
            >
              <div className="h-20 bg-white border rounded-md mb-2"></div>
              Light
            </button>
            <button
              onClick={() => onUpdate({ ...settings, theme: 'dark' })}
              className={`p-4 border rounded-md ${
                settings.theme === 'dark' ? 'border-blue-500' : ''
              }`}
            >
              <div className="h-20 bg-gray-900 border rounded-md mb-2"></div>
              Dark
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium">Accent Color</label>
        <div className="grid grid-cols-6 gap-2">
          {['blue', 'green', 'purple', 'pink', 'orange', 'gray'].map(color => (
            <button
              key={color}
              onClick={() => onUpdate({ ...settings, accentColor: color })}
              className={`
                w-8 h-8 rounded-full
                ${`bg-${color}-500`}
                ${settings.accentColor === color ? 'ring-2 ring-offset-2' : ''}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 