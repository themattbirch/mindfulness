import React, { memo } from 'react'
import { enhancedAnimations } from '../../utils/enhancedAnimations'

interface EnhancedCardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  animation?: keyof typeof enhancedAnimations
  className?: string
  onClick?: () => void
  loading?: boolean
}

export const EnhancedCard = memo(({
  children,
  variant = 'default',
  padding = 'md',
  animation,
  className = '',
  onClick,
  loading
}: EnhancedCardProps) => {
  const baseStyles = 'rounded-lg transition-all duration-200'
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
    outlined: 'border border-gray-200 dark:border-gray-700',
    interactive: 'bg-white dark:bg-gray-800 shadow-sm hover:shadow-md cursor-pointer'
  }

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  }

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${animation ? enhancedAnimations[animation] : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      ) : children}
    </div>
  )
})

EnhancedCard.displayName = 'EnhancedCard' 