import { DailyStats } from '../services/statistics'
import { animations } from '../utils/animations'

interface StatisticsViewProps {
  dailyStats: DailyStats[]
  totalMinutes: number
  currentStreak: number
  bestDay: { date: string; minutes: number }
}

export function StatisticsView({ 
  dailyStats, 
  totalMinutes, 
  currentStreak, 
  bestDay 
}: StatisticsViewProps) {
  const maxMinutes = Math.max(...dailyStats.map(day => day.totalMinutes))

  return (
    <div className={`space-y-6 ${animations.fadeIn}`}>
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold">{totalMinutes}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Minutes
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold">{currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Day Streak
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold">{bestDay.minutes}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Best Day
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Past Week</h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {dailyStats.map(day => (
            <div 
              key={day.date} 
              className="flex flex-col items-center flex-1"
            >
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-500"
                style={{ 
                  height: `${(day.totalMinutes / maxMinutes) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                {new Date(day.date).toLocaleDateString(undefined, { 
                  weekday: 'short' 
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 