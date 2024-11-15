export interface TimerPreset {
  id: string;
  name: string;
  duration: number;
}

export interface Statistics {
  totalMinutes: number;
  sessionsCompleted: number;
  longestStreak: number;
  currentStreak: number;
  lastSessionDate: string | null;
}

export interface Settings {
  notificationInterval: number;
  theme: 'light' | 'dark';
  quoteCategories: string[];
  volume: number;
  presets: TimerPreset[];
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  notificationInterval: 900,
  theme: 'light',
  quoteCategories: ['Mindfulness', 'Meditation'],
  volume: 0.5,
  presets: [
    { id: '1', name: 'Quick Break', duration: 300 },
    { id: '2', name: 'Short Session', duration: 900 },
    { id: '3', name: 'Full Session', duration: 1800 }
  ],
  soundEnabled: true
}

const DEFAULT_STATS: Statistics = {
  totalMinutes: 0,
  sessionsCompleted: 0,
  longestStreak: 0,
  currentStreak: 0,
  lastSessionDate: null
}

export const storage = {
  async getSettings(): Promise<Settings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['settings'], (result) => {
        resolve(result.settings || DEFAULT_SETTINGS)
      })
    })
  },

  async saveSettings(settings: Partial<Settings>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['settings'], (result) => {
        const newSettings = {
          ...DEFAULT_SETTINGS,
          ...result.settings,
          ...settings
        }
        chrome.storage.sync.set({ settings: newSettings }, resolve)
      })
    })
  },

  async getTimer(): Promise<{ time: number; isRunning: boolean }> {
    return new Promise((resolve) => {
      chrome.storage.local.get(['timer'], (result) => {
        resolve(result.timer || { time: 0, isRunning: false })
      })
    })
  },

  async saveTimer(timer: { time: number; isRunning: boolean }): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ timer }, resolve)
    })
  },

  async getStatistics(): Promise<Statistics> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['statistics'], (result) => {
        resolve(result.statistics || DEFAULT_STATS)
      })
    })
  },

  async updateStatistics(sessionDuration: number): Promise<void> {
    const stats = await this.getStatistics()
    const today = new Date().toISOString().split('T')[0]
    
    const isConsecutiveDay = stats.lastSessionDate === 
      new Date(Date.now() - 86400000).toISOString().split('T')[0]

    const newStats: Statistics = {
      totalMinutes: stats.totalMinutes + Math.floor(sessionDuration / 60),
      sessionsCompleted: stats.sessionsCompleted + 1,
      currentStreak: isConsecutiveDay ? stats.currentStreak + 1 : 1,
      longestStreak: Math.max(stats.longestStreak, isConsecutiveDay ? stats.currentStreak + 1 : 1),
      lastSessionDate: today
    }

    return new Promise((resolve) => {
      chrome.storage.sync.set({ statistics: newStats }, resolve)
    })
  }
} 