import { useTimer } from '../hooks/useTimer'

export default function Controls() {
  const { isRunning, start, pause, reset } = useTimer()

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        onClick={isRunning ? pause : start}
        className={`
          px-6 py-2 rounded-lg font-medium transition-all duration-300
          ${isRunning 
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-black hover:bg-gray-800 text-white'
          }
        `}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg font-medium border border-gray-300
                   hover:bg-gray-100 transition-colors"
      >
        Reset
      </button>
    </div>
  )
} 