interface StatisticsProps {
  totalSessions: number
  totalMinutes: number
  averageSessionLength: number
}

export function Statistics({ totalSessions, totalMinutes, averageSessionLength }: StatisticsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Total Sessions</h3>
        <p className="text-2xl">{totalSessions}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">Total Minutes</h3>
        <p className="text-2xl">{totalMinutes}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">Average Length</h3>
        <p className="text-2xl">{Math.round(averageSessionLength)}m</p>
      </div>
    </div>
  )
} 