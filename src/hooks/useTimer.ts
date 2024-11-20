import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../components/ui/toast'
import { storage } from '../services/storage'
import { sounds } from '../services/sounds'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'

interface TimerState {
  time: number
  isRunning: boolean
  initialDuration: number
}

export function useTimer() {
  const [state, setState] = useState<TimerState>({
    time: 0,
    isRunning: false,
    initialDuration: 900 // 15 minutes default
  })
  
  const { toast } = useToast()

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }))
    sounds.play('tick')
  }, [])

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }))
  }, [])

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      time: prev.initialDuration,
      isRunning: false
    }))
  }, [])

  const setDuration = useCallback((duration: number) => {
    setState(prev => ({
      ...prev,
      time: duration,
      initialDuration: duration,
      isRunning: false
    }))
  }, [])

  // Handle keyboard shortcuts
  useKeyboardShortcuts({
    onStart: () => state.isRunning ? pause() : start(),
    onReset: reset,
    onSpace: () => state.isRunning ? pause() : start()
  })

  // Timer tick effect
  useEffect(() => {
    let interval: number | null = null

    if (state.isRunning && state.time > 0) {
      interval = window.setInterval(() => {
        setState(prev => {
          const newTime = prev.time - 1
          
          if (newTime === 0) {
            sounds.play('complete')
            toast({
              title: 'Timer Complete',
              message: 'Time to take a mindful break',
              type: 'success',
              duration: 10000
            })
            return { ...prev, isRunning: false, time: 0 }
          }

          if (newTime % 60 === 0) {
            sounds.play('tick')
          }

          return { ...prev, time: newTime }
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.isRunning, state.time, toast])

  // Calculate progress percentage
  const progress = (state.time / state.initialDuration) * 100

  return {
    time: state.time,
    isRunning: state.isRunning,
    progress,
    start,
    pause,
    reset,
    setDuration
  }
} 