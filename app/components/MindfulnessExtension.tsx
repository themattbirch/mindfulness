import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { playSoundAlert } from '../services/sounds'

export default function MindfulnessExtension() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const showNotification = useCallback(() => {
        playSoundAlert()
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1
                    if (newTime % 900 === 0) { // 15 minutes = 900 seconds
                        showNotification()
                    }
                    return newTime
                })
            }, 1000)
        } else if (interval) {
            clearInterval(interval)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, showNotification])

    const handleStartPause = () => {
        setIsRunning((prev) => !prev)
    }

    const handleReset = () => {
        setTime(0)
        setIsRunning(false)
    }

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="w-96 bg-[#F0F4FF] p-6 rounded-lg shadow-lg relative">
            <div className="bg-white rounded-lg">
                <div className="p-6 space-y-6">
                    <div className="text-4xl font-bold text-center">
                        {formatTime(time)}
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleStartPause}
                            className={`w-24 transition-all duration-300 ease-in-out ${
                                isRunning ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
                            } text-white px-4 py-2 rounded-md flex items-center justify-center`}
                        >
                            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                            {isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button 
                            onClick={handleReset} 
                            className="w-24 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center justify-center"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <button 
                className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowSettings(true)}
            >
                <Settings className="h-4 w-4" />
            </button>
        </div>
    )
} 