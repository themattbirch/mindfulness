import React from 'react'
import { Settings } from '../../services/settings'
import { TimerSettings } from './TimerSettings'
import { ThemeSettings } from './ThemeSettings'
import { SoundSettings } from './SoundSettings'
import { NotificationSettings } from './NotificationSettings'
import { KeyboardShortcuts } from './KeyboardShortcuts'
import { animations } from '../../utils/animations'

interface SettingsPanelProps {
  settings: Settings
  onUpdate: (updates: Partial<Settings>) => void
  onClose: () => void
}

export function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
  const tabs = [
    { id: 'timer', label: 'Timer', icon: '⏱️' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'shortcuts', label: 'Shortcuts', icon: '⌨️' }
  ]

  const [activeTab, setActiveTab] = React.useState(tabs[0].id)

  return (
    <div className={`fixed inset-0 bg-black/50 ${animations.fadeIn}`}>
      <div 
        className={`
          fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800
          p-6 shadow-lg ${animations.slideInFromRight}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            ×
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 p-2 rounded text-sm
                ${activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <div>{tab.icon}</div>
              <div>{tab.label}</div>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {activeTab === 'timer' && (
            <TimerSettings
              settings={settings.timer}
              onUpdate={(timer) => onUpdate({ timer })}
            />
          )}
          {activeTab === 'theme' && (
            <ThemeSettings
              settings={settings.theme}
              onUpdate={(theme) => onUpdate({ theme })}
            />
          )}
          {activeTab === 'sound' && (
            <SoundSettings
              settings={settings.sound}
              onUpdate={(sound) => onUpdate({ sound })}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationSettings
              settings={settings.notifications}
              onUpdate={(notifications) => onUpdate({ notifications })}
            />
          )}
          {activeTab === 'shortcuts' && (
            <KeyboardShortcuts
              shortcuts={settings.shortcuts}
              onUpdate={(shortcuts) => onUpdate({ shortcuts })}
            />
          )}
        </div>
      </div>
    </div>
  )
} 