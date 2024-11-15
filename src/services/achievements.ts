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
  // Add more achievements...
]

export async function checkAchievements(): Promise<Achievement[]> {
  const stats = await storage.getStatistics()
  const unlockedAchievements = await storage.getUnlockedAchievements()
  
  const newAchievements = achievements.filter(achievement => 
    !unlockedAchievements.includes(achievement.id) && 
    achievement.condition(stats)
  )

  if (newAchievements.length > 0) {
    await storage.saveUnlockedAchievements([
      ...unlockedAchievements,
      ...newAchievements.map(a => a.id)
    ])
  }

  return newAchievements
} 