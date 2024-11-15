import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../components/ui/toast'
import { storage } from '../services/storage'

export function useTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const { toast } = useToast()

  // Load timer state
  useEffect(() => {
    storage.getTimer().then(({ time, isRunning }) => {
      setTime(time)
      setIsRunning(isRunning)
    })
  }, [])

  // Save timer state
  useEffect(() => {
    storage.saveTimer({ time, isRunning })
    chrome.runtime.sendMessage({
      type: 'UPDATE_TIMER',
      timer: { time, isRunning }
    })
  }, [time, isRunning])

  const showNotification = useCallback(() => {
    chrome.alarms.create('mindfulness-reminder', {
      delayInMinutes: 15
    })
  }, [])

  useEffect(() => {
    let interval: number | null = null

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(prev => {
          const next = prev + 1
          if (next % 900 === 0) { // 15 minutes
            showNotification()
          }
          return next
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, showNotification])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setTime(0)
    setIsRunning(false)
  }

  const progress = (time % 900) / 900 * 100

  return {
    time,
    isRunning,
    progress,
    start,
    pause,
    reset
  }
} 