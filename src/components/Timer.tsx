import { useEffect } from 'react'
import { useTimer } from '../hooks/useTimer'
import { CircularProgress } from './CircularProgress'

export default function Timer() {
  const { time, progress, isRunning } = useTimer()

  return (
    <div className="relative flex justify-center items-center">
      <CircularProgress progress={progress} />
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