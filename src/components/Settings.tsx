import { useState, useEffect } from 'react'
import { storage, Settings as SettingsType } from '../services/storage'

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [settings, setSettings] = useState<SettingsType | null>(null)

  useEffect(() => {
    storage.getSettings().then(setSettings)
  }, [])

  const updateSettings = async (updates: Partial<SettingsType>) => {
    await storage.saveSettings(updates)
    setSettings(prev => prev ? { ...prev, ...updates } : null)
  }

  if (!settings) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Notification Interval</label>
          <select className="w-full p-2 border rounded-lg">
            <option value="900">15 minutes</option>
            <option value="1800">30 minutes</option>
            <option value="3600">1 hour</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Theme</label>
          <select className="w-full p-2 border rounded-lg">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Quote Categories</label>
          <div className="space-y-1">
            {['Mindfulness', 'Meditation', 'Zen', 'Wellness'].map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Sound Settings</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                className="rounded"
              />
              <span>Enable Sounds</span>
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Timer Presets</label>
          <div className="space-y-2">
            {settings.presets.map(preset => (
              <div key={preset.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={preset.name}
                  onChange={(e) => {
                    const newPresets = settings.presets.map(p =>
                      p.id === preset.id ? { ...p, name: e.target.value } : p
                    )
                    updateSettings({ presets: newPresets })
                  }}
                  className="border rounded px-2 py-1"
                />
                <input
                  type="number"
                  value={preset.duration / 60}
                  onChange={(e) => {
                    const newPresets = settings.presets.map(p =>
                      p.id === preset.id ? { ...p, duration: parseInt(e.target.value) * 60 } : p
                    )
                    updateSettings({ presets: newPresets })
                  }}
                  className="border rounded px-2 py-1 w-20"
                />
                <span className="text-sm">minutes</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 