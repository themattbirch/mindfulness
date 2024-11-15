import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import type { Statistics } from '../services/storage'

export default function Statistics() {
  const [stats, setStats] = useState<Statistics | null>(null)

  useEffect(() => {
    storage.getStatistics().then(setStats)
  }, [])

  if (!stats) return null

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {stats.totalMinutes}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Total Minutes
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {stats.sessionsCompleted}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Sessions
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {stats.currentStreak}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Current Streak
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {stats.longestStreak}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Longest Streak
        </p>
      </div>
    </div>
  )
} 