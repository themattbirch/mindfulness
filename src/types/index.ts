export interface TimerPreset {
  id: string
  name: string
  duration: number
}

export interface Timer {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

export interface Sound {
  volume: number
  enabled: boolean
}

export interface Settings {
  notificationInterval: number
  theme: 'light' | 'dark' | 'system'
  quoteCategories: string[]
  volume: number
  presets: TimerPreset[]
  soundEnabled: boolean
  timer?: Timer
  sound?: Sound
}

export interface Statistics {
  totalMinutes: number
  sessionsCompleted: number
  longestStreak: number
  currentStreak: number
  lastSessionDate: string | null
  focusSessions?: number
  totalFocusTime?: number
  dailyGoals?: number
  weeklyGoals?: number
  completedSessions?: number[]
  productivity?: {
    daily: number
    weekly: number
    monthly: number
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt: string
}

export interface Achievements {
  completed: Achievement[]
}

export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  custom?: boolean
} 