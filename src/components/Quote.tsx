import { useState, useEffect } from 'react'
import { quotes } from '../data/quotes'

export default function Quote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
        setIsVisible(true)
      }, 500)
    }, 300000) // Change quote every 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 bg-blue-50 p-4 rounded-lg transition-opacity duration-500"
         style={{ opacity: isVisible ? 1 : 0 }}>
      <p className="text-center italic text-gray-800 font-serif">
        "{currentQuote.text}"
      </p>
      <p className="text-center text-sm text-gray-600 mt-2">
        — {currentQuote.author}
      </p>
    </div>
  )
} 