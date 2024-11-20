import { useTimer } from '../hooks/useTimer'

export default function Timer() {
  const { time, progress } = useTimer()

  return (
    <div className="relative flex justify-center items-center">
      <div className="h-32 w-32 rounded-full border-4 border-gray-200">
        <div 
          className="h-full w-full rounded-full border-4 border-blue-500" 
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`
          }}
        />
      </div>
      <div className="absolute text-4xl font-bold tabular-nums">
        {formatTime(time)}
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}

function pad(num: number): string {
  return num.toString().padStart(2, '0')
} 