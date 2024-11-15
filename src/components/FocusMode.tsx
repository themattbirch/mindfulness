import { useState, useEffect } from 'react'
import { useTimer } from '../hooks/useTimer'
import { CircularProgress } from './CircularProgress'

export default function FocusMode() {
  const { time, progress, isRunning } = useTimer()
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  return (
    <div className={`
      fixed inset-0 bg-black bg-opacity-90 
      flex flex-col items-center justify-center
      ${isFullscreen ? 'z-50' : 'z-40'}
    `}>
      <div className="text-white text-center space-y-8">
        <CircularProgress 
          progress={progress} 
          size={isFullscreen ? 'lg' : 'md'} 
        />
        <div className="text-6xl font-bold">
          {formatTime(time)}
        </div>
        <button
          onClick={toggleFullscreen}
          className="text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      </div>
    </div>
  )
} 