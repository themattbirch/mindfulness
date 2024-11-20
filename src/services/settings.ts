export interface TimerSettings {
  defaultDuration: number
  notificationInterval: number
  autoStart: boolean
}

export interface ThemeSettings {
  theme: 'light' | 'dark'
  useSystemTheme: boolean
}

export interface SoundSettings {
  enabled: boolean
  volume: number
  tickSound: boolean
}

export interface Settings {
  timer: TimerSettings
  theme: ThemeSettings
  sound: SoundSettings
  presets: TimerPreset[]
  quoteCategories: string[]
}

const DEFAULT_SETTINGS: Settings = {
  timer: {
    defaultDuration: 900, // 15 minutes
    notificationInterval: 900,
    autoStart: false
  },
  theme: {
    theme: 'light',
    useSystemTheme: true
  },
  sound: {
    enabled: true,
    volume: 0.5,
    tickSound: false
  },
  presets: [
    { id: '1', name: 'Quick Break', duration: 300 },
    { id: '2', name: 'Short Session', duration: 900 },
    { id: '3', name: 'Full Session', duration: 1800 }
  ],
  quoteCategories: ['Mindfulness', 'Meditation']
}

export { DEFAULT_SETTINGS } 