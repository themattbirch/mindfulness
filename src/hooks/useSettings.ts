import { useState, useEffect } from 'react'

interface Settings {
  sound: string
  theme: 'light' | 'dark' | 'system'
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    sound: 'bell',
    theme: 'system'
  })

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return { settings, updateSettings }
} 