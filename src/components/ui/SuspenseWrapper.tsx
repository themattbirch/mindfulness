import React, { Suspense } from 'react'
import { enhancedAnimations } from '../../utils/enhancedAnimations'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  fullScreen?: boolean
}

const Loading = ({ size = 'md', message = 'Loading...', fullScreen = false }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-4'

  return (
    <div className={`${containerClasses} ${enhancedAnimations.fadeIn}`}>
      <div className={`${enhancedAnimations.spin} ${sizeClasses[size]}`}>
        <svg
          className="animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
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
      </div>
      {message && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  )
}

interface SuspenseWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  loadingProps?: LoadingProps
}

export const SuspenseWrapper = ({
  children,
  fallback,
  loadingProps
}: SuspenseWrapperProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <Loading {...loadingProps} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// Helper for lazy loading components
export function lazyLoad(
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  LoadingComponent: React.ComponentType = Loading
) {
  const LazyComponent = React.lazy(factory)
  
  return (props: any) => (
    <SuspenseWrapper fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </SuspenseWrapper>
  )
} 