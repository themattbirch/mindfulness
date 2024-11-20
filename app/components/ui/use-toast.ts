import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, duration = 5000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    const newToast = { id, title, description, duration }
    
    setToasts((currentToasts) => [...currentToasts, newToast])

    setTimeout(() => {
      setToasts((currentToasts) => 
        currentToasts.filter((toast) => toast.id !== id)
      )
    }, duration)
  }, [])

  return { toast, toasts }
} 