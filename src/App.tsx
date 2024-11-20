import React from 'react';
import { useState } from 'react'
import Timer from './components/Timer'
import Quote from './components/Quote'
import Controls from './components/Controls'
import Settings from './components/Settings'
import { ToastProvider } from './components/ui/toast'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className={`
          w-96 min-h-[400px] p-6 rounded-lg shadow-lg relative
          dark:bg-gray-800 bg-[#F0F4FF]
          dark:text-white transition-colors
        `}>
          {isSettingsOpen ? (
            <Settings onClose={() => setIsSettingsOpen(false)} />
          ) : (
            <>
              <Timer />
              <Quote />
              <Controls />
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                <svg className="w-5 h-5" /* Add settings icon SVG here */ />
              </button>
            </>
          )}
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App 