import React, { useEffect, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import { enhancedAnimations } from '../../utils/enhancedAnimations'
import { useKeyPress } from '../../hooks/useKeyPress'

interface EnhancedModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
  animation?: keyof typeof enhancedAnimations
}

export const EnhancedModal = memo(({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnEscape = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  animation = 'slideAndFade'
}: EnhancedModalProps) => {
  useKeyPress('Escape', () => {
    if (closeOnEscape && isOpen) onClose()
  })

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose()
    }
  }, [closeOnOutsideClick, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-4'
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-50 p-4
        ${enhancedAnimations.fadeIn}
      `}
      onClick={handleOutsideClick}
    >
      <div
        className={`
          relative w-full ${sizeStyles[size]}
          bg-white dark:bg-gray-800 rounded-lg shadow-xl
          ${enhancedAnimations[animation]}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className={`
              absolute top-4 right-4 p-2 rounded-full
              text-gray-400 hover:text-gray-600
              dark:text-gray-500 dark:hover:text-gray-400
              ${enhancedAnimations.scaleInFast}
            `}
            aria-label="Close modal"
          >
            ×
          </button>
        )}

        {title && (
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {title}
            </h2>
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  )
})

EnhancedModal.displayName = 'EnhancedModal' 