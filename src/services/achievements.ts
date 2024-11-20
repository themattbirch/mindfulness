import { storage } from './storage'
import { Statistics } from '../types'

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: Statistics) => boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'first-session',
    name: 'First Steps',
    description: 'Complete your first mindfulness session',
    icon: '🌱',
    condition: (stats) => stats.sessionsCompleted >= 1
  },
  {
    id: 'week-streak',
    name: 'Consistency is Key',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 7
  },
  {
    id: 'hour-master',
    name: 'Hour Master',
    description: 'Accumulate 60 minutes of mindfulness',
    icon: '⏰',
    condition: (stats) => stats.totalMinutes >= 60
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Complete 30 sessions',
    icon: '🧘',
    condition: (stats) => stats.sessionsCompleted >= 30
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a session before 8 AM',
    icon: '🌅',
    condition: (stats) => stats.hasEarlyMorningSession
  }
]

export async function checkAchievements(stats: Statistics): Promise<Achievement[]> {
  const unlockedAchievements = await storage.getUnlockedAchievements()
  
  const newAchievements = achievements.filter(achievement => 
    !unlockedAchievements.includes(achievement.id) && 
    achievement.condition(stats)
  )

  if (newAchievements.length > 0) {
    const updatedAchievements = [
      ...unlockedAchievements,
      ...newAchievements.map(a => a.id)
    ]
    await storage.saveUnlockedAchievements(updatedAchievements)
  }

  return newAchievements
} 