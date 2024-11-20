import { useState, useEffect } from 'react'
import { animations } from '../utils/animations'

interface BreathingExerciseProps {
  pattern?: 'box' | '478' | 'equal'
}

export function BreathingExercise({ 
  pattern = '478' 
}: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [count, setCount] = useState(0)

  const patterns = {
    '478': { inhale: 4, hold: 7, exhale: 8 },
    'box': { inhale: 4, hold: 4, exhale: 4 },
    'equal': { inhale: 5, hold: 0, exhale: 5 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        const currentPattern = patterns[pattern]
        const currentDuration = currentPattern[phase]
        
        if (prev >= currentDuration) {
          // Move to next phase
          if (phase === 'inhale') setPhase('hold')
          else if (phase === 'hold') setPhase('exhale')
          else setPhase('inhale')
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase, pattern])

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className={`
          w-48 h-48 rounded-full border-4 border-blue-500
          ${phase === 'inhale' ? animations.scaleIn : 
            phase === 'exhale' ? animations.scaleOut : 
            animations.pulse
          }
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold capitalize">{phase}</div>
            <div className="text-xl">{count}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 
 