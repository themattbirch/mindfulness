import { useEffect } from 'react'

interface ShortcutHandlers {
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onSettings?: () => void;
  onFocusMode?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (event.target instanceof HTMLInputElement) return

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault()
          handlers.onStart?.()
          break
        case 'p':
          handlers.onPause?.()
          break
        case 'r':
          handlers.onReset?.()
          break
        case 's':
          handlers.onSettings?.()
          break
        case 'f':
          handlers.onFocusMode?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handlers])
} 