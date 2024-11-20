import { useState, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastMessage {
  id: number
  title: string
  message: string
  type: ToastType
}

interface ToastOptions {
  title: string
  message: string
  type: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now()
    const duration = options.duration || 5000

    const newToast: ToastMessage = {
      id,
      title: options.title,
      message: options.message,
      type: options.type
    }

    setToasts(prev => [...prev, newToast])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, duration)
  }, [])

  return { toast, toasts }
} 