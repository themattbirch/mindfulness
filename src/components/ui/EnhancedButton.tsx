import React from 'react'
import { enhancedAnimations } from '../../utils/enhancedAnimations'

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  success?: boolean
  error?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  animation?: keyof typeof enhancedAnimations
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading,
    success,
    error,
    icon,
    iconPosition = 'left',
    animation,
    className,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all'
    
    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
      ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const stateStyles = {
      loading: enhancedAnimations.loadingPulse,
      success: enhancedAnimations.successPop,
      error: enhancedAnimations.errorShake
    }

    const getStateStyle = () => {
      if (loading) return stateStyles.loading
      if (success) return stateStyles.success
      if (error) return stateStyles.error
      return animation ? enhancedAnimations[animation] : ''
    }

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${getStateStyle()}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className || ''}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    )
  }
)

EnhancedButton.displayName = 'EnhancedButton' 