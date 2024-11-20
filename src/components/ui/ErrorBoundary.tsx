import React from 'react'
import { enhancedAnimations } from '../../utils/enhancedAnimations'
import { EnhancedButton } from './EnhancedButton'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className={`
            p-6 rounded-lg bg-red-50 dark:bg-red-900/20
            border border-red-100 dark:border-red-800
            ${enhancedAnimations.fadeIn}
          `}
        >
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h2>
          <div className="text-sm text-red-600 dark:text-red-300 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </div>
          <EnhancedButton
            variant="outline"
            onClick={this.handleReset}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Try Again
          </EnhancedButton>
        </div>
      )
    }

    return this.props.children
  }
} 