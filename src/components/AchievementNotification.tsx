// import React from 'react'
import { Achievement } from '../services/achievements'
import { animations } from '../utils/animations'

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  return (
    <div 
      className={`
        fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600
        text-white p-4 rounded-lg shadow-lg max-w-sm
        ${animations.slideIn}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{achievement.name}</h3>
          <p className="text-sm opacity-90">{achievement.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  )
} 