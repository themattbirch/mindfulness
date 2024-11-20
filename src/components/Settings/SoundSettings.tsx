import React from 'react'
import { SoundSettings as SoundSettingsType } from '../../services/settings'
import { animations } from '../../utils/animations'
import { sounds } from '../../services/sounds'

interface SoundSettingsProps {
  settings: SoundSettingsType
  onUpdate: (settings: SoundSettingsType) => void
}

export function SoundSettings({ settings, onUpdate }: SoundSettingsProps) {
  const testSound = async (soundType: keyof typeof sounds) => {
    try {
      await sounds.play(soundType)
    } catch (error) {
      console.error('Failed to play test sound:', error)
    }
  }

  return (
    <div className={`space-y-4 ${animations.fadeIn}`}>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => onUpdate({
              ...settings,
              enabled: e.target.checked
            })}
            className="rounded"
          />
          <span className="text-sm">Enable sounds</span>
        </label>
      </div>

      {settings.enabled && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Volume
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => onUpdate({
                  ...settings,
                  volume: parseFloat(e.target.value)
                })}
                className="flex-1"
              />
              <span className="text-sm w-12">
                {Math.round(settings.volume * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Sound Tests</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => testSound('notification')}
                className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
              >
                Test Notification
              </button>
              <button
                onClick={() => testSound('complete')}
                className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
              >
                Test Complete
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.tickSound}
                onChange={(e) => onUpdate({
                  ...settings,
                  tickSound: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">Play tick sound (every minute)</span>
            </label>
          </div>
        </>
      )}
    </div>
  )
} 