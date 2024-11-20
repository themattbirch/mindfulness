import React from 'react'
import { NotificationSettings as NotificationSettingsType } from '../../services/settings'
import { animations } from '../../utils/animations'

interface NotificationSettingsProps {
  settings: NotificationSettingsType
  onUpdate: (settings: NotificationSettingsType) => void
}

export function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    onUpdate({
      ...settings,
      enabled: permission === 'granted'
    })
  }

  return (
    <div className={`space-y-4 ${animations.fadeIn}`}>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => {
              if (e.target.checked) {
                requestPermission()
              } else {
                onUpdate({
                  ...settings,
                  enabled: false
                })
              }
            }}
            className="rounded"
          />
          <span className="text-sm">Enable notifications</span>
        </label>
      </div>

      {settings.enabled && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Notification Style
            </label>
            <select
              value={settings.style}
              onChange={(e) => onUpdate({
                ...settings,
                style: e.target.value as NotificationSettingsType['style']
              })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="minimal">Minimal</option>
              <option value="detailed">Detailed</option>
              <option value="quote">With Quote</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Reminder Schedule
            </label>
            <div className="space-y-2">
              {settings.reminders.map((reminder, index) => (
                <div key={reminder.id} className="flex gap-2">
                  <input
                    type="time"
                    value={reminder.time}
                    onChange={(e) => {
                      const newReminders = [...settings.reminders]
                      newReminders[index] = {
                        ...reminder,
                        time: e.target.value
                      }
                      onUpdate({
                        ...settings,
                        reminders: newReminders
                      })
                    }}
                    className="px-3 py-2 border rounded-md"
                  />
                  <div className="flex gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dayIndex) => (
                      <button
                        key={dayIndex}
                        onClick={() => {
                          const newReminders = [...settings.reminders]
                          const days = new Set(reminder.days)
                          if (days.has(dayIndex)) {
                            days.delete(dayIndex)
                          } else {
                            days.add(dayIndex)
                          }
                          newReminders[index] = {
                            ...reminder,
                            days: Array.from(days)
                          }
                          onUpdate({
                            ...settings,
                            reminders: newReminders
                          })
                        }}
                        className={`
                          w-8 h-8 rounded-full text-sm
                          ${reminder.days.includes(dayIndex)
                            ? 'bg-blue-500 text-white'
                            : 'border hover:bg-gray-50'
                          }
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const newReminders = settings.reminders.filter(r => r.id !== reminder.id)
                      onUpdate({
                        ...settings,
                        reminders: newReminders
                      })
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newReminder = {
                    id: crypto.randomUUID(),
                    time: '09:00',
                    days: [1, 2, 3, 4, 5], // Mon-Fri
                    enabled: true
                  }
                  onUpdate({
                    ...settings,
                    reminders: [...settings.reminders, newReminder]
                  })
                }}
                className="w-full px-3 py-2 text-sm text-blue-500 border
                  border-blue-500 rounded-md hover:bg-blue-50"
              >
                Add Reminder
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 