export interface Settings {
  theme: 'light' | 'dark' | 'system'
  fontSize: number
  language: string
  notifications: boolean
  // Add other settings properties as needed
}

export interface Statistics {
  totalTime: number
  sessionsCompleted: number
  averageAccuracy: number
  totalCharacters: number
  wordsPerMinute: number[]
  // Add other statistics properties as needed
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt?: Date
  progress: number
  completed: boolean
}

export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    // Add other color properties as needed
  }
  custom?: boolean
}

export type Achievements = Achievement[] 