import React from 'react'
import { createContext, useContext, useState, useCallback } from 'react'
import { animations } from '../../utils/animations'

export interface Toast {
  id: number
  title?: string
  message: string
  type?: 'success' | 'error' | 'info'
  action?: React.ReactNode
  duration?: number
}

interface ToastContextType {
  toast: (options: Omit<Toast, 'id'>) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Date.now()
    const duration = options.duration ?? 5000

    setToasts(prev => [...prev, { ...options, id }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ toast: addToast, toasts }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              p-4 rounded-lg shadow-lg text-white
              ${animations.slideIn}
              ${toast.type === 'success' ? 'bg-green-500' :
                toast.type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
              }
            `}
          >
            {toast.title && (
              <div className="font-semibold">{toast.title}</div>
            )}
            <div>{toast.message}</div>
            {toast.action && (
              <div className="mt-2">{toast.action}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 