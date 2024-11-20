import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import { StatisticsService } from '../../services/statistics'

export async function DetailedInsights() {
  const stats = await StatisticsService.getDetailedStats()
  
  const data = {
    labels: stats.dailyStats.map(stat => format(new Date(stat), 'MMM d')),
    datasets: [
      {
        label: 'Minutes Meditated',
        data: stats.dailyStats,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detailed Statistics</h2>
      <div className="h-64">
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
} 