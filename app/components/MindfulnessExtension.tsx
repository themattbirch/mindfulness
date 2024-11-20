import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { useToast } from '../../components/ui/use-toast'
import { Toaster } from '../../components/ui/toaster'
import TimerDisplay from './TimerDisplay'
import QuoteSection from './QuoteSection'
import SettingsModal from './SettingsModal'
import { playSoundAlert } from '../services/sounds'

const quotes = [
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    // ... other quotes ...
]

export default function MindfulnessExtension() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [quote, setQuote] = useState(quotes[0])
    const { toast } = useToast()
    const [showSettings, setShowSettings] = useState(false)

    const showNotification = useCallback(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(newQuote)
        playSoundAlert()
        toast({
            title: "Time for a mindful break",
            description: newQuote.text,
            action: (
                <div className="flex space-x-2">
                    <Button size="sm" onClick={() => console.log("Break taken")}>Take Break</Button>
                    <Button size="sm" variant="outline" onClick={() => console.log("Snoozed")}>Snooze</Button>
                </div>
            ),
            duration: 10000,
        })
    }, [toast])

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
        setQuote(quotes[0])
    }

    return (
        <>
            <div className="w-96 bg-[#F0F4FF] p-6 rounded-lg shadow-lg">
                <Card className="bg-white">
                    <CardContent className="p-6 space-y-6">
                        <TimerDisplay time={time} isRunning={isRunning} />
                        <QuoteSection quote={quote} />
                        <div className="flex justify-center space-x-4">
                            <Button
                                onClick={handleStartPause}
                                className={`w-24 transition-all duration-300 ease-in-out ${isRunning ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'}`}
                            >
                                {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                                {isRunning ? 'Pause' : 'Start'}
                            </Button>
                            <Button onClick={handleReset} variant="outline" className="w-24">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setShowSettings(true)}>
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
            <Toaster />
        </>
    )
} 